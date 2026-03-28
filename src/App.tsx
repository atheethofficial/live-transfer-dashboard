import React, { useState } from 'react';
import { Calendar, Activity, Users, PhoneCall, Hash, PhoneForwarded, CheckCircle, XCircle, Clock, AlertTriangle, Layers } from 'lucide-react';
import { DateRangePicker } from './components/DateRangePicker';
import { useDashboardMetrics } from './hooks/useDashboardMetrics';
import { subDays } from 'date-fns';

function App() {
  const [dateRange, setDateRange] = useState({ start: subDays(new Date(), 30), end: new Date() });
  const { data, loading } = useDashboardMetrics(dateRange.start, dateRange.end);

  const StatCard = ({ label, value, icon: Icon, color, bg, glow }: any) => (
    <div className={`bg-[#0a0a0a] border border-white/10 p-5 rounded-2xl flex items-center justify-between transition-all hover:bg-[#111] hover:border-blue-500/30 ${glow ? 'orka-glow hover:orka-glow-strong' : 'shadow-xl'}`}>
      <div>
        <p className="text-slate-400 text-[11px] uppercase tracking-wider font-semibold mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-white tracking-tight">{loading ? '...' : value}</h3>
      </div>
      <div className={`p-3 rounded-xl border border-white/5 ${bg} ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col gap-10 font-sans selection:bg-blue-500/30 relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 orka-grid pointer-events-none opacity-50 z-0"></div>
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-white/10 gap-4 sticky top-0 bg-black/80 backdrop-blur-xl z-50 pt-2 -mt-2 relative">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-blue-600 rounded-2xl orka-glow-strong">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-0.5">Live Transfer Analytics</h1>
            <p className="text-blue-400 text-sm font-medium">Orka Growth Infrastructure</p>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <Calendar className="w-5 h-5 text-blue-400" />
          <DateRangePicker startDate={dateRange.start} endDate={dateRange.end} onChange={(start, end) => setDateRange({ start, end })} />
        </div>
      </header>

      <div className="relative z-10 flex flex-col gap-10">
        {/* SECTION 1: GENERIC METRICS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Generic Call Metrics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <StatCard label="Total Volume" value={data.generic.totalVolume.toLocaleString()} icon={PhoneCall} color="text-white" bg="bg-blue-600/20" glow />
            <StatCard label="Leads Reached" value={data.generic.leadsReached.toLocaleString()} icon={Users} color="text-blue-300" bg="bg-blue-500/10" />
            <StatCard label="Answered" value={data.generic.answered.toLocaleString()} icon={CheckCircle} color="text-blue-400" bg="bg-[#111]" />
            <StatCard label="No Answer" value={data.generic.noAnswer.toLocaleString()} icon={XCircle} color="text-slate-400" bg="bg-[#111]" />
            <StatCard label="Voicemails" value={data.generic.voicemails.toLocaleString()} icon={Clock} color="text-slate-300" bg="bg-[#111]" />
            
            <StatCard label="Errors" value={data.generic.errors.toLocaleString()} icon={AlertTriangle} color="text-slate-500" bg="bg-[#111]" />
            <StatCard label="Not Interested" value={data.generic.notInterested.toLocaleString()} icon={XCircle} color="text-slate-400" bg="bg-[#111]" />
            <StatCard label="Wrong Person" value={data.generic.wrongPerson.toLocaleString()} icon={Users} color="text-slate-500" bg="bg-[#111]" />
            <StatCard label="Call Back Req" value={data.generic.callbackRequested.toLocaleString()} icon={PhoneCall} color="text-blue-200" bg="bg-blue-900/20" />
            <StatCard label="Qualified" value={data.generic.qualified.toLocaleString()} icon={CheckCircle} color="text-blue-400" bg="bg-blue-500/10" glow />
            
            <StatCard label="Transferred" value={data.generic.transferred.toLocaleString()} icon={PhoneForwarded} color="text-white" bg="bg-blue-600" glow />
            <StatCard label="Pickup Rate" value={`${data.generic.pickupRate}%`} icon={Activity} color="text-blue-300" bg="bg-[#111]" />
            <StatCard label="Transfer Rate" value={`${data.generic.transferRate}%`} icon={Activity} color="text-blue-400" bg="bg-[#111]" />
            <StatCard label="Not Int. Rate" value={`${data.generic.notInterestedRate}%`} icon={Activity} color="text-slate-400" bg="bg-[#111]" />
          </div>
        </section>

        {/* SECTION 2: AGENT METRICS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-bold text-white tracking-tight">AI Agent Specific Metrics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Hook Engaged" value={data.agent.hookEngaged.toLocaleString()} icon={Users} color="text-slate-300" bg="bg-[#111]" />
            <StatCard label="Intent Engaged" value={data.agent.intentEngaged.toLocaleString()} icon={Users} color="text-blue-300" bg="bg-blue-900/20" />
            <StatCard label="Transfer Engaged" value={data.agent.transferEngaged.toLocaleString()} icon={PhoneForwarded} color="text-blue-400" bg="bg-blue-800/20" glow />
            <StatCard label="Objection Engaged" value={data.agent.objectionEngaged.toLocaleString()} icon={AlertTriangle} color="text-slate-400" bg="bg-[#111]" />
            
            <StatCard label="Hook Rate" value={`${data.agent.hookRate}%`} icon={Activity} color="text-slate-300" bg="bg-[#111]" />
            <StatCard label="Hook -> Intent Rate" value={`${data.agent.hookToIntentRate}%`} icon={Activity} color="text-blue-200" bg="bg-[#111]" />
            <StatCard label="Intent -> Trans. Rate" value={`${data.agent.intentToTransferRate}%`} icon={Activity} color="text-blue-400" bg="bg-blue-900/20" />
            <StatCard label="Trans. Completion" value={`${data.agent.transferCompletionRate}%`} icon={CheckCircle} color="text-white" bg="bg-blue-600/50" glow />
          </div>
        </section>

        {/* TABLES SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* SECTION 3: LEAD REPORT */}
          <section className="xl:col-span-3 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center gap-3 bg-[#050505]">
              <Users className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Lead Report</h2>
            </div>
            <div className="overflow-x-auto max-h-[300px]">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-[#030303] text-slate-400 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Lead Name</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Client</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Total Calls</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Current Status</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Last Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading leads...</td></tr> : 
                    data.leads.map((lead: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#111] transition-colors">
                      <td className="px-6 py-3 font-medium text-white">{lead.full_name || 'Unknown'}</td>
                      <td className="px-6 py-3">{lead.client || '-'}</td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center justify-center px-2 py-0.5 rounded bg-black text-xs font-medium text-blue-300 border border-blue-900/30">
                          {lead.total_calls || 1}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${lead.current_status === 'Qualified' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-[#050505] text-slate-400 border-white/10'}`}>
                          {lead.current_status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-500">{lead.last_call_outcome || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 4: CALL DATA */}
          <section className="xl:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center gap-3 bg-[#050505]">
              <PhoneCall className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Call Data</h2>
            </div>
            <div className="overflow-x-auto h-[400px]">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-[#030303] text-slate-400 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-3 font-semibold tracking-wider">Call ID</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Client</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Duration</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Outcome</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading calls...</td></tr> : 
                    data.calls.map((c: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#111] transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-slate-500">{c.call_id?.substring(0,8) || c.id?.substring(0,8)}</td>
                      <td className="px-6 py-3">{c.client || '-'}</td>
                      <td className="px-6 py-3 text-slate-400">{c.duration_sec || 0}s</td>
                      <td className="px-6 py-3 font-medium text-white">{c.outcome || '-'}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${c.status === 'completed' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800/50 text-slate-400'}`}>
                          {c.status || 'unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 5: PHONE NUMBERS */}
          <section className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center gap-3 bg-[#050505]">
              <Hash className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">Phone Numbers</h2>
            </div>
            <div className="overflow-x-auto h-[400px]">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-[#030303] text-slate-400 sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-3 font-semibold tracking-wider">DID Number</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Calls</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500">Loading numbers...</td></tr> : 
                    data.phoneNumbers.map((p: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#111] transition-colors">
                      <td className="px-6 py-3 font-medium text-white">{p.did_number || p.id}</td>
                      <td className="px-6 py-3 text-blue-200">{p.calls_today || 0}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.status === 'active' ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800/50 text-slate-400'}`}>
                          {p.status || 'Unknown'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

export default App;
