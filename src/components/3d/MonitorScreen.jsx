import { useEffect, useRef, useState } from 'react';
import { brand, skills } from '../../data/content';

/*
  HTML content rendered ON the 3D monitor screen.
  Two phases crossfade based on scrollProgress:
  - Phase 0 (hero): brand + tagline + scrubbing timeline
  - Phase 1 (skills): interactive skill panel grid
*/

const RESIN = '#2872a1';
const RESIN_LIGHT = '#3a8fc0';
const CARAMEL = '#0a1520';         // Matches curved screen glow base
const CARAMEL_LIGHT = '#14243a';   // Raised panel on screen
const TEXT = '#e8f1f6';            // Light text on dark screen
const TEXT_MUTED = '#7a95a8';

// Timeline scrubber — uses refs for DOM updates to avoid React re-renders
const BARS = Array.from({ length: 60 }, (_, i) =>
  Math.abs(Math.sin(i * 0.7) * 0.6 + Math.cos(i * 0.3) * 0.4)
);

function TimelineScrubber() {
  const barRefs = useRef([]);
  const playheadRef = useRef(null);
  const timecodeRef = useRef(null);

  useEffect(() => {
    let raf;
    const start = Date.now();
    const tick = () => {
      const t = ((Date.now() - start) / 6000) % 1;

      // Update bar colors directly
      barRefs.current.forEach((el, i) => {
        if (el) el.style.background = i / BARS.length < t ? RESIN : RESIN + '55';
      });

      // Move playhead
      if (playheadRef.current) playheadRef.current.style.left = `${t * 100}%`;

      // Update timecode
      if (timecodeRef.current) {
        timecodeRef.current.textContent =
          `00:00:${String(Math.floor(t * 60)).padStart(2, '0')}:${String(Math.floor((t * 60 * 30) % 30)).padStart(2, '0')}`;
      }

      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ width: '100%', padding: '0 24px' }}>
      {/* Track numbers */}
      <div style={{ display: 'flex', gap: '14px', fontSize: '9px', color: TEXT_MUTED, fontFamily: "'Rajdhani', sans-serif", marginBottom: '6px', letterSpacing: '0.1em' }}>
        <span>V1 — HERO CUT</span>
        <span>A1 — VOICE</span>
        <span>A2 — SCORE</span>
      </div>

      {/* Video track */}
      <div style={{ position: 'relative', height: '22px', background: CARAMEL_LIGHT, border: `1px solid ${RESIN}33`, borderRadius: '3px', overflow: 'hidden', marginBottom: '4px' }}>
        <div style={{ position: 'absolute', left: '4%', top: '2px', bottom: '2px', width: '28%', background: `linear-gradient(90deg, ${RESIN}, ${RESIN_LIGHT})`, borderRadius: '2px', opacity: 0.85 }} />
        <div style={{ position: 'absolute', left: '36%', top: '2px', bottom: '2px', width: '22%', background: `linear-gradient(90deg, ${RESIN_LIGHT}, ${RESIN})`, borderRadius: '2px', opacity: 0.7 }} />
        <div style={{ position: 'absolute', left: '62%', top: '2px', bottom: '2px', width: '32%', background: `linear-gradient(90deg, ${RESIN}, ${RESIN_LIGHT})`, borderRadius: '2px', opacity: 0.85 }} />
      </div>

      {/* Audio waveform */}
      <div style={{ position: 'relative', height: '26px', background: CARAMEL_LIGHT, border: `1px solid ${RESIN}22`, borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3px' }}>
        {BARS.map((h, i) => (
          <div key={i} ref={(el) => (barRefs.current[i] = el)} style={{
            width: '2px',
            height: `${h * 22}px`,
            background: RESIN + '55',
            borderRadius: '1px',
          }} />
        ))}
      </div>

      {/* Playhead */}
      <div style={{ position: 'relative', height: '1px', marginTop: '-52px' }}>
        <div ref={playheadRef} style={{
          position: 'absolute',
          left: '0%',
          top: '-2px',
          width: '2px',
          height: '56px',
          background: TEXT,
          boxShadow: `0 0 8px ${TEXT}`,
          zIndex: 2,
        }} />
      </div>

      {/* Timecode */}
      <div ref={timecodeRef} style={{ marginTop: '30px', fontSize: '10px', fontFamily: "'Orbitron', sans-serif", color: RESIN, letterSpacing: '0.15em', textAlign: 'center' }}>
        00:00:00:00
      </div>
    </div>
  );
}

// Skill shape icons (SVG — lightweight, warm amber)
const SKILL_ICONS = {
  scissors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.74 3.04" /><path d="M21 4v5h-5" /><path d="M12 8v4l3 2" />
    </svg>
  ),
  reel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="3" x2="12" y2="9" /><line x1="12" y1="15" x2="12" y2="21" /><line x1="3" y1="12" x2="9" y2="12" /><line x1="15" y1="12" x2="21" y2="12" />
    </svg>
  ),
  waveform: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="10" width="2" height="4" /><rect x="5" y="7" width="2" height="10" /><rect x="8" y="4" width="2" height="16" /><rect x="11" y="8" width="2" height="8" /><rect x="14" y="5" width="2" height="14" /><rect x="17" y="9" width="2" height="6" /><rect x="20" y="11" width="2" height="2" />
    </svg>
  ),
  cursor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 13l6 6" /><path d="M4 4l7 16 2-7 7-2z" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  playbutton: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" /><polygon points="10 8 16 12 10 16" fill="currentColor" />
    </svg>
  ),
  clapperboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="8" width="20" height="13" rx="1" /><path d="M2 8l3-5 4 5" /><path d="M9 8l3-5 4 5" /><path d="M16 8l3-5 3 5" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
    </svg>
  ),
  filmstrip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" /><line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="7" x2="22" y2="7" /><line x1="17" y1="17" x2="22" y2="17" />
    </svg>
  ),
};

