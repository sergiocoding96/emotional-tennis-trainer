import React, { useState } from 'react';

const ChokingMasterclass = () => {
  const [activeTab, setActiveTab] = useState('recognition');
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const tabs = [
    { id: 'recognition', label: 'What Is It', icon: '◎' },
    { id: 'difference', label: 'Anxiety vs Choking', icon: '⇄' },
    { id: 'why', label: 'The Science', icon: '◉' },
    { id: 'when', label: 'Risk Moments', icon: '⚡' },
    { id: 'reset', label: 'Emergency Reset', icon: '↻' },
    { id: 'prevention', label: 'Prevention', icon: '◆' }
  ];

  // Recognition Tab
  const RecognitionTab = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/10 to-orange-500/10 text-rose-400 text-sm font-medium tracking-wide mb-4">
          UNDERSTANDING THE BASICS
        </span>
        <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
          What Is <span className="font-semibold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">Choking</span>?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          The sudden inability to perform skills you've mastered, triggered by high-pressure moments.
        </p>
      </div>

      {/* Definition Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-rose-500/20">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">The Formal Definition</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                <span className="text-rose-400 font-medium">"A suboptimal performance under pressure conditions by an individual who is capable of superior performance."</span>
              </p>
              <p className="text-slate-500 text-sm mt-3 italic">— Baumeister, 1984</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Explanation */}
      <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-sm">💬</span>
          In Simple Terms
        </h3>
        <p className="text-2xl text-slate-200 font-light leading-relaxed">
          You <span className="text-rose-400 font-medium">know</span> how to hit that serve.
          <br />You've done it <span className="text-emerald-400 font-medium">1,000 times</span>.
          <br />But right now? Your body <span className="text-amber-400 font-medium">forgot</span>.
        </p>
      </div>

      {/* Warning Signs Grid */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500/20 to-orange-500/20 flex items-center justify-center text-rose-400 text-sm">⚠</span>
          Warning Signs
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🧠', label: 'Overthinking every shot', category: 'Mind' },
            { icon: '💓', label: 'Racing heartbeat', category: 'Body' },
            { icon: '😰', label: 'Sweating more than normal', category: 'Body' },
            { icon: '🫁', label: 'Short, shallow breaths', category: 'Body' },
            { icon: '💪', label: 'Stiff, tense muscles', category: 'Body' },
            { icon: '🎯', label: 'Simple shots feel impossible', category: 'Mind' },
            { icon: '⏰', label: 'Everything feels rushed', category: 'Mind' },
            { icon: '🔇', label: 'Tunnel vision, muted sounds', category: 'Body' }
          ].map((sign, i) => (
            <div 
              key={i}
              className="group bg-slate-800/30 hover:bg-slate-800/60 rounded-xl p-4 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 cursor-default"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{sign.icon}</span>
                <div>
                  <p className="text-slate-200 font-medium">{sign.label}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{sign.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insight */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"></div>
        <div className="relative p-8 border border-emerald-500/20 rounded-2xl">
          <div className="flex items-start gap-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-400 text-xl">✓</span>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">Key Insight</h4>
              <p className="text-slate-300 text-lg leading-relaxed">
                Choking isn't about lacking ability. It's about <span className="text-white font-medium">your brain interfering</span> with skills your body already knows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Difference Tab
  const DifferenceTab = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-blue-500/10 text-violet-400 text-sm font-medium tracking-wide mb-4">
          CRITICAL DISTINCTION
        </span>
        <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
          <span className="text-amber-400">Anxiety</span> vs <span className="text-rose-400">Choking</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          They're related but NOT the same. Understanding the difference changes how you respond.
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Anxiety Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-amber-500/20 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <span className="text-2xl">😰</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-amber-300">Normal Anxiety</h3>
                <p className="text-slate-500 text-sm">Pre-match nerves</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                'Nervous before match starts',
                'Butterflies in stomach',
                'Eager to begin playing',
                'Can be helpful for focus',
                'Decreases once you start',
                'Performance often improves'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-amber-200">
                <span className="font-semibold">Verdict:</span> Uncomfortable but often HELPFUL
              </p>
            </div>
          </div>
        </div>

        {/* Choking Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-rose-500/20 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
                <span className="text-2xl">😱</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-rose-300">Choking</h3>
                <p className="text-slate-500 text-sm">Performance breakdown</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                'Happens during critical points',
                'Complete mental block',
                'Body feels foreign',
                'Always harmful',
                'Gets worse as you play',
                'Performance collapses'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <p className="text-sm text-rose-200">
                <span className="font-semibold">Verdict:</span> Always HARMFUL to performance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Difference */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-900"></div>
        <div className="relative p-8 border border-slate-700 rounded-2xl">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-2xl">🔑</span>
            The Key Difference
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <p className="text-amber-300 font-medium mb-2">Anxiety</p>
              <p className="text-slate-400">Worry about what <span className="text-white">MIGHT</span> happen</p>
            </div>
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20">
              <p className="text-rose-300 font-medium mb-2">Choking</p>
              <p className="text-slate-400">Skills failing <span className="text-white">RIGHT NOW</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Why Tab
  const WhyTab = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 text-sm font-medium tracking-wide mb-4">
          THE NEUROSCIENCE
        </span>
        <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
          Why Does Choking <span className="font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Happen</span>?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Understanding the mechanism helps you break the cycle.
        </p>
      </div>

      {/* The Choking Spiral */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-rose-500 to-red-500"></div>
        
        <div className="space-y-6">
          {[
            { num: 1, title: 'High Stakes Moment', desc: '"This point matters!"', color: 'cyan', icon: '⚡' },
            { num: 2, title: 'Conscious Attention', desc: 'Brain takes over automatic skills', color: 'blue', icon: '🧠' },
            { num: 3, title: 'Paralysis by Analysis', desc: 'Overthinking every micro-movement', color: 'violet', icon: '🔍' },
            { num: 4, title: 'Breathing Changes', desc: 'Short, shallow, restricted', color: 'purple', icon: '🫁' },
            { num: 5, title: 'Muscle Tension', desc: 'Body gets stiff and tight', color: 'pink', icon: '💪' },
            { num: 6, title: 'Performance Breaks Down', desc: 'Simple shots become impossible', color: 'rose', icon: '💔' }
          ].map((step, i) => (
            <div key={i} className="relative pl-20">
              <div className={`absolute left-4 w-8 h-8 rounded-full bg-${step.color}-500 flex items-center justify-center text-white font-bold text-sm shadow-lg transform -translate-x-1/2`}
                   style={{ backgroundColor: { cyan: '#06b6d4', blue: '#3b82f6', violet: '#8b5cf6', purple: '#a855f7', pink: '#ec4899', rose: '#f43f5e' }[step.color] }}>
                {step.num}
              </div>
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-5 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{step.icon}</span>
                  <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                </div>
                <p className="text-slate-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breathing Science */}
      <div className="relative group mt-12">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-2xl">🔬</span>
            The Breathing Connection
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-slate-300 leading-relaxed">When you breathe fast and shallow:</p>
              <div className="space-y-3">
                {[
                  'Less CO₂ in your blood',
                  'Blood vessels narrow',
                  'Less oxygen to muscles & brain',
                  'Muscles stiffen, thinking fogs'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-400">
                    <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center">
                      <span className="text-rose-400 text-xs">→</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-center p-6 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <p className="text-6xl mb-4">🔄</p>
                <p className="text-rose-300 font-medium">The Vicious Cycle</p>
                <p className="text-sm text-slate-500 mt-2">Stress → Bad breathing → More stress</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remember This */}
      <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/30">
        <p className="text-2xl text-slate-300 font-light">
          "Choking = <span className="text-rose-400 font-medium">Overthinking</span> + <span className="text-cyan-400 font-medium">Underbreathing</span>"
        </p>
      </div>
    </div>
  );

  // When Tab
  const WhenTab = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 text-sm font-medium tracking-wide mb-4">
          RISK ASSESSMENT
        </span>
        <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
          When Does Choking <span className="font-semibold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Happen</span>?
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Know your high-risk moments. Preparation prevents panic.
        </p>
      </div>

      {/* Risk Moments */}
      <div className="grid gap-4">
        {[
          { icon: '🏆', text: 'Serving for the match', risk: 'EXTREME', color: 'rose' },
          { icon: '🔥', text: 'Tiebreak at 5-5 or higher', risk: 'EXTREME', color: 'rose' },
          { icon: '💔', text: 'Break point down', risk: 'HIGH', color: 'orange' },
          { icon: '🎾', text: 'Playing someone you "should" beat', risk: 'HIGH', color: 'orange' },
          { icon: '👀', text: 'Coaches, scouts, or family watching', risk: 'HIGH', color: 'orange' },
          { icon: '📸', text: 'Being filmed or broadcast', risk: 'HIGH', color: 'orange' },
          { icon: '🏡', text: 'Home court expectations', risk: 'MEDIUM', color: 'amber' },
          { icon: '💬', text: 'After talking confidence pre-match', risk: 'MEDIUM', color: 'amber' }
        ].map((trigger, i) => (
          <div 
            key={i}
            onClick={() => setSelectedTrigger(selectedTrigger === i ? null : i)}
            className={`group relative overflow-hidden rounded-xl p-5 border transition-all duration-300 cursor-pointer ${
              selectedTrigger === i 
                ? 'bg-slate-800/80 border-slate-600' 
                : 'bg-slate-800/30 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-700/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">{trigger.icon}</span>
                <span className="text-lg text-slate-200">{trigger.text}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${
                trigger.color === 'rose' ? 'bg-rose-500/20 text-rose-300' :
                trigger.color === 'orange' ? 'bg-orange-500/20 text-orange-300' :
                'bg-amber-500/20 text-amber-300'
              }`}>
                {trigger.risk}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* The Pattern */}
      <div className="relative group mt-8">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20"></div>
        <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
            <span className="text-2xl">📊</span>
            The Common Pattern
          </h3>
          <p className="text-lg text-slate-300 leading-relaxed">
            Choking happens when <span className="text-amber-400 font-medium">importance increases</span> and <span className="text-orange-400 font-medium">you become self-conscious</span> about performing.
          </p>
          <div className="mt-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
            <p className="text-slate-400">
              <span className="text-white font-medium">The formula:</span> High stakes + Self-focus + No protocol = Choking risk
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Reset Tab
  const ResetTab = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-400 text-sm font-medium tracking-wide mb-4">
          EMERGENCY PROTOCOL
        </span>
        <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
          The 3-Step <span className="font-semibold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Reset</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          When you feel yourself choking, execute this protocol immediately.
        </p>
      </div>

      {/* The 3 Steps */}
      <div className="space-y-6">
        {[
          {
            num: 1,
            title: 'BREATHE',
            subtitle: 'Physiological Sigh',
            desc: 'Double inhale through nose, long exhale through mouth. This is the fastest way to activate your parasympathetic nervous system.',
            instruction: 'Inhale... Inhale again... Exhale slowly (8 seconds)',
            color: 'emerald',
            icon: '🫁'
          },
          {
            num: 2,
            title: 'GROUND',
            subtitle: 'Physical Reset',
            desc: 'Feel your feet on the ground. Bounce the ball. Touch the strings. Bring yourself back to the present moment.',
            instruction: 'Feel your feet → Bounce ball 3x → Touch strings',
            color: 'blue',
            icon: '👟'
          },
          {
            num: 3,
            title: 'FOCUS',
            subtitle: 'One Simple Cue',
            desc: 'Pick ONE technical word. Not a paragraph. One word that represents good execution for you.',
            instruction: '"Smooth" or "Watch" or "Push" — just ONE word',
            color: 'violet',
            icon: '🎯'
          }
        ].map((step, i) => (
          <div key={i} className="relative group">
            <div className={`absolute -inset-0.5 bg-gradient-to-r rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500 ${
              step.color === 'emerald' ? 'from-emerald-500 to-green-500' :
              step.color === 'blue' ? 'from-blue-500 to-cyan-500' :
              'from-violet-500 to-purple-500'
            }`}></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  step.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-green-500 shadow-emerald-500/20' :
                  step.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/20' :
                  'bg-gradient-to-br from-violet-500 to-purple-500 shadow-violet-500/20'
                }`}>
                  <span className="text-3xl font-bold text-white">{step.num}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{step.icon}</span>
                    <h3 className="text-xl font-bold text-white tracking-wide">{step.title}</h3>
                    <span className="text-slate-500 text-sm">— {step.subtitle}</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed mb-4">{step.desc}</p>
                  <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                    step.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
                    step.color === 'blue' ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20' :
                    'bg-violet-500/10 text-violet-300 border border-violet-500/20'
                  }`}>
                    {step.instruction}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What NOT to Do */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 to-red-500/5"></div>
        <div className="relative p-6 border border-rose-500/20 rounded-2xl">
          <h4 className="text-lg font-semibold text-rose-300 mb-4 flex items-center gap-3">
            <span className="text-xl">✕</span>
            What NOT to Do
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '"Just relax" — too vague',
              '"Try harder" — makes it worse',
              '"Think positive" — ignores the problem',
              'Play faster — feeds the panic'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-400">
                <span className="text-rose-400">✗</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why It Works */}
      <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/30">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Why This Works</h4>
        <p className="text-slate-300 leading-relaxed">
          Choking = brain trying to process 10 things at once. This protocol gives your brain exactly <span className="text-emerald-400 font-medium">three simple tasks</span>. It reduces mental load and lets your trained automaticity return.
        </p>
      </div>
    </div>
  );

  // Prevention Tab
  const PreventionTab = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-400 text-sm font-medium tracking-wide mb-4">
          LONG-TERM STRATEGY
        </span>
        <h2 className="text-4xl font-light text-white mb-4 tracking-tight">
          <span className="font-semibold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Prevention</span> Strategies
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Build resilience so you choke less often in the first place.
        </p>
      </div>

      {/* Prevention Cards */}
      <div className="grid gap-6">
        {[
          {
            title: 'Practice Under Pressure',
            icon: '🎯',
            color: 'violet',
            tips: [
              'Simulate match situations in training',
              'Add consequences to practice points',
              'Play sets where every point matters',
              'Train with an audience sometimes'
            ]
          },
          {
            title: 'Develop Pre-Point Routines',
            icon: '🔄',
            color: 'blue',
            tips: [
              'Same routine before every serve',
              'Same routine before return',
              'Practice routines under pressure',
              'Make them automatic'
            ]
          },
          {
            title: 'Build Mental Resilience',
            icon: '🧠',
            color: 'emerald',
            tips: [
              'Regular breathing practice off-court',
              'Visualization of high-pressure moments',
              'Process goals over outcome goals',
              'Journal about pressure experiences'
            ]
          },
          {
            title: 'Normalize the Experience',
            icon: '💪',
            color: 'amber',
            tips: [
              'Everyone chokes sometimes',
              'It\'s not weakness, it\'s human',
              'Champions have protocols, not immunity',
              'Each experience is practice'
            ]
          }
        ].map((card, i) => (
          <div 
            key={i}
            onClick={() => setExpandedCard(expandedCard === i ? null : i)}
            className="relative group cursor-pointer"
          >
            <div className={`absolute -inset-0.5 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 bg-gradient-to-r ${
              card.color === 'violet' ? 'from-violet-500 to-purple-500' :
              card.color === 'blue' ? 'from-blue-500 to-cyan-500' :
              card.color === 'emerald' ? 'from-emerald-500 to-green-500' :
              'from-amber-500 to-orange-500'
            }`}></div>
            <div className={`relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
              expandedCard === i ? 'border-slate-600 bg-slate-800/60' : 'border-slate-700/30 hover:border-slate-700/50'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{card.icon}</span>
                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  </div>
                  <span className={`text-slate-500 transition-transform duration-300 ${expandedCard === i ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${expandedCard === i ? 'max-h-96 mt-6' : 'max-h-0'}`}>
                  <div className="space-y-3">
                    {card.tips.map((tip, j) => (
                      <div key={j} className="flex items-center gap-3 text-slate-300">
                        <div className={`w-2 h-2 rounded-full ${
                          card.color === 'violet' ? 'bg-violet-400' :
                          card.color === 'blue' ? 'bg-blue-400' :
                          card.color === 'emerald' ? 'bg-emerald-400' :
                          'bg-amber-400'
                        }`}></div>
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Message */}
      <div className="relative overflow-hidden rounded-2xl mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative p-8 border border-violet-500/20 rounded-2xl text-center">
          <p className="text-2xl text-white font-light leading-relaxed">
            Champions don't have <span className="text-violet-400">immunity</span> to choking.
            <br />
            They have <span className="text-emerald-400 font-medium">protocols</span> to handle it.
          </p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'recognition': return <RecognitionTab />;
      case 'difference': return <DifferenceTab />;
      case 'why': return <WhyTab />;
      case 'when': return <WhenTab />;
      case 'reset': return <ResetTab />;
      case 'prevention': return <PreventionTab />;
      default: return <RecognitionTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6">
            <span className="text-xl">🎾</span>
            <span className="text-sm font-medium text-slate-300 tracking-wide">TENNIS MENTAL TRAINING</span>
          </div>
          <h1 className="text-5xl font-light text-white mb-3 tracking-tight">
            Understanding <span className="font-semibold bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">Choking</span>
          </h1>
          <p className="text-slate-500 text-lg">
            What it is • Why it happens • How to handle it
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 p-2 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="text-lg opacity-80">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-3xl bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 p-8 shadow-2xl">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-600 text-sm">
          Based on research from Stanford, Harvard, and elite sport psychology
        </div>
      </div>
    </div>
  );
};

export default ChokingMasterclass;
