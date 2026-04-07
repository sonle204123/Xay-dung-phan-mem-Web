import { Icon } from "@iconify/react";

interface LoadingProps {
  message?: string;
}

const LoadingOverlay: React.FC<LoadingProps> = ({ message = "Đang tải dữ liệu..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Đúng Icon và màu bạn yêu cầu */}
        <Icon 
          icon="line-md:loading-alt-loop" 
          width="60" 
          height="60" 
          style={{ color: '#991313' }} 
        />
        <p className="text-[#991313] font-medium animate-pulse">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;