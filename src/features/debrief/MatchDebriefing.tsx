import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useDebriefChat } from './hooks/useDebriefChat'
import { MatchInputForm } from './components/MatchInputForm'
import { ChatInterface } from './components/ChatInterface'
import { SessionSummary } from './components/SessionSummary'

const MatchDebriefing: React.FC = () => {
  const { user, loading: authLoading } = useAuth()
  const {
    stage,
    messages,
    analysis,
    summary,
    isLoading,
    error,
    startSession,
    sendMessage,
    endSession,
    resetSession
  } = useDebriefChat()

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <span>{'\u2190'}</span>
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">{'\u{1F3BE}'}</span>
            <span className="font-medium text-white">Match Debrief</span>
          </div>
          {stage === 'chat' && (
            <button
              onClick={resetSession}
              className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              Start Over
            </button>
          )}
          {stage !== 'chat' && <div className="w-16"></div>}
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {/* Error banner */}
        {error && (
          <div className="max-w-2xl mx-auto px-4 pt-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3">
              <span className="text-rose-400">{'\u26A0'}</span>
              <span className="text-rose-300 text-sm">{error}</span>
              <button
                onClick={() => {}}
                className="ml-auto text-rose-400 hover:text-rose-300"
              >
                {'\u2715'}
              </button>
            </div>
          </div>
        )}

        {/* Stage: Input */}
        {stage === 'input' && (
          <div className="px-4 py-8">
            <MatchInputForm onSubmit={startSession} isLoading={isLoading} />
          </div>
        )}

        {/* Stage: Analyzing */}
        {stage === 'analyzing' && (
          <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-medium text-white mb-2">Analyzing your match...</h2>
              <p className="text-slate-400">Identifying emotional patterns and key moments</p>
            </div>
          </div>
        )}

        {/* Stage: Chat */}
        {stage === 'chat' && (
          <div className="h-[calc(100vh-80px)]">
            <ChatInterface
              messages={messages}
              analysis={analysis}
              isLoading={isLoading}
              onSendMessage={sendMessage}
              onEndSession={endSession}
            />
          </div>
        )}

        {/* Stage: Summary */}
        {stage === 'summary' && summary && (
          <div className="px-4 py-8">
            <SessionSummary summary={summary} onStartNew={resetSession} />
          </div>
        )}
      </main>
    </div>
  )
}

export default MatchDebriefing
