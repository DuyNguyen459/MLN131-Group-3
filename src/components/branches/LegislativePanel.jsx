import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import BranchModal from './BranchModal';
import { legislativeOrgChart, legislativeModal } from '../../data/mockData';

function OrgNode({ node, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <motion.div
        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer my-1"
        style={{
          background: depth === 0 ? 'var(--accent-gold-dim)' : 'rgba(74, 62, 61, 0.03)',
          border: `1px solid ${depth === 0 ? 'rgba(212,168,83,0.2)' : 'transparent'}`,
        }}
        whileHover={{
          background: 'rgba(212,168,83,0.1)',
          borderColor: 'rgba(212,168,83,0.2)',
        }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown size={14} style={{ color: 'var(--accent-gold)' }} />
          ) : (
            <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
          )
        ) : (
          <div style={{ width: 14 }} />
        )}
        <span
          className="text-sm font-medium"
          style={{
            color: depth === 0 ? 'var(--accent-gold)' : 'var(--text-primary)',
          }}
        >
          {node.name}
        </span>
      </motion.div>
      {isOpen &&
        hasChildren &&
        node.children.map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2, delay: i * 0.03 }}
          >
            <OrgNode node={child} depth={depth + 1} />
          </motion.div>
        ))}
    </div>
  );
}

export default function LegislativePanel() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* Org Chart */}
      <div className="mb-4">
        <OrgNode node={{ name: legislativeOrgChart.root, children: legislativeOrgChart.children }} />
      </div>

      {/* "Xem thực tế" Button */}
      <motion.button
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl w-full justify-center cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, var(--accent-gold-dim), rgba(212,168,83,0.05))',
          border: '1px solid rgba(212,168,83,0.25)',
          color: 'var(--accent-gold)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: '0.875rem',
        }}
        whileHover={{
          borderColor: 'rgba(212,168,83,0.5)',
          boxShadow: '0 0 20px rgba(212,168,83,0.15)',
        }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowModal(true)}
      >
        <Eye size={16} />
        Xem thực tế — Phiên chất vấn
      </motion.button>

      {/* Modal */}
      <BranchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={legislativeModal.title}
      >
        {/* Placeholder image area */}
        <div
          className="w-full rounded-xl mb-6 flex items-center justify-center overflow-hidden"
          style={{
            height: 240,
            background: 'linear-gradient(135deg, var(--bg-card), var(--bg-secondary))',
            border: '1px solid var(--border)',
          }}
        >
          <div className="text-center">
            <Users size={48} style={{ color: 'var(--accent-gold)', marginBottom: 12, margin: '0 auto 12px' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--accent-gold)' }}>
              Phiên chất vấn Quốc hội khóa XV
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Kỳ họp thứ 6 — Tháng 11/2023
            </p>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: 'var(--text-secondary)' }}
        >
          {legislativeModal.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {legislativeModal.stats.map((stat, i) => (
            <motion.div
              key={i}
              className="glass-card p-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <p
                className="text-2xl font-bold"
                style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}
              >
                {stat.value}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </BranchModal>
    </div>
  );
}
