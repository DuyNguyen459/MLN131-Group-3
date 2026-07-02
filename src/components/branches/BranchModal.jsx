import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function BranchModal({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="glass-panel relative w-full max-w-3xl mx-4 p-0 overflow-hidden"
            style={{
              maxHeight: '85vh',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-light)',
            }}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <h3
                className="text-lg font-bold"
                style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </h3>
              <motion.button
                className="p-2 rounded-lg cursor-pointer"
                style={{
                  background: 'rgba(74, 62, 61, 0.05)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                }}
                whileHover={{
                  background: 'rgba(239,68,68,0.15)',
                  color: 'var(--accent-red)',
                }}
                onClick={onClose}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 65px)' }}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
