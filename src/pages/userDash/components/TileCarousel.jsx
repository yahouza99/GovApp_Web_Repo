import React, { useEffect, useRef } from 'react';
import QuickTile from './QuickTile';

export default function TileCarousel({ tiles, selected, onSelect, itemMinWidth = 210, className = '' }) {
  const containerRef = useRef(null);
  const scrollPosRef = useRef(0);

  // Restore scroll on mount and whenever selection changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Defer to next paint to ensure layout is ready
    requestAnimationFrame(() => {
      el.scrollLeft = scrollPosRef.current || 0;
    });
  }, [selected]);

  // Save scroll as user moves the carousel
  const handleScroll = (e) => {
    scrollPosRef.current = e.currentTarget.scrollLeft;
  };

  return (
    <div className={`-mx-2 mb-4 ${className}`}>
      <div ref={containerRef} onScroll={handleScroll} className="overflow-x-auto no-scrollbar">
        <div className="flex items-stretch gap-3 px-2 py-1">
          {tiles.map((t) => (
            <QuickTile
              key={t.key}
              title={t.title}
              icon={t.icon}
              onClick={t.onClick || (() => onSelect?.(t.key))}
              active={selected === t.key}
              size="sm"
              className={`min-w-[${itemMinWidth}px]`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
