import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, ChevronRight, AlertTriangle, Gavel } from 'lucide-react';
import { judiciaryTree, judiciaryCases } from '../../data/mockData';

function CourtNode({ node, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <motion.div
        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer my-1"
        style={{
          background:
            depth === 0
              ? 'var(--accent-red-dim)'
              : 'rgba(74, 62, 61, 0.03)',
          border: `1px solid ${
            depth === 0 ? 'rgba(239,68,68,0.2)' : 'transparent'
          }`,
        }}
        whileHover={{
          background: 'rgba(239,68,68,0.1)',
          borderColor: 'rgba(239,68,68,0.2)',
        }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown
              size={14}
              style={{ color: 'var(--accent-red)' }}
            />
          ) : (
            <ChevronRight
              size={14}
              style={{ color: 'var(--text-muted)' }}
            />
          )
        ) : (
          <div style={{ width: 14 }} />
        )}
        <span
          className="text-sm font-medium"
          style={{
            color:
              depth === 0 ? 'var(--accent-red)' : 'var(--text-primary)',
          }}
        >
          {node.name}
        </span>
        {node.note && (
          <span
            className="text-xs ml-1"
            style={{ color: 'var(--text-muted)' }}
          >
            ({node.note})
          </span>
        )}
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
            <CourtNode node={child} depth={depth + 1} />
          </motion.div>
        ))}
    </div>
  );
}

export default function JudiciaryPanel() {
  const [activeTab, setActiveTab] = useState('tree');

  return (
    <div>
      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl mb-4"
        style={{ background: 'rgba(74, 62, 61, 0.03)' }}
      >
        {[
          { id: 'tree', label: 'Hệ thống Tòa án', icon: Gavel },
          { id: 'shield', label: 'Lá chắn Pháp lý', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg flex-1 text-xs font-semibold cursor-pointer"
              style={{
                background:
                  activeTab === tab.id
                    ? 'var(--accent-red-dim)'
                    : 'transparent',
                border:
                  activeTab === tab.id
                    ? '1px solid rgba(239,68,68,0.2)'
                    : '1px solid transparent',
                color:
                  activeTab === tab.id
                    ? 'var(--accent-red)'
                    : 'var(--text-muted)',
              }}
              whileHover={{
                background:
                  activeTab === tab.id
                    ? undefined
                    : 'rgba(74, 62, 61, 0.03)',
              }}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={13} />
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'tree' && (
          <motion.div
            key="tree"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {judiciaryTree.map((node, i) => (
              <CourtNode key={i} node={node} depth={0} />
            ))}
          </motion.div>
        )}

        {activeTab === 'shield' && (
          <motion.div
            key="shield"
            className="flex flex-col gap-3"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {judiciaryCases.map((c, i) => (
              <motion.div
                key={c.id}
                className="glass-card p-4"
                style={{
                  border: '1px solid rgba(239,68,68,0.12)',
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5
                      className="text-sm font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {c.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge badge-red">{c.type}</span>
                      <span
                        className="text-xs"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {c.year}
                      </span>
                    </div>
                  </div>
                  <AlertTriangle
                    size={16}
                    style={{ color: 'var(--accent-red)', flexShrink: 0 }}
                  />
                </div>
                <p
                  className="text-xs leading-relaxed mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {c.summary}
                </p>
                <div
                  className="text-xs px-3 py-2 rounded-lg"
                  style={{
                    background: 'rgba(239,68,68,0.06)',
                    color: 'var(--accent-red)',
                    fontWeight: 600,
                  }}
                >
                  ⚖️ {c.verdict}
                </div>
                <p
                  className="text-[10px] mt-2 italic"
                  style={{ color: 'var(--text-muted)' }}
                >
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
