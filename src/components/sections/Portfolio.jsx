import { useState, useEffect } from 'react';
import SectionReveal from '../ui/SectionReveal';
import { projects, categories } from '../../data/content';

function VideoModal({ project, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(5, 12, 22, 0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        animation: 'modalFadeIn 0.25s ease',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        data-hover
        style={{
          position: 'absolute',
          top: '1.2rem',
          right: '1.5rem',
          background: 'none',
          border: '1px solid rgba(40, 114, 161, 0.4)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.3s, background 0.3s',
          zIndex: 2,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#2872a1';
          e.currentTarget.style.background = 'rgba(40, 114, 161, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(40, 114, 161, 0.4)';
          e.currentTarget.style.background = 'none';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" stroke="#e8f1f6" strokeWidth="2" fill="none">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Video */}
      <video
        src={project.videoUrl}
        controls
        autoPlay
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '75vh',
          borderRadius: '10px',
          background: '#000',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
        }}
      />

      {/* Project info */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '1rem',
          textAlign: 'center',
          maxWidth: '600px',
        }}
      >
        <span
          style={{
            fontFamily: "-apple-system, 'Inter', 'Segoe UI', sans-serif",
            fontSize: '0.6rem',
            fontWeight: 600,
            padding: '3px 10px',
            border: '1px solid rgba(40, 114, 161, 0.4)',
            borderRadius: '20px',
            color: '#2872a1',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {project.category}
        </span>
        <h3
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 700,
            color: '#e8f1f6',
            marginTop: '0.6rem',
            letterSpacing: '0.03em',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '0.95rem',
            color: '#7a95a8',
            lineHeight: 1.5,
            marginTop: '0.3rem',
          }}
        >
          {project.description}
        </p>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function ProjectCard({ project, onPlay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(project)}
      style={{
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        background: '#e8f1f6',
        border: '1px solid rgba(40, 114, 161, 0.18)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        borderColor: hovered ? 'rgba(40, 114, 161, 0.5)' : 'rgba(40, 114, 161, 0.18)',
        boxShadow: hovered
          ? '0 14px 40px rgba(40, 114, 161, 0.22)'
          : '0 4px 16px rgba(26, 53, 71, 0.08)',
      }}
    >
      {/* ── Thumbnail ── */}
      <div style={{ position: 'relative', aspectRatio: '16 / 10', overflow: 'hidden' }}>
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        {/* Play button — appears on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: hovered
              ? 'linear-gradient(to top, rgba(10, 25, 40, 0.55) 0%, rgba(10, 25, 40, 0.15) 100%)'
              : 'transparent',
            transition: 'background 0.3s ease',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#2872a1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 24px rgba(40, 114, 161, 0.55)',
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'scale(1)' : 'scale(0.65)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
              <polygon points="6,3 21,12 6,21" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Info panel — always visible ── */}
      <div
        style={{
          padding: '1.1rem 1.2rem 1.3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
        }}
      >
        <span
          style={{
            fontFamily: "-apple-system, 'Inter', 'Segoe UI', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 600,
            padding: '3px 10px',
            border: '1px solid rgba(40, 114, 161, 0.4)',
            borderRadius: '20px',
            color: '#2872a1',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'inline-block',
            width: 'fit-content',
          }}
        >
          {project.category}
        </span>
        <h3
          style={{
            fontFamily: "-apple-system, 'Inter', 'Segoe UI', sans-serif",
            fontSize: '1.05rem',
            fontWeight: 600,
            color: '#1a3547',
            letterSpacing: '0.01em',
            lineHeight: 1.3,
          }}
        >
          {project.title}
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateRows: hovered ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.35s ease',
          }}
        >
          <p
            style={{
              fontFamily: "-apple-system, 'Inter', 'Segoe UI', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 400,
              color: '#5a7a8f',
              lineHeight: 1.5,
              margin: 0,
              overflow: 'hidden',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="section">
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
          The work speaks. Loudly.
        </h2>
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '1.1rem',
            color: '#5a7a8f',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 2.5rem',
          }}
        >
          A handful of recent projects — the kind that made clients forward them before I'd even invoiced.
        </p>
      </SectionReveal>

      {/* Filter Tabs */}
      <SectionReveal>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.8rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-hover
              style={{
                fontFamily: "-apple-system, 'Inter', 'Segoe UI', sans-serif",
                fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
                fontWeight: 500,
                padding: 'clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px)',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#2872a1' : 'rgba(40, 114, 161,0.2)',
                backgroundColor: activeCategory === cat ? '#2872a1' : 'transparent',
                color: activeCategory === cat ? '#ffffff' : '#1a3547',
                letterSpacing: '0.06em',
                transition: 'all 0.3s',
                borderRadius: '24px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </SectionReveal>

      {/* Project Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
          gap: '1.2rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {filtered.map((project) => (
          <SectionReveal key={project.id}>
            <ProjectCard project={project} onPlay={setActiveProject} />
          </SectionReveal>
        ))}
      </div>

      {activeProject && (
        <VideoModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
