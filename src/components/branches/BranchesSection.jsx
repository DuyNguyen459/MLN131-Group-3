import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Building2, Scale, ChevronDown } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import LegislativePanel from './LegislativePanel';
import ExecutivePanel from './ExecutivePanel';
import JudiciaryPanel from './JudiciaryPanel';

const branches = [
  {
    id: 'lap-phap',
    title: 'Lập pháp',
    subtitle: 'Quốc hội',
    icon: Landmark,
    color: 'var(--accent-gold)',
    dimColor: 'var(--accent-gold-dim)',
    borderColor: 'rgba(212,168,83,0.25)',
    glowClass: 'glow-gold',
    panel: LegislativePanel,
  },
  {
    id: 'hanh-phap',
    title: 'Hành pháp',
    subtitle: 'Chính phủ',
    icon: Building2,
    color: 'var(--accent-teal)',
    dimColor: 'var(--accent-teal-dim)',
    borderColor: 'rgba(45,212,191,0.25)',
    glowClass: 'glow-teal',
    panel: ExecutivePanel,
  },
  {
    id: 'tu-phap',
    title: 'Tư pháp',
    subtitle: 'Tòa án Nhân dân',
    icon: Scale,
    color: 'var(--accent-red)',
    dimColor: 'var(--accent-red-dim)',
    borderColor: 'rgba(239,68,68,0.25)',
    glowClass: 'glow-red',
    panel: JudiciaryPanel,
  },
];

export default function BranchesSection() {
  const [expandedBranch, setExpandedBranch] = useState(null);

  const handleToggle = (id) => {
    setExpandedBranch(expandedBranch === id ? null : id);
  };

  return (
    <SectionWrapper id="branches">
      <div className="section-container" style={{ paddingLeft: 92 }}>
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="badge badge-gold mb-3 inline-flex">
            Hiến pháp 2013 — Điều 2
          </span>
          <h2 className="section-title text-center mx-auto">
            3 Nhánh Quyền lực Nhà nước
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm
            soát giữa các cơ quan
          </p>
        </div>

        {/* 3 Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch) => {
            const Icon = branch.icon;
            const isExpanded = expandedBranch === branch.id;
            const Panel = branch.panel;

            return (
              <motion.div
                key={branch.id}
                className="glass-card overflow-hidden cursor-pointer"
                style={{
                  border: `1px solid ${
                    isExpanded ? branch.borderColor : 'var(--glass-border)'
                  }`,
                }}
                layout
                whileHover={
                  !isExpanded
                    ? {
                        scale: 1.02,
                        borderColor: branch.borderColor,
                      }
                    : {}
                }
                transition={{
                  layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                {/* Card Header */}
                <motion.div
                  className="p-6 flex flex-col items-center text-center"
                  onClick={() => handleToggle(branch.id)}
                >
                  <motion.div
                    className="rounded-2xl p-4 mb-4"
                    style={{
                      background: branch.dimColor,
                      border: `1px solid ${branch.borderColor}`,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon size={32} style={{ color: branch.color }} />
                  </motion.div>

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{
                      color: branch.color,
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {branch.title}
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {branch.subtitle}
                  </p>

                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      size={20}
                      style={{ color: 'var(--text-muted)' }}
                    />
                  </motion.div>
                </motion.div>

                {/* Expanded Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-5"
                        style={{
                          borderTop: `1px solid ${branch.borderColor}`,
                          paddingTop: 20,
                        }}
                      >
                        <Panel />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
