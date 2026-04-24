import { TextStyle } from 'react-native';

export const typography: { [key: string]: TextStyle } = {
  h1: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600',
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
};
