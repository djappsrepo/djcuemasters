import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRequestForm } from './use-request-form';
import type { Tables } from '@/integrations/supabase/types';

// Mock de dependencias externas
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn(),
    },
  },
}));

// Datos de prueba (Mocks)
const mockDjProfile: Tables<'dj_profiles'> = {
  id: 'dj-profile-id-1',
  user_id: 'user-id-1',
  stage_name: 'DJ Mock',
  bio: 'A mock DJ',
  minimum_tip: 5.00,
  created_at: new Date().toISOString(),
  active: true,
  location_address: 'Mock City',
  stripe_account_id: 'acct_mock',
  average_rating: 5,
  latitude: 0,
  longitude: 0,
  qr_code_url: '',
  updated_at: new Date().toISOString(),
  total_earnings: 0,
  total_requests: 0
};

const mockDjEvents: Tables<'dj_events'>[] = [
  {
    id: 'event-id-1',
    dj_id: 'dj-profile-id-1',
    name: 'Mock Event',
    is_active: true,
    created_at: new Date().toISOString(),
    event_date: new Date().toISOString(),
    description: 'A mock event',
    venue: 'Mock Venue',
    event_address: '123 Mock St',
    latitude: 0,
    longitude: 0,
    total_earnings: 0,
    total_requests: 0,
    updated_at: new Date().toISOString(),
  },
];

describe('useRequestForm', () => {
  it('debería inicializar con el estado correcto basado en las props', () => {
    const { result } = renderHook(() => 
      useRequestForm({ djProfile: mockDjProfile, djEvents: mockDjEvents })
    );

    // Verifica que el estado inicial se establece correctamente desde las props
    expect(result.current.formData.tip_amount).toBe(mockDjProfile.minimum_tip.toString());
    expect(result.current.formData.event_id).toBe(mockDjEvents[0].id);

    // Verifica otros estados iniciales
    expect(result.current.clientSecret).toBeNull();
    expect(result.current.submitting).toBe(false);
    expect(result.current.currentRequestId).toBeNull();
  });
});
