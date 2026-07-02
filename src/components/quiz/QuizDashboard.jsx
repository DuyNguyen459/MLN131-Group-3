import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Radio, Trophy, BarChart3, Play, Pause, RotateCcw } from 'lucide-react';
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
  const { minutes, seconds, isRunning, progress, start, pause, reset } =
    useCountdown(120);

  // Circular timer dimensions
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <SectionWrapper id="quiz">
      <div className="section-container" style={{ paddingLeft: 92 }}>
        {/* Header */}
        <div className="text-center mb-10">
          <span className="badge badge-gold mb-3 inline-flex">
            Minigame Tương tác
          </span>
          <h2 className="section-title text-center mx-auto">
            Kiểm tra Kiến thức
          </h2>
          <p className="section-subtitle text-center mx-auto">
            Quiz trực tuyến — Kiểm tra hiểu biết về Nhà nước Pháp quyền
          </p>
        </div>

        {/* Tab Bar */}
        <div
          className="flex gap-1 p-1.5 rounded-2xl mx-auto mb-8 max-w-md"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--glass-border)',
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl flex-1 text-sm font-semibold cursor-pointer relative"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive
                    ? 'var(--accent-gold)'
                    : 'var(--text-muted)',
                  zIndex: 1,
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'var(--accent-gold-dim)',
                      border: '1px solid rgba(212,168,83,0.2)',
                    }}
                    layoutId="activeQuizTab"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon size={16} />
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Live View */}
            {activeTab === 'live' && (
              <motion.div
                key="live"
                className="flex flex-col md:flex-row items-center justify-center gap-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* QR Code */}
                <motion.div
                  className="glass-card p-8 flex flex-col items-center"
                  style={{
                    border: '1px solid rgba(212,168,83,0.15)',
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p
                    className="text-sm font-semibold mb-4"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    Quét mã để tham gia
                  </p>
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: '#fff' }}
                  >
                    <QRCodeSVG
                      value="https://quiz.hanh-trinh-phap-quyen.edu.vn"
                      size={180}
                      level="H"
                      fgColor="#0A0F1E"
                      bgColor="#ffffff"
                    />
                  </div>
                  <p
                    className="text-xs mt-4"
                    style={{
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    quiz.hanh-trinh-phap-quyen.edu.vn
                  </p>
                </motion.div>

                {/* Countdown Timer */}
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <svg width="220" height="220" viewBox="0 0 220 220">
                      {/* Background circle */}
                      <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="110"
                        cy="110"
                        r={radius}
                        fill="none"
                        stroke={
                          progress > 0.3
                            ? 'var(--accent-gold)'
                            : 'var(--accent-red)'
                        }
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90 110 110)"
                        style={{
                          transition: 'stroke-dashoffset 1s linear',
                          filter:
                            progress > 0.3
                              ? 'drop-shadow(0 0 8px rgba(212,168,83,0.4))'
                              : 'drop-shadow(0 0 8px rgba(239,68,68,0.4))',
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span
                        className="text-4xl font-black"
                        style={{
                          color:
                            progress > 0.3
                              ? 'var(--accent-gold)'
                              : 'var(--accent-red)',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {String(minutes).padStart(2, '0')}:
                        {String(seconds).padStart(2, '0')}
                      </span>
                      <span
                        className="text-xs mt-1"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        Thời gian còn lại
                      </span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3 mt-6">
                    <motion.button
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
                      style={{
                        background: isRunning
                          ? 'rgba(239,68,68,0.1)'
                          : 'linear-gradient(135deg, var(--accent-gold), var(--accent-bronze))',
                        border: isRunning
                          ? '1px solid rgba(239,68,68,0.2)'
                          : 'none',
                        color: isRunning ? 'var(--accent-red)' : '#0A0F1E',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isRunning ? pause : start}
                    >
                      {isRunning ? (
                        <>
                          <Pause size={16} /> Tạm dừng
                        </>
                      ) : (
                        <>
                          <Play size={16} /> Bắt đầu
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      className="p-2.5 rounded-xl cursor-pointer"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--border-light)',
                        color: 'var(--text-secondary)',
                      }}
                      whileHover={{
                        background: 'rgba(255,255,255,0.1)',
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={reset}
                    >
                      <RotateCcw size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Leaderboard */}
            {activeTab === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Leaderboard />
              </motion.div>
            )}

            {/* Analytics */}
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ErrorAnalytics />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
