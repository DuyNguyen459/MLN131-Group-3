import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Landmark, Building2, Scale, ArrowDown } from 'lucide-react';

/* Inline SVG Dong Son Drum — concentric circles with geometric pattern */
function DongSonDrum({ size = 280 }) {
  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

/* Branch nodes that fly out from the drum */
const branchNodes = [
  {
    id: 'lap-phap',
    label: 'Lập pháp',
    subtitle: 'Quốc hội',
    icon: Landmark,
    color: 'var(--accent-gold)',
    bgColor: 'var(--accent-gold-dim)',
    x: -320,
    y: -60,
  },
  {
    id: 'hanh-phap',
    label: 'Hành pháp',
    subtitle: 'Chính phủ',
    icon: Building2,
    color: 'var(--accent-teal)',
    bgColor: 'var(--accent-teal-dim)',
    x: 0,
    y: -200,
  },
  {
    id: 'tu-phap',
    label: 'Tư pháp',
    subtitle: 'Tòa án',
    icon: Scale,
    color: 'var(--accent-red)',
    bgColor: 'var(--accent-red-dim)',
    x: 320,
    y: -60,
  },
];

export default function HeroSection() {
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = () => {
    setIsActivated(true);
    // After animation, scroll to branches
    setTimeout(() => {
      const el = document.getElementById('branches');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 2800);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Background radial spots */}
      <div
        className="radial-spot-gold"
        style={{ top: '-10%', left: '20%' }}
      />
      <div
        className="radial-spot-teal"
        style={{ bottom: '-10%', right: '15%' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Title — always visible */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span
            className="badge badge-gold mb-6 inline-flex"
            style={{ fontSize: '0.8rem', padding: '6px 16px' }}
          >
            MLN131 — Nhóm 3
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-black mb-4 glow-text-gold"
          style={{
            color: 'var(--accent-gold)',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '-0.03em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Hành trình Pháp quyền
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-10 max-w-2xl"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Dân chủ Xã hội Chủ nghĩa & Nhà nước Pháp quyền Việt Nam
        </motion.p>

        {/* Drum + Activation area */}
        <div className="relative" style={{ minHeight: 400 }}>
          <AnimatePresence mode="wait">
            {!isActivated ? (
              /* Pre-activation: Drum + Button */
              <motion.div
                key="pre"
                className="flex flex-col items-center"
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
                  }}
                  className="mb-8"
                >
                  <DongSonDrum size={240} />
                </motion.div>

                <motion.button
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg cursor-pointer"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--accent-gold), var(--accent-bronze))',
                    color: '#0A0F1E',
                    border: 'none',
                    fontFamily: 'var(--font-heading)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(212, 168, 83, 0.5)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleActivate}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Zap size={22} />
                  Khởi động hệ thống
                </motion.button>
              </motion.div>
            ) : (
              /* Post-activation: Drum expands → branch nodes fly out */
              <motion.div
                key="post"
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Central drum pulsing then shrinking */}
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{
                    scale: [1, 1.3, 0.6],
                    opacity: [1, 1, 0.6],
                  }}
                  transition={{ duration: 1.5, times: [0, 0.4, 1] }}
                  className="relative"
                >
                  <DongSonDrum size={200} />
                </motion.div>

                {/* Branch nodes flying out */}
                {branchNodes.map((node, i) => {
                  const Icon = node.icon;
                  return (
                    <motion.div
                      key={node.id}
                      className="absolute flex items-center gap-3 px-5 py-4 rounded-2xl"
                      style={{
                        background: node.bgColor,
                        border: `1px solid ${node.color}`,
                        top: '50%',
                        left: '50%',
                      }}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: node.x,
                        y: node.y,
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 1.0 + i * 0.2,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                    >
                      <div
                        className="rounded-xl p-2"
                        style={{ background: node.bgColor }}
                      >
                        <Icon size={24} style={{ color: node.color }} />
                      </div>
                      <div>
                        <p
                          className="font-bold text-sm"
                          style={{ color: node.color }}
                        >
                          {node.label}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {node.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Connection lines (SVG) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 500 }}
                >
                  {branchNodes.map((node, i) => (
                    <motion.line
                      key={`line-${node.id}`}
                      x1={400}
                      y1={250}
                      x2={400 + node.x}
                      y2={250 + node.y}
                      stroke={node.color}
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      opacity="0.4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ duration: 0.6, delay: 1.2 + i * 0.2 }}
                    />
                  ))}
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={24} style={{ color: 'var(--text-muted)' }} />
        </motion.div>
      </div>
    </section>
  );
}
