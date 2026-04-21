import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface InvoiceData {
  invoice_id: number;
  total_price: string;
  method_payment: string;
  status: string;
  createdAt: string;
  user: {
    fullname: string;
  };
  history: {
    date: string;
    noted: string;
  };
}

const Invoice: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null); // Trạng thái đợi khi đang bấm nút

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://xay-dung-phan-mem-web-hs0s.onrender.com/invoice');
      if (response.data.status === 'success') {
        setInvoices(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- HÀM CẬP NHẬT TRẠNG THÁI THANH TOÁN ---
  const handleUpdateStatus = async (id: number) => {
    if (!window.confirm("Xác nhận bệnh nhân đã thanh toán hóa đơn này?")) return;

    setUpdatingId(id);
    try {
      // Gọi đúng Route: PUT /invoice/{id}/pay
      const response = await axios.put(`https://xay-dung-phan-mem-web-hs0s.onrender.com/invoice/${id}/pay`);
      
      if (response.data.status === 'success') {
        alert("Cập nhật trạng thái thanh toán thành công!");
        // Tải lại danh sách để thấy thay đổi
        fetchInvoices();
      }
    } catch (error: any) {
      console.error("Lỗi cập nhật:", error);
      alert(error.response?.data?.message || "Không thể cập nhật trạng thái thanh toán.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quản lý Hóa đơn & Doanh thu</h2>
          <p className="text-sm text-slate-500">Danh sách các hóa đơn thanh toán từ bệnh nhân</p>
        </div>
        <button 
          onClick={fetchInvoices}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <span>🔄</span> Làm mới
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
              <th className="px-6 py-4">Mã HD</th>
              <th className="px-6 py-4">Ngày khám</th>
              <th className="px-6 py-4">Bác sĩ/Nhân viên</th>
              <th className="px-6 py-4">Ghi chú</th>
              <th className="px-6 py-4">Tổng tiền</th>
              <th className="px-6 py-4 text-center">Trạng thái</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr><td colSpan={7} className="text-center py-10 text-slate-400">Đang tải dữ liệu...</td></tr>
            ) : invoices.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-10 text-slate-400">Chưa có hóa đơn nào được tạo.</td></tr>
            ) : (
              invoices.map((item) => (
                <tr key={item.invoice_id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-blue-600 text-sm">#INV-{item.invoice_id}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{formatDate(item.history.date)}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{item.user.fullname}</td>
                  <td className="px-6 py-4 text-slate-500 italic text-xs max-w-[200px] truncate">{item.history.noted}</td>
                  <td className="px-6 py-4 font-black text-slate-900">{formatCurrency(item.total_price)}</td>
                  
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      item.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status === 'Paid' ? 'Đã thanh toán' : 'Chờ xử lý'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.status !== 'Paid' ? (
                      <button 
                        onClick={() => handleUpdateStatus(item.invoice_id)}
                        disabled={updatingId === item.invoice_id}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                          updatingId === item.invoice_id 
                          ? 'bg-slate-300 text-white cursor-not-allowed' 
                          : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
                        }`}
                      >
                        {updatingId === item.invoice_id ? 'Đang lưu...' : '💰 Thu tiền'}
                      </button>
                    ) : (
                      <span className="text-green-500 text-xl">✔️</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoice;