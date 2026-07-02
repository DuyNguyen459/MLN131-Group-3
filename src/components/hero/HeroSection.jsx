import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Building2, Landmark, Scale, ShieldCheck, Zap } from 'lucide-react';
import DongSonDrum from '../common/DongSonDrum';
import heroImage from '../../assets/hero.png';

const branchNodes = [
  {
    id: 'lap-phap',
    label: 'Lập pháp',
    subtitle: 'Quốc hội',
    icon: Landmark,
    color: 'var(--accent-gold)',
    className: 'hero-orbit-node left',
    path: 'M250,248 C205,258 166,280 134,314',
  },
  {
    id: 'hanh-phap',
    label: 'Hành pháp',
    subtitle: 'Chính phủ',
    icon: Building2,
    color: 'var(--accent-teal)',
    className: 'hero-orbit-node top',
    path: 'M300,210 C300,170 300,135 300,104',
  },
  {
    id: 'tu-phap',
    label: 'Tư pháp',
    subtitle: 'Tòa án, Viện kiểm sát',
    icon: Scale,
    color: 'var(--accent-red)',
    className: 'hero-orbit-node right',
    path: 'M350,248 C395,258 434,280 466,314',
  },
];

export default function HeroSection() {
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = () => {
    setIsActivated(true);
  };

  return (
    <section
      id="hero"
      className={`relative min-h-[100svh] flex items-center justify-center overflow-hidden hero-stage ${isActivated ? 'is-activated' : ''}`}
    >
      <img src={heroImage} alt="" className="hero-image" />
      <div className="hero-scrim" />

      <div className="relative z-10 section-container hero-container w-full">
        <div className="hero-layout">
          <motion.div
            className="hero-copy-block"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="badge badge-gold mb-4 inline-flex">MLN131 - Nhóm 3</span>
            <h1 className="hero-title">Dân chủ XHCN và Nhà nước pháp quyền Việt Nam</h1>
            <p className="hero-copy">
              Hành trình trình bày mô hình Nhà nước của Nhân dân, do Nhân dân, vì Nhân dân:
              quyền lực nhà nước thống nhất, có phân công, phối hợp và kiểm soát.
            </p>

            <div className="hero-facts">
              <div>
                <ShieldCheck size={18} />
                <span>Hiến pháp hiện hành</span>
              </div>
              <div>
                <Landmark size={18} />
                <span>Nghị quyết 27-NQ/TW</span>
              </div>
              <div>
                <Scale size={18} />
                <span>Không dùng “tam quyền phân lập”</span>
              </div>
            </div>

            <motion.button className="hero-cta" whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }} onClick={handleActivate}>
              <Zap size={20} />
              {isActivated ? 'Đang mở hệ thống' : 'Khởi động hành trình'}
            </motion.button>
          </motion.div>

          <motion.div
            className={`hero-orbit ${isActivated ? 'is-activated' : ''}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <svg className="hero-orbit-svg" viewBox="0 0 600 520" aria-hidden="true">
              <circle cx="300" cy="270" r="146" fill="none" stroke="rgba(228,190,82,0.18)" strokeWidth="1.5" />
              <circle cx="300" cy="270" r="182" fill="none" stroke="rgba(255,248,226,0.08)" strokeWidth="1" strokeDasharray="10 12" />
              {branchNodes.map((node, i) => (
                <motion.path
                  key={node.id}
                  d={node.path}
                  fill="none"
                  stroke={node.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: isActivated ? 0.78 : 0.46,
                    strokeDashoffset: isActivated ? [0, -24] : 0,
                  }}
                  transition={{
                    pathLength: { duration: 0.6, delay: 0.3 + i * 0.08 },
                    opacity: { duration: 0.25 },
                    strokeDashoffset: { duration: 1.1, repeat: isActivated ? Infinity : 0, ease: 'linear' },
                  }}
                  strokeDasharray={isActivated ? '7 8' : '0'}
                />
              ))}
            </svg>

            <motion.div
              className="hero-drum-core"
              style={{ x: '-50%', y: '-50%' }}
              animate={{ scale: isActivated ? [1, 1.035, 1] : 1 }}
              transition={{ duration: 1.2, repeat: isActivated ? Infinity : 0 }}
            >
              <DongSonDrum size={260} />
            </motion.div>

            {branchNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  className={node.className}
                  style={{ borderColor: node.color }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.45 + i * 0.08 }}
                >
                  <Icon size={23} style={{ color: node.color, flexShrink: 0 }} />
                  <div>
                    <p style={{ color: node.color }}>{node.label}</p>
                    <span>{node.subtitle}</span>
                  </div>
                </motion.div>
              );
            })}

            <p className="hero-orbit-caption">
              Trống đồng là lõi thị giác: các nhóm quyền lực được tổ chức quanh một trung tâm thống nhất.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-5 z-10" animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <ArrowDown size={22} style={{ color: 'rgba(255,255,255,0.68)' }} />
      </motion.div>
    </section>
  );
}
