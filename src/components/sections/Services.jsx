import SectionReveal from '../ui/SectionReveal';
import { services } from '../../data/content';

export default function Services() {
  return (
    <section id="services" className="section">
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
          What I actually do.
        </h2>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '1.1rem',
            color: '#5a7a8f',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 3rem',
          }}
        >
          Four services, done properly — not fourteen things done fast.
        </p>
      </SectionReveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {services.map((service, i) => (
          <SectionReveal key={i}>
            <div
              data-hover
              style={{
                padding: '2.5rem 2rem',
                background: '#e8f1f6',
                border: '1px solid rgba(40, 114, 161,0.1)',
                transition: 'all 0.4s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2872a1';
                e.currentTarget.style.transform = 'translateY(-5px) perspective(800px) rotateX(2deg)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(40, 114, 161,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(40, 114, 161,0.1)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>{service.icon}</span>
              <h3
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#1a3547',
                  letterSpacing: '0.05em',
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontSize: '1rem',
                  color: '#5a7a8f',
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {service.description}
              </p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
