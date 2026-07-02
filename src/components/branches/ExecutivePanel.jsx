import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Fingerprint,
  Globe,
  MapPin,
  Activity,
  Sparkles,
} from 'lucide-react';
import { executiveTree, executiveCaseStudy } from '../../data/mockData';

const iconMap = {
  Fingerprint,
  Globe,
  MapPin,
  Activity,
};

function TreeNode({ node, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(depth < 2);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <motion.div
        className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer my-1 relative"
        style={{
          background:
            depth === 0
              ? 'var(--accent-teal-dim)'
              : 'rgba(74, 62, 61, 0.03)',
          border: `1px solid ${
            depth === 0 ? 'rgba(45,212,191,0.2)' : 'transparent'
          }`,
        }}
        whileHover={{
          background: 'rgba(45,212,191,0.1)',
          borderColor: 'rgba(45,212,191,0.2)',
        }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        onMouseEnter={() => depth <= 1 && setShowCaseStudy(true)}
        onMouseLeave={() => setShowCaseStudy(false)}
      >
        {hasChildren ? (
          isOpen ? (
            <ChevronDown
              size={14}
              style={{ color: 'var(--accent-teal)' }}
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
              depth === 0 ? 'var(--accent-teal)' : 'var(--text-primary)',
          }}
        >
          {node.name}
        </span>

        {/* Case study tooltip on hover (only for top-level nodes) */}
        <AnimatePresence>
          {showCaseStudy && depth === 0 && (
            <motion.div
              className="absolute left-full ml-3 top-0 w-72 glass-card p-4 z-20"
              style={{
                border: '1px solid rgba(45,212,191,0.2)',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles
                  size={14}
                  style={{ color: 'var(--accent-teal)' }}
                />
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--accent-teal)' }}
                >
                  Case Study
                </span>
              </div>
              <h4
                className="text-sm font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {executiveCaseStudy.title}
              </h4>
              <p
                className="text-xs leading-relaxed mb-3"
                style={{ color: 'var(--text-secondary)' }}
              >
                {executiveCaseStudy.description.slice(0, 120)}...
              </p>
              <div className="grid grid-cols-2 gap-2">
                {executiveCaseStudy.metrics.map((m, i) => {
                  const Icon = iconMap[m.icon];
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg"
                      style={{
                        background: 'rgba(45,212,191,0.08)',
                      }}
                    >
                      {Icon && (
                        <Icon
                          size={12}
                          style={{ color: 'var(--accent-teal)' }}
                        />
                      )}
                      <div>
                        <p
                          className="text-xs font-bold"
                          style={{ color: 'var(--accent-teal)' }}
                        >
                          {m.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
            <TreeNode node={child} depth={depth + 1} />
          </motion.div>
        ))}
    </div>
  );
}

export default function ExecutivePanel() {
  return (
    <div>
      {executiveTree.map((node, i) => (
        <TreeNode key={i} node={node} depth={0} />
      ))}

      {/* Case study card (always visible, below tree) */}
      <motion.div
        className="mt-4 glass-card p-4"
        style={{ border: '1px solid rgba(45,212,191,0.15)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} style={{ color: 'var(--accent-teal)' }} />
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: 'var(--accent-teal)' }}
          >
            {executiveCaseStudy.title}
          </span>
        </div>
        <p
          className="text-xs leading-relaxed mb-3"
          style={{ color: 'var(--text-secondary)' }}
        >
          {executiveCaseStudy.subtitle}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {executiveCaseStudy.metrics.map((m, i) => {
            const Icon = iconMap[m.icon];
            return (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ background: 'rgba(45,212,191,0.06)' }}
              >
                {Icon && (
                  <Icon
                    size={14}
                    style={{ color: 'var(--accent-teal)' }}
                  />
                )}
                <div>
                  <p
                    className="text-sm font-bold"
                    style={{ color: 'var(--accent-teal)' }}
                  >
                    {m.value}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: 'var(--text-muted)' }}
                  >
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
