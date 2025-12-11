import React from 'react'
import type { ChatMessage as ChatMessageType } from '../types/debrief'
import { EMOTION_PROFILES } from '../types/debrief'

interface ChatMessageProps {
  message: ChatMessageType
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'
  const emotion = message.referencedEmotion ? EMOTION_PROFILES[message.referencedEmotion] : null

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] ${
          isUser
            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl rounded-br-md'
            : 'bg-slate-800/60 text-slate-200 rounded-2xl rounded-bl-md border border-slate-700/50'
        } px-4 py-3 shadow-lg`}
      >
        {/* Coach indicator */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/50">
            <span className="text-lg">{'\u{1F3BE}'}</span>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Coach</span>
            {emotion && (
              <span className="ml-auto text-sm" title={emotion.name}>
                {emotion.icon}
              </span>
            )}
          </div>
        )}

        {/* Message content */}
        {message.isStreaming ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        ) : message.isError ? (
          <p className="text-rose-300">{message.content}</p>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            {message.content.split('\n').map((paragraph, index) => {
              // Check if this is a reframe suggestion
              if (paragraph.toLowerCase().startsWith('instead of:')) {
                return (
                  <div key={index} className="my-3 p-3 bg-slate-900/50 rounded-xl border border-amber-500/30">
                    <p className="text-amber-400 text-xs uppercase tracking-wider mb-1">Reframe Suggestion</p>
                    <p className="text-slate-300 text-sm">{paragraph}</p>
                  </div>
                )
              }
              if (paragraph.toLowerCase().startsWith('try:')) {
                return (
                  <p key={index} className="text-emerald-400 font-medium">{paragraph}</p>
                )
              }
              return paragraph.trim() ? (
                <p key={index} className="mb-2 last:mb-0 leading-relaxed">{paragraph}</p>
              ) : null
            })}
          </div>
        )}

        {/* Timestamp */}
        <div className={`text-xs mt-2 ${isUser ? 'text-violet-200/60' : 'text-slate-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
