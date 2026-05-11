import { useState } from 'react';

const NOVA_URL = 'https://ai.studio/apps/e6be6645-403a-41f1-9fea-ce0218931e68';
const W = 520;
const H = 680;

export default function AIChatButton() {
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);

  const openNova = () => {
    const left = Math.round(window.screenX + (window.outerWidth - W) / 2);
    const top = Math.round(window.screenY + (window.outerHeight - H) / 2);
    window.open(
      NOVA_URL,
      'nova-chat',
      `width=${W},height=${H},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,scrollbars=no,resizable=no`
    );
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 999,
      }}
    >
      <button
        onClick={openNova}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2872a1 0%, #1a4d70 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered
            ? '0 8px 32px rgba(40, 114, 161, 0.5), 0 0 0 3px rgba(40, 114, 161, 0.25)'
            : '0 4px 20px rgba(40, 114, 161, 0.35)',
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          position: 'relative',
        }}
        aria-label="Chat with Nova"
      >
        {/* Nova icon — sparkle / star */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 2L16.18 10.27L24.5 10.27L17.82 15.41L20.18 23.41L14 18.27L7.82 23.41L10.18 15.41L3.5 10.27L11.82 10.27L14 2Z"
            fill="#e8f1f6"
            stroke="#e8f1f6"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Pulse ring */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '2px solid #2872a1',
            animation: 'novaPulse 2s ease-out infinite',
            pointerEvents: 'none',
          }}
        />
      </button>

      {/* Tooltip */}
      <div
        style={{
          position: 'absolute',
          bottom: '72px',
          right: 0,
          background: '#1a3547',
          color: '#e8f1f6',
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: '0.78rem',
          letterSpacing: '0.06em',
          padding: '7px 14px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 16px rgba(26, 53, 71, 0.3)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.25s, transform 0.25s',
          pointerEvents: 'none',
        }}
      >
        Chat with NOVA
      </div>

      <style>{`
        @keyframes novaPulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}