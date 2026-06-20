import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { startOfDay, endOfDay, format } from 'date-fns';

type CallRow = Record<string, any>;

const lc = (v: unknown) => (typeof v === 'string' ? v.toLowerCase() : '');

function isAnswered(c: CallRow) {
  const outcome = lc(c.outcome);
  const reason = lc(c.ended_reason);
  if (['no_answer', 'voicemail_left', 'failed', 'call_failed'].includes(outcome)) return false;
  if (reason.includes('did-not-answer') || reason.includes('voicemail')) return false;
  return true;
}
const isVoicemail = (c: CallRow) => lc(c.outcome) === 'voicemail_left' || lc(c.ended_reason).includes('voicemail');
const isNoAnswer = (c: CallRow) => lc(c.outcome) === 'no_answer' || lc(c.ended_reason).includes('did-not-answer');
const isWrongPerson = (c: CallRow) => lc(c.outcome) === 'wrong_person';
const isNotInterested = (c: CallRow) => lc(c.outcome) === 'not_interested';
const isCallbackRequested = (c: CallRow) => lc(c.outcome) === 'callback_requested';
const isQualified = (c: CallRow) => lc(c.outcome) === 'qualified';
const isAppointmentBooked = (c: CallRow) => !!c.appointment_date || lc(c.outcome) === 'appointment_booked';
const isError = (c: CallRow) => ['failed', 'call_failed'].includes(lc(c.outcome)) || lc(c.status) === 'failed';

function computeMetrics(calls: CallRow[]) {
  const totalVolume = calls.length;
  const answered = calls.filter(isAnswered).length;
  const noAnswer = calls.filter(isNoAnswer).length;
  const voicemails = calls.filter(isVoicemail).length;
  const errors = calls.filter(isError).length;
  const notInterested = calls.filter(isNotInterested).length;
  const wrongPerson = calls.filter(isWrongPerson).length;
  const callbackRequested = calls.filter(isCallbackRequested).length;
  const qualified = calls.filter(isQualified).length;
  const appointmentBooked = calls.filter(isAppointmentBooked).length;

  const hookEngaged = calls.filter(c => c.hook_agent_engaged === true).length;
  const hookObjectionEngaged = calls.filter(c => c.hook_objection_engaged === true).length;
  const valueEngaged = calls.filter(c => c.value_agent_engaged === true).length;
  const valueObjectionEngaged = calls.filter(c => c.value_objection_engaged === true).length;
  const appointmentAgentEngaged = calls.filter(c => c.appointment_agent_engaged === true).length;
  const appointmentObjectionEngaged = calls.filter(c => c.appointment_objection_engaged === true).length;

  const round = (val: number) => Math.round(val * 10) / 10;
  const pct = (num: number, den: number) => (den > 0 ? round((num / den) * 100) : 0);

  const generic = {
    totalVolume, leadsReached: answered, answered, noAnswer, voicemails, errors,
    notInterested, wrongPerson, callbackRequested, qualified, appointmentBooked,
    pickupRate: pct(answered, totalVolume),
    appointmentBookingRate: pct(appointmentBooked, answered),
    notInterestedRate: pct(notInterested, answered),
  };

  const agent = {
    hookEngaged, hookObjectionEngaged, valueEngaged, valueObjectionEngaged,
    appointmentAgentEngaged, appointmentObjectionEngaged,
    hookRate: pct(hookEngaged, answered),
    hookToValueRate: pct(valueEngaged, hookEngaged),
    valueToAppointmentRate: pct(appointmentAgentEngaged, valueEngaged),
    appointmentCompletionRate: pct(appointmentBooked, appointmentAgentEngaged),
  };

  return { generic, agent };
}

