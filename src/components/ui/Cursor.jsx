import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const HOVERABLE_SELECTOR = 'a, button, [data-hover]';
    let inHoverable = false;

    const enterHoverable = () => {
      if (!dotRef.current || !ringRef.current) return;
      dotRef.current.style.transform = 'translate(-50%, -50%) scale(0)';
      ringRef.current.style.width = '50px';
      ringRef.current.style.height = '50px';
      ringRef.current.style.borderColor = '#2872a1';
      ringRef.current.style.backgroundColor = 'rgba(40, 114, 161, 0.1)';
    };

    const leaveHoverable = () => {
      if (!dotRef.current || !ringRef.current) return;
      dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      ringRef.current.style.width = '30px';
      ringRef.current.style.height = '30px';
      ringRef.current.style.borderColor = 'rgba(40, 114, 161, 0.5)';
      ringRef.current.style.backgroundColor = 'transparent';
    };

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
      const target = e.target;
      const nowInside = !!(target && target.closest && target.closest(HOVERABLE_SELECTOR));
      if (nowInside && !inHoverable) {
        inHoverable = true;
        enterHoverable();
      } else if (!nowInside && inHoverable) {
        inHoverable = false;
        leaveHoverable();
      }
    };

    const onMouseLeaveWindow = () => {
      visible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveWindow);

    let raf;
    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      dotPos.current.x = lerp(dotPos.current.x, pos.current.x, 0.35);
      dotPos.current.y = lerp(dotPos.current.y, pos.current.y, 0.35);
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top = `${dotPos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
    };
  }, []);

  const baseStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 99999,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
    transition: 'width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s, opacity 0.3s',
  };

  return (
    <>
      <div
        ref={dotRef}
        style={{
          ...baseStyle,
          width: '8px',
          height: '8px',
          backgroundColor: '#2872a1',
          boxShadow: '0 0 10px rgba(40, 114, 161,0.6), 0 0 20px rgba(40, 114, 161,0.3)',
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...baseStyle,
          width: '30px',
          height: '30px',
          border: '1.5px solid rgba(40, 114, 161, 0.5)',
          backgroundColor: 'transparent',
        }}
      />
    </>
  );
}
