import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { BarChart3, Clock3, Pause, Play, QrCode, Radio, RotateCcw, Trophy } from 'lucide-react';
import SectionWrapper from '../layout/SectionWrapper';
import Leaderboard from './Leaderboard';
import ErrorAnalytics from './ErrorAnalytics';
import useCountdown from '../../hooks/useCountdown';

const tabs = [
  { id: 'live', label: 'Trực tiếp', icon: Radio },
  { id: 'leaderboard', label: 'Bảng xếp hạng', icon: Trophy },
  { id: 'analytics', label: 'Phân tích', icon: BarChart3 },
];

export default function QuizDashboard() {
  const [activeTab, setActiveTab] = useState('live');
  const { minutes, seconds, isRunning, progress, start, pause, reset } = useCountdown(120);

  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <SectionWrapper id="quiz">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="badge badge-gold mb-3 inline-flex">Minigame tương tác</span>
          <h2 className="section-title text-center mx-auto">Kiểm tra kiến thức</h2>
          <p className="section-subtitle text-center mx-auto">
            Quiz trực tuyến dùng trong phần thuyết trình để phân loại thẩm quyền lập pháp, hành pháp và tư pháp.
          </p>
        </div>

        <div className="mode-toolbar mx-auto mb-10 max-w-xl justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg flex-1 text-sm font-bold cursor-pointer relative min-w-[120px]"
                style={{
                  background: isActive ? 'var(--accent-gold-dim)' : 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--accent-red)' : 'var(--text-muted)',
                  minHeight: 42,
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'live' && (
              <motion.div key="live" className="quiz-live-grid" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
                <motion.div className="glass-card quiz-live-card" whileHover={{ y: -3 }}>
                  <div className="quiz-card-title">
                    <QrCode size={16} />
                    Quét mã tham gia
                  </div>
                  <div className="quiz-card-body">
                    <div className="p-4 rounded-lg" style={{ background: '#fff', border: '1px solid var(--border)' }}>
                      <QRCodeSVG value="https://quiz.hanh-trinh-phap-quyen.edu.vn" size={190} level="H" fgColor="#231f20" bgColor="#ffffff" />
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                    quiz.hanh-trinh-phap-quyen.edu.vn
                  </p>
                </motion.div>

                <motion.div className="glass-card quiz-live-card" whileHover={{ y: -3 }}>
                  <div className="quiz-card-title">
                    <Clock3 size={16} />
                    Bộ đếm thời gian
                  </div>

                  <div className="quiz-card-body">
                    <div className="relative">
                      <svg width="220" height="220" viewBox="0 0 220 220">
                        <circle cx="110" cy="110" r={radius} fill="none" stroke="rgba(35,31,32,0.08)" strokeWidth="9" />
                        <circle
                          cx="110"
                          cy="110"
                          r={radius}
                          fill="none"
                          stroke={progress > 0.3 ? 'var(--accent-gold)' : 'var(--accent-red)'}
                          strokeWidth="9"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          transform="rotate(-90 110 110)"
                          style={{ transition: 'stroke-dashoffset 1s linear' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black" style={{ color: progress > 0.3 ? 'var(--accent-gold)' : 'var(--accent-red)', fontFamily: 'var(--font-mono)' }}>
                          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </span>
                        <span className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                          Thời gian còn lại
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <motion.button
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold cursor-pointer"
                      style={{
                        background: isRunning ? 'rgba(163,38,42,0.1)' : 'linear-gradient(135deg, var(--accent-gold), var(--accent-bronze))',
                        border: isRunning ? '1px solid rgba(163,38,42,0.22)' : 'none',
                        color: isRunning ? 'var(--accent-red)' : '#fff8df',
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={isRunning ? pause : start}
                    >
                      {isRunning ? <Pause size={16} /> : <Play size={16} />}
                      {isRunning ? 'Tạm dừng' : 'Bắt đầu'}
                    </motion.button>
                    <motion.button
                      className="p-2.5 rounded-lg cursor-pointer"
                      style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                      whileHover={{ borderColor: 'var(--accent-gold)' }}
                      whileTap={{ scale: 0.92 }}
                      onClick={reset}
                    >
                      <RotateCcw size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'leaderboard' && (
              <motion.div key="leaderboard" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
                <Leaderboard />
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div key="analytics" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }}>
                <ErrorAnalytics />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
