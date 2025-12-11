import React, { useState } from 'react'
import type { MatchInputData } from '../types/debrief'

interface MatchInputFormProps {
  onSubmit: (data: MatchInputData) => void
  isLoading: boolean
}

export const MatchInputForm: React.FC<MatchInputFormProps> = ({ onSubmit, isLoading }) => {
  const [matchDescription, setMatchDescription] = useState('')
  const [opponent, setOpponent] = useState('')
  const [matchDate, setMatchDate] = useState('')
  const [score, setScore] = useState('')
  const [showOptional, setShowOptional] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (matchDescription.trim().length >= 20) {
      onSubmit({
        matchDescription: matchDescription.trim(),
        opponent: opponent.trim() || undefined,
        matchDate: matchDate || undefined,
        score: score.trim() || undefined
      })
    }
  }

  const placeholderText = `Tell me about your match...

For example:
- What was the score? How did the key moments go?
- When did you feel frustrated, anxious, or disappointed?
- What thoughts went through your mind at critical points?
- Were there moments where you lost focus or got tight?

The more detail you share, the better I can help you reflect.`

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30 mb-6">
          <span className="text-3xl">{'\u{1F3BE}'}</span>
          <span className="text-lg font-medium text-violet-300">Match Debriefing</span>
        </div>
        <h1 className="text-3xl font-light text-white mb-3">
          Let's debrief your <span className="font-semibold text-violet-400">match</span>
        </h1>
        <p className="text-slate-400">
          Share what happened and we'll explore the emotional patterns together.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main description */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/50 p-6">
          <label className="block text-sm font-medium text-slate-300 mb-3">
            How did your match go? <span className="text-slate-500">(required)</span>
          </label>
          <textarea
            value={matchDescription}
            onChange={(e) => setMatchDescription(e.target.value)}
            placeholder={placeholderText}
            rows={8}
            disabled={isLoading}
            className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all resize-none disabled:opacity-50"
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-slate-500">
              {matchDescription.length < 20
                ? `Minimum 20 characters (${20 - matchDescription.length} more needed)`
                : `${matchDescription.length} characters`}
            </p>
          </div>
        </div>

        {/* Optional fields toggle */}
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="w-full text-sm text-slate-400 hover:text-slate-300 transition-colors flex items-center justify-center gap-2"
        >
          <span>{showOptional ? '\u25BC' : '\u25B6'}</span>
          Add match details (optional)
        </button>

        {/* Optional fields */}
        {showOptional && (
          <div className="bg-slate-900/30 rounded-2xl border border-slate-800/50 p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Opponent
                </label>
                <input
                  type="text"
                  value={opponent}
                  onChange={(e) => setOpponent(e.target.value)}
                  placeholder="Name or description"
                  disabled={isLoading}
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2 text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none transition-all disabled:opacity-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Match Date
                </label>
                <input
                  type="date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2 text-white focus:border-violet-500/50 focus:outline-none transition-all disabled:opacity-50 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Score
                </label>
                <input
                  type="text"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="e.g., 6-4, 3-6, 7-5"
                  disabled={isLoading}
                  className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-2 text-white placeholder-slate-600 focus:border-violet-500/50 focus:outline-none transition-all disabled:opacity-50 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading || matchDescription.trim().length < 20}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Analyzing your match...
            </>
          ) : (
            <>
              Start Debriefing
              <span>{'\u2192'}</span>
            </>
          )}
        </button>
      </form>

      {/* Tips */}
      <div className="mt-8 p-4 rounded-xl bg-slate-900/30 border border-slate-800/50">
        <h3 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
          <span>{'\u{1F4A1}'}</span>
          Tips for a great debrief
        </h3>
        <ul className="text-xs text-slate-500 space-y-1">
          <li>{'\u2022'} Focus on specific moments that affected you emotionally</li>
          <li>{'\u2022'} Include what you were thinking and feeling</li>
          <li>{'\u2022'} Mention any physical sensations (tightness, racing heart)</li>
          <li>{'\u2022'} Be honest - there's no judgment here</li>
        </ul>
      </div>
    </div>
  )
}

export default MatchInputForm
