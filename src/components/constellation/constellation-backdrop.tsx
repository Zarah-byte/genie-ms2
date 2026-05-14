export function ConstellationBackdrop() {
  return (
    <div className="absolute inset-0 celestial-bg" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full">
        <circle cx="18%" cy="22%" r="1.2" fill="rgba(255,255,255,0.92)" />
        <circle cx="31%" cy="62%" r="1.5" fill="rgba(255,255,255,0.8)" />
        <circle cx="77%" cy="17%" r="1.4" fill="rgba(255,255,255,0.9)" />
        <circle cx="66%" cy="72%" r="1.1" fill="rgba(255,255,255,0.72)" />
        <circle cx="90%" cy="36%" r="1.3" fill="rgba(255,255,255,0.78)" />
        <line x1="20%" y1="22%" x2="30%" y2="62%" className="constellation-line" />
        <line x1="30%" y1="62%" x2="66%" y2="72%" className="constellation-line" />
        <line x1="66%" y1="72%" x2="78%" y2="18%" className="constellation-line" />
      </svg>
    </div>
  );
}
