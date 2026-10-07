import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  User, 
  Building2, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  Save, 
  Cloud, 
  CheckCircle2, 
  Mail, 
  Phone, 
  FileText,
  RotateCcw
} from 'lucide-react';
import { TeacherProfile } from '../types';

interface SettingsModalProps {
  profile: TeacherProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (updated: TeacherProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  profile,
  isOpen,
  onClose,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<TeacherProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof TeacherProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleResetToDefault = () => {
    const defaultData: TeacherProfile = {
      fullName: 'Nguyễn Thị Duyên Thanh',
      subject: 'Âm Nhạc',
      schoolName: 'Trường THCS Long Hồ',
      departmentName: 'Tổ Nghệ Thuật (Âm Nhạc - Mỹ Thuật)',
      defaultGrade: 'LỚP 6',
      defaultTextbook: 'Kết Nối Tri Thức',
      academicYear: '2024 - 2025',
      email: 'duyenthanh.thcslongho@edu.vn',
      phoneNumber: '0988.668.789',
      notes: 'Giáo viên bộ môn Âm Nhạc bậc THCS. Giảng dạy theo chương trình GDPT 2018 định hướng phát triển thẩm mỹ âm nhạc.'
    };
    setFormData(defaultData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Settings className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                Cài Đặt Hồ Sơ Giáo Viên & Đơn Vị
              </h2>
              <p className="text-xs text-blue-300">
                Thông tin được tự động đồng bộ vào toàn bộ KHBD 5512, Slide 16:9 và Đề thi 7991
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Đã lưu thành công và cập nhật toàn bộ hồ sơ giáo án!</span>
            </div>
          )}

          {/* Nhóm 1: Thông tin cá nhân & chuyên môn */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>1. Thông tin cá nhân giáo viên</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Họ và tên Giáo viên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Ví dụ: Nguyễn Thị Duyên Thanh"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Môn học phụ trách <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  placeholder="Ví dụ: Âm Nhạc, Toán Học, Ngữ Văn..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email liên hệ
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="duyenthanh.thcslongho@edu.vn"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    placeholder="0912.xxx.xxx"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Nhóm 2: Đơn vị trường học & tổ bộ môn */}
          <div className="space-y-3 pt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>2. Cơ quan công tác & Chuyên môn</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Trường học / Đơn vị <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.schoolName}
                  onChange={(e) => handleChange('schoolName', e.target.value)}
                  placeholder="Ví dụ: Trường THCS Long Hồ"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tổ chuyên môn
                </label>
                <input
                  type="text"
                  value={formData.departmentName}
                  onChange={(e) => handleChange('departmentName', e.target.value)}
                  placeholder="Ví dụ: Tổ Nghệ Thuật (Âm Nhạc - Mỹ Thuật)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Khối lớp mặc định
                </label>
                <select
                  value={formData.defaultGrade}
                  onChange={(e) => handleChange('defaultGrade', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 font-medium"
                >
                  <option value="LỚP 6">LỚP 6 (THCS)</option>
                  <option value="LỚP 7">LỚP 7 (THCS)</option>
                  <option value="LỚP 8">LỚP 8 (THCS)</option>
                  <option value="LỚP 9">LỚP 9 (THCS)</option>
                  <option value="LỚP 10">LỚP 10 (THPT)</option>
                  <option value="LỚP 11">LỚP 11 (THPT)</option>
                  <option value="LỚP 12">LỚP 12 (THPT)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Bộ sách chuẩn quốc gia
                </label>
                <div className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-slate-800 font-bold text-xs flex items-center gap-1.5 cursor-not-allowed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Kết Nối Tri Thức với Cuộc Sống</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Năm học
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => handleChange('academicYear', e.target.value)}
                  placeholder="2024 - 2025"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Ghi chú sư phạm & Định hướng giảng dạy
              </label>
              <textarea
                rows={2}
                value={formData.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Ví dụ: Giảng dạy theo tinh thần Chương trình GDPT 2018 phát triển năng lực phẩm chất học sinh..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Trạng thái Cloud Storage */}
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Cloud className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 text-xs">Lưu trữ Đám mây (Cloud Storage)</div>
                <div className="text-[11px] text-slate-600">
                  Tự động đồng bộ và bảo lưu mọi tài liệu SGK/SGV/SBT, KHBD và Slide trên hệ thống
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full border border-emerald-200">
              ĐANG HOẠT ĐỘNG
            </span>
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nạp mẫu: Cô Nguyễn Thị Duyên Thanh (Âm Nhạc)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Cài Đặt Hồ Sơ</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
