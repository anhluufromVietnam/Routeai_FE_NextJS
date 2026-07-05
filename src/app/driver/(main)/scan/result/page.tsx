"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Plus, Check } from 'lucide-react';

export default function ScanResultPage() {
  const router = useRouter();
  
  const [items, setItems] = useState([
    { id: 1, name: 'Nguyễn Thị Lan', phone: '0909 123 456', address: '72 Nguyễn Trãi, P. Bến Thành, Q.1, TP.HCM', checked: true },
    { id: 2, name: 'Trần Văn An', phone: '0934 567 890', address: '15 Phan Đăng Lưu, P.3, Q. Phú Nhuận', checked: true },
    { id: 3, name: 'Lê Hoàng Nam', phone: '0987 654 321', address: '88 Cách Mạng Tháng 8, P.6, Q.3', checked: true },
  ]);

  const toggleCheck = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const selectedCount = items.filter(i => i.checked).length;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white flex items-center px-4 py-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6', position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-lg font-bold text-center mr-6">Kết quả nhận diện</h1>
      </div>

      <div className="flex-1 p-4" style={{ flex: 1, padding: '16px' }}>
        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-3" style={{ backgroundColor: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div className="flex-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-gray-800 text-base" style={{ fontWeight: 'bold', color: '#1f2937', margin: 0, marginBottom: '4px' }}>{item.name}</h3>
                <p className="text-gray-600 text-sm font-medium mb-1" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 500, margin: 0, marginBottom: '4px' }}>{item.phone}</p>
                <p className="text-gray-500 text-sm" style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0, lineHeight: 1.4 }}>{item.address}</p>
              </div>
              <button 
                onClick={() => toggleCheck(item.id)}
                className={`w-6 h-6 rounded flex items-center justify-center shrink-0 mt-1 transition-colors ${item.checked ? 'bg-primary text-white' : 'border-2 border-gray-300 bg-white'}`}
                style={{ 
                  width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '4px',
                  backgroundColor: item.checked ? 'var(--color-primary)' : 'white',
                  border: item.checked ? 'none' : '2px solid #d1d5db',
                  color: 'white'
                }}
              >
                {item.checked && <Check size={16} strokeWidth={3} />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-white p-4 border-t border-gray-100 flex gap-3 z-20" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: '480px', margin: '0 auto', backgroundColor: 'white', padding: '16px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '12px', zIndex: 20 }}>
        <button className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold flex items-center justify-center gap-2" style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '2px solid #e5e7eb', color: '#374151', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: 'white' }}>
          <Plus size={20} />
          Thêm điểm
        </button>
        <button 
          onClick={() => router.push('/driver/scan/list')}
          className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold flex items-center justify-center"
          style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
        >
          Xác nhận ({selectedCount})
        </button>
      </div>
    </div>
  );
}
