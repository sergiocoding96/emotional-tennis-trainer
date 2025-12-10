import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { AuthForm } from './components/auth/AuthForm'
import EmotionalFramework from './features/framework/EmotionalFramework'
import EmotionalRoutineBuilder from './features/routines/EmotionalRoutineBuilder'

// Home component with Tailwind styling
function Home() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
            <span className="text-xl">{'\u{1F3BE}'}</span>
            <span className="text-sm font-medium text-slate-300 tracking-wide">TENNIS MENTAL TRAINING</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tight">
            Emotional <span className="font-semibold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Tennis</span> Trainer
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Master your emotions on the court. Understand the science of tennis psychology and build personalized routines to perform at your best.
          </p>
        </div>

        {/* Auth Status */}
        {user ? (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-emerald-400">{'\u2713'}</span>
              <span className="text-emerald-300 text-sm">Signed in as {user.email}</span>
              <button
                onClick={() => signOut()}
                className="text-emerald-400 hover:text-emerald-300 underline text-sm ml-2"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center mb-8">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-all"
            >
              Sign In to Save Progress
            </Link>
          </div>
        )}

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Emotional Framework Card */}
          <Link
            to="/framework"
            className="group rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 p-8 hover:border-violet-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">{'\u{1F9E0}'}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Emotional Framework</h2>
                <p className="text-slate-400 text-sm">Educational Dashboard</p>
              </div>
            </div>
            <p className="text-slate-400 mb-4">
              Explore the 6 core emotions in tennis and understand how they affect your performance through interactive visualizations.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Circumplex Map', 'Timeline', 'Arousal', 'Controllability'].map((view) => (
                <span key={view} className="px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 text-xs">
                  {view}
                </span>
              ))}
            </div>
            <div className="mt-4 text-violet-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
              Explore Framework {'\u2192'}
            </div>
          </Link>

          {/* Routine Builder Card */}
          <Link
            to="/builder"
            className="group rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 p-8 hover:border-emerald-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-3xl">{'\u{1F4CB}'}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Routine Builder</h2>
                <p className="text-slate-400 text-sm">Personal Tool</p>
              </div>
            </div>
            <p className="text-slate-400 mb-4">
              Map your emotional triggers, understand your feelings, and create personalized reset routines to regain control during matches.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Trigger Mapping', 'Reset Routines', 'Emotional Pathways'].map((feature) => (
                <span key={feature} className="px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 text-xs">
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-4 text-emerald-400 text-sm font-medium group-hover:translate-x-2 transition-transform">
              Build Routines {'\u2192'}
            </div>
          </Link>
        </div>

        {/* Science Foundation */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm mb-4">Built on proven sports psychology research</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Attribution Theory', 'Circumplex Model', 'IZOF', 'Achievement Goal Theory'].map((theory) => (
              <span key={theory} className="px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-800/50 text-slate-400 text-sm">
                {theory}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <span className="text-6xl mb-4 block">{'\u{1F3BE}'}</span>
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <p className="text-slate-400 mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-all"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/framework" element={<EmotionalFramework />} />
      <Route path="/builder" element={<EmotionalRoutineBuilder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export { ProtectedRoute }
