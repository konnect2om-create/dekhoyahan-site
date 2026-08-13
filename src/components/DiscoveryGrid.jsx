import { useState } from 'react';
import ComingSoonModal from './ComingSoonModal.jsx';

export default function DiscoveryGrid({ items, dark = false }) {
  const [topic, setTopic] = useState(null);

  return (
    <>
      <div className={`discovery-grid ${dark ? 'discovery-grid-dark' : ''}`}>
        {items.map((item, index) => (
          <button
            key={item.title}
            className={`discovery-card ${index === 0 ? 'discovery-featured' : ''}`}
            onClick={() => setTopic(item.title)}
          >
            <span className="discovery-index">0{index + 1}</span>

            {index === 0 && (
              <div className="discovery-motion" aria-hidden="true">
                <span className="motion-line"></span>
                <span className="motion-dot"></span>
              </div>
            )}

            <div className="discovery-copy">
              <h3>{item.title}</h3>
              <p>{item.question}</p>
            </div>

            <span className="discovery-action">{item.action} →</span>
          </button>
        ))}
      </div>

      {topic && <ComingSoonModal topic={topic} onClose={() => setTopic(null)} />}
    </>
  );
}
