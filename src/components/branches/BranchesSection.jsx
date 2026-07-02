import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Columns4, Landmark, LayoutGrid, Network, Scale, Sparkles } from 'lucide-react';
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
    borderColor: 'rgba(185,138,34,0.32)',
    panel: LegislativePanel,
    mapClass: 'left',
    path: 'M210,230 C160,248 118,278 86,296',
  },
  {
    id: 'hanh-phap',
    title: 'Hành pháp',
    subtitle: 'Chính phủ',
    icon: Building2,
    color: 'var(--accent-teal)',
    dimColor: 'var(--accent-teal-dim)',
    borderColor: 'rgba(11,118,106,0.32)',
    panel: ExecutivePanel,
    mapClass: 'top',
    path: 'M250,202 C250,164 250,126 250,94',
  },
  {
    id: 'tu-phap',
    title: 'Tư pháp',
    subtitle: 'Tòa án và Viện kiểm sát',
    icon: Scale,
    color: 'var(--accent-red)',
    dimColor: 'var(--accent-red-dim)',
    borderColor: 'rgba(163,38,42,0.32)',
    panel: JudiciaryPanel,
    mapClass: 'right',
    path: 'M290,230 C340,248 382,278 414,296',
  },
];

const modes = [
  { id: 'hub', label: 'Liên kết', icon: Network },
  { id: 'grid', label: 'Lưới', icon: LayoutGrid },
  { id: 'accordion', label: 'Mở rộng', icon: Columns4 },
];

export default function BranchesSection() {
  const [viewMode, setViewMode] = useState('hub');
  const [expandedBranch, setExpandedBranch] = useState('hanh-phap');
  const activeBranchData = branches.find((b) => b.id === expandedBranch) || branches[1];
  const ActivePanel = activeBranchData.panel;

  return (
    <SectionWrapper id="branches">
      <div className="section-container">
        <div className="branches-header">
          <div>
            <span className="badge badge-gold mb-3 inline-flex">Hiến pháp hiện hành - Điều 2</span>
            <h2 className="section-title">Quyền lực nhà nước thống nhất</h2>
            <p className="section-subtitle">
              Việt Nam không tổ chức theo “tam quyền phân lập”. Cách trình bày đúng là quyền lực nhà nước
              thống nhất, có sự phân công, phối hợp và kiểm soát giữa các cơ quan khi thực hiện quyền lập pháp,
              hành pháp và tư pháp.
            </p>
          </div>

          <div className="mode-toolbar" aria-label="Chọn kiểu hiển thị bộ máy nhà nước">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = viewMode === mode.id;
              return (
                <button
                  key={mode.id}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  style={{
                    background: isActive ? 'var(--accent-gold-dim)' : 'transparent',
                    color: isActive ? 'var(--accent-red)' : 'var(--text-secondary)',
                    border: 'none',
                    minHeight: 36,
                  }}
                  onClick={() => setViewMode(mode.id)}
                >
                  <Icon size={14} />
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'hub' && (
            <motion.div
              key="hub-view"
              className="branch-content-shell branch-hub-view"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
            >
              <div className="glass-panel branch-map-panel">
                <div className="branch-map">
                  <div className="branch-map-core">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}>
                      <DongSonDrum size={205} className="opacity-80" />
                    </motion.div>
                  </div>

                  <svg className="branch-map-lines" viewBox="0 0 500 430" preserveAspectRatio="none">
                    {branches.map((branch) => {
                      const isActive = activeBranchData.id === branch.id;
                      return (
                        <motion.path
                          key={branch.id}
                          d={branch.path}
                          fill="none"
                          stroke={branch.color}
                          strokeWidth={isActive ? 2.5 : 1.5}
                          strokeLinecap="round"
                          opacity={isActive ? 0.7 : 0.24}
                          strokeDasharray={isActive ? '8 7' : '0'}
                          animate={{ strokeDashoffset: isActive ? [0, -30] : 0 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                      );
                    })}
                  </svg>

                  {branches.map((branch) => {
                    const Icon = branch.icon;
                    const isActive = activeBranchData.id === branch.id;
                    return (
                      <motion.button
                        key={branch.id}
                        className={`branch-map-node ${branch.mapClass}`}
                        style={{
                          background: isActive ? branch.dimColor : 'var(--bg-card)',
                          border: `1px solid ${isActive ? branch.color : 'var(--glass-border)'}`,
                          boxShadow: isActive ? 'var(--shadow-card)' : 'none',
                          color: branch.color,
                        }}
                        whileHover={{ y: -3, borderColor: branch.color }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setExpandedBranch(branch.id)}
                      >
                        <Icon size={22} style={{ flexShrink: 0 }} />
                        <span className="min-w-0">
                          <span className="block text-sm font-bold leading-snug">{branch.title}</span>
                          <span className="block text-xs leading-snug mt-1" style={{ color: 'var(--text-muted)' }}>
                            {branch.subtitle}
                          </span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <motion.div
                key={activeBranchData.id}
                className="glass-panel branch-detail-panel"
                style={{ borderLeft: `4px solid ${activeBranchData.color}`, background: 'var(--bg-secondary)' }}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
              >
                <div className="flex items-start gap-3 mb-6 pb-5 border-b border-[var(--border)]">
                  <div className="p-2.5 rounded-lg" style={{ background: activeBranchData.dimColor }}>
                    <activeBranchData.icon size={24} style={{ color: activeBranchData.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: activeBranchData.color }}>
                      {activeBranchData.title}
                      <Sparkles size={16} />
                    </h3>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      Cấu trúc, liên hệ thực tiễn và cơ chế kiểm soát quyền lực.
                    </p>
                  </div>
                </div>
                <ActivePanel />
              </motion.div>
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              key="grid-view"
              className="branch-grid-view"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
            >
              {branches.map((branch) => {
                const Icon = branch.icon;
                const Panel = branch.panel;
                return (
                  <motion.div
                    key={branch.id}
                    className="glass-card branch-grid-card"
                    style={{ borderTop: `4px solid ${branch.color}`, minHeight: 560 }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-lg p-3" style={{ background: branch.dimColor }}>
                        <Icon size={26} style={{ color: branch.color }} />
                      </div>
                      <div>
                        <h3 className="branch-card-title" style={{ color: branch.color }}>
                          {branch.title}
                        </h3>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {branch.subtitle}
                        </p>
                      </div>
                    </div>
                    <Panel />
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {viewMode === 'accordion' && (
            <motion.div
              key="accordion-view"
              className="branch-accordion-view"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
            >
              {branches.map((branch) => {
                const Icon = branch.icon;
                const Panel = branch.panel;
                const isOpen = expandedBranch === branch.id;
                return (
                  <div key={branch.id} className="glass-card branch-accordion-card" style={{ border: `1px solid ${isOpen ? branch.borderColor : 'var(--glass-border)'}` }}>
                    <button
                      className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                      style={{ background: isOpen ? branch.dimColor : 'transparent', border: 'none' }}
                      onClick={() => setExpandedBranch(branch.id)}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={24} style={{ color: branch.color }} />
                        <span>
                          <span className="block text-lg font-bold" style={{ color: branch.color }}>
                            {branch.title}
                          </span>
                          <span className="block text-sm" style={{ color: 'var(--text-muted)' }}>
                            {branch.subtitle}
                          </span>
                        </span>
                      </span>
                    </button>
                    {isOpen && (
                      <div className="branch-accordion-body">
                        <Panel />
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
