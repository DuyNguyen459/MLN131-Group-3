import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Database, Globe, Handshake, Sparkles, Users } from 'lucide-react';
import { executiveTree, executiveCaseStudy } from '../../data/mockData';

const iconMap = {
  Database,
  Globe,
  Handshake,
  Users,
};

function TreeNode({ node, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: depth ? 14 : 0 }}>
      <motion.button
        className="panel-node w-full text-left cursor-pointer"
        style={{
          background: depth === 0 ? 'var(--accent-teal-dim)' : 'rgba(35, 31, 32, 0.035)',
          border: `1px solid ${depth === 0 ? 'rgba(11,118,106,0.24)' : 'transparent'}`,
          color: depth === 0 ? 'var(--accent-teal)' : 'var(--text-primary)',
        }}
        whileHover={{ borderColor: 'rgba(11,118,106,0.28)' }}
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
            <TreeNode node={child} depth={depth + 1} />
          </motion.div>
        ))}
    </div>
  );
}

export default function ExecutivePanel() {
  return (
    <div className="panel-stack">
      {executiveTree.map((node) => (
        <TreeNode key={node.name} node={node} depth={0} />
      ))}

      <motion.div
        className="glass-card p-5 mt-2"
        style={{ border: '1px solid rgba(11,118,106,0.18)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={15} style={{ color: 'var(--accent-teal)' }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent-teal)' }}>
            {executiveCaseStudy.title}
          </span>
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
          {executiveCaseStudy.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {executiveCaseStudy.metrics.map((m) => {
            const Icon = iconMap[m.icon];
            return (
              <div key={m.label} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(11,118,106,0.07)' }}>
                {Icon && <Icon size={16} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} />}
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--accent-teal)' }}>
                    {m.value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.35 }}>
                    {m.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
