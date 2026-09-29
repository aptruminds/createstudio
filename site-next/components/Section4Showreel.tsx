'use client';

import { useEffect, useRef, useState } from 'react';

const DESKTOP_SRC = '/showreel/showreel.mp4';
const MOBILE_SRC  = 'https://res.cloudinary.com/wpeu43fl/video/upload/v1783426331/Create_studio_Showreel_Mobile_Video_xl6asy.mp4';

function fmtTime(t: number) {
  if (!Number.isFinite(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function Section4Showreel() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const fillRef   = useRef<HTMLDivElement>(null);
  const [started, setStarted]   = useState(false);
  const [paused,  setPaused]    = useState(false);
  const [muted,   setMuted]     = useState(true);
  const [curTime, setCurTime]   = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPhone, setIsPhone]   = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsPhone(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Smooth progress bar via rAF
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const v = videoRef.current;
      if (v && v.duration && fillRef.current) {
        fillRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else          { v.pause(); setPaused(true); }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function onScrubStart(e: React.PointerEvent<HTMLDivElement>) {
    const track = trackRef.current;
    const v = videoRef.current;
    if (!track || !v || !v.duration) return;
    e.preventDefault();
    track.setPointerCapture(e.pointerId);
    const seek = (clientX: number) => {
      const r = track.getBoundingClientRect();
      const f = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      v.currentTime = f * v.duration;
    };
    seek(e.clientX);
    const move = (ev: PointerEvent) => seek(ev.clientX);
    const up = () => {
      track.removeEventListener('pointermove', move);
      track.removeEventListener('pointerup', up);
    };
    track.addEventListener('pointermove', move);
    track.addEventListener('pointerup', up);
  }

  if (isPhone) {
    return (
      <section id="section-4" className="s4-mobile">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          className="s4-mobile-video"
          src={MOBILE_SRC}
          autoPlay muted loop playsInline
          onClick={togglePlay}
        />
        {paused && (
          <button className="s4-mobile-play" onClick={togglePlay} aria-label="Play">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l11.2-6.86a1.03 1.03 0 0 0 0-1.76L9.56 4.26A1.03 1.03 0 0 0 8 5.14z"/>
            </svg>
          </button>
        )}
      </section>
    );
  }

  return (
    <section id="section-4" className="s4-fullbleed">

      {/* Full-bleed video */}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        className="s4-fullbleed-video"
        src={DESKTOP_SRC}
        loop playsInline
        onClick={togglePlay}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (!v) return;
          setCurTime(v.currentTime);
          setDuration(v.duration || 0);
        }}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
      />

      {/* Cover screen — shown before user hits play */}
      {!started && (
        <div className="s4-cover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Create Studio" className="s4-cover-logo" />
          <button
            className="s4-cover-play"
            aria-label="Play showreel"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = false;
              v.play();
              setStarted(true);
              setPaused(false);
              setMuted(false);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" style={{ marginLeft: 3 }}>
              <path fill="currentColor" d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l11.2-6.86a1.03 1.03 0 0 0 0-1.76L9.56 4.26A1.03 1.03 0 0 0 8 5.14z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Pause overlay — shown when video is paused mid-play */}
      {started && paused && (
        <button className="s4-pause-overlay" onClick={togglePlay} aria-label="Play">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l11.2-6.86a1.03 1.03 0 0 0 0-1.76L9.56 4.26A1.03 1.03 0 0 0 8 5.14z"/>
          </svg>
        </button>
      )}

      {/* Controls bar — shown after started */}
      {started && (
        <div className="s4-bar">
          <button className="s4-bar-btn" onClick={togglePlay} aria-label={paused ? 'Play' : 'Pause'}>
            {paused ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l11.2-6.86a1.03 1.03 0 0 0 0-1.76L9.56 4.26A1.03 1.03 0 0 0 8 5.14z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"/>
                <rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            )}
          </button>

          <div className="s4-bar-track" ref={trackRef} onPointerDown={onScrubStart}>
            <div className="s4-bar-fill" ref={fillRef} />
          </div>

          <span className="s4-bar-time">{fmtTime(curTime)} / {fmtTime(duration)}</span>

          <button className="s4-bar-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
        </div>
      )}

    </section>
  );
}
