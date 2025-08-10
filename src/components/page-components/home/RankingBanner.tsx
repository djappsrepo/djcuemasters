import { useState, useEffect } from 'react';
import { supabase } from '../../../integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Ranking = Database['public']['Views']['dj_rankings']['Row'];

export const RankingBanner = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('dj_rankings') // This is a VIEW, not a TABLE
          .select('*')
          .limit(10); // Get Top 10 as planned

        if (error) {
          throw error;
        }

        if (data) {
          setRankings(data);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error("Error fetching rankings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Cargando ranking...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">🏆 Ranking de Donaciones — Beta 2025 🎶</h2>
      <ul className="space-y-3">
        {rankings.map((dj, index) => (
          <li key={dj.dj_id} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
            <span className="font-bold text-lg">{index + 1}. {dj.dj_name}</span>
            <div className="text-right">
              <span className="text-green-400 font-semibold">${dj.total_donations?.toLocaleString() ?? '0'} MXN</span>
              <p className="text-sm text-yellow-400">🎉 {dj.premio}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
