import { useEffect, useState } from 'react';
import { navLinks } from '../../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 5%',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.4s ease',
        backgroundColor: scrolled ? 'rgba(203, 221, 233,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(40, 114, 161,0.15)' : '1px solid transparent',
      }}
    >
      <a
        href="#"
        className="brand-gradient"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '1.3rem',
          fontWeight: 800,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        CINAMYSTIC
      </a>

      <div
        style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
        className="nav-links-desktop"
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: '1rem',
              fontWeight: 600,
              color: '#1a3547',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#2872a1')}
            onMouseLeave={(e) => (e.target.style.color = '#1a3547')}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="nav-hamburger"
        aria-label="Toggle menu"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          background: 'none',
          border: 'none',
          padding: '8px',
        }}
      >
        <span style={{ width: '24px', height: '2px', backgroundColor: '#2872a1', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
        <span style={{ width: '24px', height: '2px', backgroundColor: '#2872a1', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
        <span style={{ width: '24px', height: '2px', backgroundColor: '#2872a1', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(219, 232, 241,0.97)',
            backdropFilter: 'blur(12px)',
            padding: '2rem 5%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            borderBottom: '1px solid rgba(40, 114, 161,0.2)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#1a3547',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
