interface BadgeProps {
    text: string;
  }
  
  export const CardBadge = ({ text }: BadgeProps) => (
    <div className="absolute top-4 left-4 z-10">
      <span className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full">
        {text}
      </span>
    </div>
  );