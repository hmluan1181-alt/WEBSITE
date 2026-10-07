/**
 * Bộ tạo âm thanh Web Audio API phục vụ đặc thù giảng dạy môn Âm Nhạc THCS
 * - Phát cao độ chuẩn (C4 - C5) cho giáo viên lấy giọng / luyện thanh
 * - Phát âm thanh máy gõ nhịp (Metronome) phách mạnh / phách nhẹ
 * - Mô phỏng nhạc cụ gõ học đường (Thanh phách, Trống con, Song loan, Triangle)
 * - Tự động phát chuỗi luyện thanh mẫu âm Mi - Ma (Thang âm 5 bậc)
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const NOTE_FREQUENCIES: Record<string, { note: string; freq: number; label: string; solfege: string }> = {
  'C4': { note: 'C4', freq: 261.63, label: 'Đô (C4)', solfege: 'Do' },
  'D4': { note: 'D4', freq: 293.66, label: 'Rê (D4)', solfege: 'Re' },
  'E4': { note: 'E4', freq: 329.63, label: 'Mi (E4)', solfege: 'Mi' },
  'F4': { note: 'F4', freq: 349.23, label: 'Pha (F4)', solfege: 'Fa' },
  'G4': { note: 'G4', freq: 392.00, label: 'Son (G4)', solfege: 'Sol' },
  'A4': { note: 'A4', freq: 440.00, label: 'La chuẩn (A4 - 440Hz)', solfege: 'La' },
  'B4': { note: 'B4', freq: 493.88, label: 'Si (B4)', solfege: 'Si' },
  'C5': { note: 'C5', freq: 523.25, label: 'Đô cao (C5)', solfege: 'Do' }
};

/**
 * Phát nốt nhạc với âm sắc ấm áp mô phỏng đàn phím / piano điện tử
 */
export function playTone(freq: number, duration: number = 1.0): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Bộ dao động chính (Sine wave cho âm tròn)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Bộ dao động phụ tạo hòa âm nhẹ (Triangle wave)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq, now);

    // Gain envelope (ADSR)
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.03); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.2, now + 0.2); // Decay
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Release

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (err) {
    console.warn('Web Audio error:', err);
  }
}

/**
 * Phát tiếng gõ nhịp Metronome (phách mạnh âm cao, phách nhẹ âm trầm)
 */
export function playMetronomeTick(isAccent: boolean): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isAccent ? 1200 : 800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.04);

    gain.gain.setValueAtTime(isAccent ? 0.6 : 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  } catch (err) {
    console.warn('Metronome error:', err);
  }
}

/**
 * Mô phỏng âm thanh nhạc cụ gõ học đường (Thanh phách, Trống con, Song loan, Triangle)
 */
export function playSchoolPercussion(instrument: 'thanh-phach' | 'trong-con' | 'song-loan' | 'triangle'): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    if (instrument === 'thanh-phach') {
      // Tiếng gỗ gõ giòn, dứt khoát
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);

      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } else if (instrument === 'trong-con') {
      // Tiếng trống con có độ trầm và ngân nhẹ
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);

      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (instrument === 'song-loan') {
      // Tiếng song loan "cốc" đanh gọn
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2200, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

      gain.gain.setValueAtTime(0.75, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (instrument === 'triangle') {
      // Tiếng tam âm ngân vang kim loại
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(3200, now);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8); // Ngân dài

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    }
  } catch (err) {
    console.warn('Percussion error:', err);
  }
}

/**
 * Tự động phát chuỗi luyện thanh mẫu âm Mi - Ma (Thang âm 5 bậc Đô - Rê - Mi - Son - La)
 */
export function playVocalWarmupSequence(
  onStepChange?: (noteKey: string, stepIndex: number) => void,
  onComplete?: () => void
): () => void {
  // Chuỗi thang âm 5 bậc: C4 -> D4 -> E4 -> G4 -> A4 -> G4 -> E4 -> D4 -> C4
  const sequence = [
    { key: 'C4', freq: 261.63, delay: 0 },
    { key: 'D4', freq: 293.66, delay: 500 },
    { key: 'E4', freq: 329.63, delay: 1000 },
    { key: 'G4', freq: 392.00, delay: 1500 },
    { key: 'A4', freq: 440.00, delay: 2000 },
    { key: 'G4', freq: 392.00, delay: 2600 },
    { key: 'E4', freq: 329.63, delay: 3100 },
    { key: 'D4', freq: 293.66, delay: 3600 },
    { key: 'C4', freq: 261.63, delay: 4100 }
  ];

  const timerIds: number[] = [];

  sequence.forEach((item, idx) => {
    const timer = window.setTimeout(() => {
      playTone(item.freq, 0.45);
      if (onStepChange) onStepChange(item.key, idx);
    }, item.delay);
    timerIds.push(timer);
  });

  const finishTimer = window.setTimeout(() => {
    if (onComplete) onComplete();
  }, 4800);
  timerIds.push(finishTimer);

  // Return cancel function
  return () => {
    timerIds.forEach(id => clearTimeout(id));
  };
}
