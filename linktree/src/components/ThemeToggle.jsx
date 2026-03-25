import { useTheme } from '../context/useTheme';
import sunIcon from '../assets/icons/theme/sun.svg';
import systemIcon from '../assets/icons/theme/system.svg';
import moonIcon from '../assets/icons/theme/moon.svg';

const MODES = ['light', 'system', 'dark'];
const ICONS = [sunIcon, systemIcon, moonIcon];
const LABELS = ['Light', 'System', 'Dark'];

const BTN = 32;
const PAD = 4;

const ThemeToggle = () => {
  const { mode, setMode } = useTheme();
  const activeIndex = MODES.indexOf(mode);

  return (
    <div className="fixed top-4 left-4 z-50">
      <div
        style={{
          display: 'inline-flex',
          position: 'relative',
          borderRadius: 999,
          padding: PAD,
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: PAD,
            left: PAD,
            width: BTN,
            height: BTN,
            borderRadius: 999,
            background: 'var(--muted)',
            boxShadow: 'var(--shadow-sm)',
            transform: `translateX(${activeIndex * BTN}px)`,
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: 'none',
          }}
        />

        {MODES.map((m, i) => (
          <button
            key={m}
            onClick={(e) => setMode(m, e.clientX, e.clientY)}
            aria-label={LABELS[i]}
            aria-pressed={mode === m}
            style={{
              position: 'relative',
              zIndex: 1,
              width: BTN,
              height: BTN,
              borderRadius: 999,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <img
              src={ICONS[i]}
              alt={LABELS[i]}
              width={14}
              height={14}
              className={`transition-all duration-300 dark:invert dark:brightness-110 ${mode === m ? 'opacity-100' : 'opacity-40'}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
