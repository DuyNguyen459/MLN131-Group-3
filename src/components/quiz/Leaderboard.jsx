import { motion } from 'framer-motion';
import { Clock, Star } from 'lucide-react';
import { leaderboardData } from '../../data/mockData';

const medalColors = {
  1: { bg: 'linear-gradient(135deg, rgba(212,168,83,0.2), rgba(212,168,83,0.05))', border: 'rgba(212,168,83,0.4)', text: 'var(--accent-gold)', size: 'lg' },
  2: { bg: 'linear-gradient(135deg, rgba(192,192,192,0.15), rgba(192,192,192,0.05))', border: 'rgba(192,192,192,0.3)', text: '#C0C0C0', size: 'md' },
  3: { bg: 'linear-gradient(135deg, rgba(184,115,51,0.15), rgba(184,115,51,0.05))', border: 'rgba(184,115,51,0.3)', text: 'var(--accent-bronze)', size: 'md' },
};

export default function Leaderboard() {
  return (
    <div>
      {/* Podium — Top 3 */}
      <div className="flex items-end justify-center gap-4 mb-6" style={{ minHeight: 200 }}>
        {[1, 0, 2].map((idx) => {
          const entry = leaderboardData[idx];
          if (!entry) return null;
          const style = medalColors[entry.rank] || {};
          const height = entry.rank === 1 ? 160 : entry.rank === 2 ? 130 : 110;

          return (
            <motion.div
              key={entry.rank}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 + 0.3, type: 'spring', stiffness: 200 }}
            >
              {/* Medal */}
              <span className="text-3xl mb-2">{entry.medal}</span>

              {/* Podium bar */}
              <motion.div
                className="rounded-t-xl flex flex-col items-center justify-end px-4 pb-4"
                style={{
                  width: entry.rank === 1 ? 120 : 100,
                  height,
                  background: style.bg,
                  border: `1px solid ${style.border}`,
                  borderBottom: 'none',
                }}
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{ delay: idx * 0.2 + 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <p
                  className="text-sm font-bold mb-1 text-center"
                  style={{ color: style.text }}
                >
                  {entry.name}
                </p>
                <p
                  className="text-xl font-black"
                  style={{
                    color: style.text,
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {entry.score}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {entry.time}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Full list */}
      <div className="flex flex-col gap-2">
        {leaderboardData.map((entry, i) => (
          <motion.div
            key={entry.rank}
            className="flex items-center gap-4 px-4 py-3 rounded-xl"
            style={{
              background: entry.rank <= 3 ? 'rgba(212,168,83,0.05)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${entry.rank <= 3 ? 'rgba(212,168,83,0.1)' : 'var(--glass-border)'}`,
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <span
              className="text-lg font-bold w-8 text-center"
              style={{
                color: medalColors[entry.rank]?.text || 'var(--text-muted)',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {entry.medal || `#${entry.rank}`}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                {entry.name}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} style={{ color: 'var(--accent-gold)' }} />
              <span
                className="text-sm font-bold"
                style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}
              >
                {entry.score}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} style={{ color: 'var(--text-muted)' }} />
              <span
                className="text-xs"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {entry.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
