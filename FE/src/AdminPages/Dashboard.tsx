import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Thống kê tổng quát</h2>
      <p className="text-slate-600 mb-8 text-lg">Chào mừng bạn đến với hệ thống quản trị SmileCare.</p>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg text-blue-800">
        <p className="font-medium">
          <span className="font-bold">Lưu ý:</span> Dữ liệu biểu đồ thống kê doanh thu và lượt khám sẽ được cập nhật ở giai đoạn tiếp theo của hệ thống.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;