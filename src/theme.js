import {Platform} from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textWhite: 'white',
    primary: '#0366d6',
    background: '#24292e',
    warning: '#d73a4a',
    mainBackground: '#e1e4e8'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  distance: {
    normal: 15,
    small: 10,
    tiny: 5
  },
  signInInput: {
    marginBottom: 5,
    borderRadius: 1
  }
};

export default theme;
