export default function DongSonDrum({ size = 280, className = "" }) {
  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outermost ring */}
      <circle cx="150" cy="150" r="145" stroke="var(--accent-bronze)" strokeWidth="2" opacity="0.4" />
      <circle cx="150" cy="150" r="130" stroke="var(--accent-gold)" strokeWidth="1.5" opacity="0.5" />

      {/* Geometric band — simplified Dong Son pattern */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = (i * 15 * Math.PI) / 180;
        const x1 = 150 + 115 * Math.cos(angle);
        const y1 = 150 + 115 * Math.sin(angle);
        const x2 = 150 + 128 * Math.cos(angle);
        const y2 = 150 + 128 * Math.sin(angle);
        return (
          <line
            key={`ray-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--accent-gold)"
            strokeWidth="1.5"
            opacity="0.6"
          />
        );
      })}

      {/* Second decorative ring */}
      <circle cx="150" cy="150" r="110" stroke="var(--accent-bronze)" strokeWidth="2.5" opacity="0.5" />
      <circle cx="150" cy="150" r="100" stroke="var(--accent-gold)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

      {/* Inner geometric pattern — stylized birds */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 150 + 85 * Math.cos(angle);
        const cy = 150 + 85 * Math.sin(angle);
        return (
          <g key={`bird-${i}`} transform={`translate(${cx}, ${cy}) rotate(${i * 45 + 90})`}>
            <path
              d="M-8,-3 Q0,-10 8,-3 Q5,0 0,5 Q-5,0 -8,-3Z"
              fill="var(--accent-gold)"
              opacity="0.5"
            />
          </g>
        );
      })}

      {/* Middle rings */}
      <circle cx="150" cy="150" r="65" stroke="var(--accent-gold)" strokeWidth="2" opacity="0.6" />
      <circle cx="150" cy="150" r="55" stroke="var(--accent-bronze)" strokeWidth="1.5" opacity="0.4" />

      {/* Inner triangular pattern */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x = 150 + 48 * Math.cos(angle);
        const y = 150 + 48 * Math.sin(angle);
        return (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="2.5"
            fill="var(--accent-gold)"
            opacity="0.7"
          />
        );
      })}

      {/* Center star */}
      <circle cx="150" cy="150" r="30" stroke="var(--accent-gold)" strokeWidth="2.5" opacity="0.8" />
      <circle cx="150" cy="150" r="18" fill="var(--accent-gold)" opacity="0.15" />
      <polygon
        points="150,134 154,146 167,146 157,154 160,166 150,158 140,166 143,154 133,146 146,146"
        fill="var(--accent-gold)"
        opacity="0.9"
      />
    </svg>
  );
}
