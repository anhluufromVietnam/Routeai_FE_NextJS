'use client';

import React, { useEffect, useState } from 'react';
import { adminService, SystemConfig } from '@/services/admin.service';
import styles from './layout.module.css';

const OCR_OPTIONS = ['tesseract', 'google-vision', 'aws-textract', 'azure-vision'];
const VOICE_OPTIONS = ['webspeech', 'google-stt', 'azure-speech', 'openai-whisper'];

export default function AdminConfigPage() {
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [draft, setDraft] = useState<string>('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminService.getConfig()
      .then((res) => {
        setConfig(res.data);
        setDraft(JSON.stringify({
          ocr: { provider: res.data.ocr.provider, model: res.data.ocr.model, endpoint: res.data.ocr.endpoint },
          voice: { provider: res.data.voice.provider, model: res.data.voice.model, language: res.data.voice.language, endpoint: res.data.voice.endpoint },
          maps: { mapUrl: res.data.maps.mapUrl, tileProvider: res.data.maps.tileProvider },
          features: res.data.features,
        }, null, 2));
      })
      .catch((e: { message?: string }) => setError(e?.message ?? 'Không tải được cấu hình'));
  }, []);

  const setSection = <K extends 'ocr' | 'voice' | 'maps' | 'features'>(section: K, field: string, value: string | boolean) => {
    if (!config) return;
    setConfig({ ...config, [section]: { ...config[section], [field]: value } });
  };

  const handleSave = async () => {
    if (!config) return;
    setError('');
    setNotice('');
    setSaving(true);
    try {
      const res = await adminService.updateConfig({
        ocr: { provider: config.ocr.provider, model: config.ocr.model, endpoint: config.ocr.endpoint },
        voice: { provider: config.voice.provider, model: config.voice.model, language: config.voice.language, endpoint: config.voice.endpoint },
        maps: { mapUrl: config.maps.mapUrl, tileProvider: config.maps.tileProvider },
        features: config.features,
      });
      setConfig(res.data);
      setNotice('Đã lưu cấu hình hệ thống.');
    } catch (e) {
      const msg = e instanceof Error ? e.message : (e as { message?: string })?.message ?? 'Lưu thất bại';
      setError(msg.replace(/^\[.*?\]\s*/, ''));
    } finally {
      setSaving(false);
    }
  };

  if (!config) {
    return (
      <div>
        <h1 className={styles.pageTitle}>Cấu hình hệ thống</h1>
        {error ? <div className={`${styles.alert} ${styles.alertError}`}>{error}</div> : <p className={styles.pageSub}>Đang tải…</p>}
      </div>
    );
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Cấu hình hệ thống</h1>
      <p className={styles.pageSub}>Chọn model OCR / voice, URL bản đồ, tính năng. API key thật nằm trong biến môi trường.</p>

      {error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}
      {notice && <div className={`${styles.alert} ${styles.alertOk}`}>{notice}</div>}

      <div className={styles.card}>
        <div className={styles.cardTitle}>OCR — nhận dạng ký tự</div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="ocr-provider">Provider</label>
            <select id="ocr-provider" value={config.ocr.provider} onChange={(e) => setSection('ocr', 'provider', e.target.value)}>
              {OCR_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="ocr-model">Model</label>
            <input id="ocr-model" value={config.ocr.model} onChange={(e) => setSection('ocr', 'model', e.target.value)} />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="ocr-endpoint">Endpoint (tuỳ chọn)</label>
          <input id="ocr-endpoint" value={config.ocr.endpoint} onChange={(e) => setSection('ocr', 'endpoint', e.target.value)} placeholder="https://…" />
        </div>
        <div className={styles.hint}>API key: {config.ocr.apiKeyConfigured ? 'đã cấu hình (env OCR_API_KEY)' : config.tokens.ocrApiKeyHint}</div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Voice — giọng nói</div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="voice-provider">Provider</label>
            <select id="voice-provider" value={config.voice.provider} onChange={(e) => setSection('voice', 'provider', e.target.value)}>
              {VOICE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="voice-model">Model</label>
            <input id="voice-model" value={config.voice.model} onChange={(e) => setSection('voice', 'model', e.target.value)} />
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.field}>
            <label htmlFor="voice-lang">Ngôn ngữ</label>
            <input id="voice-lang" value={config.voice.language} onChange={(e) => setSection('voice', 'language', e.target.value)} placeholder="vi-VN" />
          </div>
          <div className={styles.field}>
            <label htmlFor="voice-endpoint">Endpoint (tuỳ chọn)</label>
            <input id="voice-endpoint" value={config.voice.endpoint} onChange={(e) => setSection('voice', 'endpoint', e.target.value)} placeholder="https://…" />
          </div>
        </div>
        <div className={styles.hint}>API key: {config.voice.apiKeyConfigured ? 'đã cấu hình (env VOICE_API_KEY)' : config.tokens.voiceApiKeyHint}</div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Bản đồ</div>
        <div className={styles.field}>
          <label htmlFor="map-url">Map URL (tile template)</label>
          <input id="map-url" value={config.maps.mapUrl} onChange={(e) => setSection('maps', 'mapUrl', e.target.value)} />
        </div>
        <div className={styles.field}>
          <label htmlFor="tile-provider">Tile provider</label>
          <input id="tile-provider" value={config.maps.tileProvider} onChange={(e) => setSection('maps', 'tileProvider', e.target.value)} />
        </div>
        <div className={styles.hint}>API key: {config.maps.apiKeyConfigured ? 'đã cấu hình (env MAP_API_KEY)' : config.tokens.mapApiKeyHint}</div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>Tính năng</div>
        <label className={styles.checkRow}>
          <input type="checkbox" checked={config.features.qrScanEnabled} onChange={(e) => setSection('features', 'qrScanEnabled', e.target.checked)} />
          Bật quét QR
        </label>
        <label className={styles.checkRow}>
          <input type="checkbox" checked={config.features.voiceInputEnabled} onChange={(e) => setSection('features', 'voiceInputEnabled', e.target.checked)} />
          Bật nhập liệu giọng nói
        </label>
        <label className={styles.checkRow}>
          <input type="checkbox" checked={config.features.offlineMode} onChange={(e) => setSection('features', 'offlineMode', e.target.checked)} />
          Chế độ offline
        </label>
      </div>

      <button className={styles.saveBtn} onClick={handleSave} disabled={saving}>
        {saving ? 'Đang lưu…' : 'Lưu cấu hình'}
      </button>

      <div className={styles.card} style={{ marginTop: '1.25rem' }}>
        <div className={styles.cardTitle}>Xem nhanh JSON (chỉ đọc)</div>
        <pre className={styles.hint} style={{ whiteSpace: 'pre-wrap' }}>{draft}</pre>
      </div>
    </div>
  );
}
