import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, ChevronDown, ChevronRight } from 'lucide-react';
import BranchModal from './BranchModal';
import { legislativeOrgChart, legislativeModal } from '../../data/mockData';

function OrgNode({ node, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="panel-tree-node" style={{ marginLeft: depth ? 14 : 0 }}>
      <motion.button
        className="panel-node w-full text-left cursor-pointer"
        style={{
          background: depth === 0 ? 'var(--accent-gold-dim)' : 'rgba(35, 31, 32, 0.035)',
          border: `1px solid ${depth === 0 ? 'rgba(185,138,34,0.24)' : 'transparent'}`,
          color: depth === 0 ? 'var(--accent-gold)' : 'var(--text-primary)',
        }}
        whileHover={{ borderColor: 'rgba(185,138,34,0.28)' }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />
        ) : (
          <span style={{ width: 15, flexShrink: 0 }} />
        )}
        <span className="text-sm font-semibold">{node.name}</span>
      </motion.button>

      {isOpen &&
        hasChildren &&
        node.children.map((child, i) => (
          <motion.div key={i} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.18 }}>
            <OrgNode node={child} depth={depth + 1} />
          </motion.div>
        ))}
    </div>
  );
}

export default function LegislativePanel() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="panel-stack">
      <OrgNode node={{ name: legislativeOrgChart.root, children: legislativeOrgChart.children }} />

      <motion.button
        className="flex items-center gap-2 px-4 py-3 rounded-lg w-full justify-center cursor-pointer mt-2"
        style={{
          background: 'linear-gradient(135deg, var(--accent-gold-dim), rgba(185,138,34,0.05))',
          border: '1px solid rgba(185,138,34,0.28)',
          color: 'var(--accent-gold)',
          fontWeight: 750,
          fontSize: '0.9rem',
        }}
        whileHover={{ borderColor: 'rgba(185,138,34,0.55)' }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowModal(true)}
      >
        <Eye size={16} />
        Xem ví dụ giám sát của Quốc hội
      </motion.button>

      <BranchModal isOpen={showModal} onClose={() => setShowModal(false)} title={legislativeModal.title}>
        <div
          className="w-full rounded-lg mb-6 flex items-center justify-center overflow-hidden"
          style={{ minHeight: 220, background: 'linear-gradient(135deg, var(--bg-card), var(--bg-secondary))', border: '1px solid var(--border)' }}
        >
          <div className="text-center px-6">
            <Users size={46} style={{ color: 'var(--accent-gold)', margin: '0 auto 12px' }} />
            <p className="text-sm font-bold" style={{ color: 'var(--accent-gold)' }}>
              Quốc hội: lập pháp, quyết định vấn đề quan trọng, giám sát tối cao
            </p>
          </div>
        </div>

        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}>
          {legislativeModal.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {legislativeModal.stats.map((stat, i) => (
            <motion.div key={stat.label} className="glass-card p-5 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <p className="text-xl font-bold" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </BranchModal>
    </div>
  );
}
