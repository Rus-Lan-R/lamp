interface IThemes {
  [key: string]: { [key: string]: { [key: string]: { [key: string]: string; }; }; };
}

const themes: IThemes = {
  s: {
    buttonMinus: {
      default: {
        borderColor: 'gray-100',
        color: 'gray-300',
        backgroundColor: 'gray-100'
      },
      hoverAndFocus: {
        borderColor: 'gray-100',
        color: 'gray-400',
        backgroundColor: 'gray-100'
      },
      active: {
        borderColor: 'gray-100',
        color: 'black',
        backgroundColor: 'gray-100'
      },
      disabled: {
        borderColor: 'gray-100',
        color: 'gray-300',
        backgroundColor: 'gray-100'
      }
    },
    input: {
      default: {
        borderColor: 'gray-100',
        color: 'black',
        backgroundColor: 'gray-100'
      },
      disabled: {
        borderColor: 'gray-100',
        color: 'gray-300',
        backgroundColor: 'gray-100'
      }
    },
    buttonPlus: {
      default: {
        borderColor: 'gray-100',
        color: 'gray-300',
        backgroundColor: 'gray-100'
      },
      hoverAndFocus: {
        borderColor: 'gray-100',
        color: 'gray-400',
        backgroundColor: 'gray-100'
      },
      active: {
        borderColor: 'gray-100',
        color: 'black',
        backgroundColor: 'gray-100'
      },
      disabled: {
        borderColor: 'gray-100',
        color: 'gray-300',
        backgroundColor: 'gray-100'
      }
    }
  },
  m: {
    buttonMinus: {
      default: {
        borderColor: 'gray-200',
        color: 'gray-300',
        backgroundColor: 'white'
      },
      hoverAndFocus: {
        borderColor: 'gray-200',
        color: 'gray-300',
        backgroundColor: 'gray-100'
      },
      active: {
        borderColor: 'gray-200',
        color: 'gray-300',
        backgroundColor: 'gray-200'
      },
      disabled: {
        borderColor: 'gray-200',
        color: 'gray-300',
        backgroundColor: 'gray-100'
      }
    },
    input: {
      default: {
        borderColor: 'gray-200',
        color: 'black',
        backgroundColor: 'white'
      },
      disabled: {
        borderColor: 'gray-200',
        color: 'gray-300',
        backgroundColor: 'gray-100'
      }
    },
    buttonPlus: {
      default: {
        borderColor: 'red-100',
        color: 'white',
        backgroundColor: 'red-100'
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
        backgroundColor: 'gray-100'
      }
    }
  }
};

export default themes;
