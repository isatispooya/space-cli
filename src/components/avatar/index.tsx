interface AvatarProps {
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ className }) => {
  return (
    <div className={`w-10 h-10 rounded-full bg-gray-200 ${className}`}>
      {/* Avatar content */}
    </div>
  );
};

export default Avatar; 