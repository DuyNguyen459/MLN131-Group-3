import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Building, User, ChevronDown } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import { feedbackComments } from '../../data/mockData';

function CommentCard({ comment, index }) {
  const isGovernment = comment.type === 'government';

  return (
    <motion.div
      className="glass-card p-5"
      style={{
        border: `1px solid ${
          isGovernment
            ? 'rgba(212,168,83,0.15)'
            : 'rgba(45,212,191,0.1)'
        }`,
        borderLeft: `3px solid ${
          isGovernment ? 'var(--accent-gold)' : 'var(--accent-teal)'
        }`,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{
        borderColor: isGovernment
          ? 'rgba(212,168,83,0.3)'
          : 'rgba(45,212,191,0.2)',
        y: -2,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="flex items-center justify-center rounded-xl text-xs font-bold flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            background: isGovernment
              ? 'var(--accent-gold-dim)'
              : 'var(--accent-teal-dim)',
            color: isGovernment
              ? 'var(--accent-gold)'
              : 'var(--accent-teal)',
            border: `1px solid ${
              isGovernment
                ? 'rgba(212,168,83,0.2)'
                : 'rgba(45,212,191,0.2)'
            }`,
          }}
        >
          {isGovernment ? (
            <Building size={18} />
          ) : (
            comment.avatar
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span
              className="text-sm font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {comment.name}
            </span>
            {comment.location && (
              <span
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                • {comment.location}
              </span>
            )}
            <span
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {comment.time}
            </span>
          </div>

          <p
            className="text-sm leading-relaxed mb-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            {comment.content}
          </p>

          <span
            className={`badge ${
              isGovernment ? 'badge-gold' : 'badge-teal'
            }`}
          >
            {isGovernment ? (
              <>
                <Building size={10} />
                Giải trình / Tiếp thu
              </>
            ) : (
              <>
                <User size={10} />
                Ý kiến công dân
              </>
            )}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeedbackPortal() {
  const [visibleCount, setVisibleCount] = useState(6);
  const containerRef = useRef(null);

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + 4, feedbackComments.length)
    );
  };

  return (
    <SectionWrapper id="feedback">
      <div className="section-container" style={{ paddingLeft: 92 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge badge-teal mb-3 inline-flex">
            Cơ chế Giải trình
          </span>
          <h2 className="section-title text-center mx-auto">
            Cổng tiếp nhận ý kiến Nhân dân
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Góp ý về Luật Đất đai sửa đổi 2024 — Kênh phản biện xã hội
          </p>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            {
              label: 'Ý kiến tiếp nhận',
              value: '12.847',
              color: 'var(--accent-teal)',
            },
            {
              label: 'Đã giải trình',
              value: '9.234',
              color: 'var(--accent-gold)',
            },
            {
              label: 'Tiếp thu sửa đổi',
              value: '1.456',
              color: 'var(--accent-purple)',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card p-4 text-center"
              style={{ border: '1px solid var(--glass-border)' }}
            >
              <p
                className="text-2xl font-bold"
                style={{
                  color: stat.color,
                  fontFamily: 'var(--font-heading)',
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Comments Feed */}
        <div
          ref={containerRef}
          className="max-w-3xl mx-auto flex flex-col gap-4"
        >
          {feedbackComments.slice(0, visibleCount).map((comment, i) => (
            <CommentCard key={comment.id} comment={comment} index={i} />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < feedbackComments.length && (
          <div className="text-center mt-6">
            <motion.button
              className="flex items-center gap-2 px-6 py-3 rounded-xl mx-auto cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
              whileHover={{
                background: 'rgba(255,255,255,0.08)',
                borderColor: 'var(--accent-teal)',
                color: 'var(--accent-teal)',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={loadMore}
            >
              <ChevronDown size={16} />
              Xem thêm ý kiến
            </motion.button>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