export default function MonitorScreen({ scrollProgress, hoveredSkill, setHoveredSkill }) {
  // Phase crossfade
  const heroOpacity = Math.max(0, 1 - scrollProgress * 3);
  const skillsOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.25) * 2.5));
  const showHero = heroOpacity > 0.01;
  const showSkills = skillsOpacity > 0.01;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `radial-gradient(ellipse at 50% 45%, #14243a 0%, ${CARAMEL} 45%, #050b14 100%)`,
        color: TEXT,
        fontFamily: "'Rajdhani', sans-serif",
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '2px',
        boxShadow: `inset 0 0 80px ${RESIN}22, inset 0 0 20px ${RESIN}44`,
      }}
    >
      {/* Ambient scanline texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(180deg, transparent 0, transparent 2px, rgba(40, 114, 161,0.025) 2px, rgba(40, 114, 161,0.025) 3px)`,
        pointerEvents: 'none',
      }} />

      {/* Top bar — fake editor chrome */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 18px',
        borderBottom: `1px solid ${RESIN}22`,
        fontSize: '10px',
        letterSpacing: '0.15em',
        color: TEXT_MUTED,
        textTransform: 'uppercase',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e85555' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e0b050' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: RESIN }} />
        </div>
        <span style={{ color: RESIN, fontFamily: "'Orbitron', sans-serif", fontWeight: 700 }}>CINAMYSTIC.PROJ</span>
        <span style={{ marginLeft: 'auto', fontFamily: "'Orbitron', sans-serif" }}>REC ●</span>
      </div>

      {/* HERO PHASE */}
      {showHero && (
        <div style={{
          position: 'absolute',
          inset: '40px 0 0 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
          opacity: heroOpacity,
          transition: 'opacity 0.3s',
          pointerEvents: heroOpacity > 0.5 ? 'auto' : 'none',
        }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '52px',
            fontWeight: 900,
            background: `linear-gradient(135deg, ${CARAMEL} 0%, #1f5c85 40%, ${RESIN} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.05em',
            marginBottom: '4px',
            filter: `drop-shadow(0 0 24px ${RESIN}66)`,
          }}>
            {brand.name}
          </div>
          <div style={{
            fontSize: '11px',
            color: TEXT_MUTED,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}>
            {brand.aka}
          </div>
          <div style={{
            fontSize: '18px',
            color: TEXT,
            fontWeight: 600,
            textAlign: 'center',
            maxWidth: '480px',
            lineHeight: 1.35,
            marginBottom: '28px',
          }}>
            {brand.tagline}
          </div>
          <TimelineScrubber />
        </div>
      )}

      {/* SKILLS PHASE */}
      {showSkills && (
        <div style={{
          position: 'absolute',
          inset: '40px 0 0 0',
          padding: '18px 28px',
          opacity: skillsOpacity,
          transition: 'opacity 0.3s',
          pointerEvents: skillsOpacity > 0.5 ? 'auto' : 'none',
        }}>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '12px',
            color: RESIN,
            letterSpacing: '0.25em',
            marginBottom: '14px',
            textAlign: 'center',
          }}>
            ── WHAT LANDS ON YOUR TIMELINE ──
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
          }}>
            {skills.map((skill, i) => {
              const isHovered = hoveredSkill === i;
              return (
                <div
                  key={skill.name}
                  onMouseEnter={() => setHoveredSkill(i)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${RESIN}33, ${RESIN}11)`
                      : CARAMEL_LIGHT,
                    border: `1px solid ${isHovered ? RESIN : RESIN + '22'}`,
                    borderRadius: '6px',
                    padding: '12px 6px 10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    transform: isHovered ? 'translateY(-3px) scale(1.04)' : 'none',
                    boxShadow: isHovered ? `0 6px 20px ${RESIN}55, 0 0 30px ${RESIN}33` : 'none',
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    margin: '0 auto 6px',
                    color: isHovered ? RESIN_LIGHT : RESIN,
                    filter: isHovered ? `drop-shadow(0 0 8px ${RESIN})` : 'none',
                    transition: 'all 0.25s',
                  }}>
                    {SKILL_ICONS[skill.shape]}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: "-apple-system, 'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif",
                    color: TEXT,
                    letterSpacing: '0.01em',
                    lineHeight: 1.2,
                    fontWeight: 500,
                    height: '12px',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                  }}>
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom status bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '6px 18px',
        borderTop: `1px solid ${RESIN}22`,
        fontSize: '9px',
        letterSpacing: '0.15em',
        color: TEXT_MUTED,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: "'Rajdhani', sans-serif",
      }}>
        <span>4K • 24FPS • REC.709 · DELIVERED ON TIME</span>
        <span style={{ color: RESIN }}>● LIVE</span>
      </div>
    </div>
  );
}
