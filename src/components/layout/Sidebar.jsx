import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ChevronRight, FileText, Gamepad2, Landmark, ScrollText, Star, Users } from 'lucide-react';
import { sidebarSections, nghiQuyetCard } from '../../data/mockData';

const iconMap = {
  Bot,
  Gamepad2,
  Landmark,
  ScrollText,
  Users,
};

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="sidebar-shell fixed left-0 top-0 h-screen z-50 hidden md:flex flex-col"
      style={{
        background: 'var(--bg-elevated)',
        borderRight: '1px solid var(--glass-border)',
      }}
      initial={false}
      animate={{ width: isExpanded ? 316 : 68 }}
      transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-brand">
        <motion.div className="sidebar-logo" whileHover={{ scale: 1.06 }} transition={{ type: 'spring', stiffness: 300 }}>
          <Star size={23} color="#fff8df" fill="#fff8df" />
        </motion.div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="ml-3 min-w-0"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-bold leading-tight" style={{ color: 'var(--accent-red)' }}>
                Pháp quyền XHCN
              </p>
              <p className="text-xs mt-1 leading-snug" style={{ color: 'var(--text-muted)' }}>
                Hành trình học thuật
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 py-4 px-2 flex flex-col gap-2">
        {sidebarSections.map((section) => {
          const Icon = iconMap[section.icon];
          return (
            <motion.button
              key={section.id}
              className="sidebar-item"
              whileHover={{ backgroundColor: 'var(--accent-gold-dim)' }}
              transition={{ duration: 0.2 }}
              onClick={() => handleScrollTo(section.id)}
            >
              <div
                className="flex items-center justify-center rounded-lg"
                style={{ width: 40, height: 40, minWidth: 40, background: 'rgba(185, 138, 34, 0.14)' }}
              >
                {Icon && <Icon size={19} style={{ color: 'var(--accent-red)' }} />}
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="sidebar-copy"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <p>{section.title}</p>
                    <p>{section.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {isExpanded && <ChevronRight size={15} style={{ color: 'var(--text-muted)', justifySelf: 'end' }} />}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="sidebar-focus-card"
            style={{
              background: 'linear-gradient(135deg, rgba(163, 38, 42, 0.10), rgba(185, 138, 34, 0.12))',
              border: '1px solid rgba(185, 138, 34, 0.25)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22 }}
          >
            <div className="sidebar-focus-label">
              <FileText size={16} style={{ color: 'var(--accent-red)' }} />
              <span style={{ color: 'var(--accent-red)' }}>
                Trọng tâm
              </span>
            </div>
            <h4 className="sidebar-focus-title" style={{ color: 'var(--text-primary)' }}>
              {nghiQuyetCard.title}
            </h4>
            <p className="sidebar-focus-copy" style={{ color: 'var(--text-secondary)' }}>
              {nghiQuyetCard.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
