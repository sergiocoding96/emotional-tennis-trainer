import React, { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import type { ChatMessage as ChatMessageType } from '../types/debrief'
import type { DebriefAnalysis } from '../../../types/database'
import { EMOTION_PROFILES } from '../types/debrief'

interface ChatInterfaceProps {
  messages: ChatMessageType[]
  analysis: DebriefAnalysis | null
  isLoading: boolean
  onSendMessage: (message: string) => void
  onEndSession: () => void
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  analysis,
  isLoading,
  onSendMessage,
  onEndSession
}) => {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex h-full">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-slate-700/50 p-4 bg-slate-900/50">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts..."
              disabled={isLoading}
              rows={2}
              className="flex-1 bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-all resize-none disabled:opacity-50"
            />
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send
                    <span>{'\u2191'}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onEndSession}
                disabled={isLoading || messages.length < 4}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 text-sm font-medium hover:bg-slate-700 hover:text-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Finish
              </button>
            </div>
          </form>
          <p className="text-xs text-slate-600 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Context panel */}
      {analysis && (
        <div className="w-72 border-l border-slate-700/50 bg-slate-900/30 p-4 overflow-y-auto hidden lg:block">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Match Analysis
          </h3>

          {/* Detected emotions */}
          <div className="mb-6">
            <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Emotions Detected</h4>
            <div className="space-y-2">
              {analysis.emotions_detected.map((emotion, index) => {
                const profile = EMOTION_PROFILES[emotion.emotion]
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 border border-slate-700/30"
                  >
                    <span className="text-lg">{profile?.icon || '\u{2753}'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 capitalize">{emotion.emotion}</p>
                      <div className="w-full bg-slate-700/50 rounded-full h-1 mt-1">
                        <div
                          className={`bg-gradient-to-r ${profile?.gradient || 'from-slate-500 to-slate-600'} h-1 rounded-full`}
                          style={{ width: `${emotion.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Key moments */}
          <div className="mb-6">
            <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Key Moments</h4>
            <div className="space-y-2">
              {analysis.key_moments.map((moment, index) => {
                const profile = EMOTION_PROFILES[moment.emotion]
                return (
                  <div
                    key={index}
                    className="p-2 rounded-lg bg-slate-800/40 border border-slate-700/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{profile?.icon || '\u{2753}'}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        moment.significance === 'high'
                          ? 'bg-rose-500/20 text-rose-400'
                          : moment.significance === 'medium'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {moment.significance}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{moment.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Patterns */}
          {analysis.patterns.length > 0 && (
            <div>
              <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-2">Patterns</h4>
              <div className="space-y-1">
                {analysis.patterns.map((pattern, index) => (
                  <div
                    key={index}
                    className="text-xs text-slate-400 p-2 rounded-lg bg-slate-800/40 border border-slate-700/30"
                  >
                    <span className="text-slate-500 capitalize">[{pattern.type}]</span>{' '}
                    {pattern.pattern}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatInterface
