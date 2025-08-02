import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8'
import { corsHeaders } from '../_shared/cors.ts'

console.log(`🚀 Function 'delete-user-account' up and running!`);

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Create a Supabase client with the user's auth token
    const userClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    // 2. Get the user from the token
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("User not found.");

    const userId = user.id;
    console.log(`Attempting to delete account for user: ${userId}`);

    // 3. Create a Supabase client with the SERVICE_ROLE_KEY to bypass RLS
    const adminClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 4. Delete all user-related data in order (from child tables to parent tables)
    // Note: This assumes no CASCADE deletes are set up. This is a safer, manual approach.

    // To-do: Add deletion from 'music_requests' if needed, which is more complex.
    // For now, we focus on the main user and DJ tables.

    // Delete from 'dj_events'
    const { error: eventsError } = await adminClient
      .from('dj_events')
      .delete()
      .eq('dj_id', userId);
    if (eventsError) throw new Error(`Failed to delete dj_events: ${eventsError.message}`);
    console.log(`Deleted events for user: ${userId}`);

    // Delete from 'dj_profiles'
    const { error: djProfileError } = await adminClient
      .from('dj_profiles')
      .delete()
      .eq('user_id', userId);
    if (djProfileError) throw new Error(`Failed to delete dj_profiles: ${djProfileError.message}`);
    console.log(`Deleted dj_profile for user: ${userId}`);

    // Delete from 'profiles'
    const { error: profileError } = await adminClient
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (profileError) throw new Error(`Failed to delete profiles: ${profileError.message}`);
    console.log(`Deleted profile for user: ${userId}`);

    // 5. Finally, delete the user from the auth system
    const { error: authError } = await adminClient.auth.admin.deleteUser(userId);
    if (authError) throw new Error(`Failed to delete user from auth: ${authError.message}`);
    console.log(`Successfully deleted user from auth: ${userId}`);

    return new Response(JSON.stringify({ message: 'User account deleted successfully.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
