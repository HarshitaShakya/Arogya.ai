export function getTheme(darkMode = true) {
  return {
    bg: '#05070D',
    bgGradient: 'linear-gradient(160deg,#05070D 0%,#0B1020 60%,#0a0e1a 100%)',
    card: 'rgba(15,20,35,0.6)',
    cardSolid: '#0B1020',
    border: 'rgba(255,255,255,0.1)',
    borderStrong: 'rgba(255,255,255,0.18)',
    text: '#ffffff',
    muted: '#9aa4bd',
    mutedStrong: '#cdd6ea',
    inputBg: 'rgba(255,255,255,0.06)',
    accent: '#4F8CFF',
    accent2: '#59E1FF',
    accent3: '#7B5CFF',
    accentGradient: 'linear-gradient(135deg, #4F8CFF, #7B5CFF)',
    accentGradientText: 'linear-gradient(90deg, #4F8CFF 0%, #7B5CFF 100%)',
    success: '#34d399',
    danger: '#f87171',
    blur: 'blur(20px)',
    shadow: '0 32px 64px rgba(0,0,0,0.5)',
    shadowSm: '0 8px 24px rgba(0,0,0,0.35)',
  }
}