import { useState } from 'react';
import SectionReveal from '../ui/SectionReveal';
import { contact } from '../../data/content';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  };

  const inputStyle = {
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: '1rem',
    padding: '14px 18px',
    backgroundColor: '#e8f1f6',
    border: '1px solid rgba(40, 114, 161,0.15)',
    color: '#1a3547',
    outline: 'none',
    transition: 'border-color 0.3s',
    width: '100%',
  };

  return (
    <section
      id="contact"
      className="section"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(40, 114, 161,0.04) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
        }}
      />

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
          {contact.heading}
        </h2>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '1.1rem',
            color: '#5a7a8f',
            textAlign: 'center',
            maxWidth: '650px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
          }}
        >
          {contact.subtext}
        </p>
      </SectionReveal>

      <SectionReveal>
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            maxWidth: '1000px',
            margin: '0 auto',
            flexWrap: 'wrap',
          }}
        >
          {/* Contact Info */}
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '1.1rem',
                color: '#1a3547',
                letterSpacing: '0.1em',
              }}
            >
              The easy ways in
            </h3>

            <a
              href={`mailto:${contact.email}`}
              data-hover
              style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: '#2a4a60', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2872a1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
              {contact.email}
            </a>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: '#2a4a60', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2872a1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              @cinamystic
            </a>

            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-hover
              style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: '#2a4a60', display: 'flex', alignItems: 'center', gap: '0.8rem', transition: 'color 0.3s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2872a1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ccc')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {contact.phone}
            </a>

            {contact.location && (
              <div
                style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '1rem', color: '#2a4a60', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {contact.location}
              </div>
            )}
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#2872a1')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(40, 114, 161,0.15)')}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#2872a1')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(40, 114, 161,0.15)')}
            />
            <textarea
              placeholder="What are you trying to make — and who's it for?"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={(e) => (e.target.style.borderColor = '#2872a1')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(40, 114, 161,0.15)')}
            />
            <button
              type="submit"
              data-hover
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 700,
                padding: '16px 32px',
                backgroundColor: '#2872a1',
                color: '#1a3547',
                border: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.3s',
                boxShadow: '0 0 20px rgba(40, 114, 161,0.3)',
                alignSelf: 'stretch',
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 0 30px rgba(40, 114, 161,0.6)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 0 20px rgba(40, 114, 161,0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Send the brief
            </button>
          </form>
        </div>
      </SectionReveal>

      {/* Footer */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '5rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(40, 114, 161,0.1)',
        }}
      >
        <p
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '0.75rem',
            color: '#6a8499',
            letterSpacing: '0.1em',
          }}
        >
          &copy; {new Date().getFullYear()} CINAMYSTIC · Rahul Singh Panwar · Mumbai
          <br />
          <span style={{ fontFamily: "'Rajdhani', sans-serif", color: '#5a4840' }}>
            If you've scrolled this far, you're not just browsing. Might as well say hi.
          </span>
        </p>
      </div>
    </section>
  );
}
