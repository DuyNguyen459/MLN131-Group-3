import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Building, ChevronDown, MessageSquareText, User } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import { feedbackComments } from '../../data/mockData';

const stats = [
  { label: 'Ý kiến mô phỏng', value: '06', color: 'var(--accent-teal)' },
  { label: 'Phản hồi nhóm', value: '03', color: 'var(--accent-gold)' },
  { label: 'Cơ chế nhấn mạnh', value: '06', color: 'var(--accent-purple)' },
];

function CommentCard({ comment, index }) {
  const isGovernment = comment.type === 'government';

  return (
    <motion.div
      className="glass-card feedback-card"
      style={{
        border: `1px solid ${isGovernment ? 'rgba(185,138,34,0.22)' : 'rgba(11,118,106,0.18)'}`,
        borderLeft: `4px solid ${isGovernment ? 'var(--accent-gold)' : 'var(--accent-teal)'}`,
        marginLeft: isGovernment ? 42 : 0,
      }}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex items-center justify-center rounded-lg text-xs font-bold flex-shrink-0"
          style={{
            width: 48,
            height: 48,
            background: isGovernment ? 'var(--accent-gold-dim)' : 'var(--accent-teal-dim)',
            color: isGovernment ? 'var(--accent-gold)' : 'var(--accent-teal)',
            border: `1px solid ${isGovernment ? 'rgba(185,138,34,0.24)' : 'rgba(11,118,106,0.22)'}`,
          }}
        >
          {isGovernment ? <Building size={19} /> : comment.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {comment.name}
            </span>
            {comment.location && (
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                • {comment.location}
              </span>
            )}
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {comment.time}
            </span>
          </div>

          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
            {comment.content}
          </p>

          <span className={`badge ${isGovernment ? 'badge-gold' : 'badge-teal'}`}>
            {isGovernment ? (
              <>
                <Building size={11} />
                Giải trình / Tiếp thu
              </>
            ) : (
              <>
                <User size={11} />
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
    setVisibleCount((prev) => Math.min(prev + 4, feedbackComments.length));
  };

  return (
    <SectionWrapper id="feedback" className="feedback-section">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="badge badge-teal mb-3 inline-flex">
            <MessageSquareText size={14} />
            Cơ chế giải trình
          </span>
          <h2 className="section-title text-center mx-auto">Cổng tiếp nhận ý kiến Nhân dân</h2>
          <p className="section-subtitle text-center mx-auto">
            Một thread mô phỏng giúp người trình bày giải thích cơ chế Nhân dân tham gia, giám sát và phản biện
            trong Nhà nước pháp quyền XHCN Việt Nam.
          </p>
        </div>

        <motion.div className="feedback-stats" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center" style={{ border: '1px solid var(--glass-border)' }}>
              <p className="text-3xl font-black" style={{ color: stat.color, fontFamily: 'var(--font-heading)' }}>
                {stat.value}
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)', lineHeight: 1.45 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <div ref={containerRef} className="feedback-thread">
          {feedbackComments.slice(0, visibleCount).map((comment, i) => (
            <CommentCard key={comment.id} comment={comment} index={i} />
          ))}
        </div>

        {visibleCount < feedbackComments.length && (
          <div className="text-center mt-8">
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg mx-auto cursor-pointer"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
              whileHover={{ borderColor: 'var(--accent-teal)', color: 'var(--accent-teal)' }}
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
