import Sidebar from './components/layout/Sidebar';
import HeroSection from './components/hero/HeroSection';
import BranchesSection from './components/branches/BranchesSection';
import FeedbackPortal from './components/feedback/FeedbackPortal';
import QuizDashboard from './components/quiz/QuizDashboard';
import TransparencyHub from './components/transparency/TransparencyHub';

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content and Footer wrapper with standard pl-0 md:pl-[68px] to offset sidebar */}
      <div className="pl-0 md:pl-[68px] flex flex-col min-h-screen">
        <main className="flex-grow">
          <HeroSection />
          <BranchesSection />
          <FeedbackPortal />
          <QuizDashboard />
          <TransparencyHub />
        </main>

        {/* Footer */}
        <footer
          className="text-center py-10"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
          }}
        >
          <p
            className="text-sm font-semibold mb-1.5"
            style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}
          >
            Hành trình Pháp quyền
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            MLN131 — Nhóm 3 | Dân chủ XHCN & Nhà nước Pháp quyền Việt Nam
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            © 2026 — Mockup phục vụ thuyết trình học thuật
          </p>
        </footer>
      </div>
    </div>
  );
}
