import React, { useState } from 'react';
import { AppState } from '../types';
import { X, Copy, Download, Upload, Check, AlertCircle } from 'lucide-react';
import { downloadFile } from '../utils/exporter';

interface JsonStateModalProps {
  state: AppState;
  onClose: () => void;
  onImportState: (newState: AppState) => void;
}

export const JsonStateModal: React.FC<JsonStateModalProps> = ({ state, onClose, onImportState }) => {
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [isImportMode, setIsImportMode] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const jsonString = JSON.stringify(state, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadFile(jsonString, `EdTech_State_${state.khbd.header.subjectName}.json`, 'application/json');
  };

  const handleExecuteImport = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importText);
      if (!parsed.khbd || !parsed.exam || !parsed.slides) {
        throw new Error('Dữ liệu JSON không đúng cấu trúc (thiếu khbd, exam hoặc slides)');
      }
      onImportState(parsed);
      onClose();
    } catch (err: any) {
      setImportError(err.message || 'Lỗi cú pháp JSON không hợp lệ');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">Quản Lý Trạng Thái Phiên Làm Việc (JSON State)</h3>
            <p className="text-xs text-slate-500">Bàn giao, lưu trữ và khôi phục toàn vẹn dữ liệu sư phạm</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Tabs */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-2 text-xs bg-white">
          <button
            onClick={() => setIsImportMode(false)}
            className={`px-3 py-1.5 rounded font-bold transition-all ${
              !isImportMode ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Xuất / Sao chép JSON hiện tại
          </button>
          <button
            onClick={() => setIsImportMode(true)}
            className={`px-3 py-1.5 rounded font-bold transition-all ${
              isImportMode ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Nhập (Import) JSON phiên trước
          </button>
        </div>

        {/* Content body */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs">
          {!isImportMode ? (
            <textarea
              readOnly
              value={jsonString}
              className="w-full h-80 p-3 bg-slate-900 text-emerald-400 rounded-lg outline-none font-mono text-xs leading-relaxed"
            />
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-slate-600">
                Dán khối JSON State đã lưu từ phiên làm việc trước vào ô bên dưới:
              </div>
              <textarea
                rows={12}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Dán mã JSON tại đây..."
                className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none font-mono text-xs focus:ring-1 focus:ring-blue-500"
              />
              {importError && (
                <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          {!isImportMode ? (
            <>
              <div className="text-slate-400 text-[11px]">
                Phiên bản: {state.version} · Cập nhật: {new Date(state.lastUpdated).toLocaleDateString('vi-VN')}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải File .json</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép!' : 'Sao chép JSON'}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-end w-full gap-2">
              <button
                onClick={() => setIsImportMode(false)}
                className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg"
              >
                Hủy
              </button>
              <button
                onClick={handleExecuteImport}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Nạp Dữ Liệu Ngay</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
