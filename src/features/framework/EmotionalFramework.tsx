import React, { useState, useEffect } from 'react';

// ============================================================================
// TYPES
// ============================================================================

interface Emotion {
  name: string;
  icon: string;
  color: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  arousal: number;
  valence: number;
  timeline: string;
  ego: string;
  controllability: string;
  danger: string;
  description: string;
}

interface EmotionsMap {
  [key: string]: Emotion;
}

interface ViewTab {
  id: string;
  label: string;
  icon: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

const EmotionalFramework: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('overview');
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const emotions: EmotionsMap = {
    disappointment: {
      name: 'Disappointment',
      icon: '😞', // Disappointed face
      color: '#6B7280',
      colorClass: 'gray-500',
      bgClass: 'bg-gray-500',
      borderClass: 'border-gray-500',
      textClass: 'text-gray-500',
      arousal: 3,
      valence: 2,
      timeline: 'Past',
      ego: 'Ego-Threatened',
      controllability: 'Internal + Uncontrollable',
      danger: 'Critical',
      description: 'Low energy withdrawal from challenge'
    },
    frustration: {
      name: 'Frustration',
      icon: '😤', // Triumph face (frustration)
      color: '#F59E0B',
      colorClass: 'amber-500',
      bgClass: 'bg-amber-500',
      borderClass: 'border-amber-500',
      textClass: 'text-amber-500',
      arousal: 6,
      valence: 3,
      timeline: 'Past/Present',
      ego: 'Task -> Ego-Pressured',
      controllability: 'Internal + Controllable',
      danger: 'Moderate',
      description: 'Productive tension seeking solution'
    },
    anger: {
      name: 'Anger',
      icon: '😠', // Angry face
      color: '#EF4444',
      colorClass: 'red-500',
      bgClass: 'bg-red-500',
      borderClass: 'border-red-500',
      textClass: 'text-red-500',
      arousal: 8,
      valence: 2,
      timeline: 'Past/Present',
      ego: 'Ego-Defensive',
      controllability: 'Internal + Uncontrollable',
      danger: 'Moderate-High',
      description: 'Explosive reaction to perceived injustice'
    },
    anxiety: {
      name: 'Anxiety',
      icon: '😰', // Anxious face
      color: '#8B5CF6',
      colorClass: 'violet-500',
      bgClass: 'bg-violet-500',
      borderClass: 'border-violet-500',
      textClass: 'text-violet-500',
      arousal: 7,
      valence: 3,
      timeline: 'Future',
      ego: 'Ego-Pressured',
      controllability: 'Internal + Uncontrollable',
      danger: 'High',
      description: 'Anticipatory fear of failure'
    },
    calmness: {
      name: 'Calmness',
      icon: '😌', // Relieved face
      color: '#3B82F6',
      colorClass: 'blue-500',
      bgClass: 'bg-blue-500',
      borderClass: 'border-blue-500',
      textClass: 'text-blue-500',
      arousal: 4,
      valence: 7,
      timeline: 'Present',
      ego: 'Task-Focused',
      controllability: 'Internal + Controllable',
      danger: 'Low',
      description: 'Centered presence and clarity'
    },
    excitement: {
      name: 'Excitement',
      icon: '😄', // Grinning face
      color: '#10B981',
      colorClass: 'emerald-500',
      bgClass: 'bg-emerald-500',
      borderClass: 'border-emerald-500',
      textClass: 'text-emerald-500',
      arousal: 7,
      valence: 8,
      timeline: 'Present/Future',
      ego: 'Task-Focused',
      controllability: 'Internal + Controllable',
      danger: 'Low',
      description: 'Energized engagement with challenge'
    }
  };

  // --------------------------------------------------------------------------
  // Section Title Component
  // --------------------------------------------------------------------------
  const SectionTitle: React.FC<{ icon: string; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
    <div className="text-center mb-8">
      <div className="text-4xl mb-3">{icon}</div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
        {title}
      </h2>
      <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed px-4">
        {subtitle}
      </p>
    </div>
  );

