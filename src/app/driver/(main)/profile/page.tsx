"use client";
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Shield, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white flex items-center p-4 border-b border-gray-100 sticky top-0 z-10" style={{ display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderBottom: '1px solid #f3f4f6' }}>
        <button onClick={() => router.back()} className="mr-4 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800" style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Hồ sơ tài xế</h1>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
             <User size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold">{user?.full_name}</h2>
          <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center">
            <Mail size={18} className="text-blue-500 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium text-gray-800">{user?.email}</p>
            </div>
          </div>
          <div className="p-4 border-b border-gray-50 flex items-center">
            <Shield size={18} className="text-green-500 mr-3" />
            <div>
              <p className="text-xs text-gray-500">Quyền hạn</p>
              <p className="font-medium text-gray-800">{user?.role === 'driver' ? 'Tài xế' : 'Quản trị viên'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
