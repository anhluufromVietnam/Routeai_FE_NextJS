"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

export default function OptimizingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate AI optimization process
    const duration = 4000; // 4 seconds total
    const interval = 40; // update every 40ms
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Navigate to optimized route result after a short delay
        setTimeout(() => {
          router.push('/driver/routes/optimized');
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-12" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '3rem' }}>Đang tối ưu tuyến...</h2>

      {/* Circular Progress */}
      <div className="relative w-48 h-48 mb-12 flex items-center justify-center" style={{ position: 'relative', width: '192px', height: '192px', marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle 
            cx="50" cy="50" r="45" 
            fill="transparent" 
            stroke="#e5e7eb" 
            strokeWidth="6" 
          />
          {/* Progress circle */}
          <circle 
            cx="50" cy="50" r="45" 
            fill="transparent" 
            stroke="var(--color-primary)" 
            strokeWidth="6" 
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span className="text-4xl font-bold text-gray-800" style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937' }}>{progress}%</span>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-10 max-w-[250px]" style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '2.5rem', maxWidth: '250px', lineHeight: 1.5 }}>
        Đang tính toán thứ tự giao hàng và lộ trình tối ưu nhất
      </p>

      {/* Steps List */}
      <div className="w-full max-w-xs space-y-4 text-left" style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
        
        {/* Step 1 */}
        <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
          {progress > 15 ? (
            <CheckCircle2 size={24} className="text-primary mr-3 shrink-0" style={{ color: 'var(--color-primary)', marginRight: '12px', flexShrink: 0 }} />
          ) : (
            <Loader2 size={24} className="text-gray-400 mr-3 shrink-0 animate-spin" style={{ color: '#9ca3af', marginRight: '12px', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
          )}
          <span className={`text-sm ${progress > 15 ? 'text-gray-800 font-medium' : 'text-gray-500'}`} style={{ fontSize: '0.875rem', color: progress > 15 ? '#1f2937' : '#6b7280', fontWeight: progress > 15 ? 500 : 400 }}>Đang tính khoảng cách</span>
        </div>

        {/* Step 2 */}
        <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
          {progress > 45 ? (
            <CheckCircle2 size={24} className="text-primary mr-3 shrink-0" style={{ color: 'var(--color-primary)', marginRight: '12px', flexShrink: 0 }} />
          ) : progress > 15 ? (
            <Loader2 size={24} className="text-primary mr-3 shrink-0 animate-spin" style={{ color: 'var(--color-primary)', marginRight: '12px', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
          ) : (
            <Circle size={24} className="text-gray-200 mr-3 shrink-0" style={{ color: '#e5e7eb', marginRight: '12px', flexShrink: 0 }} />
          )}
          <span className={`text-sm ${progress > 45 ? 'text-gray-800 font-medium' : progress > 15 ? 'text-primary font-bold' : 'text-gray-400'}`} style={{ fontSize: '0.875rem', color: progress > 45 ? '#1f2937' : progress > 15 ? 'var(--color-primary)' : '#9ca3af', fontWeight: progress > 15 ? 'bold' : 'normal' }}>Phân tích giao thông</span>
        </div>

        {/* Step 3 */}
        <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
          {progress > 85 ? (
            <CheckCircle2 size={24} className="text-primary mr-3 shrink-0" style={{ color: 'var(--color-primary)', marginRight: '12px', flexShrink: 0 }} />
          ) : progress > 45 ? (
            <Loader2 size={24} className="text-primary mr-3 shrink-0 animate-spin" style={{ color: 'var(--color-primary)', marginRight: '12px', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
          ) : (
            <Circle size={24} className="text-gray-200 mr-3 shrink-0" style={{ color: '#e5e7eb', marginRight: '12px', flexShrink: 0 }} />
          )}
          <span className={`text-sm ${progress > 85 ? 'text-gray-800 font-medium' : progress > 45 ? 'text-primary font-bold' : 'text-gray-400'}`} style={{ fontSize: '0.875rem', color: progress > 85 ? '#1f2937' : progress > 45 ? 'var(--color-primary)' : '#9ca3af', fontWeight: progress > 45 ? 'bold' : 'normal' }}>Tối ưu thứ tự điểm</span>
        </div>

        {/* Step 4 */}
        <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
          {progress >= 100 ? (
            <CheckCircle2 size={24} className="text-primary mr-3 shrink-0" style={{ color: 'var(--color-primary)', marginRight: '12px', flexShrink: 0 }} />
          ) : progress > 85 ? (
            <Loader2 size={24} className="text-primary mr-3 shrink-0 animate-spin" style={{ color: 'var(--color-primary)', marginRight: '12px', flexShrink: 0, animation: 'spin 1s linear infinite' }} />
          ) : (
            <Circle size={24} className="text-gray-200 mr-3 shrink-0" style={{ color: '#e5e7eb', marginRight: '12px', flexShrink: 0 }} />
          )}
          <span className={`text-sm ${progress >= 100 ? 'text-gray-800 font-medium' : progress > 85 ? 'text-primary font-bold' : 'text-gray-400'}`} style={{ fontSize: '0.875rem', color: progress >= 100 ? '#1f2937' : progress > 85 ? 'var(--color-primary)' : '#9ca3af', fontWeight: progress > 85 ? 'bold' : 'normal' }}>Tính thời gian dự kiến</span>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
