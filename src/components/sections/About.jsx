import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionReveal from '../ui/SectionReveal';
import { about, contact } from '../../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const statsRef = useRef([]);

  useEffect(() => {
    statsRef.current.forEach((el) => {
      if (!el) return;
      const target = el.dataset.value;
      const match = target.match(/^(\d+)(.*)$/);
      if (!match) return;
      const num = parseInt(match[1]);
      const suffix = match[2];
      const valueEl = el.querySelector('.stat-value');
      const counter = { val: 0 };
      gsap.to(counter, {
        val: num,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          valueEl.textContent = Math.round(counter.val) + suffix;
        },
        scrollTrigger: { trigger: el, start: 'top 80%' },
      });
    });
  }, []);

  return (
    <section id="about" className="section">
      <SectionReveal>
        <h2
          className="text-glow"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: '#2872a1',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          {about.title}
        </h2>
      </SectionReveal>

      <SectionReveal>
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            maxWidth: '1100px',
            margin: '0 auto 3rem',
            flexWrap: 'wrap',
            alignItems: 'stretch',
          }}
        >
          {/* Signature Card — Left */}
          <div
            style={{
              flex: '1 1 280px',
              minWidth: '0',
              padding: '2.5rem 2rem',
              background:
                'linear-gradient(145deg, #e8f1f6 0%, #cbdde9 50%, #a5c0d2 100%)',
              border: '1px solid rgba(40, 114, 161,0.2)',
              borderRadius: '12px',
              boxShadow:
                '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(40, 114, 161,0.15)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1.2rem',
            }}
          >
            {/* Glow accent */}
            <div
              style={{
                position: 'absolute',
                top: '-40%',
                right: '-20%',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(40, 114, 161,0.25) 0%, transparent 70%)',
                filter: 'blur(20px)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '0.7rem',
                color: '#5a7a8f',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Framed, cut, and second-guessed by
            </div>

            <div
              className="brand-gradient"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 900,
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}
            >
              RAHUL SINGH PANWAR
            </div>

            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.8rem',
                color: '#2872a1',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              KNOWN AS CINAMYSTIC
            </div>

            <div
              style={{
                height: '1px',
                background:
                  'linear-gradient(90deg, rgba(40, 114, 161,0.5), transparent)',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2a4a60',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2872a1" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {contact.location}
              </div>
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2a4a60',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2872a1" strokeWidth="2">
                  <polyline points="12 6 12 12 16 14" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                3+ years crafting stories on the timeline
              </div>
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '0.95rem',
                  color: '#2a4a60',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2872a1" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Editor • Cinematographer • AI Craftsman
              </div>
            </div>
          </div>

          {/* Bio text — Right */}
          <div
            style={{
              flex: '1 1 400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              justifyContent: 'center',
            }}
          >
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  color: '#2a4a60',
                  lineHeight: 1.8,
                }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* Stats */}
      <SectionReveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {about.stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => (statsRef.current[i] = el)}
              data-value={stat.value}
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                background: '#e8f1f6',
                border: '1px solid rgba(40, 114, 161,0.15)',
                borderRadius: '8px',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(40, 114, 161,0.5)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(40, 114, 161,0.2)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(40, 114, 161,0.15)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div
                className="stat-value"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: '#2872a1',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '1rem',
                  color: '#5a7a8f',
                  marginTop: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
