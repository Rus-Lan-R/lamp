interface IThemes {
  [key: string]: { [key: string]: { [key: string]: string; }; };
}

const themes: IThemes = {
  'gray-400': {
    default: { color: 'gray-400' },
    hoverAndFocus: { color: 'black' },
    active: { color: 'black' },
    disabled: { color: 'gray-200' }
  },
  'gray-300': {
    default: { color: 'gray-300' },
    hoverAndFocus: { color: 'gray-400' },
    active: { color: 'black' },
    disabled: { color: 'gray-200' }
  },
  white: {
    default: { color: 'white' },
    hoverAndFocus: { color: 'red-100' },
    active: { color: 'red-200' },
    disabled: { color: 'gray-300' }
  },
  'red-100': {
    default: { color: 'red-100' },
    hoverAndFocus: { color: 'red-200' },
    active: { color: 'red-300' },
    disabled: { color: 'gray-200' }
  }
};

export default themes;
