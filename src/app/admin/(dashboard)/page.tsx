'use client';

import React, { useEffect, useState } from 'react';
import { adminService, SystemConfig } from '@/services/admin.service';
import { Button, Card, Input, SegmentedControl, SectionTitle, Toggle } from '@/components/ui';
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
      <div className={styles.stack}>
        {error ? <div className={`${styles.alert} ${styles.alertError}`}>{error}</div> : <p className={styles.pageSub}>Đang tải…</p>}
      </div>
    );
  }

  return (
    <div className={styles.stack}>
      <p className={styles.pageSub}>Chọn model OCR / voice, URL bản đồ, tính năng. API key thật nằm trong biến môi trường.</p>

      {error && <div className={`${styles.alert} ${styles.alertError}`}>{error}</div>}
      {notice && <div className={`${styles.alert} ${styles.alertOk}`}>{notice}</div>}

      <Card padding={20}>
        <SectionTitle title="OCR — nhận dạng ký tự" style={{ marginBottom: 16 }} />
        <div className={styles.section}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Provider</span>
            <SegmentedControl
              options={OCR_OPTIONS.map((o) => ({ value: o, label: o }))}
              value={config.ocr.provider}
              onChange={(value) => setSection('ocr', 'provider', value)}
            />
          </div>
          <div className={styles.grid}>
            <Input label="Model" value={config.ocr.model} onChange={(e) => setSection('ocr', 'model', e.target.value)} />
            <Input label="Endpoint (tuỳ chọn)" placeholder="https://…" value={config.ocr.endpoint} onChange={(e) => setSection('ocr', 'endpoint', e.target.value)} />
          </div>
          <div className={styles.hint}>API key: {config.ocr.apiKeyConfigured ? 'đã cấu hình (env OCR_API_KEY)' : config.tokens.ocrApiKeyHint}</div>
        </div>
      </Card>

      <Card padding={20}>
        <SectionTitle title="Voice — giọng nói" style={{ marginBottom: 16 }} />
        <div className={styles.section}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Provider</span>
            <SegmentedControl
              options={VOICE_OPTIONS.map((o) => ({ value: o, label: o }))}
              value={config.voice.provider}
              onChange={(value) => setSection('voice', 'provider', value)}
            />
          </div>
          <div className={styles.grid}>
            <Input label="Model" value={config.voice.model} onChange={(e) => setSection('voice', 'model', e.target.value)} />
            <Input label="Ngôn ngữ" placeholder="vi-VN" value={config.voice.language} onChange={(e) => setSection('voice', 'language', e.target.value)} />
          </div>
          <Input label="Endpoint (tuỳ chọn)" placeholder="https://…" value={config.voice.endpoint} onChange={(e) => setSection('voice', 'endpoint', e.target.value)} />
          <div className={styles.hint}>API key: {config.voice.apiKeyConfigured ? 'đã cấu hình (env VOICE_API_KEY)' : config.tokens.voiceApiKeyHint}</div>
        </div>
      </Card>

      <Card padding={20}>
        <SectionTitle title="Bản đồ" style={{ marginBottom: 16 }} />
        <div className={styles.section}>
          <Input label="Map URL (tile template)" value={config.maps.mapUrl} onChange={(e) => setSection('maps', 'mapUrl', e.target.value)} />
          <Input label="Tile provider" value={config.maps.tileProvider} onChange={(e) => setSection('maps', 'tileProvider', e.target.value)} />
          <div className={styles.hint}>API key: {config.maps.apiKeyConfigured ? 'đã cấu hình (env MAP_API_KEY)' : config.tokens.mapApiKeyHint}</div>
        </div>
      </Card>

      <Card padding={20}>
        <SectionTitle title="Tính năng" style={{ marginBottom: 16 }} />
        <div className={styles.section}>
          <div className={styles.toggleRow}>
            <Toggle checked={config.features.qrScanEnabled} onChange={(checked) => setSection('features', 'qrScanEnabled', checked)} />
            <label className={styles.toggleLabel}>
              <input type="checkbox" checked={config.features.qrScanEnabled} onChange={(e) => setSection('features', 'qrScanEnabled', e.target.checked)} />
              Bật quét QR
            </label>
          </div>
          <div className={styles.toggleRow}>
            <Toggle checked={config.features.voiceInputEnabled} onChange={(checked) => setSection('features', 'voiceInputEnabled', checked)} />
            <label className={styles.toggleLabel}>
              <input type="checkbox" checked={config.features.voiceInputEnabled} onChange={(e) => setSection('features', 'voiceInputEnabled', e.target.checked)} />
              Bật nhập liệu giọng nói
            </label>
          </div>
          <div className={styles.toggleRow}>
            <Toggle checked={config.features.offlineMode} onChange={(checked) => setSection('features', 'offlineMode', checked)} />
            <label className={styles.toggleLabel}>
              <input type="checkbox" checked={config.features.offlineMode} onChange={(e) => setSection('features', 'offlineMode', e.target.checked)} />
              Chế độ offline
            </label>
          </div>
        </div>
      </Card>

      <Button onClick={handleSave} loading={saving}>
        {saving ? 'Đang lưu…' : 'Lưu cấu hình'}
      </Button>

      <Card padding={20}>
        <SectionTitle title="Xem nhanh JSON (chỉ đọc)" style={{ marginBottom: 12 }} />
        <pre className={styles.hint} style={{ whiteSpace: 'pre-wrap' }}>{draft}</pre>
      </Card>
    </div>
  );
}
