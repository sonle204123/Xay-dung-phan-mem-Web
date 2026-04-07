import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import api from '../Config/api'; 

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  // 1. LẤY DANH SÁCH DANH MỤC
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách danh mục:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. THÊM / SỬA DANH MỤC
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, formData);
        alert("Đã cập nhật danh mục thành công!");
      } else {
        await api.post('/categories', formData);
        alert("Đã thêm danh mục mới!");
      }
      setFormData({ name: '', description: '' });
      setEditingId(null);
      fetchCategories();
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        alert("Lỗi: Bạn cần đăng nhập bằng tài khoản Admin để thực hiện thao tác này!");
      } else {
        alert("Có lỗi xảy ra khi lưu danh mục!");
      }
    }
  };

  // 3. ĐƯA DỮ LIỆU LÊN FORM ĐỂ SỬA
  const handleEdit = (item: any) => {
    setEditingId(item.category_id);
    setFormData({
      name: item.name,
      description: item.description || ''
    });
  };

  // 4. XÓA DANH MỤC
  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này? Các dịch vụ thuộc danh mục này có thể bị ảnh hưởng.")) {
      try {
        await api.delete(`/categories/${id}`);
        fetchCategories();
      } catch (err: any) {
        if (err.response?.status === 500) {
          alert("Không thể xóa! Danh mục này đang chứa các dịch vụ bên trong. Hãy xóa dịch vụ trước.");
        } else {
          alert("Lỗi khi xóa danh mục.");
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* FORM NHẬP LIỆU */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Icon icon={editingId ? "mdi:pencil" : "mdi:plus-circle"} width="24" className="text-orange-500" />
          {editingId ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
        </h3>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tên danh mục</label>
            <input 
              type="text" required 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50" 
              placeholder="VD: Răng sứ thẩm mỹ..."
            />
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Mô tả ngắn</label>
            <input 
              type="text" 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50" 
              placeholder="Nhập mô tả (không bắt buộc)"
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto md:mt-7">
            <button type="submit" className="flex-1 md:flex-none bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md">
              {editingId ? "Cập nhật" : "Lưu"}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={() => {setEditingId(null); setFormData({name: '', description: ''})}} 
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl transition-colors"
              >
                Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Icon icon="mdi:format-list-bulleted" width="24" className="text-blue-600" />
          Danh sách Danh mục hiện có
        </h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-4 font-semibold w-16 text-center">ID</th>
                <th className="p-4 font-semibold w-1/3">Tên Danh mục</th>
                <th className="p-4 font-semibold">Mô tả</th>
                <th className="p-4 font-semibold text-right">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? categories.map(item => (
                <tr key={item.category_id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500 font-medium text-center">{item.category_id}</td>
                  <td className="p-4 font-bold text-slate-800">{item.name}</td>
                  <td className="p-4 text-slate-600">{item.description || <span className="italic text-slate-400">Không có</span>}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="text-blue-600 hover:text-blue-800 font-bold mr-4 px-2 flex items-center gap-1 inline-flex"
                    >
                      <Icon icon="mdi:pencil-outline" /> Sửa
                    </button>
                    <button 
                      onClick={() => handleDelete(item.category_id)} 
                      className="text-red-500 hover:text-red-700 font-bold px-2 flex items-center gap-1 inline-flex"
                    >
                      <Icon icon="mdi:trash-can-outline" /> Xóa
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500 italic">Chưa có dữ liệu danh mục nào.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;