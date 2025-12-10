import React, { useState, useEffect, CSSProperties } from 'react';

// ============================================================================
// STYLE CONSTANTS
// ============================================================================

const COLORS = {
  // Primary gradients
  roseOrange: 'linear-gradient(135deg, #F43F5E 0%, #F97316 100%)',
  amberYellow: 'linear-gradient(135deg, #F59E0B 0%, #EAB308 100%)',
  cyanBlue: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
  emeraldGreen: 'linear-gradient(135deg, #10B981 0%, #22C55E 100%)',
  violetPurple: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
  blueCyan: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',

  // Solid colors
  rose: '#F43F5E',
  orange: '#F97316',
  amber: '#F59E0B',
  yellow: '#EAB308',
  emerald: '#10B981',
  green: '#22C55E',
  cyan: '#06B6D4',
  blue: '#3B82F6',
  violet: '#8B5CF6',
  purple: '#A855F7',
  pink: '#EC4899',
  red: '#EF4444',

  // Slate scale
  slate950: '#020617',
  slate900: '#0F172A',
  slate800: '#1E293B',
  slate700: '#334155',
  slate600: '#475569',
  slate500: '#64748B',
  slate400: '#94A3B8',
  slate300: '#CBD5E1',
  slate200: '#E2E8F0',

  // Background with alpha
  slateAlpha40: 'rgba(30, 41, 59, 0.4)',
  slateAlpha50: 'rgba(30, 41, 59, 0.5)',
  slateAlpha60: 'rgba(30, 41, 59, 0.6)',
  slateAlpha80: 'rgba(15, 23, 42, 0.8)',
  whiteAlpha08: 'rgba(255, 255, 255, 0.08)',
  whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
  whiteAlpha15: 'rgba(255, 255, 255, 0.15)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
} as const;

// Emoji constants to avoid encoding issues
const ICONS = {
  target: '\u{1F3AF}',      // Target
  brain: '\u{1F9E0}',       // Brain
  heart: '\u{1F493}',       // Heart
  sweat: '\u{1F630}',       // Sweat
  lungs: '\u{1FAC1}',       // Lungs
  muscle: '\u{1F4AA}',      // Muscle
  clock: '\u{23F0}',        // Clock
  mute: '\u{1F507}',        // Muted
  speech: '\u{1F4AC}',      // Speech
  warning: '\u{26A0}',      // Warning
  check: '\u{2713}',        // Check
  cross: '\u{2717}',        // Cross
  key: '\u{1F511}',         // Key
  trophy: '\u{1F3C6}',      // Trophy
  fire: '\u{1F525}',        // Fire
  broken: '\u{1F494}',      // Broken heart
  tennis: '\u{1F3BE}',      // Tennis
  eyes: '\u{1F440}',        // Eyes
  camera: '\u{1F4F8}',      // Camera
  house: '\u{1F3E0}',       // House
  chat: '\u{1F4AC}',        // Chat
  chart: '\u{1F4CA}',       // Chart
  science: '\u{1F52C}',     // Microscope
  cycle: '\u{1F504}',       // Cycle
  bolt: '\u{26A1}',         // Bolt
  search: '\u{1F50D}',      // Search
  shoe: '\u{1F45F}',        // Shoe
  anxious: '\u{1F630}',     // Anxious face
  scared: '\u{1F631}',      // Scared face
  arrow: '\u{2192}',        // Arrow
} as const;