export function useDashboardMetrics(startDate: Date, endDate: Date) {
  const [data, setData] = useState({
    generic: {
      totalVolume: 0, leadsReached: 0, answered: 0, noAnswer: 0, voicemails: 0, errors: 0,
      notInterested: 0, wrongPerson: 0, callbackRequested: 0, qualified: 0, appointmentBooked: 0,
      pickupRate: 0, appointmentBookingRate: 0, notInterestedRate: 0,
    },
    agent: {
      hookEngaged: 0, hookObjectionEngaged: 0, valueEngaged: 0, valueObjectionEngaged: 0,
      appointmentAgentEngaged: 0, appointmentObjectionEngaged: 0,
      hookRate: 0, hookToValueRate: 0, valueToAppointmentRate: 0, appointmentCompletionRate: 0,
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
          const [allCallsRes, contactsRes, phonesRes] = await Promise.all([
            supabase.from('calls').select('*').gte('call_start', startIso).lte('call_start', endIso).order('call_start', { ascending: false }),
            supabase.from('contacts').select('*').gte('first_call_date', startIso).lte('first_call_date', endIso).limit(50),
            supabase.from('phone_numbers').select('*').order('calls_today', { ascending: false }).limit(50)
          ]);

          const allCalls = allCallsRes.data || [];
          const { generic, agent } = computeMetrics(allCalls);

          // Build a daily timeseries for the chart from raw calls (no daily_metrics dependency)
          const byDay = new Map<string, { calls: number; appointments: number }>();
          for (const c of allCalls) {
            if (!c.call_start) continue;
            const key = format(new Date(c.call_start), 'yyyy-MM-dd');
            const bucket = byDay.get(key) || { calls: 0, appointments: 0 };
            bucket.calls += 1;
            if (isAppointmentBooked(c)) bucket.appointments += 1;
            byDay.set(key, bucket);
          }
          const chartData = Array.from(byDay.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([dateKey, v]) => ({
              date: new Date(dateKey).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
              calls: v.calls,
              appointments: v.appointments,
            }));

          setData({
            generic, agent, chartData,
            leads: contactsRes.data || [],
            calls: allCalls.slice(0, 50),
            phoneNumbers: phonesRes.data || []
          });
          setLoading(false);
        } else {
          // MOCK DATA for preview
          setTimeout(() => {
            setData({
              generic: {
                totalVolume: 8432, leadsReached: 3104, answered: 3104, noAnswer: 2800, voicemails: 2200, errors: 45,
                notInterested: 1250, wrongPerson: 310, callbackRequested: 195, qualified: 1050, appointmentBooked: 612,
                pickupRate: 36.8, appointmentBookingRate: 19.7, notInterestedRate: 40.2
              },
              agent: {
                hookEngaged: 2850, hookObjectionEngaged: 420, valueEngaged: 2100, valueObjectionEngaged: 380,
                appointmentAgentEngaged: 950, appointmentObjectionEngaged: 260,
                hookRate: 91.8, hookToValueRate: 73.6, valueToAppointmentRate: 45.2, appointmentCompletionRate: 64.4
              },
              chartData: [
                { date: 'Oct 1', calls: 1400, appointments: 90 },
                { date: 'Oct 2', calls: 1600, appointments: 120 },
                { date: 'Oct 3', calls: 1550, appointments: 110 },
                { date: 'Oct 4', calls: 1800, appointments: 145 },
                { date: 'Oct 5', calls: 2082, appointments: 147 },
              ],
              leads: [
                { id: '1', full_name: 'John Doe', client: 'Solar Pro Alpha', total_calls: 3, current_status: 'Qualified', last_call_outcome: 'Appointment Booked' },
                { id: '2', full_name: 'Sarah Smith', client: 'Solar Pro Beta', total_calls: 1, current_status: 'Dead', last_call_outcome: 'Not Interested' },
                { id: '3', full_name: 'Mike Johnson', client: 'Solar Pro Gamma', total_calls: 5, current_status: 'Follow Up', last_call_outcome: 'Voicemail' },
                { id: '4', full_name: 'Emily Davis', client: 'Solar Pro Alpha', total_calls: 2, current_status: 'Qualified', last_call_outcome: 'Callback Requested' },
                { id: '5', full_name: 'Robert Wilson', client: 'Solar Pro Beta', total_calls: 4, current_status: 'DNC', last_call_outcome: 'Wrong Person' },
              ],
              calls: [
                { id: '101', client: 'Solar Pro Alpha', contact_id: 'C-12', duration_sec: 145, outcome: 'Appointment Booked', status: 'completed', appointment_date: '2026-06-24', appointment_time: '3:00 PM' },
                { id: '102', client: 'Solar Pro Beta', contact_id: 'C-09', duration_sec: 22, outcome: 'Not Interested', status: 'completed', appointment_date: null, appointment_time: null },
                { id: '103', client: 'Solar Pro Alpha', contact_id: 'C-43', duration_sec: 0, outcome: 'No Answer', status: 'failed', appointment_date: null, appointment_time: null },
                { id: '104', client: 'Solar Pro Gamma', contact_id: 'C-99', duration_sec: 64, outcome: 'Callback Requested', status: 'completed', appointment_date: null, appointment_time: null },
                { id: '105', client: 'Solar Pro Beta', contact_id: 'C-15', duration_sec: 112, outcome: 'Appointment Booked', status: 'completed', appointment_date: '2026-06-25', appointment_time: '10:00 AM' },
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