  // --------------------------------------------------------------------------
  // Overview View
  // --------------------------------------------------------------------------
  const OverviewView: React.FC = () => (
    <div>
      <SectionTitle
        icon="🎾"
        title="Your Emotional Toolkit"
        subtitle="Understanding these six emotions will help you stay in control on court"
      />

      {/* Emotion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {Object.entries(emotions).map(([key, emotion]) => (
          <div
            key={key}
            onMouseEnter={() => setHoveredEmotion(key)}
            onMouseLeave={() => setHoveredEmotion(null)}
            className={`
              relative rounded-2xl p-6 border-2 cursor-pointer
              transition-all duration-300 ease-out
              ${hoveredEmotion === key
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600 -translate-y-2 shadow-2xl'
                : 'bg-slate-900/80 backdrop-blur-xl border-slate-700/50 hover:border-slate-600/50'
              }
            `}
            style={{
              boxShadow: hoveredEmotion === key ? `0 20px 40px ${emotion.color}30` : undefined,
              borderColor: hoveredEmotion === key ? emotion.color : undefined,
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`text-4xl md:text-5xl transition-all duration-300 ${hoveredEmotion === key ? 'scale-110' : ''}`}
              >
                {emotion.icon}
              </div>
              <div>
                <h3
                  className="text-lg md:text-xl font-bold transition-colors duration-300"
                  style={{ color: emotion.color }}
                >
                  {emotion.name}
                </h3>
                <p className={`text-sm ${hoveredEmotion === key ? 'text-slate-300' : 'text-slate-500'} transition-colors duration-300`}>
                  {emotion.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Energy', value: `${emotion.arousal}/10` },
                { label: 'Timeline', value: emotion.timeline },
                { label: 'Risk Level', value: emotion.danger },
                { label: 'Focus', value: emotion.ego.split(' ')[0] }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`
                    px-3 py-2 rounded-lg transition-all duration-300
                    ${hoveredEmotion === key ? 'bg-white/10' : 'bg-slate-800/50'}
                  `}
                >
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${hoveredEmotion === key ? 'text-slate-400' : 'text-slate-600'}`}>
                    {item.label}
                  </div>
                  <div className={`text-sm font-semibold ${hoveredEmotion === key ? 'text-white' : 'text-slate-300'}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: '🔴',
            title: 'Watch Out For',
            emotion: 'Disappointment',
            desc: 'It makes you want to give up',
            bgClass: 'from-red-500/10 to-red-600/10',
            borderClass: 'border-red-500/30',
            titleColor: 'text-red-400'
          },
          {
            icon: '🎯',
            title: 'Your Target Zone',
            emotion: 'Calm + Excited',
            desc: 'This is where you play your best',
            bgClass: 'from-emerald-500/10 to-emerald-600/10',
            borderClass: 'border-emerald-500/30',
            titleColor: 'text-emerald-400'
          },
          {
            icon: '⚡',
            title: 'Act Fast',
            emotion: 'Frustration Building',
            desc: 'You have 2-3 points to reset',
            bgClass: 'from-amber-500/10 to-amber-600/10',
            borderClass: 'border-amber-500/30',
            titleColor: 'text-amber-400'
          }
        ].map((insight, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${insight.bgClass} rounded-2xl p-5 border ${insight.borderClass}`}
          >
            <div className="text-3xl mb-3">{insight.icon}</div>
            <h4 className={`${insight.titleColor} font-bold text-base mb-1`}>
              {insight.title}
            </h4>
            <div className="font-semibold text-slate-200 text-sm mb-1">
              {insight.emotion}
            </div>
            <div className="text-sm text-slate-400">
              {insight.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Reference */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 border border-slate-700/50">
        <h3 className="text-lg md:text-xl font-bold text-white mb-5 flex items-center gap-3">
          <span>🎯</span> Quick Reset Guide
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { state: '😞 Feeling flat?', action: 'Jump, pump your fist, stand tall', color: '#6B7280' },
            { state: '😤 Getting frustrated?', action: 'Pick ONE thing to focus on', color: '#F59E0B' },
            { state: '😠 😰 Too intense?', action: 'Walk to towel, breathe deep', color: '#EF4444' },
            { state: '😌 😄 Feeling good?', action: 'Stay in the moment, trust it', color: '#10B981' }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 rounded-xl p-4 border-l-4"
              style={{ borderLeftColor: item.color }}
            >
              <div className="font-semibold text-white mb-1 text-sm">{item.state}</div>
              <div className="text-sm text-slate-400">
                {item.action}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // Circumplex View
  // --------------------------------------------------------------------------
  const CircumplexView: React.FC = () => {
    const getPosition = (arousal: number, valence: number): { left: string; top: string } => {
      const x = ((valence - 1) / 9) * 100;
      const y = 100 - ((arousal - 1) / 9) * 100;
      return { left: `${x}%`, top: `${y}%` };
    };

    return (
      <div>
        <SectionTitle
          icon="🎯"
          title="The Emotion Map"
          subtitle="Find where you are, then move toward the Peak Zone"
        />

        <div className="grid gap-8">
          {/* Main Grid */}
          <div className="relative w-full max-w-lg mx-auto">
            <div
              className="relative w-full pb-[100%] rounded-2xl border-2 border-slate-600"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 25%, rgba(16, 185, 129, 0.1) 50%, rgba(59, 130, 246, 0.1) 75%, rgba(139, 92, 246, 0.1) 100%)',
                boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.2)'
              }}
            >
              {/* Grid Lines */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '10% 10%'
                }}
              />

              {/* Axes */}
              <div className="absolute left-1/2 top-[5%] bottom-[5%] w-0.5 bg-gradient-to-b from-slate-500 via-slate-600 to-slate-500 -translate-x-1/2" />
              <div className="absolute left-[5%] right-[5%] top-1/2 h-0.5 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 -translate-y-1/2" />

              {/* Peak Zone */}
              <div
                className="absolute flex items-center justify-center"
                style={{
                  left: '55%',
                  top: '30%',
                  width: '35%',
                  height: '35%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '3px dashed #10B981',
                  borderRadius: '50%'
                }}
              >
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider whitespace-nowrap">
                  PEAK ZONE
                </span>
              </div>

              {/* Emotions */}
              {Object.entries(emotions).map(([key, emotion]) => {
                const position = getPosition(emotion.arousal, emotion.valence);
                return (
                  <div
                    key={key}
                    onMouseEnter={() => setHoveredEmotion(key)}
                    onMouseLeave={() => setHoveredEmotion(null)}
                    className="absolute cursor-pointer transition-all duration-300"
                    style={{
                      ...position,
                      transform: `translate(-50%, -50%) scale(${hoveredEmotion === key ? 1.15 : 1})`,
                      zIndex: hoveredEmotion === key ? 10 : 1
                    }}
                  >
                    <div
                      className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-2 md:p-3 text-center border-2 transition-all duration-300"
                      style={{
                        borderColor: emotion.color,
                        boxShadow: hoveredEmotion === key ? `0 12px 24px ${emotion.color}40` : '0 4px 12px rgba(0,0,0,0.3)'
                      }}
                    >
                      <div className="text-xl md:text-3xl mb-1">{emotion.icon}</div>
                      <div
                        className="text-xs font-bold whitespace-nowrap"
                        style={{ color: emotion.color }}
                      >
                        {emotion.name}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Labels */}
              <div className="absolute top-[2%] left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 tracking-wider">
                HIGH ENERGY
              </div>
              <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500 tracking-wider">
                LOW ENERGY
              </div>
              <div className="absolute left-[2%] top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-slate-500 tracking-wider">
                NEGATIVE
              </div>
              <div className="absolute right-[2%] top-1/2 -translate-y-1/2 rotate-90 text-xs font-bold text-slate-500 tracking-wider">
                POSITIVE
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 bg-emerald-500/10 rounded-2xl border-l-4 border-emerald-500">
              <div className="font-bold text-emerald-400 mb-2">✓ Your Target: Peak Zone</div>
              <div className="text-sm text-slate-400 leading-relaxed">
                Medium energy (4-7) + feeling good = your best tennis. This is where you want to be!
              </div>
            </div>

            <div className="p-5 bg-red-500/10 rounded-2xl border-l-4 border-red-500">
              <div className="font-bold text-red-400 mb-2">✗ Danger Zones</div>
              <div className="text-sm text-slate-400 leading-relaxed">
                Too high + negative (anger/anxiety) or too low + negative (disappointment) = trouble. Time to reset!
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-2xl sm:col-span-2 lg:col-span-1">
              <div className="font-bold text-indigo-400 mb-2">🧭 How to Move</div>
              <div className="text-sm text-slate-400 leading-relaxed">
                <strong>Too high?</strong> → Diaphragmatic breathing at the towel<br />
                <strong>Too low?</strong> → Physical activation (jump, fist pump)<br />
                <strong>Too negative?</strong> → Deal with it, let it go, next point
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // Timeline View
  // --------------------------------------------------------------------------
  const TimelineView: React.FC = () => (
    <div>
      <SectionTitle
        icon="⏰"
        title="Where Is Your Mind?"
        subtitle="Champions stay in the present. Are you stuck in the past or worried about the future?"
      />

      {/* Timeline Visual */}
      <div className="flex items-center justify-center gap-0 mb-10 px-5 flex-wrap">
        {[
          { label: 'PAST', sub: 'Mistakes', icon: '⏮', color: '#EF4444', bad: true },
          { label: 'PRESENT', sub: 'This Point', icon: '⏺', color: '#10B981', bad: false },
          { label: 'FUTURE', sub: 'What If...', icon: '⏭', color: '#F59E0B', bad: true }
        ].map((item, i) => (
          <React.Fragment key={i}>
            <div
              className={`
                relative text-center p-5 md:p-7 rounded-2xl border-3 my-2
                ${item.bad ? 'bg-slate-800/50' : 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 scale-105 z-10'}
              `}
              style={{
                borderColor: item.color,
                borderWidth: '3px',
                boxShadow: !item.bad ? `0 8px 30px ${item.color}30` : 'none'
              }}
            >
              <div className="text-3xl md:text-4xl mb-2">{item.icon}</div>
              <div
                className="text-base md:text-lg font-bold mb-1"
                style={{ color: item.color }}
              >
                {item.label}
              </div>
              <div className="text-xs md:text-sm text-slate-500">{item.sub}</div>
              {!item.bad && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: item.color }}
                >
                  BE HERE
                </div>
              )}
            </div>
            {i < 2 && (
              <div
                className="w-10 md:w-16 h-1 -mx-2 flex-shrink-0"
                style={{
                  background: `linear-gradient(90deg, ${['#EF4444', '#10B981', '#F59E0B'][i]} 0%, ${['#10B981', '#F59E0B'][i] || '#F59E0B'} 100%)`
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Emotion Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Past Column */}
        <div>
          <h4 className="text-center text-red-400 font-bold mb-3">
            ⬅ Stuck in the Past
          </h4>
          {Object.entries(emotions)
            .filter(([_, e]) => e.timeline.includes('Past') && !e.timeline.includes('Present'))
            .map(([key, emotion]) => (
              <div
                key={key}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 mb-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{emotion.icon}</span>
                  <div>
                    <div className="font-bold" style={{ color: emotion.color }}>{emotion.name}</div>
                    <div className="text-xs text-slate-500">"I can't believe I missed that"</div>
                  </div>
                </div>
              </div>
            ))}
          <div className="bg-red-500/10 rounded-xl p-4 text-sm text-red-300 leading-relaxed border border-red-500/20">
            <strong>The trap:</strong> Replaying errors steals energy from the next point
          </div>
        </div>

        {/* Present Column */}
        <div>
          <h4 className="text-center text-emerald-400 font-bold mb-3">
            🎯 In the Present
          </h4>
          {Object.entries(emotions)
            .filter(([_, e]) => e.timeline.includes('Present'))
            .map(([key, emotion]) => (
              <div
                key={key}
                className={`
                  rounded-xl p-4 border mb-3
                  ${emotion.valence >= 6
                    ? 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-800/50 border-slate-700/50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{emotion.icon}</span>
                  <div>
                    <div className="font-bold" style={{ color: emotion.color }}>{emotion.name}</div>
                    <div className="text-xs text-slate-400">
                      {emotion.valence >= 6 ? '"This point, right now"' : '"What just happened?"'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <div className="bg-emerald-500/10 rounded-xl p-4 text-sm text-emerald-300 leading-relaxed border border-emerald-500/20">
            <strong>The goal:</strong> All your attention on what you can control RIGHT NOW
          </div>
        </div>

        {/* Future Column */}
        <div>
          <h4 className="text-center text-amber-400 font-bold mb-3">
            Future Worry ➡
          </h4>
          {Object.entries(emotions)
            .filter(([_, e]) => e.timeline.includes('Future') && !e.timeline.includes('Present'))
            .map(([key, emotion]) => (
              <div
                key={key}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 mb-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{emotion.icon}</span>
                  <div>
                    <div className="font-bold" style={{ color: emotion.color }}>{emotion.name}</div>
                    <div className="text-xs text-slate-500">"What if I lose this?"</div>
                  </div>
                </div>
              </div>
            ))}
          <div className="bg-amber-500/10 rounded-xl p-4 text-sm text-amber-300 leading-relaxed border border-amber-500/20">
            <strong>The trap:</strong> You can't control the future--only this moment
          </div>
        </div>
      </div>

      {/* Reset Cue */}
      <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-center border border-slate-700/50">
        <div className="text-xs font-semibold text-slate-500 mb-2 tracking-wider">
          YOUR RESET PHRASE
        </div>
        <div className="text-xl md:text-3xl font-bold text-white mb-2">
          "NEXT POINT" or "THIS BALL ONLY"
        </div>
        <p className="text-slate-400 text-sm md:text-base">
          Say it out loud when you catch yourself in the past or future
        </p>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // Arousal View
  // --------------------------------------------------------------------------
  const ArousalView: React.FC = () => (
    <div>
      <SectionTitle
        icon="⚡"
        title="Your Energy Level"
        subtitle="Too low and you'll go flat. Too high and you'll lose control. Find your sweet spot at 4-7."
      />

      {/* Main Scale */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative mb-12">
          {/* Scale Bar */}
          <div
            className="h-12 rounded-full relative shadow-lg"
            style={{
              background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 35%, #10B981 65%, #F59E0B 80%, #EF4444 100%)'
            }}
          >
            {/* Peak Zone Overlay */}
            <div className="absolute left-[30%] w-[40%] -top-1.5 -bottom-1.5 border-4 border-emerald-500 rounded-full bg-transparent" />

            {/* Peak Label */}
            <div className="absolute left-1/2 -top-9 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-full font-bold text-xs md:text-sm shadow-lg shadow-emerald-500/40 whitespace-nowrap">
              YOUR SWEET SPOT
            </div>
          </div>

          {/* Scale Numbers */}
          <div className="flex justify-between mt-3 px-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <div
                key={n}
                className={`
                  w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full font-bold text-xs md:text-sm
                  ${n >= 4 && n <= 7 ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}
                `}
              >
                {n}
              </div>
            ))}
          </div>

          {/* Zone Labels */}
          <div className="flex justify-between mt-3 text-xs md:text-sm text-slate-400">
            <div className="text-center w-[30%]">
              <strong className="text-blue-400">Too Low</strong><br />Flat, giving up
            </div>
            <div className="text-center w-[40%]">
              <strong className="text-emerald-400">Just Right</strong><br />Alert & focused
            </div>
            <div className="text-center w-[30%]">
              <strong className="text-red-400">Too High</strong><br />Out of control
            </div>
          </div>
        </div>
      </div>

      {/* Emotion Bars */}
      <div className="flex flex-col gap-3 mb-8">
        {Object.entries(emotions)
          .sort((a, b) => a[1].arousal - b[1].arousal)
          .map(([key, emotion]) => (
            <div
              key={key}
              className="flex items-center gap-3 md:gap-5 bg-slate-800/50 p-3 md:p-4 rounded-xl border border-slate-700/30 flex-wrap"
            >
              <div className="text-3xl md:text-4xl">{emotion.icon}</div>
              <div className="min-w-[90px]">
                <div className="font-bold text-sm md:text-base" style={{ color: emotion.color }}>{emotion.name}</div>
                <div className="text-xs text-slate-500">Level {emotion.arousal}/10</div>
              </div>
              <div className="flex-1 min-w-[150px] relative">
                <div className="h-5 bg-slate-700/50 rounded-lg overflow-hidden relative">
                  {/* Peak Zone Indicator */}
                  <div className="absolute left-[30%] w-[40%] h-full bg-emerald-500/10 border-l-2 border-r-2 border-dashed border-emerald-500" />

                  {/* Fill Bar */}
                  <div
                    className="h-full rounded-lg transition-all duration-500"
                    style={{
                      width: `${emotion.arousal * 10}%`,
                      background: `linear-gradient(135deg, ${emotion.color} 0%, ${emotion.color}CC 100%)`
                    }}
                  />
                </div>
              </div>
              <div
                className={`
                  px-3 py-1 rounded-full text-xs font-bold min-w-[60px] text-center
                  ${emotion.arousal >= 4 && emotion.arousal <= 7
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : emotion.arousal < 4
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-red-500/20 text-red-400'
                  }
                `}
              >
                {emotion.arousal >= 4 && emotion.arousal <= 7 ? 'GOOD' : emotion.arousal < 4 ? 'LOW' : 'HIGH'}
              </div>
            </div>
          ))}
      </div>

      {/* Regulation Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-2xl p-5 border-l-4 border-blue-500">
          <h4 className="text-blue-400 mb-3 font-bold">
            ⬆ Energy Too Low? (1-3)
          </h4>
          <ul className="text-blue-300 leading-relaxed pl-5 text-sm space-y-1">
            <li>Jump up and down, pump your fist</li>
            <li>Stand tall with power pose</li>
            <li>Say something strong to yourself</li>
            <li>Quick feet, stay moving</li>
            <li>Deep breath OUT with energy</li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl p-5 border-l-4 border-red-500">
          <h4 className="text-red-400 mb-3 font-bold">
            ⬇ Energy Too High? (8-10)
          </h4>
          <ul className="text-red-300 leading-relaxed pl-5 text-sm space-y-1">
            <li><strong>Walk to your towel</strong> (take your time)</li>
            <li><strong>Diaphragmatic breathing</strong> (belly expands)</li>
            <li><strong>Tighten muscles, then relax</strong></li>
            <li>Soft eyes, drop your shoulders</li>
            <li>Deal with the emotion, then let it go</li>
          </ul>
        </div>
      </div>

      {/* Towel Ritual */}
      <div className="mt-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 md:p-6 border border-slate-700/50">
        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
          <span>🧺</span> The Towel Reset (When You're Too High)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          {[
            { step: '1', text: 'Walk slowly to towel' },
            { step: '2', text: 'Wipe face deliberately' },
            { step: '3', text: 'Deep belly breaths' },
            { step: '4', text: 'Let the emotion go' },
            { step: '5', text: 'Back to present' }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-3 text-center">
              <div className="bg-emerald-500 w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold text-white">
                {item.step}
              </div>
              <div className="text-slate-300 text-xs">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // Controllability View
  // --------------------------------------------------------------------------
  const ControllabilityView: React.FC = () => (
    <div>
      <SectionTitle
        icon="🎮"
        title="What Can You Control?"
        subtitle="Frustration is useful when you believe you CAN fix it. It becomes destructive when you feel helpless."
      />

      {/* The Critical Pathway */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 md:p-9 text-white mb-8 text-center">
        <h3 className="mb-5 text-base md:text-lg font-semibold">
          🚨 The Danger Zone: When Frustration Turns to Anger
        </h3>

        <div className="flex items-center justify-center gap-3 md:gap-5 flex-wrap">
          <div className="bg-white/20 p-4 md:p-5 rounded-xl">
            <div className="text-3xl md:text-4xl mb-2">😤</div>
            <div className="font-bold text-sm md:text-base">FRUSTRATION</div>
            <div className="bg-emerald-500 px-3 py-1 rounded-full text-xs mt-2">
              "I can fix this"
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl md:text-3xl">⚡</div>
            <div className="text-xs opacity-80">2-3 bad<br />points</div>
          </div>

          <div className="bg-white/20 p-4 md:p-5 rounded-xl">
            <div className="text-3xl md:text-4xl mb-2">😠</div>
            <div className="font-bold text-sm md:text-base">ANGER</div>
            <div className="bg-red-500 px-3 py-1 rounded-full text-xs mt-2">
              "I can't do this"
            </div>
          </div>
        </div>

        <p className="mt-5 opacity-90 max-w-md mx-auto leading-relaxed text-sm md:text-base">
          You have <strong>2-3 points</strong> to reset before frustration becomes destructive. Act fast!
        </p>
      </div>

      {/* Two States */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 rounded-2xl p-6 border-2 border-emerald-500">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ✓ USEFUL
            </span>
          </div>

          <h4 className="text-emerald-400 mb-3 text-lg font-bold">
            "I Can Fix This"
          </h4>

          <div className="bg-slate-900/50 rounded-xl p-4 mb-3">
            <div className="text-3xl mb-2">😤</div>
            <div className="font-bold text-amber-500">Frustration</div>
            <div className="text-slate-400 text-sm mt-1">
              "I know what to do, I'm just not doing it"
            </div>
          </div>

          <div className="text-emerald-300 text-sm leading-relaxed">
            <strong>Stay here!</strong> This feeling drives improvement. Pick ONE thing to adjust and commit to it.
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl p-6 border-2 border-red-500">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ✗ DESTRUCTIVE
            </span>
          </div>

          <h4 className="text-red-400 mb-3 text-lg font-bold">
            "I Can't Do This"
          </h4>

          <div className="flex gap-2 flex-wrap mb-3">
            {[emotions.anger, emotions.anxiety, emotions.disappointment].map((e, i) => (
              <div key={i} className="bg-slate-900/50 rounded-lg px-3 py-2 flex items-center gap-2 flex-1">
                <span className="text-2xl">{e.icon}</span>
                <span className="font-semibold text-xs" style={{ color: e.color }}>{e.name}</span>
              </div>
            ))}
          </div>

          <div className="text-red-300 text-sm leading-relaxed">
            <strong>Danger!</strong> When you feel helpless, you stop trying. Time for a full reset at the towel.
          </div>
        </div>
      </div>

      {/* Action Steps */}
      <div className="bg-amber-500/10 rounded-2xl p-5 md:p-6 border-2 border-amber-500">
        <h4 className="text-amber-400 mb-4 text-lg font-bold">
          ⚡ Your 2-3 Point Action Plan
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            { num: '1', title: 'Notice it early', desc: '"I\'m getting frustrated"' },
            { num: '2', title: 'Pick ONE thing', desc: '"I\'ll focus on my toss"' },
            { num: '3', title: 'Commit fully', desc: '"Just this one adjustment"' },
            { num: '4', title: 'Let results go', desc: '"Process over outcome"' }
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/50 rounded-xl p-4">
              <strong className="text-amber-300">{item.num}. {item.title}</strong><br />
              <span className="text-slate-400 text-xs">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // Ego View
  // --------------------------------------------------------------------------
  const EgoView: React.FC = () => (
    <div>
      <SectionTitle
        icon="🧠"
        title="Judging vs Doing"
        subtitle="When you're evaluating yourself, you're not playing tennis. When you're playing tennis, there's no room for judgment."
      />

      {/* Two Modes Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 md:p-7 text-white">
          <div className="bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold inline-block mb-4">
            ✓ WHERE YOU WANT TO BE
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-1">
            DOING Mode
          </h3>
          <p className="opacity-85 mb-4 text-sm">
            Your mind is on the ball, not on yourself
          </p>

          <div className="text-4xl md:text-5xl mb-4 text-center">
            😌 😄
          </div>

          <div className="bg-white/15 rounded-xl p-4">
            <div className="font-semibold mb-3 text-sm">Your mind is asking:</div>
            <ul className="pl-5 space-y-1 text-sm opacity-90">
              <li>"Where's my target?"</li>
              <li>"Split step, ready"</li>
              <li>"Watch the ball"</li>
              <li>"Next ball, next point"</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 md:p-7 text-white">
          <div className="bg-white/20 px-3 py-1.5 rounded-full text-xs font-bold inline-block mb-4">
            ✗ THE TRAP
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-1">
            JUDGING Mode
          </h3>
          <p className="opacity-85 mb-4 text-sm">
            Your mind is on yourself, not on the ball
          </p>

          <div className="text-4xl md:text-5xl mb-4 text-center">
            😰 😠 😞
          </div>

          <div className="bg-white/15 rounded-xl p-4">
            <div className="font-semibold mb-3 text-sm">Your mind is asking:</div>
            <ul className="pl-5 space-y-1 text-sm opacity-90">
              <li>"Am I playing well?"</li>
              <li>"What's the score?"</li>
              <li>"What do they think of me?"</li>
              <li>"Why can't I do this?"</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Self-Check */}
      <div className="bg-slate-800/50 rounded-2xl p-5 md:p-6 mb-6 border border-slate-700/50">
        <h4 className="text-white font-bold mb-4 text-lg">
          🔍 Quick Self-Check Between Points
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-red-500/10 rounded-xl p-4 border-l-4 border-red-500">
            <div className="font-bold text-red-400 mb-2 text-sm">
              🚫 If you're thinking about...
            </div>
            <div className="text-slate-400 text-sm leading-relaxed">
              The score, yourself, your opponent, what others think
            </div>
          </div>
          <div className="bg-emerald-500/10 rounded-xl p-4 border-l-4 border-emerald-500">
            <div className="font-bold text-emerald-400 mb-2 text-sm">
              ✓ You should be thinking about...
            </div>
            <div className="text-slate-400 text-sm leading-relaxed">
              The ball, your target, your feet, your breath
            </div>
          </div>
        </div>
      </div>

      {/* The Reset */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 md:p-8 text-center border border-slate-700/50">
        <div className="text-xs font-semibold text-slate-500 mb-3 tracking-wider">
          THE SIMPLE QUESTION
        </div>
        <div className="text-xl md:text-3xl font-bold text-white mb-4">
          "Am I JUDGING or DOING?"
        </div>
        <p className="text-slate-400 max-w-md mx-auto mb-5 text-sm md:text-base">
          Ask yourself this between points. If you're judging, say "NEXT BALL" and get back to doing.
        </p>

        <div className="inline-flex items-center gap-4 md:gap-6 bg-white/5 px-4 md:px-8 py-3 rounded-xl flex-wrap justify-center">
          <div>
            <div className="text-red-400 font-bold">JUDGING</div>
            <div className="text-xs opacity-70 text-slate-400">Score, self, others</div>
          </div>
          <div className="text-white text-2xl">→</div>
          <div>
            <div className="text-emerald-400 font-bold">DOING</div>
            <div className="text-xs opacity-70 text-slate-400">Ball, target, feet</div>
          </div>
        </div>
      </div>

      {/* The Full Reset Process */}
      <div className="mt-6 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-2xl p-5 md:p-6 border border-indigo-500/30">
        <h4 className="text-indigo-400 font-bold mb-4 text-lg">
          🔄 The Complete Reset Process
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[
            { num: '1', title: 'Notice', desc: 'Catch yourself judging' },
            { num: '2', title: 'Accept', desc: 'Feel the emotion fully' },
            { num: '3', title: 'Release', desc: 'Let it go at the towel' },
            { num: '4', title: 'Refocus', desc: 'Back to THIS point' }
          ].map((step, i) => (
            <div key={i} className="bg-slate-900/50 rounded-xl p-4 text-center">
              <div className="bg-indigo-500 text-white w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                {step.num}
              </div>
              <div className="font-bold text-indigo-400 mb-1">{step.title}</div>
              <div className="text-slate-500 text-xs">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // --------------------------------------------------------------------------
  // View Configuration
  // --------------------------------------------------------------------------
  const views: ViewTab[] = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'circumplex', label: 'Map', icon: '🎯' },
    { id: 'timeline', label: 'Time', icon: '⏰' },
    { id: 'arousal', label: 'Energy', icon: '⚡' },
    { id: 'controllability', label: 'Control', icon: '🎮' },
    { id: 'ego', label: 'Focus', icon: '🧠' }
  ];

  const viewComponents: Record<string, React.FC> = {
    overview: OverviewView,
    circumplex: CircumplexView,
    timeline: TimelineView,
    arousal: ArousalView,
    controllability: ControllabilityView,
    ego: EgoView
  };

  const ActiveComponent = viewComponents[activeView];

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div
        className={`
          relative z-10 max-w-5xl mx-auto px-3 md:px-6 py-6
          transition-all duration-500 ease-out
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        `}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2.5 bg-white/10 px-4 py-1.5 rounded-full mb-3">
            <span className="text-xl">🎾</span>
            <span className="text-slate-300 font-medium text-sm md:text-base">
              Tennis Mental Game
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-1.5 tracking-tight">
            Master Your Emotions
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            Control your mind, control the match
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-1.5 mb-5 flex-wrap px-2">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`
                flex items-center gap-1.5 px-3 md:px-5 py-2.5 md:py-3 rounded-xl
                font-semibold text-xs md:text-sm
                transition-all duration-300 ease-out
                ${activeView === view.id
                  ? 'bg-white text-slate-900 shadow-lg shadow-white/20 scale-105'
                  : 'bg-white/10 text-slate-400 hover:text-white hover:bg-white/20'
                }
              `}
            >
              <span>{view.icon}</span>
              <span>{view.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-10 border border-slate-700/50 shadow-2xl min-h-[500px]">
          <ActiveComponent />
        </div>

        {/* Footer */}
        <div className="text-center py-5 text-slate-500 text-xs md:text-sm">
          Based on sports psychology research: Attribution Theory - Circumplex Model - IZOF - Achievement Goal Theory
        </div>
      </div>
    </div>
  );
};

export default EmotionalFramework;
