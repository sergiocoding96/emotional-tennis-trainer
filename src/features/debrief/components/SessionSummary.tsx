import React from 'react'
import { Link } from 'react-router-dom'
import type { DebriefSummary } from '../../../types/database'
import { EMOTION_PROFILES } from '../types/debrief'

interface SessionSummaryProps {
  summary: DebriefSummary
  onStartNew: () => void
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({ summary, onStartNew }) => {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 mb-6">
          <span className="text-3xl">{'\u2713'}</span>
          <span className="text-lg font-medium text-emerald-300">Session Complete</span>
        </div>
        <h1 className="text-3xl font-light text-white mb-3">
          Your <span className="font-semibold text-emerald-400">Takeaways</span>
        </h1>
        <p className="text-slate-400">
          Here's what we discovered in this session. Reference this before your next match.
        </p>
      </div>

      {/* Summary cards */}
      <div className="space-y-6">
        {/* Focus for next match - highlighted */}
        <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl border border-violet-500/30 p-6">
          <h3 className="text-sm font-medium text-violet-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>{'\u{1F3AF}'}</span>
            Focus for Next Match
          </h3>
          <p className="text-xl text-white font-medium leading-relaxed">
            {summary.focus_for_next_match}
          </p>
        </div>

        {/* Emotions explored */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-6">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span>{'\u{1F3AD}'}</span>
            Emotions Explored
          </h3>
          <div className="flex flex-wrap gap-2">
            {summary.emotions_explored.map((emotion, index) => {
              const profile = EMOTION_PROFILES[emotion]
              return (
                <div
                  key={index}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${profile?.gradient || 'from-slate-500 to-slate-600'} bg-opacity-20`}
                  style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                >
                  <span className="text-lg">{profile?.icon || '\u{2753}'}</span>
                  <span className="text-white capitalize">{emotion}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Key insights */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-6">
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span>{'\u{1F4A1}'}</span>
            Key Insights
          </h3>
          <ul className="space-y-3">
            {summary.key_insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-slate-300 leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reframes created */}
        {summary.reframes_created.length > 0 && (
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-6">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>{'\u{1F504}'}</span>
              Reframes to Practice
            </h3>
            <div className="space-y-4">
              {summary.reframes_created.map((reframe, index) => (
                <div key={index} className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-rose-400">{'\u2717'}</span>
                    <span className="text-rose-300 line-through text-sm">{reframe.original}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400">{'\u2713'}</span>
                    <span className="text-emerald-300 font-medium">{reframe.reframed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Routines to practice */}
        {summary.routines_to_practice.length > 0 && (
          <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-6">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span>{'\u{1F4CB}'}</span>
              Routines to Practice
            </h3>
            <ul className="space-y-2">
              {summary.routines_to_practice.map((routine, index) => (
                <li key={index} className="flex items-center gap-3 text-slate-300">
                  <span className="text-violet-400">{'\u25B6'}</span>
                  {routine}
                </li>
              ))}
            </ul>
            <Link
              to="/builder"
              className="mt-4 inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              Go to Routine Builder
              <span>{'\u2192'}</span>
            </Link>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={onStartNew}
          className="flex-1 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
        >
          <span>{'\u{1F3BE}'}</span>
          Debrief Another Match
        </button>
        <Link
          to="/"
          className="flex-1 py-4 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
        >
          Back to Home
        </Link>
      </div>

      {/* Motivational footer */}
      <div className="mt-8 text-center p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50">
        <p className="text-slate-400 italic">
          "The mind is the athlete's greatest tool. Every match is a chance to learn."
        </p>
        <p className="text-slate-600 text-sm mt-2">Keep training your mental game.</p>
      </div>
    </div>
  )
}

export default SessionSummary
