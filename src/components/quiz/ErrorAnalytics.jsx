import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  ReferenceLine,
  Label,
} from 'recharts';
import { AlertTriangle } from 'lucide-react';
import { errorAnalyticsData, errorAnnotation } from '../../data/mockData';

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="glass-card px-4 py-3"
        style={{
          border: `1px solid ${
            data.isHighlighted
              ? 'rgba(239,68,68,0.3)'
              : 'var(--glass-border)'
          }`,
        }}
      >
        <p
          className="text-sm font-bold mb-1"
          style={{
            color: data.isHighlighted
              ? 'var(--accent-red)'
              : 'var(--text-primary)',
          }}
        >
          {data.label}: {data.topic}
        </p>
        <p
          className="text-lg font-black"
          style={{
            color: data.isHighlighted
              ? 'var(--accent-red)'
              : 'var(--accent-gold)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {data.errorRate}% sai
        </p>
      </div>
    );
  }
  return null;
}

export default function ErrorAnalytics() {
  return (
    <div>
      {/* Chart */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--glass-border)',
        }}
      >
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={errorAnalyticsData}
            margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#94A3B8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <ReferenceLine y={50} stroke="rgba(239,68,68,0.3)" strokeDasharray="6 4">
              <Label
                value="Ngưỡng cảnh báo 50%"
                position="right"
                fill="#EF4444"
                fontSize={10}
              />
            </ReferenceLine>
            <Bar dataKey="errorRate" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {errorAnalyticsData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.isHighlighted
                      ? '#EF4444'
                      : 'var(--accent-gold)'
                  }
                  fillOpacity={entry.isHighlighted ? 0.9 : 0.6}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Annotation Callout */}
      <motion.div
        className="rounded-xl p-5"
        style={{
          background:
            'linear-gradient(135deg, rgba(239,68,68,0.08), rgba(239,68,68,0.02))',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-start gap-3">
          <AlertTriangle
            size={20}
            style={{
              color: 'var(--accent-red)',
              flexShrink: 0,
              marginTop: 2,
            }}
          />
          <div>
            <h4
              className="text-sm font-bold mb-1"
              style={{ color: 'var(--accent-red)' }}
            >
              ⚠️ {errorAnnotation.question} — Tỷ lệ sai{' '}
              {errorAnnotation.errorRate}
            </h4>
            <p
              className="text-sm mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              {errorAnnotation.detail}
            </p>
            <div className="flex flex-wrap gap-3 mb-2">
              <div
                className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  color: 'var(--accent-red)',
                  textDecoration: 'line-through',
                }}
              >
                ✗ {errorAnnotation.wrongAnswer}
              </div>
              <div
                className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                style={{
                  background: 'rgba(45,212,191,0.1)',
                  color: 'var(--accent-teal)',
                }}
              >
                ✓ {errorAnnotation.correctAnswer}
              </div>
            </div>
            <p
              className="text-xs italic"
              style={{ color: 'var(--text-muted)' }}
            >
              📖 {errorAnnotation.reference}
            </p>
            <p
              className="text-xs mt-2 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {errorAnnotation.explanation}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
