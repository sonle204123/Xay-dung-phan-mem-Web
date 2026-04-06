import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateUser: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '', role_id: 2 });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://xay-dung-phan-mem-web-hs0s.onrender.com/api/services');
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi tải danh sách người dùng:", error);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://xay-dung-phan-mem-web-hs0s.onrender.com/api/users', formData);
      alert('Đã thêm nhân viên mới vào hệ thống!');
      setFormData({ fullname: '', email: '', password: '', role_id: 2 });
      fetchUsers();
    } catch (error) { alert('Thêm thất bại! Email có thể đã tồn tại.'); }
  };

  const handleDelete = async (id: number) => {
    if(window.confirm("Cảnh báo: Xóa nhân viên này khỏi hệ thống SmileCare?")) {
      try {
        await axios.delete(`https://xay-dung-phan-mem-web-hs0s.onrender.com/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        alert('Lỗi khi xóa nhân viên này.');
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* FORM THÊM NHÂN SỰ */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">
          ➕ Thêm Nhân Sự Mới
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên</label>
            <input 
              type="text" required 
              value={formData.fullname} 
              onChange={e => setFormData({...formData, fullname: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" 
              placeholder="VD: Nguyễn Văn A"
            />
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email đăng nhập</label>
            <input 
              type="email" required 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" 
              placeholder="email@smilecare.com"
            />
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mật khẩu</label>
            <input 
              type="password" required minLength={6}
              value={formData.password} 
              onChange={e => setFormData({...formData, password: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" 
              placeholder="Ít nhất 6 ký tự"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Vai trò</label>
            <select 
              value={formData.role_id} 
              onChange={e => setFormData({...formData, role_id: Number(e.target.value)})} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value={1}>Admin</option>
              <option value={2}>Bác sĩ</option>
              <option value={3}>Lễ tân</option>
            </select>
          </div>
          
          <div className="md:col-span-1">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-2 rounded-xl transition-colors w-full shadow-md">
              Thêm
            </button>
          </div>
        </form>
      </div>

      {/* BẢNG NHÂN SỰ */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6">👥 Danh sách nhân sự hệ thống</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-4 font-semibold">Họ và tên</th>
                <th className="p-4 font-semibold">Tài khoản Email</th>
                <th className="p-4 font-semibold">Phân quyền</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map(u => (
                <tr key={u.user_id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-800">{u.fullname}</td>
                  <td className="p-4 text-slate-600 font-medium">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      u.role_id === 1 ? 'bg-red-100 text-red-700' : 
                      u.role_id === 2 ? 'bg-blue-100 text-blue-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {u.role_id === 1 ? 'Quản trị viên' : u.role_id === 2 ? 'Bác sĩ' : 'Lễ tân'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleDelete(u.user_id)} 
                      className="text-red-500 hover:text-red-700 font-bold transition-colors"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-6 text-center text-slate-500">Chưa có dữ liệu nhân viên.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;