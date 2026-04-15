import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroScene from '../3d/HeroScene';

gsap.registerPlugin(ScrollTrigger);

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export default function HeroSkills({ mouse }) {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=260%',
      pin: pinRef.current,
      scrub: 1,
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    return () => st.kill();
  }, []);

  const scrollHintOpacity = Math.max(0, 1 - scrollProgress * 10);
  const skillsHintOpacity =
    scrollProgress > 0.28 && scrollProgress < 0.92
      ? Math.min(1, (scrollProgress - 0.28) * 6)
      : scrollProgress >= 0.92
      ? Math.max(0, 1 - (scrollProgress - 0.92) * 20)
      : 0;

  // Fade the dark backdrop to #cbdde9 right before unpin — compressed to the
  // final 7% of the scrub so there's no dead-air white hold mid-scroll.
  const exitFade = Math.max(0, Math.min(1, (scrollProgress - 0.93) / 0.07));

  return (
    <section
      ref={containerRef}
      style={{ height: '280vh', position: 'relative' }}
    >
      {/* Anchor for nav "Skills" link — lands at the skills phase, not the hero phase */}
      <div
        id="skills"
        style={{
          position: 'absolute',
          top: '90vh',
          left: 0,
          width: '1px',
          height: '1px',
          pointerEvents: 'none',
        }}
      />
      <div
        ref={pinRef}
        style={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(ellipse 55% 55% at 50% 52%, #0a1520 0%, #122438 35%, #1e3a56 55%, #6e8ea8 78%, #cbdde9 100%)',
        }}
      >
        {/* Dark inner spotlight around the monitor */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 35% 40% at 50% 52%, rgba(5, 12, 22, 0.75) 0%, rgba(5, 12, 22, 0.35) 40%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Exit fade — covers the dark backdrop with the next section's bg
            as scrollProgress approaches 1, so the pin-release is seamless. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#cbdde9',
            opacity: exitFade,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Grain dots */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(rgba(40, 114, 161,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            paddingTop: '70px',
            zIndex: 2,
            opacity: 1 - exitFade,
            transition: 'opacity 0.1s linear',
          }}
        >
          <HeroScene mouse={mouse} scrollProgress={scrollProgress} />
        </div>

        {scrollHintOpacity > 0.02 && (
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              opacity: scrollHintOpacity,
              zIndex: 5,
              animation: 'bounce 2s infinite',
            }}
          >
            <span
              style={{
                fontSize: isMobile ? '0.6rem' : '0.7rem',
                color: '#5a7a8f',
                letterSpacing: '0.2em',
                fontFamily: "'Rajdhani', sans-serif",
                textTransform: 'uppercase',
              }}
            >
              Scroll in. Look closer.
            </span>
            <div
              style={{
                width: '1px',
                height: '26px',
                background: 'linear-gradient(to bottom, #2872a1, transparent)',
              }}
            />
          </div>
        )}

        {skillsHintOpacity > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: isMobile ? '20px' : '32px',
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: skillsHintOpacity,
              textAlign: 'center',
              zIndex: 5,
              background: 'rgba(232, 241, 246,0.92)',
              backdropFilter: 'blur(10px)',
              padding: '10px 22px',
              borderRadius: '8px',
              border: '1px solid rgba(40, 114, 161,0.3)',
              boxShadow: '0 0 30px rgba(40, 114, 161,0.2)',
            }}
          >
            <p
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.65rem',
                color: '#2872a1',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom: '3px',
              }}
            >
              Inside the timeline
            </p>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                color: '#2a4a60',
                letterSpacing: '0.08em',
              }}
            >
              {isMobile ? 'Tap each panel' : 'Hover each panel'}
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
