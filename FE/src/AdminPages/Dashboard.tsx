import React, { useState, useEffect } from 'react';
import api from '../Config/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    unpaidCount: 0,
    paidCount: 0,
    totalPatients: 0 // Sẽ lấy từ API customers nếu có
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Chỉ gọi API invoice trước để test dữ liệu bạn vừa gửi
        const resInvoices = await api.get('/invoice');
        
        // Trích xuất mảng data
        const invoices = resInvoices.data?.status === 'success' ? resInvoices.data.data : [];

        let revenue = 0;
        let unpaid = 0;
        let paid = 0;

        // Bắt đầu vòng lặp tính toán dựa trên JSON thực tế
        invoices.forEach((inv: any) => {
          // 1. Ép kiểu chuỗi "500000.00" thành số 500000
          const price = parseFloat(inv.total_price || "0");
          
          // 2. Ép kiểu chữ thường để tránh lỗi "Paid" vs "unpaid"
          const status = (inv.status || "").toLowerCase();

          if (status === 'paid') {
            revenue += price;
            paid += 1;
          } else if (status === 'unpaid') {
            unpaid += 1;
          }
        });

        // Cập nhật State
        setStats(prev => ({
          ...prev,
          totalRevenue: revenue,
          unpaidCount: unpaid,
          paidCount: paid
        }));

      } catch (error) {
        console.error("Lỗi tải dữ liệu Dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-blue-600 font-bold">Đang tổng hợp số liệu...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">📊 Tổng quan hệ thống</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* THẺ DOANH THU */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl shadow-lg text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-blue-100 text-sm font-bold tracking-wider">TỔNG DOANH THU</h3>
            <span className="bg-white/20 p-2 rounded-lg text-xl">💰</span>
          </div>
          <p className="text-4xl font-black">
            {stats.totalRevenue.toLocaleString()} <span className="text-xl font-medium">VNĐ</span>
          </p>
          <p className="text-blue-100 text-sm mt-3 flex items-center gap-2">
            <span>Đã thu từ {stats.paidCount} hóa đơn</span>
          </p>
        </div>

        {/* THẺ CÔNG NỢ (UNPAID) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-amber-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-bold tracking-wider">HÓA ĐƠN CHƯA THU</h3>
            <span className="bg-amber-100 text-amber-600 p-2 rounded-lg text-xl">⏳</span>
          </div>
          <p className="text-4xl font-black text-slate-800">
            {stats.unpaidCount}
          </p>
          <p className="text-slate-500 text-sm mt-3">
            Cần nhắc nhở thanh toán
          </p>
        </div>

        {/* THẺ HÓA ĐƠN HOÀN TẤT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-500 text-sm font-bold tracking-wider">HÓA ĐƠN ĐÃ THU</h3>
            <span className="bg-emerald-100 text-emerald-600 p-2 rounded-lg text-xl">✅</span>
          </div>
          <p className="text-4xl font-black text-slate-800">
            {stats.paidCount}
          </p>
          <p className="text-slate-500 text-sm mt-3">
            Thanh toán thành công
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;