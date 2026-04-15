import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const containerRef = useRef(null);
  const lettersRef = useRef([]);
  const [done, setDone] = useState(false);

  const brandName = 'CINAMYSTIC';

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            setDone(true);
            onComplete?.();
          },
        });
      },
    });

    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.08,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      }
    );

    tl.to(lettersRef.current, {
      textShadow: '0 0 30px rgba(40, 114, 161,0.8), 0 0 60px rgba(40, 114, 161,0.4)',
      duration: 0.6,
      ease: 'power2.inOut',
    });

    tl.to({}, { duration: 0.5 });

    return () => tl.kill();
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cbdde9',
        perspective: '600px',
      }}
    >
      <div style={{ display: 'flex', gap: '4px' }}>
        {brandName.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => (lettersRef.current[i] = el)}
            className="brand-gradient"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              fontWeight: 800,
              opacity: 0,
              display: 'inline-block',
              transformStyle: 'preserve-3d',
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '45%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #2872a1, transparent)',
          filter: 'blur(4px)',
          opacity: 0.6,
        }}
      />
    </div>
  );
}
