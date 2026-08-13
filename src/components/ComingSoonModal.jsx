import { useEffect } from 'react';

export default function ComingSoonModal({ topic, onClose }) {
  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="comingSoonTitle">
        <p className="modal-kicker">Coming soon</p>
        <h2 id="comingSoonTitle">{topic}</h2>
        <p>Soon, you’ll be able to see it happen for yourself.</p>
        <button onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}
