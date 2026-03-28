import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { startOfDay, endOfDay } from 'date-fns';

export function useDashboardMetrics(startDate: Date, endDate: Date) {
  const [data, setData] = useState({
    generic: {
      totalVolume: 0, leadsReached: 0, answered: 0, noAnswer: 0, voicemails: 0, errors: 0,
      notInterested: 0, wrongPerson: 0, callbackRequested: 0, qualified: 0, transferred: 0,
      pickupRate: 0, transferRate: 0, notInterestedRate: 0,
    },
    agent: {
      hookEngaged: 0, intentEngaged: 0, transferEngaged: 0, objectionEngaged: 0,
      hookRate: 0, hookToIntentRate: 0, intentToTransferRate: 0, transferCompletionRate: 0,
    },
    chartData: [] as any[],
    leads: [] as any[],
    calls: [] as any[],
    phoneNumbers: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      try {
        const startIso = startOfDay(startDate).toISOString();
        const endIso = endOfDay(endDate).toISOString();

        if (import.meta.env.VITE_SUPABASE_URL) {
          const [dailyRes, contactsRes, callsRes, phonesRes] = await Promise.all([
            supabase.from('daily_metrics').select('*').gte('date', startIso).lte('date', endIso).order('date', { ascending: true }),
            supabase.from('contacts').select('*').gte('first_call_date', startIso).lte('first_call_date', endIso).limit(50),
            supabase.from('calls').select('*').gte('call_start', startIso).lte('call_start', endIso).order('call_start', { ascending: false }).limit(50),
            supabase.from('phone_numbers').select('*').order('calls_today', { ascending: false }).limit(50)
          ]);

          const dailyData = dailyRes.data || [];
          let generic = { totalVolume: 0, leadsReached: 0, answered: 0, noAnswer: 0, voicemails: 0, errors: 0, notInterested: 0, wrongPerson: 0, callbackRequested: 0, qualified: 0, transferred: 0, pickupRate: 0, transferRate: 0, notInterestedRate: 0 };
          let agent = { hookEngaged: 0, intentEngaged: 0, transferEngaged: 0, objectionEngaged: 0, hookRate: 0, hookToIntentRate: 0, intentToTransferRate: 0, transferCompletionRate: 0 };
          
          const chartData = dailyData.map(row => {
            generic.totalVolume += row.total_dials || 0;
            generic.answered += row.answered || 0;
            generic.noAnswer += row.no_answer || 0;
            generic.voicemails += row.voicemails || 0;
            generic.errors += row.errors || 0;
            generic.notInterested += row.not_interested || 0;
            generic.wrongPerson += row.wrong_person || 0;
            generic.callbackRequested += row.callback_requested || 0;
            generic.qualified += row.qualified || 0;
            generic.transferred += row.transferred || 0;

            agent.hookEngaged += row.hook_engaged || 0;
            agent.intentEngaged += row.intent_engaged || 0;
            agent.transferEngaged += row.transfer_engaged || 0;
            agent.objectionEngaged += row.objection_engaged || 0;

            return {
              date: new Date(row.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
              calls: row.total_dials || 0,
              transferred: row.transferred || 0,
            };
          });

          generic.leadsReached = generic.answered;
          generic.pickupRate = generic.totalVolume > 0 ? (generic.answered / generic.totalVolume) * 100 : 0;
          generic.transferRate = generic.answered > 0 ? (generic.transferred / generic.answered) * 100 : 0;
          generic.notInterestedRate = generic.answered > 0 ? (generic.notInterested / generic.answered) * 100 : 0;

          agent.hookRate = generic.answered > 0 ? (agent.hookEngaged / generic.answered) * 100 : 0;
          agent.hookToIntentRate = agent.hookEngaged > 0 ? (agent.intentEngaged / agent.hookEngaged) * 100 : 0;
          agent.intentToTransferRate = agent.intentEngaged > 0 ? (agent.transferEngaged / agent.intentEngaged) * 100 : 0;
          agent.transferCompletionRate = agent.transferEngaged > 0 ? (generic.transferred / agent.transferEngaged) * 100 : 0;

          const round = (val: number) => Math.round(val * 10) / 10;
          generic.pickupRate = round(generic.pickupRate);
          generic.transferRate = round(generic.transferRate);
          generic.notInterestedRate = round(generic.notInterestedRate);
          agent.hookRate = round(agent.hookRate);
          agent.hookToIntentRate = round(agent.hookToIntentRate);
          agent.intentToTransferRate = round(agent.intentToTransferRate);
          agent.transferCompletionRate = round(agent.transferCompletionRate);

          setData({ generic, agent, chartData, leads: contactsRes.data || [], calls: callsRes.data || [], phoneNumbers: phonesRes.data || [] });
          setLoading(false);
        } else {
          // MOCK DATA for preview
          setTimeout(() => {
            setData({
              generic: {
                totalVolume: 8432, leadsReached: 3104, answered: 3104, noAnswer: 2800, voicemails: 2200, errors: 45,
                notInterested: 1250, wrongPerson: 310, callbackRequested: 195, qualified: 1050, transferred: 612,
                pickupRate: 36.8, transferRate: 19.7, notInterestedRate: 40.2
              },
              agent: {
                hookEngaged: 2850, intentEngaged: 2100, transferEngaged: 950, objectionEngaged: 600,
                hookRate: 91.8, hookToIntentRate: 73.6, intentToTransferRate: 45.2, transferCompletionRate: 64.4
              },
              chartData: [
                { date: 'Oct 1', calls: 1400, transferred: 90 },
                { date: 'Oct 2', calls: 1600, transferred: 120 },
                { date: 'Oct 3', calls: 1550, transferred: 110 },
                { date: 'Oct 4', calls: 1800, transferred: 145 },
                { date: 'Oct 5', calls: 2082, transferred: 147 },
              ],
              leads: [
                { id: '1', full_name: 'John Doe', client: 'Solar Pro Alpha', total_calls: 3, current_status: 'Qualified', last_call_outcome: 'Transferred' },
                { id: '2', full_name: 'Sarah Smith', client: 'Solar Pro Beta', total_calls: 1, current_status: 'Dead', last_call_outcome: 'Not Interested' },
                { id: '3', full_name: 'Mike Johnson', client: 'Solar Pro Gamma', total_calls: 5, current_status: 'Follow Up', last_call_outcome: 'Voicemail' },
                { id: '4', full_name: 'Emily Davis', client: 'Solar Pro Alpha', total_calls: 2, current_status: 'Qualified', last_call_outcome: 'Callback Requested' },
                { id: '5', full_name: 'Robert Wilson', client: 'Solar Pro Beta', total_calls: 4, current_status: 'DNC', last_call_outcome: 'Wrong Person' },
              ],
              calls: [
                { id: '101', client: 'Solar Pro Alpha', contact_id: 'C-12', duration_sec: 145, outcome: 'Transferred', status: 'completed' },
                { id: '102', client: 'Solar Pro Beta', contact_id: 'C-09', duration_sec: 22, outcome: 'Not Interested', status: 'completed' },
                { id: '103', client: 'Solar Pro Alpha', contact_id: 'C-43', duration_sec: 0, outcome: 'No Answer', status: 'failed' },
                { id: '104', client: 'Solar Pro Gamma', contact_id: 'C-99', duration_sec: 64, outcome: 'Callback Requested', status: 'completed' },
                { id: '105', client: 'Solar Pro Beta', contact_id: 'C-15', duration_sec: 112, outcome: 'Transferred', status: 'completed' },
              ],
              phoneNumbers: [
                { id: '1', did_number: '+18005550100', status: 'active', spam_reports: 0, calls_today: 450, pickup_rate_today: 42.1 },
                { id: '2', did_number: '+18005550101', status: 'flagged', spam_reports: 12, calls_today: 120, pickup_rate_today: 18.5 },
                { id: '3', did_number: '+18005550102', status: 'active', spam_reports: 1, calls_today: 380, pickup_rate_today: 39.4 },
                { id: '4', did_number: '+18005550103', status: 'active', spam_reports: 0, calls_today: 510, pickup_rate_today: 45.8 },
                { id: '5', did_number: '+18005550104', status: 'suspended', spam_reports: 25, calls_today: 0, pickup_rate_today: 0 },
              ]
            });
            setLoading(false);
          }, 800);
        }
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setLoading(false);
      }
    }

    fetchAllData();
  }, [startDate, endDate]);

  return { data, loading };
}
