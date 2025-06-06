interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-[#666666] mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}% complete</span>
      </div>
      <div className="w-full bg-[#e5e7eb] rounded-full h-3 overflow-hidden">
        <div
          className="bg-[#F25533] h-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}