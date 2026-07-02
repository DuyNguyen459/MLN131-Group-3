export default function DongSonDrum({ size = 280, className = '' }) {
  const rays = Array.from({ length: 18 });
  const ticks = Array.from({ length: 48 });
  const birds = Array.from({ length: 12 });
  const dots = Array.from({ length: 24 });

  return (
    <svg viewBox="0 0 300 300" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="dongson-bronze" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#f1d66c" stopOpacity="0.32" />
          <stop offset="45%" stopColor="#b98a22" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#7c5730" stopOpacity="0.10" />
        </radialGradient>
      </defs>

      <circle cx="150" cy="150" r="146" fill="url(#dongson-bronze)" />
      <circle cx="150" cy="150" r="145" stroke="var(--accent-bronze)" strokeWidth="2.5" opacity="0.46" />
      <circle cx="150" cy="150" r="132" stroke="var(--accent-gold)" strokeWidth="1.4" opacity="0.62" />
      <circle cx="150" cy="150" r="120" stroke="var(--accent-bronze)" strokeWidth="1" strokeDasharray="8 8" opacity="0.45" />

      {ticks.map((_, i) => {
        const angle = (i * 7.5 * Math.PI) / 180;
        const x1 = 150 + 118 * Math.cos(angle);
        const y1 = 150 + 118 * Math.sin(angle);
        const x2 = 150 + (i % 2 === 0 ? 132 : 127) * Math.cos(angle);
        const y2 = 150 + (i % 2 === 0 ? 132 : 127) * Math.sin(angle);
        return <line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--accent-gold)" strokeWidth="1.4" opacity="0.62" />;
      })}

      <circle cx="150" cy="150" r="105" stroke="var(--accent-gold)" strokeWidth="1.5" opacity="0.56" />
      <circle cx="150" cy="150" r="94" stroke="var(--accent-bronze)" strokeWidth="1.2" opacity="0.48" />

      {birds.map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const cx = 150 + 83 * Math.cos(angle);
        const cy = 150 + 83 * Math.sin(angle);
        return (
          <g key={`bird-${i}`} transform={`translate(${cx}, ${cy}) rotate(${i * 30 + 95})`}>
            <path d="M-10,-2 C-4,-9 6,-8 13,-2 C7,-1 4,3 0,7 C-4,3 -7,0 -10,-2Z" fill="var(--accent-gold)" opacity="0.56" />
            <path d="M6,-2 L18,-6 L10,2" stroke="var(--accent-gold)" strokeWidth="1.4" strokeLinecap="round" opacity="0.48" />
          </g>
        );
      })}

      <circle cx="150" cy="150" r="65" stroke="var(--accent-gold)" strokeWidth="2" opacity="0.7" />
      <circle cx="150" cy="150" r="52" stroke="var(--accent-bronze)" strokeWidth="1.5" opacity="0.55" />

      {dots.map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const radius = i % 2 === 0 ? 43 : 32;
        const x = 150 + radius * Math.cos(angle);
        const y = 150 + radius * Math.sin(angle);
        return <circle key={`dot-${i}`} cx={x} cy={y} r={i % 2 === 0 ? 2.4 : 1.9} fill="var(--accent-gold)" opacity="0.72" />;
      })}

      <circle cx="150" cy="150" r="28" fill="rgba(185, 138, 34, 0.13)" stroke="var(--accent-gold)" strokeWidth="2.2" opacity="0.92" />

      {rays.map((_, i) => {
        const angle = (i * 20 * Math.PI) / 180;
        const angle2 = ((i * 20 + 8) * Math.PI) / 180;
        const angle3 = ((i * 20 - 8) * Math.PI) / 180;
        const p1 = `${150 + 10 * Math.cos(angle)} ${150 + 10 * Math.sin(angle)}`;
        const p2 = `${150 + 26 * Math.cos(angle2)} ${150 + 26 * Math.sin(angle2)}`;
        const p3 = `${150 + 26 * Math.cos(angle3)} ${150 + 26 * Math.sin(angle3)}`;
        return <polygon key={`ray-${i}`} points={`${p1}, ${p2}, ${p3}`} fill="var(--accent-gold)" opacity="0.84" />;
      })}

      <circle cx="150" cy="150" r="8" fill="var(--accent-gold)" opacity="0.95" />
    </svg>
  );
}
