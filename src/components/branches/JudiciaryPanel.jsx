import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ChevronRight, Gavel, Scale } from 'lucide-react';
import { judiciaryTree, judiciaryCases } from '../../data/mockData';

function CourtNode({ node, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: depth ? 14 : 0 }}>
      <motion.button
        className="panel-node w-full text-left cursor-pointer"
        style={{
          background: depth === 0 ? 'var(--accent-red-dim)' : 'rgba(35, 31, 32, 0.035)',
          border: `1px solid ${depth === 0 ? 'rgba(163,38,42,0.24)' : 'transparent'}`,
          color: depth === 0 ? 'var(--accent-red)' : 'var(--text-primary)',
        }}
        whileHover={{ borderColor: 'rgba(163,38,42,0.28)' }}
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
            <CourtNode node={child} depth={depth + 1} />
          </motion.div>
        ))}
    </div>
  );
}

export default function JudiciaryPanel() {
  const [activeTab, setActiveTab] = useState('tree');

  return (
    <div className="panel-stack">
      <div className="flex gap-2 p-1 rounded-lg" style={{ background: 'rgba(35, 31, 32, 0.04)' }}>
        {[
          { id: 'tree', label: 'Hệ thống tư pháp', icon: Gavel },
          { id: 'shield', label: 'Cơ chế bảo đảm', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg flex-1 text-xs font-bold cursor-pointer"
              style={{
                background: isActive ? 'var(--accent-red-dim)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(163,38,42,0.24)' : 'transparent'}`,
                color: isActive ? 'var(--accent-red)' : 'var(--text-muted)',
                minHeight: 38,
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'tree' && (
          <motion.div key="tree" className="panel-stack" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}>
            {judiciaryTree.map((node) => (
              <CourtNode key={node.name} node={node} depth={0} />
            ))}
          </motion.div>
        )}

        {activeTab === 'shield' && (
          <motion.div key="shield" className="panel-stack" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}>
            {judiciaryCases.map((c, i) => (
              <motion.div
                key={c.id}
                className="glass-card p-5"
                style={{ border: '1px solid rgba(163,38,42,0.16)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <Scale size={18} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <h5 className="text-sm font-bold" style={{ color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      {c.title}
                    </h5>
                    <span className="badge badge-red mt-2">{c.type}</span>
                  </div>
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                  {c.summary}
                </p>
                <div
                  className="text-xs px-3 py-2 rounded-lg"
                  style={{ background: 'rgba(163,38,42,0.07)', color: 'var(--accent-red)', fontWeight: 750, lineHeight: 1.55 }}
                >
                  {c.verdict}
                </div>
                <p className="text-xs mt-3 italic" style={{ color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {c.significance}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
