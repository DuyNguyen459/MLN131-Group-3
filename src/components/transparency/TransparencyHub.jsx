import { motion } from 'framer-motion';
import { Bot, UserCheck, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import { transparencyData } from '../../data/mockData';

const statusConfig = {
  verified: {
    label: 'Đã xác minh',
    icon: CheckCircle2,
    color: 'var(--accent-teal)',
    bg: 'rgba(45,212,191,0.1)',
    border: 'rgba(45,212,191,0.2)',
  },
  corrected: {
    label: 'Đã chỉnh sửa',
    icon: AlertCircle,
    color: 'var(--accent-gold)',
    bg: 'rgba(212,168,83,0.1)',
    border: 'rgba(212,168,83,0.2)',
  },
};

export default function TransparencyHub() {
  return (
    <SectionWrapper id="transparency">
      <div
        className="relative"
        style={{
          background:
            'linear-gradient(180deg, var(--bg-primary), var(--bg-secondary))',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="section-container">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="badge badge-gold mb-3 inline-flex">
              Minh bạch Học thuật
            </span>
            <h2 className="section-title text-center mx-auto">
              AI Transparency Hub
            </h2>
            <p className="section-subtitle text-center mx-auto">
              So sánh nội dung AI tạo ra với nguồn tài liệu đã được xác minh
            </p>
          </div>

          {/* Comparison Table */}
          <div className="max-w-5xl mx-auto">
            {/* Table Header */}
            <div
              className="grid grid-cols-12 gap-4 px-6 py-4 rounded-t-2xl"
              style={{
                background: 'rgba(212,168,83,0.06)',
                border: '1px solid rgba(212,168,83,0.12)',
                borderBottom: 'none',
              }}
            >
              <div className="col-span-1 flex items-center">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  #
                </span>
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <Bot size={16} style={{ color: 'var(--accent-purple)' }} />
                <span
                  className="text-sm font-bold"
                  style={{ color: 'var(--accent-purple)' }}
                >
                  AI Prompts & Ý tưởng AI tạo ra
                </span>
              </div>
              <div className="col-span-5 flex items-center gap-2">
                <UserCheck
                  size={16}
                  style={{ color: 'var(--accent-teal)' }}
                />
                <span
                  className="text-sm font-bold"
                  style={{ color: 'var(--accent-teal)' }}
                >
                  Xác minh bởi Con người
                </span>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Trạng thái
                </span>
              </div>
            </div>

            {/* Table Rows */}
            {transparencyData.map((row, i) => {
              const status = statusConfig[row.status];
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={row.id}
                  className="grid grid-cols-12 gap-4 px-6 py-5"
                  style={{
                    background:
                      i % 2 === 0
                        ? 'rgba(255,255,255,0.02)'
                        : 'rgba(255,255,255,0.01)',
                    border: '1px solid var(--glass-border)',
                    borderTop: 'none',
                    ...(i === transparencyData.length - 1 && {
                      borderRadius: '0 0 16px 16px',
                    }),
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{
                    background: 'rgba(212,168,83,0.03)',
                  }}
                >
                  {/* Row Number */}
                  <div className="col-span-1 flex items-start">
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {String(row.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* AI Side */}
                  <div className="col-span-4">
                    <p
                      className="text-xs font-semibold mb-1"
                      style={{ color: 'var(--accent-purple)' }}
                    >
                      Prompt:
                    </p>
                    <p
                      className="text-sm mb-2 leading-relaxed"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {row.aiPrompt}
                    </p>
                    <div
                      className="text-xs px-3 py-2 rounded-lg leading-relaxed"
                      style={{
                        background: 'rgba(167,139,250,0.06)',
                        border: '1px solid rgba(167,139,250,0.1)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      → {row.aiOutput}
                    </div>
                  </div>

                  {/* Human Side */}
                  <div className="col-span-5">
                    <p
                      className="text-sm leading-relaxed mb-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {row.humanVerification}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <BookOpen
                        size={12}
                        style={{ color: 'var(--accent-gold)' }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: 'var(--accent-gold)' }}
                      >
                        {row.source}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-start justify-center">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        background: status.bg,
                        border: `1px solid ${status.border}`,
                        color: status.color,
                      }}
                    >
                      <StatusIcon size={12} />
                      {status.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer note */}
          <motion.p
            className="text-center mt-8 text-xs max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tất cả nội dung AI tạo ra đều được đối chiếu với Giáo trình Chủ
            nghĩa xã hội khoa học (Bộ GD&ĐT, 2021) và Hiến pháp nước CHXHCN
            Việt Nam 2013. Các mục "Đã chỉnh sửa" cho thấy AI có thể tạo ra
            nội dung chưa chính xác và cần sự kiểm duyệt của con người.
          </motion.p>
        </div>
      </div>
    </SectionWrapper>
  );
}
