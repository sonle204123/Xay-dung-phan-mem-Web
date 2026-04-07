import React, { useState, useEffect } from 'react';
import api from '../Config/api'; // Đường dẫn có thể là ../utils/api tùy bạn đặt

const ServiceForm: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]); // Kho chứa danh mục
  
  // Thêm category_id vào formData, mặc định là 1
  const [formData, setFormData] = useState({ 
    category_id: 1, 
    name: '', 
    description: '', 
    min_price: '', 
    status: 'Active' 
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Lấy cả 2 dữ liệu: Dịch vụ và Danh mục cùng lúc
  const fetchData = async () => {
    try {
      const [resServices, resCategories] = await Promise.all([
        api.get('/services'),
        api.get('/categories')
      ]);
      setServices(resServices.data);
      setCategories(resCategories.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu:", error);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Hiện loading nhẹ hoặc log để kiểm tra Token trước khi gửi
      console.log("Token hiện tại trong máy:", localStorage.getItem("token"));

      if (editingId) {
        await api.put(`/services/${editingId}`, formData); 
        alert("Đã cập nhật dịch vụ thành công!");
      } else {
        await api.post('/services', formData);
        alert("Đã thêm dịch vụ mới thành công!");
      }

      // CHỈ RESET KHI THÀNH CÔNG
      setEditingId(null);
      setFormData({ 
        category_id: categories.length > 0 ? categories[0].category_id : 1, 
        name: '', 
        description: '', 
        min_price: '', 
        status: 'Active' 
      });
      fetchData();
      
    } catch (err: any) { 
      console.error("Chi tiết lỗi API:", err.response); // Xem lỗi thật ở Console

      if (err.response?.status === 401) {
        alert("Lỗi 401: Thẻ bài (Token) không hợp lệ hoặc đã hết hạn. Hãy Đăng xuất và Đăng nhập lại!");
      } else if (err.response?.status === 403) {
        alert("Lỗi 403: Bạn đã đăng nhập, nhưng tài khoản này không có quyền Admin!");
      } else {
        alert(`Lỗi ${err.response?.status || 'mạng'}: Không thể lưu dữ liệu. Hãy kiểm tra kết nối!`); 
      }
    }
  };
  const handleEdit = (item: any) => {
    setEditingId(item.service_id);
    setFormData({
      category_id: item.category?.category_id || 1, // Lấy ID danh mục từ dữ liệu cũ
      name: item.name,
      description: item.description || '',
      min_price: item.min_price,
      status: item.status || 'Active'
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ SmileCare này không?")) {
      try {
        await api.delete(`/services/${id}`);
        fetchData();
      } catch (err: any) {
        if (err.response?.status === 401) {
          alert("Lỗi: Bạn cần có tài khoản Admin để xóa!");
        } else {
          alert("Lỗi khi xóa dịch vụ.");
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* KHU VỰC FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          {editingId ? "📝 Chỉnh sửa thông tin dịch vụ" : "➕ Thêm dịch vụ mới"}
        </h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          {/* CỘT 1: CHỌN DANH MỤC */}
          <div className="flex-1 w-full md:w-1/4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Danh mục</label>
            <select 
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: Number(e.target.value)})}
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 w-full md:w-1/2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tên dịch vụ</label>
            <input 
              type="text" required 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" 
              placeholder="VD: Nhổ răng..."
            />
          </div>
          
          <div className="flex-1 w-full md:w-1/4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mức giá</label>
            <input 
              type="number" required 
              value={formData.min_price} 
              onChange={(e) => setFormData({...formData, min_price: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" 
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0">
            <button type="submit" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md">
              {editingId ? "Cập nhật" : "Lưu"}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {setEditingId(null); setFormData({category_id: 1, name:'', description:'', min_price:'', status:'Active'})}} 
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-4 rounded-xl"
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* KHU VỰC BẢNG DỮ LIỆU */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Danh sách dịch vụ</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-4 font-semibold">Tên dịch vụ</th>
                <th className="p-4 font-semibold">Danh mục</th>
                <th className="p-4 font-semibold">Giá (VNĐ)</th>
                <th className="p-4 font-semibold text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {services.length > 0 ? services.map(item => (
                <tr key={item.service_id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-800">{item.name}</td>
                  {/* Lấy tên danh mục từ object con (nếu có) */}
                  <td className="p-4 text-slate-600">{item.category?.name || 'N/A'}</td>
                  <td className="p-4 text-blue-700 font-bold">{Number(item.min_price).toLocaleString('vi-VN')}đ</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(item)} className="text-blue-600 font-bold mr-4">Sửa</button>
                    <button onClick={() => handleDelete(item.service_id)} className="text-red-500 font-bold">Xóa</button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-6 text-center">Chưa có dữ liệu.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;