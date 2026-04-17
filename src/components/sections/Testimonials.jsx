import SectionReveal from '../ui/SectionReveal';
import { testimonials } from '../../data/content';

const PLACEHOLDER_PHRASES = [
  "Mid-plank. Can't talk right now.",
  "Closing a deal. And a sandwich.",
  "The client is still finding the good lighting.",
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <SectionReveal>
        <h2
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
            color: '#2872a1',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
          className="text-glow"
        >
          What they said when the file landed.
        </h2>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '1.1rem',
            color: '#5a7a8f',
            textAlign: 'center',
            maxWidth: '550px',
            margin: '0 auto 3rem',
          }}
        >
          The one part of the process I don't control — but I read every message twice.
        </p>
      </SectionReveal>

      {/* Testimonial Cards — stacked vertically */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {testimonials.map((t, i) => (
          <SectionReveal key={i}>
            <div
              style={{
                display: 'flex',
                gap: '2rem',
                padding: '2rem',
                backgroundColor: '#e8f1f6',
                borderLeft: '4px solid #2872a1',
                flexWrap: 'wrap',
                alignItems: 'center',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3a8fc0';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(40, 114, 161,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2872a1';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Video side (placeholder or real embed) */}
              <div
                style={{
                  flex: '1 1 260px',
                  aspectRatio: '16/9',
                  backgroundColor: '#cbdde9',
                  border: '1px solid rgba(40, 114, 161,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '0',
                  overflow: 'hidden',
                  borderRadius: '8px',
                }}
              >
                {t.videoUrl ? (
                  <iframe
                    src={t.videoUrl}
                    title={`Testimonial from ${t.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: '100%', height: '100%', border: 'none' }}
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        border: '2px solid rgba(40, 114, 161,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#2872a1">
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontSize: '0.85rem',
                        color: '#6a8499',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        padding: '0 1rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {PLACEHOLDER_PHRASES[i % PLACEHOLDER_PHRASES.length]}
                    </span>
                  </div>
                )}
              </div>

              {/* Text side */}
              <div
                style={{
                  flex: '1 1 280px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {/* Quote mark */}
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: '2.5rem',
                    color: '#2872a1',
                    lineHeight: 1,
                    opacity: 0.4,
                  }}
                >
                  "
                </span>

                <p
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '1.05rem',
                    color: '#2a4a60',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                  }}
                >
                  {t.quote}
                </p>

                <div>
                  <p
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: '#1a3547',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: '0.9rem',
                      color: '#5a7a8f',
                      marginTop: '0.2rem',
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
