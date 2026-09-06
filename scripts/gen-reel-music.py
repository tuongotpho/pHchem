# -*- coding: utf-8 -*-
"""
gen-reel-music.py — Tự tổng hợp nhạc nền cho reel pH-Chem.

Nhạc được sinh hoàn toàn bằng công thức toán (numpy), KHÔNG lấy mẫu từ bài
hát nào, nên không dính bản quyền và không bị Facebook/TikTok chặn tiếng.

Ba phong cách:
  ambient  — "Tinh vân": chỉ có lớp đệm dày, không trống. An toàn nhất, giống
             nhạc phim tài liệu khoa học.
  lofi     — "Nhịp học": trống nhẹ + bass ấm + phím điện, 78 BPM. Dễ nghe,
             hợp video học tập trên Reels.
  pulse    — "Xung điện": chuỗi nốt nảy đều + bass trầm, 100 BPM. Cảm giác
             phòng thí nghiệm, hợp chủ đề hồ sơ nguyên tố.

Cách chạy:
  python scripts/gen-reel-music.py            -> sinh cả 3 + bản nghe thử 20 giây
  python scripts/gen-reel-music.py ambient    -> chỉ sinh 1 phong cách

Kết quả nằm ở promo/assets/music/
"""

import os
import subprocess
import sys

import numpy as np
from scipy.io import wavfile
from scipy import signal

SR = 44100
OUT_DIR = os.path.join("promo", "assets", "music")
os.makedirs(OUT_DIR, exist_ok=True)

# Vòng hợp âm La thứ: Am9 - Fmaj7 - Cmaj9 - G6  (buồn nhẹ, sáng dần, không bi luỵ)
PROGRESSION = [
    [45, 60, 64, 67, 71],   # Am9
    [41, 57, 60, 64, 69],   # Fmaj7
    [48, 64, 67, 71, 74],   # Cmaj9
    [43, 59, 62, 67, 69],   # G6
]


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12.0)


def env_ad(n, attack, decay, sustain=0.0, release=None):
    """Bao hình âm lượng đơn giản (giây)."""
    a = max(1, int(attack * SR))
    d = max(1, int(decay * SR))
    out = np.zeros(n)
    a = min(a, n)
    out[:a] = np.linspace(0, 1, a)
    rest = n - a
    if rest > 0:
        d = min(d, rest)
        out[a:a + d] = np.linspace(1, sustain, d)
        if rest > d:
            out[a + d:] = sustain
    if release:
        r = min(int(release * SR), n)
        out[-r:] *= np.linspace(1, 0, r)
    return out


def saw(freq, n, harmonics=14, detune=0.0):
    """Sóng răng cưa cộng dồn hài (êm hơn răng cưa toán học thuần)."""
    t = np.arange(n) / SR
    f = freq * (2 ** (detune / 1200.0))
    out = np.zeros(n)
    for k in range(1, harmonics + 1):
        if f * k > SR / 2.2:
            break
        out += np.sin(2 * np.pi * f * k * t + k * 0.7) / k
    return out / 1.6


def sine(freq, n, phase=0.0):
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * freq * t + phase)


def lowpass(x, cutoff, order=4):
    cutoff = float(np.clip(cutoff, 40, SR / 2 - 500))
    b, a = signal.butter(order, cutoff / (SR / 2), btype="low")
    return signal.filtfilt(b, a, x)


def highpass(x, cutoff, order=2):
    b, a = signal.butter(order, cutoff / (SR / 2), btype="high")
    return signal.filtfilt(b, a, x)


def reverb(x, decay=2.2, wet=0.32, predelay=0.02):
    """Vang phòng bằng cách nhân chập với nhiễu tắt dần."""
    n = int(decay * SR)
    t = np.arange(n) / SR
    rng = np.random.default_rng(7)
    ir = rng.normal(0, 1, n) * np.exp(-t * (4.0 / decay))
    ir = lowpass(ir, 5200)
    ir /= np.abs(ir).sum() / 40.0
    pre = int(predelay * SR)
    wetsig = signal.fftconvolve(x, ir)[:len(x) + n]
    wetsig = np.pad(wetsig, (pre, 0))[:len(x)]
    return (1 - wet) * x + wet * wetsig[:len(x)]


def add(buf, part, start):
    """Cộng một đoạn âm vào bộ đệm tại vị trí mẫu start (tự cắt nếu tràn)."""
    i = int(start)
    j = min(len(buf), i + len(part))
    if i >= len(buf):
        return
    buf[i:j] += part[: j - i]


def wrap_tail(buf, tail_len):
    """Vòng đuôi vang về đầu để lặp không bị hụt tiếng."""
    body = buf[:-tail_len].copy()
    body[:tail_len] += buf[-tail_len:]
    return body


