import { motion } from 'framer-motion';
import { AlertCircle, BookOpen, Bot, CheckCircle2, UserCheck } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import { transparencyData } from '../../data/mockData';

const statusConfig = {
  verified: {
    label: 'Đã xác minh',
    icon: CheckCircle2,
    color: 'var(--accent-teal)',
    bg: 'rgba(11,118,106,0.10)',
    border: 'rgba(11,118,106,0.22)',
  },
  corrected: {
    label: 'Đã chỉnh sửa',
    icon: AlertCircle,
    color: 'var(--accent-gold)',
    bg: 'rgba(185,138,34,0.12)',
    border: 'rgba(185,138,34,0.24)',
  },
};

export default function TransparencyHub() {
  return (
    <SectionWrapper id="transparency">
      <div className="relative" style={{ background: 'linear-gradient(180deg, var(--bg-primary), var(--bg-secondary))' }}>
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="badge badge-gold mb-3 inline-flex">Minh bạch học thuật</span>
            <h2 className="section-title text-center mx-auto">AI Transparency Hub</h2>
            <p className="section-subtitle text-center mx-auto">
              So sánh ý tưởng AI tạo ra với phần kiểm chứng của nhóm, giúp người xem thấy rõ nội dung nào đã được rà soát.
            </p>
          </div>

          <div className="responsive-table-wrap">
            <div className="ai-table">
              <div className="ai-table-row" style={{ background: 'rgba(185,138,34,0.09)', border: '1px solid rgba(185,138,34,0.16)', borderBottom: 'none', paddingTop: 18, paddingBottom: 18 }}>
                <div className="text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                  #
                </div>
                <div className="flex items-center gap-2">
                  <Bot size={16} style={{ color: 'var(--accent-purple)' }} />
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-purple)' }}>
                    AI prompt / output
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserCheck size={16} style={{ color: 'var(--accent-teal)' }} />
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-teal)' }}>
                    Nhóm xác minh
                  </span>
                </div>
                <div className="ai-status-cell text-xs font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                  Trạng thái
                </div>
              </div>

              {transparencyData.map((row, i) => {
                const status = statusConfig[row.status];
                const StatusIcon = status.icon;
                return (
                  <motion.div
                    key={row.id}
                    className="ai-table-row"
                    style={{
                      background: i % 2 === 0 ? 'rgba(255,253,248,0.94)' : 'rgba(255,253,248,0.72)',
                      border: '1px solid var(--glass-border)',
                      borderTop: 'none',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div>
                      <span className="text-sm font-bold" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {String(row.id).padStart(2, '0')}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-bold mb-2" style={{ color: 'var(--accent-purple)' }}>
                        Prompt
                      </p>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-primary)', lineHeight: 1.72 }}>
                        {row.aiPrompt}
                      </p>
                      <div
                        className="text-xs px-3 py-2 rounded-lg"
                        style={{
                          background: 'rgba(91,74,160,0.07)',
                          border: '1px solid rgba(91,74,160,0.12)',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.72,
                        }}
                      >
                        → {row.aiOutput}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)', lineHeight: 1.78 }}>
                        {row.humanVerification}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                        <span className="text-xs font-semibold" style={{ color: 'var(--accent-gold)', lineHeight: 1.45 }}>
                          {row.source}
                        </span>
                      </div>
                    </div>

                    <div className="ai-status-cell">
                      <span
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold"
                        style={{ background: status.bg, border: `1px solid ${status.border}`, color: status.color, minWidth: 112 }}
                      >
                        <StatusIcon size={12} />
                        {status.label}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.p
            className="text-center mt-9 text-xs max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Nội dung AI chỉ được dùng như công cụ hỗ trợ. Các điểm pháp lý trọng yếu được nhóm đối chiếu với giáo trình,
            Hiến pháp hiện hành và văn bản chính thức trước khi đưa lên giao diện.
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}
