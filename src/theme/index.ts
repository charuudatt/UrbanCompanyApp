export const colors = {
  background: '#FFF8F6',
  surface: '#FFFFFF',
  primary: '#B23A63',
  primaryDark: '#7E2A48',
  primaryLight: '#D8698C',
  primarySoft: '#FBE7EE',
  gold: '#C79A4B',
  goldSoft: '#F7EEDC',
  text: '#2B1E24',
  textMuted: '#8A6E77',
  textFaint: '#C3A9B1',
  border: '#F3E3E8',
  success: '#1E9E6C',
  successSoft: '#E4F6EE',
  warning: '#D98A2B',
  warningSoft: '#FBEEDD',
  danger: '#D14760',
  dangerSoft: '#FBE7EB',
  star: '#D9A441',
  white: '#FFFFFF',
  black: '#000000',
};

export const gradients = {
  hero: ['#7E2A48', '#B23A63', '#D8698C'] as const,
  button: ['#C24C74', '#8E2C4E'] as const,
  gold: ['#E7C87A', '#C79A4B'] as const,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  round: 999,
};

export const fontFamily = {
  display: 'PlayfairDisplay_700Bold',
  displayExtraBold: 'PlayfairDisplay_800ExtraBold',
  displaySemiBold: 'PlayfairDisplay_600SemiBold',
  body: 'Poppins_400Regular',
  bodyMedium: 'Poppins_500Medium',
  bodySemiBold: 'Poppins_600SemiBold',
  bodyBold: 'Poppins_700Bold',
};

export const typography = {
  h1: { fontSize: 30, fontFamily: fontFamily.display },
  h2: { fontSize: 24, fontFamily: fontFamily.display },
  h3: { fontSize: 19, fontFamily: fontFamily.displaySemiBold },
  body: { fontSize: 15, fontFamily: fontFamily.body },
  bodyBold: { fontSize: 15, fontFamily: fontFamily.bodySemiBold },
  caption: { fontSize: 13, fontFamily: fontFamily.body },
  captionBold: { fontSize: 13, fontFamily: fontFamily.bodySemiBold },
  tiny: { fontSize: 11, fontFamily: fontFamily.bodyMedium },
};

export const shadow = {
  soft: {
    shadowColor: '#5A1E36',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  card: {
    shadowColor: '#5A1E36',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
};
