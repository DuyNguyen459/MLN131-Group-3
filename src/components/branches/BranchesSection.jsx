import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Building2, Scale, ChevronDown, LayoutGrid, Network, Columns4, Sparkles } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import LegislativePanel from './LegislativePanel';
import ExecutivePanel from './ExecutivePanel';
import JudiciaryPanel from './JudiciaryPanel';
import DongSonDrum from '../common/DongSonDrum';

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
    // Radial positioning for central hub layout
    x: -120,
    y: -80,
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
    x: 0,
    y: -140,
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
    x: 120,
    y: -80,
  },
];

export default function BranchesSection() {
  const [viewMode, setViewMode] = useState('hub'); // 'hub' (default), 'accordion', 'grid'
  const [expandedBranch, setExpandedBranch] = useState('hanh-phap'); // Default active branch

  const handleToggle = (id) => {
    // For grid and accordion views
    if (viewMode === 'accordion') {
      // Toggle or keep at least one open so the layout isn't completely empty
      setExpandedBranch(expandedBranch === id ? null : id);
    } else {
      setExpandedBranch(expandedBranch === id ? null : id);
    }
  };

  const activeBranchData = branches.find((b) => b.id === expandedBranch);
  const ActivePanel = activeBranchData ? activeBranchData.panel : null;

  return (
    <SectionWrapper id="branches">
      <div className="section-container" style={{ paddingLeft: 92 }}>
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="badge badge-gold mb-3 inline-flex">
              Hiến pháp 2013 — Điều 2
            </span>
            <h2 className="section-title">
              3 Nhánh Quyền lực Nhà nước
            </h2>
            <p className="section-subtitle">
              Quyền lực nhà nước là thống nhất, có sự phân công, phối hợp, kiểm soát giữa các cơ quan
            </p>
          </div>

          {/* View Mode Switcher */}
          <div 
            className="flex p-1 rounded-xl self-start md:self-end"
            style={{ 
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--glass-border)' 
            }}
          >
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              style={{
                background: viewMode === 'accordion' ? 'var(--accent-gold-dim)' : 'transparent',
                color: viewMode === 'accordion' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                border: 'none',
              }}
              onClick={() => {
                setViewMode('accordion');
                if (!expandedBranch) setExpandedBranch('hanh-phap');
              }}
            >
              <Columns4 size={13} />
              Accordion Co Giãn
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              style={{
                background: viewMode === 'hub' ? 'var(--accent-gold-dim)' : 'transparent',
                color: viewMode === 'hub' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                border: 'none',
              }}
              onClick={() => {
                setViewMode('hub');
                if (!expandedBranch) setExpandedBranch('hanh-phap');
              }}
            >
              <Network size={13} />
              Trống Đồng Liên Kết
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              style={{
                background: viewMode === 'grid' ? 'var(--accent-gold-dim)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                border: 'none',
              }}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={13} />
              Dạng Lưới
            </button>
          </div>
        </div>

        {/* Dynamic Display based on viewMode */}
        <AnimatePresence mode="wait">
          {/* 1. Accordion Co giãn Động View */}
          {viewMode === 'accordion' && (
            <motion.div
              key="accordion-view"
              className="flex flex-col lg:flex-row gap-6 items-stretch min-h-[550px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {branches.map((branch) => {
                const Icon = branch.icon;
                const isExpanded = expandedBranch === branch.id;
                const Panel = branch.panel;

                return (
                  <motion.div
                    key={branch.id}
                    className="glass-card overflow-hidden cursor-pointer flex flex-col"
                    style={{
                      border: `1px solid ${
                        isExpanded ? branch.borderColor : 'var(--glass-border)'
                      }`,
                      background: isExpanded ? 'rgba(20, 28, 43, 0.55)' : 'rgba(20, 28, 43, 0.85)',
                    }}
                    layout
                    animate={{
                      flex: isExpanded ? 4.5 : 1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 20,
                    }}
                    onClick={() => handleToggle(branch.id)}
                  >
                    {/* Header: adapts visually to expanded or collapsed states */}
                    <motion.div 
                      className={`p-6 flex ${isExpanded ? 'flex-row items-center border-b border-[var(--border)]' : 'flex-col items-center justify-center h-full'} gap-4`}
                      layout="position"
                    >
                      <motion.div
                        className="rounded-2xl p-3.5 flex-shrink-0"
                        style={{
                          background: branch.dimColor,
                          border: `1px solid ${branch.borderColor}`,
                        }}
                        layout="position"
                      >
                        <Icon size={26} style={{ color: branch.color }} />
                      </motion.div>

                      <div className={`flex-1 min-w-0 ${!isExpanded ? 'text-center' : ''}`}>
                        <motion.h3 
                          className="text-lg font-bold truncate flex items-center gap-1.5" 
                          style={{ color: branch.color, fontFamily: 'var(--font-heading)' }}
                          layout="position"
                        >
                          {branch.title}
                          {isExpanded && <Sparkles size={14} className="animate-pulse" style={{ color: branch.color }} />}
                        </motion.h3>
                        <motion.p 
                          className="text-xs truncate text-[var(--text-secondary)] mt-0.5"
                          layout="position"
                        >
                          {branch.subtitle}
                        </motion.p>
                      </div>

                      {/* Rotation Chevron */}
                      <motion.div
                        animate={{ rotate: isExpanded ? -90 : 0 }}
                        className={`flex-shrink-0 ${!isExpanded ? 'mt-4' : ''}`}
                        layout="position"
                      >
                        <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />
                      </motion.div>
                    </motion.div>

                    {/* Expandable Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="flex-1 overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                        >
                          {/* Prevent click inside panel from collapsing the parent card */}
                          <div className="p-6 h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            <Panel />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* 2. Trống Đồng Liên Kết View */}
          {viewMode === 'hub' && (
            <motion.div
              key="hub-view"
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* LEFT COLUMN: Visual Dong Son Drum Hub */}
              <div className="lg:col-span-5 glass-panel p-6 flex flex-col items-center justify-center relative min-h-[450px] overflow-hidden">
                <motion.div
                  className="absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                  style={{ top: 'calc(50% + 20px)', left: '50%', transform: 'translate(-50%, -50%)' }}
                >
                  <DongSonDrum size={220} className="opacity-70" />
                </motion.div>

                {/* Connection lines */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, height: 400 }}
                >
                  {branches.map((branch) => {
                    const isActive = expandedBranch === branch.id;
                    return (
                      <g key={`line-${branch.id}`}>
                        <line
                          x1={200}
                          y1={220}
                          x2={200 + branch.x}
                          y2={220 + branch.y}
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1.5"
                        />
                        <motion.line
                          x1={200}
                          y1={220}
                          x2={200 + branch.x}
                          y2={220 + branch.y}
                          stroke={branch.color}
                          strokeWidth={isActive ? '2.5' : '1.5'}
                          strokeDasharray="6 4"
                          initial={{ opacity: 0.1 }}
                          animate={{
                            opacity: isActive ? 0.9 : 0.3,
                            strokeDashoffset: isActive ? [0, -20] : 0,
                          }}
                          transition={{
                            strokeDashoffset: { duration: 1, repeat: Infinity, ease: 'linear' },
                            opacity: { duration: 0.3 }
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Branch Nodes arranged radially */}
                {branches.map((branch) => {
                  const Icon = branch.icon;
                  const isActive = expandedBranch === branch.id;

                  return (
                    <motion.button
                      key={branch.id}
                      className="absolute flex flex-col items-center p-3 rounded-2xl cursor-pointer transition-all"
                      style={{
                        background: isActive ? branch.dimColor : 'var(--bg-card)',
                        border: `1px solid ${isActive ? branch.color : 'var(--glass-border)'}`,
                        top: '50%',
                        left: '50%',
                        transform: `translate(calc(-50% + ${branch.x}px), calc(-50% + ${branch.y}px))`,
                        boxShadow: isActive ? `0 0 25px ${branch.dimColor}` : 'none',
                        zIndex: 10,
                      }}
                      whileHover={{ scale: 1.05, borderColor: branch.color }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleToggle(branch.id)}
                    >
                      <div
                        className="rounded-xl p-2.5 mb-1.5"
                        style={{
                          background: isActive ? branch.dimColor : 'rgba(255, 255, 255, 0.03)',
                        }}
                      >
                        <Icon size={22} style={{ color: branch.color }} />
                      </div>
                      <span className="text-xs font-bold text-center" style={{ color: isActive ? branch.color : 'var(--text-primary)' }}>
                        {branch.title}
                      </span>
                      <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
                        {branch.subtitle}
                      </span>
                    </motion.button>
                  );
                })}

                <div className="absolute bottom-6 text-center z-10 bg-[var(--bg-primary)]/80 px-4 py-2 rounded-xl border border-[var(--border)] backdrop-blur-md">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--accent-gold)]">
                    TRUNG TÂM LIÊN KẾT
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Nhấp vào các nhánh để xem cấu trúc
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN: Active Panel Detail View */}
              <div className="lg:col-span-7 flex flex-col">
                <AnimatePresence mode="wait">
                  {expandedBranch ? (
                    <motion.div
                      key={expandedBranch}
                      className="glass-panel p-6 flex-1 flex flex-col justify-between"
                      style={{
                        borderLeft: `3px solid ${activeBranchData.color}`,
                        background: 'rgba(20, 28, 43, 0.4)',
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border)]">
                          <div 
                            className="p-2.5 rounded-xl"
                            style={{ background: activeBranchData.dimColor }}
                          >
                            <activeBranchData.icon size={24} style={{ color: activeBranchData.color }} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: activeBranchData.color }}>
                              Nhánh {activeBranchData.title}
                              <Sparkles size={16} className="animate-pulse" style={{ color: activeBranchData.color }} />
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)]">
                              Cấu trúc chi tiết & Cơ chế kiểm soát quyền lực
                            </p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <activeBranchData.panel />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty-state"
                      className="glass-panel p-10 flex-1 flex flex-col items-center justify-center text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="rounded-full p-4 mb-4 bg-[var(--accent-gold-dim)] border border-[var(--accent-gold)]">
                        <Star size={36} className="text-[var(--accent-gold)]" />
                      </div>
                      <h3 className="text-lg font-bold text-[var(--accent-gold)] mb-2">
                        Chọn một nhánh quyền lực
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] max-w-sm">
                        Nhấp vào bất kỳ biểu tượng nhánh nào ở Trống Đồng bên trái để hiển thị chi tiết sơ đồ tổ chức.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* 3. Grid View */}
          {viewMode === 'grid' && (
            <motion.div
              key="grid-view"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
