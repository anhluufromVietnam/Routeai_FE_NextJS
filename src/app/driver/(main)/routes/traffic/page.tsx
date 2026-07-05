"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, AlertTriangle } from 'lucide-react';

export default function TrafficPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col relative h-[100dvh] overflow-hidden">
      {/* Header overlaid on map */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20 flex items-center bg-white shadow-sm" style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px', zIndex: 20, display: 'flex', alignItems: 'center', backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-700">
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-lg font-bold text-center mr-6">Tình trạng giao thông</h1>
      </div>

      {/* Map Background (Mockup) */}
      <div className="flex-1 bg-gray-200 relative overflow-hidden mt-[60px]" style={{ flex: 1, backgroundColor: '#e5e7eb', position: 'relative', overflow: 'hidden', marginTop: '60px' }}>
        {/* Simple map grid lines */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#d1d5db 1px, transparent 1px), linear-gradient(90deg, #d1d5db 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }}></div>
        
        {/* Mock Traffic Paths */}
        <svg className="absolute inset-0 w-full h-full" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}>
          {/* Main Route */}
          {/* Green section */}
          <path d="M50,400 L120,320 L150,250" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Yellow section */}
          <path d="M150,250 L200,180" fill="none" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Red section */}
          <path d="M200,180 L250,120 L300,150" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          {/* Green section again */}
          <path d="M300,150 L350,200" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Alternative Route (Gray/Blue) */}
          <path d="M150,250 L100,180 L180,100 L250,120" fill="none" stroke="#60a5fa" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 10" />
        </svg>

        {/* Current Location */}
        <div className="absolute" style={{ left: 150, top: 250, transform: 'translate(-50%, -50%)', zIndex: 20 }}>
          <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-white shadow-md" style={{ width: '20px', height: '20px', backgroundColor: '#3b82f6', borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}></div>
          <div className="w-16 h-16 bg-blue-500/20 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ width: '64px', height: '64px', backgroundColor: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite', zIndex: -1 }}></div>
        </div>

        {/* Traffic Alert Icon on Map */}
        <div className="absolute" style={{ left: 225, top: 150, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-red-200" style={{ width: '32px', height: '32px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '1px solid #fecaca' }}>
            <AlertTriangle size={18} className="text-red-500" style={{ color: '#ef4444' }} />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ping {
          75%, 100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
        }
      `}} />

      {/* Bottom Sheet */}
      <div className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-30 p-6" style={{ backgroundColor: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', boxShadow: '0 -10px 40px rgba(0,0,0,0.1)', zIndex: 30, padding: '24px' }}>
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" style={{ width: '48px', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '999px', margin: '0 auto 24px' }}></div>
        
        {/* Legend */}
        <div className="flex justify-between items-center mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="w-6 h-2 rounded-full bg-green-500 mr-2" style={{ width: '24px', height: '8px', borderRadius: '999px', backgroundColor: '#10b981', marginRight: '8px' }}></div>
            <span className="text-gray-600 text-sm font-medium" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 500 }}>Nhanh</span>
          </div>
          <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="w-6 h-2 rounded-full bg-orange-500 mr-2" style={{ width: '24px', height: '8px', borderRadius: '999px', backgroundColor: '#f59e0b', marginRight: '8px' }}></div>
            <span className="text-gray-600 text-sm font-medium" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 500 }}>Trung bình</span>
          </div>
          <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="w-6 h-2 rounded-full bg-red-500 mr-2" style={{ width: '24px', height: '8px', borderRadius: '999px', backgroundColor: '#ef4444', marginRight: '8px' }}></div>
            <span className="text-gray-600 text-sm font-medium" style={{ color: '#4b5563', fontSize: '0.875rem', fontWeight: 500 }}>Chậm</span>
          </div>
        </div>

        {/* Alert Box */}
        <div className="bg-red-50 rounded-xl p-4 border border-red-100 flex items-start gap-3" style={{ backgroundColor: '#fef2f2', borderRadius: '12px', padding: '16px', border: '1px solid #fee2e2', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div className="mt-0.5 text-red-500" style={{ marginTop: '2px', color: '#ef4444' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-red-800 font-medium leading-snug" style={{ color: '#991b1b', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
              Đoạn đường phía trước kẹt xe, thời gian có thể lâu hơn 12 phút
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
