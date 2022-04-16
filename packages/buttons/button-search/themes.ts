interface IThemes {
  [key: string]: { [key: string]: { [key: string]: string; }; };
}

const themes: IThemes = {
  search: {
    default: {
      color: 'white',
      backgroundColor: 'black'
    },
    hoverAndFocus: {
      color: 'white',
      backgroundColor: 'gray-400'
    },
    active: {
      color: 'white',
      backgroundColor: 'black'
    },
    disabled: {
      color: 'gray-300',
      backgroundColor: 'gray-200'
    }
  },
  cross: {
    default: {
      color: 'black',
      backgroundColor: 'gray-200'
    },
    hoverAndFocus: {
      color: 'black',
      backgroundColor: 'gray-300'
    },
    active: {
      color: 'white',
      backgroundColor: 'black'
    },
    disabled: {
      color: 'gray-300',
      backgroundColor: 'gray-200'
    }
  }
};

export default themes;
