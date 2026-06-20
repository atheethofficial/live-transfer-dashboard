interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (start: Date, end: Date) => void;
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2 bg-[#0a0a0a] border border-white/10 rounded-xl p-1 shadow-inner">
      <input 
        type="date" 
        value={startDate.toISOString().split('T')[0]} 
        onChange={(e) => onChange(new Date(e.target.value), endDate)}
        className="bg-transparent text-sm p-1.5 outline-none text-white font-medium [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.6] hover:text-blue-400 cursor-pointer transition-colors"
      />
      <span className="text-blue-500 font-bold px-1">→</span>
      <input 
        type="date" 
        value={endDate.toISOString().split('T')[0]} 
        onChange={(e) => onChange(startDate, new Date(e.target.value))}
        className="bg-transparent text-sm p-1.5 outline-none text-white font-medium [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.6] hover:text-blue-400 cursor-pointer transition-colors"
      />
    </div>
  );
}