# ─────────────────────────────────────────────────────────────
# PHONG CÁCH 1 — AMBIENT "TINH VÂN"
# ─────────────────────────────────────────────────────────────
def make_ambient(bars=16, bpm=60):
    bar = 4 * 60.0 / bpm
    tail = int(3.0 * SR)
    n = int(bars * bar * SR) + tail
    buf = np.zeros(n)

    for b in range(bars):
        chord = PROGRESSION[b % len(PROGRESSION)]
        start = b * bar * SR
        dur = bar * 1.9                      # các hợp âm chồng lấn cho liền mạch
        ln = int(dur * SR)
        e = env_ad(ln, attack=bar * 0.45, decay=dur * 0.55, sustain=0.0)
        for k, note in enumerate(chord):
            v = 0.30 if k == 0 else 0.19
            voice = saw(hz(note), ln, 10, detune=-5) + saw(hz(note), ln, 10, detune=+5)
            # bộ lọc mở dần rồi khép lại -> nghe như "thở"
            voice = lowpass(voice, 1500 + 1500 * (1 + np.sin(b * 0.7)) / 2)
            add(buf, voice * e * v, start)

        # lớp lấp lánh ở quãng cao — thêm "hơi sáng" để tiếng không bị ù
        ln2 = int(bar * 1.4 * SR)
        t2 = np.arange(ln2) / SR
        e2 = env_ad(ln2, 1.0, ln2 / SR - 1.0)
        trem = 0.75 + 0.25 * np.sin(2 * np.pi * 0.28 * t2)
        shimmer = (sine(hz(chord[-1] + 12), ln2) * 0.055
                   + sine(hz(chord[-1] + 19), ln2) * 0.038
                   + sine(hz(chord[-1] + 24), ln2) * 0.026
                   + sine(hz(chord[2] + 24), ln2) * 0.018)
        add(buf, shimmer * e2 * trem, start + bar * 0.5 * SR)

    buf = reverb(buf, decay=3.0, wet=0.36)
    buf = highpass(buf, 45)
    return wrap_tail(buf, tail)


# ─────────────────────────────────────────────────────────────
# PHONG CÁCH 2 — LO-FI "NHỊP HỌC"
# ─────────────────────────────────────────────────────────────
def kick(dur=0.42, f0=110, f1=45):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t * 26)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 7.5)


def rim(dur=0.16):
    n = int(dur * SR)
    t = np.arange(n) / SR
    rng = np.random.default_rng(11)
    x = rng.normal(0, 1, n) * np.exp(-t * 40)
    return lowpass(highpass(x, 900), 4200) * 0.9


def hat(dur=0.09):
    n = int(dur * SR)
    t = np.arange(n) / SR
    rng = np.random.default_rng(23)
    x = rng.normal(0, 1, n) * np.exp(-t * 70)
    return highpass(x, 6500)


def epiano(freq, dur):
    """Phím điện: sóng sin cộng hài bậc 2 và 3, tắt nhanh."""
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = (np.sin(2 * np.pi * freq * t)
         + 0.35 * np.sin(2 * np.pi * freq * 2 * t) * np.exp(-t * 6)
         + 0.15 * np.sin(2 * np.pi * freq * 3 * t) * np.exp(-t * 11))
    return x * np.exp(-t * 2.6)


def make_lofi(bars=20, bpm=78):
    beat = 60.0 / bpm
    bar = 4 * beat
    tail = int(2.5 * SR)
    n = int(bars * bar * SR) + tail
    buf = np.zeros(n)

    for b in range(bars):
        chord = PROGRESSION[b % len(PROGRESSION)]
        s0 = b * bar * SR

        # trống: thùng ở phách 1 và 3 (lệch nhẹ), rim ở phách 2 và 4
        add(buf, kick() * 0.52, s0)
        add(buf, kick() * 0.40, s0 + 2.5 * beat * SR)
        add(buf, rim() * 0.26, s0 + beat * SR)
        add(buf, rim() * 0.26, s0 + 3 * beat * SR)
        for i in range(8):                      # hi-hat móc đơn, có đảo phách nhẹ
            swing = 0.055 * beat if i % 2 else 0
            add(buf, hat() * (0.11 if i % 2 else 0.16), s0 + (i * 0.5 * beat + swing) * SR)

        # bass đi theo nốt gốc hợp âm
        bass_n = int(beat * 1.9 * SR)
        bt = np.arange(bass_n) / SR
        bfreq = hz(chord[0] - 12)
        bass = (np.sin(2 * np.pi * bfreq * bt) + 0.25 * np.sin(4 * np.pi * bfreq * bt))
        bass *= np.exp(-bt * 1.6)
        add(buf, bass * 0.34, s0)
        add(buf, bass[: int(beat * SR)] * 0.20, s0 + 2.5 * beat * SR)

        # phím điện rải nốt
        for k, note in enumerate(chord[1:]):
            add(buf, epiano(hz(note), beat * 2.2) * 0.115, s0 + (0.25 + k * 0.14) * beat * SR)
        add(buf, epiano(hz(chord[-1] + 12), beat * 1.4) * 0.075, s0 + 2.5 * beat * SR)

        # lớp đệm rất mỏng cho ấm
        pl = int(bar * SR)
        pe = env_ad(pl, 0.5, bar - 0.5)
        for note in chord[1:3]:
            add(buf, lowpass(saw(hz(note), pl, 8, -4), 1400) * pe * 0.045, s0)

    buf = reverb(buf, decay=1.5, wet=0.22)
    buf = lowpass(buf, 12000)                   # hơi đục kiểu lo-fi
    buf = highpass(buf, 38)
    return wrap_tail(buf, tail)


