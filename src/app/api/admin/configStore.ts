// System-wide configuration store. Secrets stay env-first: the store only
// holds non-secret values plus placeholder flags for keys kept in env vars.
// Shape mirrors the existing mockDb pattern (in-memory, dev only).
export type OcrProvider = 'tesseract' | 'google-vision' | 'aws-textract' | 'azure-vision';
export type VoiceProvider = 'webspeech' | 'google-stt' | 'azure-speech' | 'openai-whisper';

export interface SystemConfig {
  ocr: {
    provider: OcrProvider;
    model: string;
    apiKeyConfigured: boolean;
    endpoint: string;
  };
  voice: {
    provider: VoiceProvider;
    model: string;
    apiKeyConfigured: boolean;
    language: string;
    endpoint: string;
  };
  maps: {
    mapUrl: string;
    tileProvider: string;
    apiKeyConfigured: boolean;
  };
  tokens: {
    // Placeholders only — real keys live in env vars, never in source.
    ocrApiKeyHint: string;
    voiceApiKeyHint: string;
    mapApiKeyHint: string;
  };
  features: {
    qrScanEnabled: boolean;
    voiceInputEnabled: boolean;
    offlineMode: boolean;
  };
}

function envFlag(name: string): boolean {
  return Boolean(process.env[name]);
}

export function getDefaultConfig(): SystemConfig {
  return {
    ocr: {
      provider: (process.env.OCR_PROVIDER as OcrProvider) || 'tesseract',
      model: process.env.OCR_MODEL || 'tesseract-lstm-v1',
      apiKeyConfigured: envFlag('OCR_API_KEY'),
      endpoint: process.env.OCR_ENDPOINT || '',
    },
    voice: {
      provider: (process.env.VOICE_PROVIDER as VoiceProvider) || 'webspeech',
      model: process.env.VOICE_MODEL || 'web-speech-default',
      apiKeyConfigured: envFlag('VOICE_API_KEY'),
      endpoint: process.env.VOICE_ENDPOINT || '',
      language: process.env.VOICE_LANGUAGE || 'vi-VN',
    },
    maps: {
      mapUrl: process.env.MAP_URL || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      tileProvider: process.env.MAP_TILE_PROVIDER || 'openstreetmap',
      apiKeyConfigured: envFlag('MAP_API_KEY'),
    },
    tokens: {
      ocrApiKeyHint: 'Set via OCR_API_KEY env var',
      voiceApiKeyHint: 'Set via VOICE_API_KEY env var',
      mapApiKeyHint: 'Set via MAP_API_KEY env var',
    },
    features: {
      qrScanEnabled: true,
      voiceInputEnabled: true,
      offlineMode: false,
    },
  };
}

// In-memory override layer on top of env defaults (dev mock).
let overrides: Partial<SystemConfig> = {};

export function getSystemConfig(): SystemConfig {
  const base = getDefaultConfig();
  return {
    ocr: { ...base.ocr, ...(overrides.ocr ?? {}) },
    voice: { ...base.voice, ...(overrides.voice ?? {}) },
    maps: { ...base.maps, ...(overrides.maps ?? {}) },
    tokens: { ...base.tokens, ...(overrides.tokens ?? {}) },
    features: { ...base.features, ...(overrides.features ?? {}) },
  };
}

const ALLOWED_OCR: OcrProvider[] = ['tesseract', 'google-vision', 'aws-textract', 'azure-vision'];
const ALLOWED_VOICE: VoiceProvider[] = ['webspeech', 'google-stt', 'azure-speech', 'openai-whisper'];

export function validateConfigPatch(patch: unknown): { ok: true; value: Partial<SystemConfig> } | { ok: false; message: string } {
  if (typeof patch !== 'object' || patch === null || Array.isArray(patch)) {
    return { ok: false, message: 'Config patch must be an object' };
  }
  const p = patch as Record<string, Record<string, unknown>>;
  const allowedTop = ['ocr', 'voice', 'maps', 'features'];
  for (const key of Object.keys(p)) {
    if (!allowedTop.includes(key)) return { ok: false, message: `Unknown config section: ${key}` };
    if (typeof p[key] !== 'object' || p[key] === null) return { ok: false, message: `Section ${key} must be an object` };
  }
  // The tokens section is read-only hints — never writable via API.
  if ('tokens' in (patch as Record<string, unknown>)) {
    return { ok: false, message: 'tokens section is read-only (keys live in env vars)' };
  }
  if (p.ocr?.provider !== undefined && !ALLOWED_OCR.includes(p.ocr.provider as OcrProvider)) {
    return { ok: false, message: `ocr.provider must be one of: ${ALLOWED_OCR.join(', ')}` };
  }
  if (p.voice?.provider !== undefined && !ALLOWED_VOICE.includes(p.voice.provider as VoiceProvider)) {
    return { ok: false, message: `voice.provider must be one of: ${ALLOWED_VOICE.join(', ')}` };
  }
  if (p.maps?.mapUrl !== undefined && typeof p.maps.mapUrl !== 'string') {
    return { ok: false, message: 'maps.mapUrl must be a string URL' };
  }
  return { ok: true, value: patch as Partial<SystemConfig> };
}

export function applyConfigPatch(patch: Partial<SystemConfig>): SystemConfig {
  overrides = {
    ocr: { ...(overrides.ocr ?? {}), ...(patch.ocr ?? {}) },
    voice: { ...(overrides.voice ?? {}), ...(patch.voice ?? {}) },
    maps: { ...(overrides.maps ?? {}), ...(patch.maps ?? {}) },
    features: { ...(overrides.features ?? {}), ...(patch.features ?? {}) },
  } as Partial<SystemConfig>;
  return getSystemConfig();
}