const STYLES = {
  // Base page container
  pageContainer: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
    minHeight: '100vh',
    position: 'relative' as const,
  },

  // Content wrapper
  contentWrapper: {
    position: 'relative' as const,
    zIndex: 10,
    maxWidth: '900px',
    margin: '0 auto',
    padding: 'clamp(16px, 4vw, 32px)',
  },

  // Card backgrounds
  cardWhite: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '20px',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)',
  },

  cardDark: {
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(12px)',
    borderRadius: '16px',
    border: '1px solid rgba(51, 65, 85, 0.5)',
  },

  cardGlass: {
    background: 'rgba(30, 41, 59, 0.4)',
    backdropFilter: 'blur(8px)',
    borderRadius: '12px',
    border: '1px solid rgba(51, 65, 85, 0.3)',
  },

  // Typography
  heading1: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 300,
    color: '#FFFFFF',
    letterSpacing: '-0.02em',
    marginBottom: '12px',
  },

  heading2: {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: 300,
    color: '#FFFFFF',
    letterSpacing: '-0.02em',
    marginBottom: '16px',
  },

  heading3: {
    fontSize: 'clamp(1.1rem, 3vw, 1.25rem)',
    fontWeight: 600,
    color: '#FFFFFF',
    marginBottom: '12px',
  },

  bodyText: {
    fontSize: 'clamp(0.95rem, 2.5vw, 1.125rem)',
    color: '#94A3B8',
    lineHeight: 1.7,
  },

  labelText: {
    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
    fontWeight: 500,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
  },

  // Badge styles
  badge: {
    display: 'inline-block',
    padding: '8px 16px',
    borderRadius: '100px',
    fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
    fontWeight: 500,
    letterSpacing: '0.05em',
  },

  // Button base
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: 'clamp(10px, 2vw, 14px) clamp(14px, 3vw, 20px)',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Glow effect container
  glowContainer: {
    position: 'relative' as const,
  },

  glowEffect: {
    position: 'absolute' as const,
    inset: '-2px',
    borderRadius: '18px',
    filter: 'blur(8px)',
    opacity: 0.2,
    transition: 'opacity 0.5s',
  },

  // Grid layouts
  grid2Col: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },

  // Flex layouts
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  flexStart: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '24px',
  },

  // Transitions
  transition: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },

  transitionSlow: {
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================================================
// TYPES
// ============================================================================

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface WarningSign {
  icon: string;
  label: string;
  category: string;
}

interface RiskTrigger {
  icon: string;
  text: string;
  risk: string;
  color: 'rose' | 'orange' | 'amber';
}

interface ResetStep {
  num: number;
  title: string;
  subtitle: string;
  desc: string;
  instruction: string;
  color: 'emerald' | 'blue' | 'violet';
  icon: string;
}

interface PreventionCard {
  title: string;
  icon: string;
  color: 'violet' | 'blue' | 'emerald' | 'amber';
  tips: string[];
}

interface SpiralStep {
  num: number;
  title: string;
  desc: string;
  color: string;
  icon: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

const ChokingMasterclass: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('recognition');
  const [selectedTrigger, setSelectedTrigger] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tabs: Tab[] = [
    { id: 'recognition', label: 'What Is It', icon: '\u25CE' },
    { id: 'difference', label: 'Anxiety vs Choking', icon: '\u21C4' },
    { id: 'why', label: 'The Science', icon: '\u25C9' },
    { id: 'when', label: 'Risk Moments', icon: '\u26A1' },
    { id: 'reset', label: 'Emergency Reset', icon: '\u21BB' },
    { id: 'prevention', label: 'Prevention', icon: '\u25C6' }
  ];

  // --------------------------------------------------------------------------
  // Section Header Component
  // --------------------------------------------------------------------------
  const SectionHeader: React.FC<{
    badge: string;
    badgeGradient: string;
    badgeColor: string;
    title: React.ReactNode;
    subtitle: string;
  }> = ({ badge, badgeGradient, badgeColor, title, subtitle }) => (
    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
      <span style={{
        ...STYLES.badge,
        background: badgeGradient,
        color: badgeColor,
        marginBottom: '16px',
      }}>
        {badge}
      </span>
      <h2 style={STYLES.heading2}>
        {title}
      </h2>
      <p style={{
        ...STYLES.bodyText,
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        {subtitle}
      </p>
    </div>
  );

  // --------------------------------------------------------------------------
  // Recognition Tab
  // --------------------------------------------------------------------------
  const RecognitionTab: React.FC = () => {
    const warningSigns: WarningSign[] = [
      { icon: ICONS.brain, label: 'Overthinking every shot', category: 'Mind' },
      { icon: ICONS.heart, label: 'Racing heartbeat', category: 'Body' },
      { icon: ICONS.sweat, label: 'Sweating more than normal', category: 'Body' },
      { icon: ICONS.lungs, label: 'Short, shallow breaths', category: 'Body' },
      { icon: ICONS.muscle, label: 'Stiff, tense muscles', category: 'Body' },
      { icon: ICONS.target, label: 'Simple shots feel impossible', category: 'Mind' },
      { icon: ICONS.clock, label: 'Everything feels rushed', category: 'Mind' },
      { icon: ICONS.mute, label: 'Tunnel vision, muted sounds', category: 'Body' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <SectionHeader
          badge="UNDERSTANDING THE BASICS"
          badgeGradient="linear-gradient(90deg, rgba(244, 63, 94, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)"
          badgeColor={COLORS.rose}
          title={
            <>
              What Is <span style={{
                fontWeight: 600,
                background: COLORS.roseOrange,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Choking</span>?
            </>
          }
          subtitle="The sudden inability to perform skills you've mastered, triggered by high-pressure moments."
        />

        {/* Definition Card */}
        <div style={STYLES.glowContainer}>
          <div style={{
            ...STYLES.glowEffect,
            background: COLORS.roseOrange,
          }} />
          <div style={{
            ...STYLES.cardDark,
            padding: 'clamp(24px, 5vw, 32px)',
            position: 'relative',
          }}>
            <div style={{ ...STYLES.flexStart }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: COLORS.roseOrange,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 8px 24px rgba(244, 63, 94, 0.2)',
              }}>
                <span style={{ fontSize: '1.5rem' }}>{ICONS.target}</span>
              </div>
              <div>
                <h3 style={{ ...STYLES.heading3, marginBottom: '12px' }}>The Formal Definition</h3>
                <p style={{ ...STYLES.bodyText, color: COLORS.slate300, fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
                  <span style={{ color: COLORS.rose, fontWeight: 500 }}>
                    "A suboptimal performance under pressure conditions by an individual who is capable of superior performance."
                  </span>
                </p>
                <p style={{ ...STYLES.bodyText, color: COLORS.slate500, fontSize: '0.875rem', marginTop: '12px', fontStyle: 'italic' }}>
                  -- Baumeister, 1984
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Explanation */}
        <div style={{
          ...STYLES.cardGlass,
          padding: 'clamp(24px, 5vw, 32px)',
        }}>
          <h3 style={{
            ...STYLES.heading3,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <span style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: COLORS.slate700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
            }}>{ICONS.speech}</span>
            In Simple Terms
          </h3>
          <p style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
            color: COLORS.slate200,
            fontWeight: 300,
            lineHeight: 1.8,
          }}>
            You <span style={{ color: COLORS.rose, fontWeight: 500 }}>know</span> how to hit that serve.
            <br />You've done it <span style={{ color: COLORS.emerald, fontWeight: 500 }}>1,000 times</span>.
            <br />But right now? Your body <span style={{ color: COLORS.amber, fontWeight: 500 }}>forgot</span>.
          </p>
        </div>

        {/* Warning Signs Grid */}
        <div>
          <h3 style={{
            ...STYLES.heading3,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <span style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: COLORS.rose,
              fontSize: '0.875rem',
            }}>{ICONS.warning}</span>
            Warning Signs
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {warningSigns.map((sign, i) => (
              <div
                key={i}
                style={{
                  ...STYLES.cardGlass,
                  padding: '16px',
                  cursor: 'default',
                  ...STYLES.transition,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)';
                  e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.3)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '1.5rem', transition: 'transform 0.3s' }}>{sign.icon}</span>
                  <div>
                    <p style={{ color: COLORS.slate200, fontWeight: 500 }}>{sign.label}</p>
                    <p style={{ fontSize: '0.75rem', color: COLORS.slate500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{sign.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)',
          }} />
          <div style={{
            position: 'relative',
            padding: 'clamp(24px, 5vw, 32px)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '16px',
          }}>
            <div style={{ ...STYLES.flexStart }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: COLORS.emerald, fontSize: '1.25rem' }}>{ICONS.check}</span>
              </div>
              <div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#6EE7B7', marginBottom: '8px' }}>Key Insight</h4>
                <p style={{ ...STYLES.bodyText, color: COLORS.slate300, fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
                  Choking isn't about lacking ability. It's about <span style={{ color: '#FFFFFF', fontWeight: 500 }}>your brain interfering</span> with skills your body already knows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // Difference Tab
  // --------------------------------------------------------------------------
  const DifferenceTab: React.FC = () => {
    const anxietyItems = [
      'Nervous before match starts',
      'Butterflies in stomach',
      'Eager to begin playing',
      'Can be helpful for focus',
      'Decreases once you start',
      'Performance often improves'
    ];

    const chokingItems = [
      'Happens during critical points',
      'Complete mental block',
      'Body feels foreign',
      'Always harmful',
      'Gets worse as you play',
      'Performance collapses'
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <SectionHeader
          badge="CRITICAL DISTINCTION"
          badgeGradient="linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
          badgeColor={COLORS.violet}
          title={
            <>
              <span style={{ color: COLORS.amber }}>Anxiety</span> vs <span style={{ color: COLORS.rose }}>Choking</span>
            </>
          }
          subtitle="They're related but NOT the same. Understanding the difference changes how you respond."
        />

        {/* Comparison Cards */}
        <div style={STYLES.grid2Col}>
          {/* Anxiety Card */}
          <div style={STYLES.glowContainer}>
            <div style={{
              ...STYLES.glowEffect,
              background: COLORS.amberYellow,
            }} />
            <div style={{
              ...STYLES.cardDark,
              padding: '24px',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              height: '100%',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: COLORS.amberYellow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(245, 158, 11, 0.2)',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{ICONS.anxious}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FCD34D' }}>Normal Anxiety</h3>
                  <p style={{ color: COLORS.slate500, fontSize: '0.875rem' }}>Pre-match nerves</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {anxietyItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: COLORS.slate300 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: COLORS.amber }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
              }}>
                <p style={{ fontSize: '0.875rem', color: '#FCD34D' }}>
                  <span style={{ fontWeight: 600 }}>Verdict:</span> Uncomfortable but often HELPFUL
                </p>
              </div>
            </div>
          </div>

          {/* Choking Card */}
          <div style={STYLES.glowContainer}>
            <div style={{
              ...STYLES.glowEffect,
              background: 'linear-gradient(135deg, #F43F5E 0%, #EF4444 100%)',
            }} />
            <div style={{
              ...STYLES.cardDark,
              padding: '24px',
              border: '1px solid rgba(244, 63, 94, 0.2)',
              height: '100%',
              position: 'relative',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #F43F5E 0%, #EF4444 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(244, 63, 94, 0.2)',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{ICONS.scared}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FDA4AF' }}>Choking</h3>
                  <p style={{ color: COLORS.slate500, fontSize: '0.875rem' }}>Performance breakdown</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {chokingItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: COLORS.slate300 }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: COLORS.rose }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(244, 63, 94, 0.1)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
              }}>
                <p style={{ fontSize: '0.875rem', color: '#FDA4AF' }}>
                  <span style={{ fontWeight: 600 }}>Verdict:</span> Always HARMFUL to performance
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Difference */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #1E293B 0%, #0F172A 100%)',
          }} />
          <div style={{
            position: 'relative',
            padding: 'clamp(24px, 5vw, 32px)',
            border: '1px solid rgba(51, 65, 85, 1)',
            borderRadius: '16px',
          }}>
            <h4 style={{ ...STYLES.heading3, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>{ICONS.key}</span>
              The Key Difference
            </h4>
            <div style={STYLES.grid2Col}>
              <div style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.05)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
              }}>
                <p style={{ color: '#FCD34D', fontWeight: 500, marginBottom: '8px' }}>Anxiety</p>
                <p style={{ color: COLORS.slate400 }}>Worry about what <span style={{ color: '#FFFFFF' }}>MIGHT</span> happen</p>
              </div>
              <div style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(244, 63, 94, 0.05)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
              }}>
                <p style={{ color: '#FDA4AF', fontWeight: 500, marginBottom: '8px' }}>Choking</p>
                <p style={{ color: COLORS.slate400 }}>Skills failing <span style={{ color: '#FFFFFF' }}>RIGHT NOW</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // Why Tab (Science)
  // --------------------------------------------------------------------------
  const WhyTab: React.FC = () => {
    const spiralSteps: SpiralStep[] = [
      { num: 1, title: 'High Stakes Moment', desc: '"This point matters!"', color: COLORS.cyan, icon: ICONS.bolt },
      { num: 2, title: 'Conscious Attention', desc: 'Brain takes over automatic skills', color: COLORS.blue, icon: ICONS.brain },
      { num: 3, title: 'Paralysis by Analysis', desc: 'Overthinking every micro-movement', color: COLORS.violet, icon: ICONS.search },
      { num: 4, title: 'Breathing Changes', desc: 'Short, shallow, restricted', color: COLORS.purple, icon: ICONS.lungs },
      { num: 5, title: 'Muscle Tension', desc: 'Body gets stiff and tight', color: COLORS.pink, icon: ICONS.muscle },
      { num: 6, title: 'Performance Breaks Down', desc: 'Simple shots become impossible', color: COLORS.rose, icon: ICONS.broken }
    ];

    const breathingEffects = [
      'Less CO2 in your blood',
      'Blood vessels narrow',
      'Less oxygen to muscles & brain',
      'Muscles stiffen, thinking fogs'
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <SectionHeader
          badge="THE NEUROSCIENCE"
          badgeGradient="linear-gradient(90deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)"
          badgeColor={COLORS.cyan}
          title={
            <>
              Why Does Choking <span style={{
                fontWeight: 600,
                background: COLORS.cyanBlue,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Happen</span>?
            </>
          }
          subtitle="Understanding the mechanism helps you break the cycle."
        />

        {/* The Choking Spiral */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            left: '32px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, #06B6D4, #F43F5E, #EF4444)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {spiralSteps.map((step, i) => (
              <div key={i} style={{ position: 'relative', paddingLeft: '80px' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: step.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  boxShadow: `0 4px 12px ${step.color}40`,
                }}>
                  {step.num}
                </div>
                <div style={{
                  ...STYLES.cardGlass,
                  padding: '20px',
                  ...STYLES.transition,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.25rem' }}>{step.icon}</span>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#FFFFFF' }}>{step.title}</h4>
                  </div>
                  <p style={{ color: COLORS.slate400 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Breathing Science */}
        <div style={{ ...STYLES.glowContainer, marginTop: '16px' }}>
          <div style={{
            ...STYLES.glowEffect,
            background: COLORS.cyanBlue,
          }} />
          <div style={{
            ...STYLES.cardDark,
            padding: 'clamp(24px, 5vw, 32px)',
            position: 'relative',
          }}>
            <h3 style={{ ...STYLES.heading3, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.5rem' }}>{ICONS.science}</span>
              The Breathing Connection
            </h3>
            <div style={STYLES.grid2Col}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ color: COLORS.slate300, lineHeight: 1.7 }}>When you breathe fast and shallow:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {breathingEffects.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: COLORS.slate400 }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'rgba(244, 63, 94, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{ color: COLORS.rose, fontSize: '0.75rem' }}>{ICONS.arrow}</span>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ ...STYLES.flexCenter }}>
                <div style={{
                  textAlign: 'center',
                  padding: '24px',
                  borderRadius: '16px',
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(51, 65, 85, 0.5)',
                }}>
                  <p style={{ fontSize: '3rem', marginBottom: '16px' }}>{ICONS.cycle}</p>
                  <p style={{ color: '#FDA4AF', fontWeight: 500 }}>The Vicious Cycle</p>
                  <p style={{ fontSize: '0.875rem', color: COLORS.slate500, marginTop: '8px' }}>Stress {ICONS.arrow} Bad breathing {ICONS.arrow} More stress</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remember This */}
        <div style={{
          textAlign: 'center',
          padding: 'clamp(24px, 5vw, 32px)',
          borderRadius: '16px',
          background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
          border: '1px solid rgba(51, 65, 85, 0.3)',
        }}>
          <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: COLORS.slate300, fontWeight: 300 }}>
            "Choking = <span style={{ color: COLORS.rose, fontWeight: 500 }}>Overthinking</span> + <span style={{ color: COLORS.cyan, fontWeight: 500 }}>Underbreathing</span>"
          </p>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // When Tab (Risk Moments)
  // --------------------------------------------------------------------------
  const WhenTab: React.FC = () => {
    const triggers: RiskTrigger[] = [
      { icon: ICONS.trophy, text: 'Serving for the match', risk: 'EXTREME', color: 'rose' },
      { icon: ICONS.fire, text: 'Tiebreak at 5-5 or higher', risk: 'EXTREME', color: 'rose' },
      { icon: ICONS.broken, text: 'Break point down', risk: 'HIGH', color: 'orange' },
      { icon: ICONS.tennis, text: 'Playing someone you "should" beat', risk: 'HIGH', color: 'orange' },
      { icon: ICONS.eyes, text: 'Coaches, scouts, or family watching', risk: 'HIGH', color: 'orange' },
      { icon: ICONS.camera, text: 'Being filmed or broadcast', risk: 'HIGH', color: 'orange' },
      { icon: ICONS.house, text: 'Home court expectations', risk: 'MEDIUM', color: 'amber' },
      { icon: ICONS.chat, text: 'After talking confidence pre-match', risk: 'MEDIUM', color: 'amber' }
    ];

    const getRiskStyles = (color: 'rose' | 'orange' | 'amber'): CSSProperties => {
      const styles: Record<string, CSSProperties> = {
        rose: { background: 'rgba(244, 63, 94, 0.2)', color: '#FDA4AF' },
        orange: { background: 'rgba(249, 115, 22, 0.2)', color: '#FDBA74' },
        amber: { background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D' },
      };
      return styles[color];
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <SectionHeader
          badge="RISK ASSESSMENT"
          badgeGradient="linear-gradient(90deg, rgba(245, 158, 11, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%)"
          badgeColor={COLORS.amber}
          title={
            <>
              When Does Choking <span style={{
                fontWeight: 600,
                background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Happen</span>?
            </>
          }
          subtitle="Know your high-risk moments. Preparation prevents panic."
        />

        {/* Risk Moments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {triggers.map((trigger, i) => (
            <div
              key={i}
              onClick={() => setSelectedTrigger(selectedTrigger === i ? null : i)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                padding: '20px',
                border: `1px solid ${selectedTrigger === i ? 'rgba(71, 85, 105, 1)' : 'rgba(51, 65, 85, 0.3)'}`,
                background: selectedTrigger === i ? 'rgba(30, 41, 59, 0.8)' : 'rgba(30, 41, 59, 0.3)',
                cursor: 'pointer',
                ...STYLES.transition,
              }}
            >
              <div style={{ ...STYLES.flexBetween }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '1.875rem', transition: 'transform 0.3s' }}>{trigger.icon}</span>
                  <span style={{ fontSize: '1.125rem', color: COLORS.slate200 }}>{trigger.text}</span>
                </div>
                <div style={{
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  ...getRiskStyles(trigger.color),
                }}>
                  {trigger.risk}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* The Pattern */}
        <div style={{ ...STYLES.glowContainer, marginTop: '8px' }}>
          <div style={{
            ...STYLES.glowEffect,
            background: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)',
          }} />
          <div style={{
            ...STYLES.cardDark,
            padding: 'clamp(24px, 5vw, 32px)',
            position: 'relative',
          }}>
            <h3 style={{ ...STYLES.heading3, display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.5rem' }}>{ICONS.chart}</span>
              The Common Pattern
            </h3>
            <p style={{ fontSize: '1.125rem', color: COLORS.slate300, lineHeight: 1.7 }}>
              Choking happens when <span style={{ color: '#FCD34D', fontWeight: 500 }}>importance increases</span> and <span style={{ color: '#FDBA74', fontWeight: 500 }}>you become self-conscious</span> about performing.
            </p>
            <div style={{
              marginTop: '24px',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(30, 41, 59, 0.6)',
              border: '1px solid rgba(51, 65, 85, 0.5)',
            }}>
              <p style={{ color: COLORS.slate400 }}>
                <span style={{ color: '#FFFFFF', fontWeight: 500 }}>The formula:</span> High stakes + Self-focus + No protocol = Choking risk
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // Reset Tab (Emergency Reset)
  // --------------------------------------------------------------------------
  const ResetTab: React.FC = () => {
    const steps: ResetStep[] = [
      {
        num: 1,
        title: 'BREATHE',
        subtitle: 'Physiological Sigh',
        desc: 'Double inhale through nose, long exhale through mouth. This is the fastest way to activate your parasympathetic nervous system.',
        instruction: 'Inhale... Inhale again... Exhale slowly (8 seconds)',
        color: 'emerald',
        icon: ICONS.lungs
      },
      {
        num: 2,
        title: 'GROUND',
        subtitle: 'Physical Reset',
        desc: 'Feel your feet on the ground. Bounce the ball. Touch the strings. Bring yourself back to the present moment.',
        instruction: `Feel your feet ${ICONS.arrow} Bounce ball 3x ${ICONS.arrow} Touch strings`,
        color: 'blue',
        icon: ICONS.shoe
      },
      {
        num: 3,
        title: 'FOCUS',
        subtitle: 'One Simple Cue',
        desc: 'Pick ONE technical word. Not a paragraph. One word that represents good execution for you.',
        instruction: '"Smooth" or "Watch" or "Push" -- just ONE word',
        color: 'violet',
        icon: ICONS.target
      }
    ];

    const getStepStyles = (color: 'emerald' | 'blue' | 'violet') => {
      const styles: Record<string, { gradient: string; shadow: string; bgAlpha: string; textColor: string; border: string }> = {
        emerald: {
          gradient: 'linear-gradient(135deg, #10B981 0%, #22C55E 100%)',
          shadow: 'rgba(16, 185, 129, 0.2)',
          bgAlpha: 'rgba(16, 185, 129, 0.1)',
          textColor: '#6EE7B7',
          border: 'rgba(16, 185, 129, 0.2)',
        },
        blue: {
          gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)',
          shadow: 'rgba(59, 130, 246, 0.2)',
          bgAlpha: 'rgba(59, 130, 246, 0.1)',
          textColor: '#93C5FD',
          border: 'rgba(59, 130, 246, 0.2)',
        },
        violet: {
          gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
          shadow: 'rgba(139, 92, 246, 0.2)',
          bgAlpha: 'rgba(139, 92, 246, 0.1)',
          textColor: '#C4B5FD',
          border: 'rgba(139, 92, 246, 0.2)',
        },
      };
      return styles[color];
    };

    const notToDo = [
      '"Just relax" -- too vague',
      '"Try harder" -- makes it worse',
      '"Think positive" -- ignores the problem',
      'Play faster -- feeds the panic'
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <SectionHeader
          badge="EMERGENCY PROTOCOL"
          badgeGradient="linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)"
          badgeColor={COLORS.emerald}
          title={
            <>
              The 3-Step <span style={{
                fontWeight: 600,
                background: COLORS.emeraldGreen,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Reset</span>
            </>
          }
          subtitle="When you feel yourself choking, execute this protocol immediately."
        />

        {/* The 3 Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {steps.map((step, i) => {
            const stepStyles = getStepStyles(step.color);
            return (
              <div key={i} style={STYLES.glowContainer}>
                <div style={{
                  ...STYLES.glowEffect,
                  background: stepStyles.gradient,
                }} />
                <div style={{
                  ...STYLES.cardDark,
                  padding: '24px',
                  position: 'relative',
                }}>
                  <div style={{ ...STYLES.flexStart }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: stepStyles.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 8px 24px ${stepStyles.shadow}`,
                    }}>
                      <span style={{ fontSize: '1.875rem', fontWeight: 700, color: '#FFFFFF' }}>{step.num}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.05em' }}>{step.title}</h3>
                        <span style={{ color: COLORS.slate500, fontSize: '0.875rem' }}>-- {step.subtitle}</span>
                      </div>
                      <p style={{ color: COLORS.slate400, lineHeight: 1.7, marginBottom: '16px' }}>{step.desc}</p>
                      <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        background: stepStyles.bgAlpha,
                        color: stepStyles.textColor,
                        border: `1px solid ${stepStyles.border}`,
                      }}>
                        {step.instruction}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* What NOT to Do */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(244, 63, 94, 0.05) 0%, rgba(239, 68, 68, 0.05) 100%)',
          }} />
          <div style={{
            position: 'relative',
            padding: '24px',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            borderRadius: '16px',
          }}>
            <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#FDA4AF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.25rem' }}>{ICONS.cross}</span>
              What NOT to Do
            </h4>
            <div style={STYLES.grid2Col}>
              {notToDo.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: COLORS.slate400 }}>
                  <span style={{ color: COLORS.rose }}>{ICONS.cross}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why It Works */}
        <div style={{
          padding: '24px',
          borderRadius: '16px',
          background: 'rgba(30, 41, 59, 0.4)',
          border: '1px solid rgba(51, 65, 85, 0.3)',
        }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: COLORS.slate500, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Why This Works</h4>
          <p style={{ color: COLORS.slate300, lineHeight: 1.7 }}>
            Choking = brain trying to process 10 things at once. This protocol gives your brain exactly <span style={{ color: COLORS.emerald, fontWeight: 500 }}>three simple tasks</span>. It reduces mental load and lets your trained automaticity return.
          </p>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // Prevention Tab
  // --------------------------------------------------------------------------
  const PreventionTab: React.FC = () => {
    const cards: PreventionCard[] = [
      {
        title: 'Practice Under Pressure',
        icon: ICONS.target,
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
        icon: ICONS.cycle,
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
        icon: ICONS.brain,
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
        icon: ICONS.muscle,
        color: 'amber',
        tips: [
          'Everyone chokes sometimes',
          "It's not weakness, it's human",
          'Champions have protocols, not immunity',
          'Each experience is practice'
        ]
      }
    ];

    const getCardStyles = (color: 'violet' | 'blue' | 'emerald' | 'amber') => {
      const styles: Record<string, { gradient: string; dotColor: string }> = {
        violet: { gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)', dotColor: '#A78BFA' },
        blue: { gradient: 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)', dotColor: '#60A5FA' },
        emerald: { gradient: 'linear-gradient(135deg, #10B981 0%, #22C55E 100%)', dotColor: '#34D399' },
        amber: { gradient: 'linear-gradient(135deg, #F59E0B 0%, #F97316 100%)', dotColor: '#FBBF24' },
      };
      return styles[color];
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <SectionHeader
          badge="LONG-TERM STRATEGY"
          badgeGradient="linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)"
          badgeColor={COLORS.violet}
          title={
            <>
              <span style={{
                fontWeight: 600,
                background: COLORS.violetPurple,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Prevention</span> Strategies
            </>
          }
          subtitle="Build resilience so you choke less often in the first place."
        />

        {/* Prevention Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {cards.map((card, i) => {
            const cardStyles = getCardStyles(card.color);
            return (
              <div
                key={i}
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  ...STYLES.cardGlass,
                  background: expandedCard === i ? 'rgba(30, 41, 59, 0.6)' : 'rgba(30, 41, 59, 0.4)',
                  borderColor: expandedCard === i ? 'rgba(71, 85, 105, 1)' : 'rgba(51, 65, 85, 0.3)',
                  ...STYLES.transition,
                }}>
                  <div style={{ padding: '24px' }}>
                    <div style={{ ...STYLES.flexBetween }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '1.875rem' }}>{card.icon}</span>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#FFFFFF' }}>{card.title}</h3>
                      </div>
                      <span style={{
                        color: COLORS.slate500,
                        transition: 'transform 0.3s',
                        transform: expandedCard === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}>
                        \u25BC
                      </span>
                    </div>
                    <div style={{
                      overflow: 'hidden',
                      transition: 'all 0.3s',
                      maxHeight: expandedCard === i ? '400px' : '0',
                      marginTop: expandedCard === i ? '24px' : '0',
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {card.tips.map((tip, j) => (
                          <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: COLORS.slate300 }}>
                            <div style={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: cardStyles.dotColor,
                            }} />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Message */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '16px',
          marginTop: '8px',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)',
          }} />
          <div style={{
            position: 'relative',
            padding: 'clamp(24px, 5vw, 32px)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '16px',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', color: '#FFFFFF', fontWeight: 300, lineHeight: 1.7 }}>
              Champions don't have <span style={{ color: '#A78BFA' }}>immunity</span> to choking.
              <br />
              They have <span style={{ color: COLORS.emerald, fontWeight: 500 }}>protocols</span> to handle it.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------------------------------------
  // Tab Content Renderer
  // --------------------------------------------------------------------------
  const renderTabContent = (): React.ReactNode => {
    switch (activeTab) {
      case 'recognition':
        return <RecognitionTab />;
      case 'difference':
        return <DifferenceTab />;
      case 'why':
        return <WhyTab />;
      case 'when':
        return <WhenTab />;
      case 'reset':
        return <ResetTab />;
      case 'prevention':
        return <PreventionTab />;
      default:
        return <RecognitionTab />;
    }
  };

  // --------------------------------------------------------------------------
  // Main Render
  // --------------------------------------------------------------------------
  return (
    <div style={STYLES.pageContainer}>
      {/* Background Effects */}
      <div style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: '25%',
          width: '384px',
          height: '384px',
          background: 'rgba(244, 63, 94, 0.1)',
          borderRadius: '50%',
          filter: 'blur(64px)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25%',
          right: '25%',
          width: '384px',
          height: '384px',
          background: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '50%',
          filter: 'blur(64px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '384px',
          height: '384px',
          background: 'rgba(6, 182, 212, 0.05)',
          borderRadius: '50%',
          filter: 'blur(64px)',
        }} />
      </div>

      <div style={{
        ...STYLES.contentWrapper,
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '100px',
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(51, 65, 85, 0.5)',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '1.25rem' }}>{ICONS.tennis}</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: COLORS.slate300, letterSpacing: '0.05em' }}>TENNIS MENTAL TRAINING</span>
          </div>
          <h1 style={STYLES.heading1}>
            Understanding <span style={{
              fontWeight: 600,
              background: 'linear-gradient(90deg, #F43F5E 0%, #F97316 33%, #F59E0B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Choking</span>
          </h1>
          <p style={{ color: COLORS.slate500, fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
            What it is - Why it happens - How to handle it
          </p>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '32px',
          padding: '8px',
          borderRadius: '16px',
          background: 'rgba(15, 23, 42, 0.5)',
          border: '1px solid rgba(30, 41, 59, 0.5)',
          backdropFilter: 'blur(8px)',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...STYLES.button,
                background: activeTab === tab.id
                  ? COLORS.roseOrange
                  : 'transparent',
                color: activeTab === tab.id
                  ? '#FFFFFF'
                  : COLORS.slate400,
                boxShadow: activeTab === tab.id
                  ? '0 8px 24px rgba(244, 63, 94, 0.2)'
                  : 'none',
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.color = COLORS.slate400;
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '1.125rem', opacity: 0.8 }}>{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{
          borderRadius: '24px',
          background: 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(30, 41, 59, 0.5)',
          padding: 'clamp(24px, 5vw, 32px)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        }}>
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          color: COLORS.slate600,
          fontSize: '0.875rem',
        }}>
          Based on research from Stanford, Harvard, and elite sport psychology
        </div>
      </div>
    </div>
  );
};

export default ChokingMasterclass;