# ─────────────────────────────────────────────────────────────
# PHONG CÁCH 3 — PULSE "XUNG ĐIỆN"
# ─────────────────────────────────────────────────────────────
def pluck(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = saw(freq, n, 9)
    cut = 900 + 2600 * np.exp(-t * 9)
    x = lowpass(x, float(cut.mean()))
    return x * np.exp(-t * 9.5)


def make_pulse(bars=26, bpm=100):
    beat = 60.0 / bpm
    bar = 4 * beat
    tail = int(2.5 * SR)
    n = int(bars * bar * SR) + tail
    buf = np.zeros(n)

    for b in range(bars):
        chord = PROGRESSION[b % len(PROGRESSION)]
        s0 = b * bar * SR
        notes = [chord[1], chord[2], chord[3], chord[2] + 12, chord[3], chord[2],
                 chord[1] + 12, chord[2]]

        # chuỗi nốt nảy đều 8 nốt/ô nhịp
        for i in range(8):
            v = 0.16 if i % 2 == 0 else 0.10
            add(buf, pluck(hz(notes[i % len(notes)]), beat * 0.9) * v,
                s0 + i * 0.5 * beat * SR)

        # bass trầm giữ nền
        bn = int(bar * 0.92 * SR)
        bt = np.arange(bn) / SR
        bf = hz(chord[0] - 12)
        sub = np.sin(2 * np.pi * bf * bt) * np.exp(-bt * 0.9)
        add(buf, sub * 0.40, s0)

        # nhịp tim rất khẽ ở phách 1 và 3
        add(buf, kick(0.30, 90, 42) * 0.22, s0)
        add(buf, kick(0.30, 90, 42) * 0.16, s0 + 2 * beat * SR)

        # lớp đệm nền mỏng
        pl = int(bar * 1.1 * SR)
        pe = env_ad(pl, 0.8, pl / SR - 0.8)
        for note in chord[1:3]:
            add(buf, lowpass(saw(hz(note), pl, 7, 6), 1100) * pe * 0.05, s0)

    buf = reverb(buf, decay=1.9, wet=0.26)
    buf = highpass(buf, 42)
    return wrap_tail(buf, tail)


# ─────────────────────────────────────────────────────────────
def normalize(x, peak_db=-6.0, rms_db=-20.0):
    """Cân âm lượng: ưu tiên RMS, nhưng không để đỉnh vượt ngưỡng."""
    x = x - x.mean()
    rms = np.sqrt(np.mean(x ** 2))
    if rms > 0:
        x = x * (10 ** (rms_db / 20) / rms)
    peak = np.abs(x).max()
    limit = 10 ** (peak_db / 20)
    if peak > limit:
        x = x * (limit / peak)
    return x


def to_stereo(x, width=0.15):
    """Tách nhẹ trái/phải cho rộng tiếng."""
    d = int(width * 0.02 * SR)
    left = x
    right = np.pad(x, (d, 0))[: len(x)]
    return np.stack([left, right], axis=1)


def export(name, audio):
    wav_path = os.path.join(OUT_DIR, f"{name}.wav")
    mp3_path = os.path.join(OUT_DIR, f"{name}.mp3")
    prev_path = os.path.join(OUT_DIR, f"{name}_nghethu20s.mp3")

    st = to_stereo(normalize(audio))
    wavfile.write(wav_path, SR, (st * 32767).astype(np.int16))

    import imageio_ffmpeg
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    subprocess.run([ff, "-y", "-i", wav_path, "-c:a", "libmp3lame", "-b:a", "192k",
                    mp3_path], check=True, capture_output=True)
    subprocess.run([ff, "-y", "-ss", "6", "-t", "20", "-i", wav_path,
                    "-af", "afade=t=in:st=0:d=0.5,afade=t=out:st=19:d=1",
                    "-c:a", "libmp3lame", "-b:a", "192k", prev_path],
                   check=True, capture_output=True)
    os.remove(wav_path)
    dur = len(audio) / SR
    print(f"  ✅ {name}: {dur:.1f}s  ->  {mp3_path}")
    print(f"     nghe thử 20 giây: {prev_path}")


STYLES = {
    "ambient": make_ambient,
    "lofi": make_lofi,
    "pulse": make_pulse,
}

if __name__ == "__main__":
    want = sys.argv[1:] or list(STYLES.keys())
    for name in want:
        if name not in STYLES:
            print(f"❌ Không có phong cách '{name}'. Chọn: {', '.join(STYLES)}")
            sys.exit(1)
        print(f"🎵 Đang tổng hợp '{name}'...")
        export(name, STYLES[name]())
    print("\nXong. Nghe thử các file *_nghethu20s.mp3 rồi chọn một phong cách.")
