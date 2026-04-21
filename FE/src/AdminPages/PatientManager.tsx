import React, { useState, useEffect } from 'react';
import api from '../Config/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PatientManager: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const userInfoStr = localStorage.getItem('userInfo');
  const user = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userRole = user?.role_id || 0;

  const validationSchema = Yup.object({
    fullname: Yup.string()
      .min(2, 'Tên quá ngắn')
      .max(50, 'Tên quá dài')
      .required('Họ tên không được để trống'),
    contact_number: Yup.string()
      .matches(/^[0-9]+$/, 'Số điện thoại chỉ được chứa số')
      .min(10, 'Số điện thoại phải có ít nhất 10 số')
      .max(12, 'Số điện thoại quá dài')
      .required('Số điện thoại không được để trống'),
    gender: Yup.string().required('Vui lòng chọn giới tính'),
    address: Yup.string().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      contact_number: '',
      gender: 'Nam',
      address: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        if (editingId) {
          await api.put(`/customers/${editingId}`, values);
          alert('Cập nhật hồ sơ thành công!');
        } else {
          await api.post('/customers', values);
          alert('Đã tạo hồ sơ mới thành công!');
        }
        handleCancel();
        fetchPatients();
      } catch (error) {
        alert('Thao tác thất bại. Vui lòng kiểm tra lại!');
      }
    },
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get('/customers');
      setPatients(res.data);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    }
  };

  // --- HÀM XÓA MỚI THÊM VÀO ---
  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hồ sơ bệnh nhân này không?')) {
      try {
        await api.delete(`/customers/${id}`);
        alert('Xóa hồ sơ thành công!');
        fetchPatients(); // Load lại danh sách sau khi xóa
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        alert('Xóa thất bại. Vui lòng kiểm tra lại backend!');
      }
    }
  };

  const handleEdit = (patient: any) => {
    setEditingId(patient.customer_id);
    formik.setValues({
      fullname: patient.fullname,
      contact_number: patient.contact_number,
      gender: patient.gender,
      address: patient.address || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    formik.resetForm();
  };

  return (
    <div className="space-y-8">
      {/* FORM QUẢN LÝ */}
      {(userRole === 2 || userRole === 3 || userRole === 1) && (
        <div className={`p-8 rounded-2xl shadow-sm border transition-all ${editingId ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-100'}`}>
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            {editingId ? '✏️ Đang sửa hồ sơ' : '📝 Tạo hồ sơ mới'}
          </h3>
          
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên</label>
              <input
                type="text"
                {...formik.getFieldProps('fullname')}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white ${formik.touched.fullname && formik.errors.fullname ? 'border-red-500' : 'border-slate-300'}`}
                placeholder="Nguyễn Văn A"
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <div className="text-red-500 text-xs mt-1 font-medium">{formik.errors.fullname}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại</label>
              <input
                type="text"
                {...formik.getFieldProps('contact_number')}
                className={`w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white ${formik.touched.contact_number && formik.errors.contact_number ? 'border-red-500' : 'border-slate-300'}`}
                placeholder="090123..."
              />
              {formik.touched.contact_number && formik.errors.contact_number && (
                <div className="text-red-500 text-xs mt-1 font-medium">{formik.errors.contact_number}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Giới tính</label>
              <select
                {...formik.getFieldProps('gender')}
                className="w-full p-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className="flex gap-2 self-end">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`flex-1 font-bold py-3 px-4 rounded-xl transition-colors shadow-md text-white ${editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {editingId ? 'Cập nhật' : 'Tạo hồ sơ'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
                >
                  Hủy
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* DANH SÁCH BỆNH NHÂN */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6">👥 Danh sách Hồ sơ Bệnh nhân</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-4 font-semibold">Mã HS</th>
                <th className="p-4 font-semibold">Họ Tên</th>
                <th className="p-4 font-semibold">Số điện thoại</th>
                <th className="p-4 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.customer_id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-500">#{p.customer_id}</td>
                  <td className="p-4 font-bold text-slate-800">{p.fullname}</td>
                  <td className="p-4 text-slate-600">{p.contact_number}</td>
                  <td className="p-4 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-indigo-100 text-indigo-700 hover:bg-indigo-600 hover:text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
                    >
                      Sửa
                    </button>
                    
                    {/* NÚT XÓA MỚI THÊM */}
                    <button
                      onClick={() => handleDelete(p.customer_id)}
                      className="bg-red-100 text-red-700 hover:bg-red-600 hover:text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all"
                    >
                      Xóa
                    </button>

                    {userRole === 2 && (
                      <button className="bg-green-100 text-green-700 hover:bg-green-600 hover:text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all">
                        Khám
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientManager;