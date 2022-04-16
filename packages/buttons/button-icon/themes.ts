interface IThemes {
  [key: string]: { [key: string]: { [key: string]: { [key: string]: string; }; }; };
}

const themes: IThemes = {
  primary: {
    brand: {
      default: {
        borderColor: 'brand',
        color: 'white',
        backgroundColor: 'brand'
      },
      hoverAndFocus: {
        borderColor: 'red-200',
        color: 'white',
        backgroundColor: 'red-200'
      },
      active: {
        borderColor: 'red-300',
        color: 'white',
        backgroundColor: 'red-300'
      },
      disabled: {
        borderColor: 'gray-200',
        color: 'gray-300',
        backgroundColor: 'gray-200'
      }
    },
    gray: {
      default: {
        borderColor: 'gray-200',
        color: 'black',
        backgroundColor: 'gray-200'
      },
      hoverAndFocus: {
        borderColor: 'black',
        color: 'white',
        backgroundColor: 'black'
      },
      active: {
        borderColor: 'gray-400',
        color: 'white',
        backgroundColor: 'gray-400'
      },
      disabled: {
        borderColor: 'gray-200',
        color: 'gray-300',
        backgroundColor: 'gray-200'
      }
    }
  },
  secondary: {
    black: {
      default: {
        borderColor: 'rgba(0, 0, 0, 0.5)',
        color: 'black',
        backgroundColor: 'transparent'
      },
      hoverAndFocus: {
        borderColor: 'black',
        color: 'black',
        backgroundColor: 'transparent'
      },
      active: {
        borderColor: 'black',
        color: 'black',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      },
      disabled: {
        borderColor: 'rgba(0, 0, 0, 0.3)',
        color: 'rgba(0, 0, 0, 0.3)',
        backgroundColor: 'transparent'
      }
    },
    white: {
      default: {
        borderColor: 'rgba(255, 255, 255, 0.5)',
        color: 'white',
        backgroundColor: 'transparent'
      },
      hoverAndFocus: {
        borderColor: 'white',
        color: 'white',
        backgroundColor: 'transparent'
      },
      active: {
        borderColor: 'white',
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      },
      disabled: {
        borderColor: 'rgba(255, 255, 255, 0.3)',
        color: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'transparent'
      }
    }
  }
};

export default themes;
