import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollText, Users, Star, ChevronRight, FileText } from 'lucide-react';
import { sidebarSections, nghiQuyetCard } from '../../data/mockData';

const iconMap = {
  ScrollText: ScrollText,
  Users: Users,
};

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed left-0 top-0 h-screen z-50 hidden md:flex flex-col"
      style={{
        background: 'var(--bg-elevated)',
        borderRight: '1px solid var(--glass-border)',
      }}
      initial={false}
      animate={{ width: isExpanded ? 300 : 68 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Emblem */}
      <div
        className="flex items-center justify-center py-6 px-3"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <motion.div
          className="flex items-center justify-center rounded-xl"
          style={{
            width: 44,
            height: 44,
            minWidth: 44,
            background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-bronze))',
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Star size={24} color="#0A0F1E" fill="#0A0F1E" />
        </motion.div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="ml-3 overflow-hidden whitespace-nowrap"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
            >
              <p
                className="text-sm font-bold"
                style={{ color: 'var(--accent-gold)' }}
              >
                Đảng Lãnh đạo
              </p>
              <p
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Hệ điều hành
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 px-2 flex flex-col gap-1">
        {sidebarSections.map((section) => {
          const Icon = iconMap[section.icon];
          return (
            <motion.button
              key={section.id}
              className="flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left cursor-pointer"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
              }}
              whileHover={{
                backgroundColor: 'rgba(212, 168, 83, 0.08)',
                color: 'var(--accent-gold-light)',
              }}
              transition={{ duration: 0.2 }}
              onClick={() => handleScrollTo(section.id)}
            >
              <div
                className="flex items-center justify-center rounded-lg"
                style={{
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  background: 'var(--accent-gold-dim)',
                }}
              >
                {Icon && <Icon size={20} style={{ color: 'var(--accent-gold)' }} />}
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="overflow-hidden whitespace-nowrap flex-1"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm font-semibold">{section.title}</p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {section.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              {isExpanded && (
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Nghị quyết 27 Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="mx-3 mb-4 p-4 rounded-xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(212, 168, 83, 0.12), rgba(184, 115, 51, 0.08))',
              border: '1px solid rgba(212, 168, 83, 0.25)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} style={{ color: 'var(--accent-gold)' }} />
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--accent-gold)' }}
              >
                Trọng tâm
              </span>
            </div>
            <h4
              className="text-sm font-bold mb-1"
              style={{ color: 'var(--accent-gold-light)' }}
            >
              {nghiQuyetCard.title}
            </h4>
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {nghiQuyetCard.content}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {nghiQuyetCard.highlights.slice(0, 3).map((h, i) => (
                <span
                  key={i}
                  className="badge badge-gold text-[10px]"
                >
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
