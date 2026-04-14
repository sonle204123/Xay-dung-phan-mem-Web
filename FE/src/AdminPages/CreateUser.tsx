import React, { useState, useEffect } from 'react';
import api from '../Config/api'; // Đảm bảo đường dẫn này đúng với file api.ts của bạn

const CreateUser: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '', role_id: 2 });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. HÀM LẤY DANH SÁCH NHÂN VIÊN (Đã sửa theo cấu trúc res.data.data)
  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      // Backend của bạn trả về { status: "success", data: [...] }
      if (res.data && res.data.status === "success") {
        setUsers(res.data.data); 
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Lỗi tải danh sách nhân sự:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 2. HÀM XỬ LÝ LƯU (THÊM MỚI HOẶC CẬP NHẬT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        // Chế độ Sửa (PUT)
        const payload = { ...formData };
        if (!payload.password) delete (payload as any).password; // Giữ pass cũ nếu để trống

        await api.put(`/users/${editingId}`, payload);
        alert('Cập nhật thông tin thành công!');
      } else {
        // Chế độ Thêm mới (POST)
        if (!formData.password) {
          alert("Vui lòng nhập mật khẩu!");
          setLoading(false);
          return;
        }
        await api.post('/users', formData);
        alert('Thêm nhân viên mới thành công!');
      }

      // Reset form
      setFormData({ fullname: '', email: '', password: '', role_id: 2 });
      setEditingId(null);
      fetchUsers();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Thao tác thất bại, vui lòng kiểm tra lại!');
    } finally {
      setLoading(false);
    }
  };

  // 3. HÀM CHỌN NHÂN VIÊN ĐỂ SỬA
  const handleEdit = (user: any) => {
    setEditingId(user.user_id);
    setFormData({
      fullname: user.fullname,
      email: user.email,
      password: '', // Để trống pass khi sửa
      role_id: user.role_id
    });
    // Cuộn lên đầu trang để admin thấy form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 4. HÀM XÓA NHÂN VIÊN
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này khỏi hệ thống SmileCare?")) {
      try {
        await api.delete(`/users/${id}`);
        alert('Xóa thành công!');
        fetchUsers();
      } catch (error) {
        alert('Lỗi khi xóa nhân viên!');
      }
    }
  };

  return (
    <div className="space-y-8 p-2">
      {/* KHỐI 1: FORM NHẬP LIỆU */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all">
        <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
          {editingId ? "📝 Chỉnh sửa nhân sự" : "➕ Thêm nhân sự mới"}
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-blue-600">Họ tên</label>
            <input 
              type="text" required 
              value={formData.fullname} 
              onChange={e => setFormData({...formData, fullname: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" 
              placeholder="Nguyễn Văn A"
            />
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-blue-600">Email</label>
            <input 
              type="email" required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" 
              placeholder="name@smilecare.com"
            />
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-blue-600">
              {editingId ? "Mật khẩu mới (Để trống nếu giữ nguyên)" : "Mật khẩu"}
            </label>
            <input 
              type="password" 
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50" 
              placeholder="Ít nhất 6 ký tự"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2 text-blue-600">Vai trò</label>
            <select 
              value={formData.role_id} 
              onChange={e => setFormData({...formData, role_id: Number(e.target.value)})} 
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white outline-none"
            >
              <option value={1}>Quản trị viên</option>
              <option value={2}>Bác sĩ</option>
              <option value={3}>Lễ tân</option>
            </select>
          </div>
          
          <div className="md:col-span-1 flex flex-col gap-2">
            <button 
              type="submit" 
              disabled={loading}
              className={`text-white font-bold py-3 px-2 rounded-xl shadow-md transition-all ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? "..." : (editingId ? "Cập nhật" : "Thêm")}
            </button>
            {editingId && (
              <button 
                type="button"
                onClick={() => { setEditingId(null); setFormData({ fullname: '', email: '', password: '', role_id: 2 }); }}
                className="text-xs text-slate-500 hover:underline font-bold"
              >
                Hủy bỏ
              </button>
            )}
          </div>
        </form>
      </div>

      {/* KHỐI 2: BẢNG DANH SÁCH */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          👥 Danh sách nhân sự hệ thống
          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">{users.length} người</span>
        </h3>
        
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <th className="p-4 font-bold uppercase text-xs tracking-wider">Nhân viên</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider">Tài khoản</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider">Vai trò</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map((u) => (
                <tr key={u.user_id} className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{u.fullname}</div>
                    <div className="text-[10px] text-slate-400 font-mono">ID: #{u.user_id}</div>
                  </td>
                  <td className="p-4 text-slate-600 font-medium">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      u.role_id === 1 ? 'bg-red-100 text-red-600' : 
                      u.role_id === 2 ? 'bg-blue-100 text-blue-600' : 
                      'bg-green-100 text-green-600'
                    }`}>
                      {u.role_id === 1 ? 'Admin' : u.role_id === 2 ? 'Bác sĩ' : 'Lễ tân'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleEdit(u)} 
                      className="text-blue-500 hover:text-blue-700 font-bold mr-4 text-sm"
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDelete(u.user_id)} 
                      className="text-red-400 hover:text-red-600 font-bold text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="text-4xl mb-2">🔍</div>
                    <div className="text-slate-400 font-medium italic">Chưa có dữ liệu nhân sự nào được tìm thấy.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;