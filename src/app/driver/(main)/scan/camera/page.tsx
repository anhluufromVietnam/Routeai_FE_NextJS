"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, X, Image as ImageIcon, Zap, ZapOff } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function DriverScanCamera() {
  const router = useRouter();
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleScanSuccess = (result: string) => {
    router.push('/driver/scan/result?code=' + encodeURIComponent(result));
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, backgroundColor: 'black', color: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Header */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', zIndex: 120, background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
        <button onClick={() => router.back()} style={{ padding: '8px', marginLeft: '-8px', color: 'white' }}>
          <ChevronLeft size={28} />
        </button>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)', margin: 0 }}>Quét đơn hàng</h2>
        <button onClick={() => router.push('/driver/home')} style={{ padding: '8px', marginRight: '-8px', color: 'white' }}>
          <X size={28} />
        </button>
      </div>

      {/* Camera Viewport */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Scanner
          onScan={(result) => {
             if (result && result.length > 0) {
               handleScanSuccess(result[0].rawValue);
             }
          }}
          onError={(error) => {
            console.error(error);
            setErrorMsg("Lỗi Camera: Không thể truy cập");
          }}
          components={{ torch: isFlashOn, finder: false }}
          styles={{ container: { width: '100%', height: '100%' }, video: { objectFit: 'cover' } }}
        />
      </div>

      {/* Display Error if any */}
      {errorMsg && (
        <div style={{ position: 'absolute', top: '80px', left: '16px', right: '16px', backgroundColor: 'rgba(239, 68, 68, 0.9)', backdropFilter: 'blur(10px)', color: 'white', padding: '16px', borderRadius: '8px', zIndex: 130, textAlign: 'center', fontSize: '14px', boxShadow: '0 10px 15px rgba(0,0,0,0.2)', fontWeight: 500 }}>
          {errorMsg}
          <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
            (Hãy kiểm tra lại quyền Camera trong Cài đặt)
          </div>
        </div>
      )}
      
      {/* UI Overlay Frame */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '160px', pointerEvents: 'none', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '80%', maxWidth: '300px', aspectRatio: '3/4', position: 'relative', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
            {/* Frame Corners (Green) */}
            <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '40px', height: '40px', borderTop: '5px solid #22c55e', borderLeft: '5px solid #22c55e', borderTopLeftRadius: '20px' }}></div>
            <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '40px', height: '40px', borderTop: '5px solid #22c55e', borderRight: '5px solid #22c55e', borderTopRightRadius: '20px' }}></div>
            <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '40px', height: '40px', borderBottom: '5px solid #22c55e', borderLeft: '5px solid #22c55e', borderBottomLeftRadius: '20px' }}></div>
            <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '40px', height: '40px', borderBottom: '5px solid #22c55e', borderRight: '5px solid #22c55e', borderBottomRightRadius: '20px' }}></div>
          </div>
      </div>

      {/* Bottom Controls */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 120, backgroundColor: 'black' }}>
        {/* Left: Ảnh */}
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'white', opacity: 0.8 }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'white', marginBottom: '4px' }}></div>
          <span style={{ fontSize: '13px', fontWeight: 500 }}>Ảnh</span>
        </button>

        {/* Center: Capture Button */}
        <button onClick={() => router.push('/driver/scan/result')} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '50%', backgroundColor: 'white' }}></div>
          </div>
        </button>

        {/* Right: Thư viện */}
        <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'white', opacity: 0.8 }}>
          <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ImageIcon size={24} strokeWidth={1.5} />
          </div>
          <span style={{ fontSize: '13px', fontWeight: 500 }}>Thư viện</span>
        </button>
      </div>
    </div>
  );
}
