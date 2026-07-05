"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Edit3, FileUp, ScanLine, MessageSquare, ChevronRight, MapPin, Route as RouteIcon } from 'lucide-react';
import Link from 'next/link';

export default function ScanLandingPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white flex items-center px-4 py-4 border-b border-gray-100 sticky top-0 z-10">
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-lg font-bold text-center mr-6">Tạo tuyến mới</h1>
        <button className="text-gray-400 p-2">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
            <line x1="16" y1="5" x2="22" y2="5" />
            <line x1="19" y1="2" x2="19" y2="8" />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Creation Options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>
          <button className="w-full flex items-center p-4 border-b border-gray-50 active:bg-gray-50 transition-colors" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-3 shrink-0" style={{ backgroundColor: '#eff6ff', color: '#3b82f6', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', marginRight: '12px' }}>
              <Edit3 size={20} />
            </div>
            <span className="flex-1 text-left font-medium text-gray-800" style={{ flex: 1, textAlign: 'left', fontWeight: 500 }}>Nhập thủ công</span>
            <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
          </button>
          
          <button className="w-full flex items-center p-4 border-b border-gray-50 active:bg-gray-50 transition-colors" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mr-3 shrink-0" style={{ backgroundColor: '#fff7ed', color: '#f97316', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', marginRight: '12px' }}>
              <FileUp size={20} />
            </div>
            <span className="flex-1 text-left font-medium text-gray-800" style={{ flex: 1, textAlign: 'left', fontWeight: 500 }}>Import file (Excel, CSV)</span>
            <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
          </button>
          
          <Link href="/driver/scan/camera" className="w-full flex items-center p-4 border-b border-gray-50 active:bg-gray-50 transition-colors text-inherit decoration-none" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-primary mr-3 shrink-0" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', marginRight: '12px' }}>
              <ScanLine size={20} />
            </div>
            <span className="flex-1 text-left font-medium text-gray-800" style={{ flex: 1, textAlign: 'left', fontWeight: 500 }}>Quét đơn hàng (OCR)</span>
            <span className="bg-green-100 text-primary text-xs font-bold px-2 py-0.5 rounded-full mr-2" style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', marginRight: '8px' }}>Mới</span>
            <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
          </Link>
          
          <button className="w-full flex items-center p-4 active:bg-gray-50 transition-colors" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mr-3 shrink-0" style={{ backgroundColor: '#faf5ff', color: '#a855f7', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', marginRight: '12px' }}>
              <MessageSquare size={20} />
            </div>
            <span className="flex-1 text-left font-medium text-gray-800" style={{ flex: 1, textAlign: 'left', fontWeight: 500 }}>Lấy từ tin nhắn</span>
            <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
          </button>
        </div>

        {/* Saved Routes Section */}
        <div style={{ marginTop: '24px' }}>
          <h2 className="text-base font-bold text-gray-800 mb-3 ml-1" style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '12px', marginLeft: '4px' }}>Tuyến đã lưu</h2>
          
          <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Route 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center active:bg-gray-50 transition-colors" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div className="w-12 h-12 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0 mr-4" style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                <RouteIcon size={24} />
              </div>
              <div className="flex-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-gray-800 text-base" style={{ fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>Tuyến sáng 12/05</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1" style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280', marginTop: '4px' }}>
                  <MapPin size={14} className="mr-1" style={{ marginRight: '4px' }} /> 25 điểm giao
                  <span className="mx-2" style={{ margin: '0 8px' }}>•</span> 120 km
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
            </div>

            {/* Route 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center active:bg-gray-50 transition-colors" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', borderRadius: '16px', padding: '16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 mr-4" style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f97316', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px' }}>
                <RouteIcon size={24} />
              </div>
              <div className="flex-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-gray-800 text-base" style={{ fontWeight: 'bold', fontSize: '1rem', margin: 0 }}>Tuyến chiều 11/05</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1" style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem', color: '#6b7280', marginTop: '4px' }}>
                  <MapPin size={14} className="mr-1" style={{ marginRight: '4px' }} /> 18 điểm giao
                  <span className="mx-2" style={{ margin: '0 8px' }}>•</span> 85 km
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-300" style={{ color: '#d1d5db' }} />
            </div>
          </div>
          
          <button className="w-full mt-4 py-3 text-center text-gray-500 font-medium text-sm rounded-xl border border-gray-200 bg-white active:bg-gray-50" style={{ width: '100%', marginTop: '16px', padding: '12px', textAlign: 'center', color: '#6b7280', fontWeight: 500, fontSize: '0.875rem', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
            Xem tất cả
          </button>
        </div>
      </div>
    </div>
  );
}
