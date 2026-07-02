import Sidebar from './components/layout/Sidebar';
import HeroSection from './components/hero/HeroSection';
import BranchesSection from './components/branches/BranchesSection';
import FeedbackPortal from './components/feedback/FeedbackPortal';
import QuizDashboard from './components/quiz/QuizDashboard';
import TransparencyHub from './components/transparency/TransparencyHub';

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar />

      <div className="pl-0 md:pl-[68px] flex flex-col min-h-screen">
        <main className="flex-grow">
          <HeroSection />
          <BranchesSection />
          <FeedbackPortal />
          <QuizDashboard />
          <TransparencyHub />
        </main>

        <footer
          className="text-center py-12"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
          }}
        >
          <p className="text-sm font-bold mb-2" style={{ color: 'var(--accent-red)', fontFamily: 'var(--font-heading)' }}>
            Hành trình Pháp quyền
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            MLN131 - Nhóm 3 | Dân chủ XHCN & Nhà nước Pháp quyền Việt Nam
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
            © 2026 - Mockup phục vụ thuyết trình học thuật
          </p>
        </footer>
      </div>
    </div>
  );
}
