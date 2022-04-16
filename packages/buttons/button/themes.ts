interface IThemes {
  [key: string]: {
    [key: string]: { [key: string]: { [key: string]: string } };
  };
}

const themes: IThemes = {
  primary: {
    brand: {
      default: {
        borderColor: "brand",
        color: "white",
        backgroundColor: "brand",
      },
      hoverAndFocus: {
        borderColor: "red-200",
        color: "white",
        backgroundColor: "red-200",
      },
      active: {
        borderColor: "red-300",
        color: "white",
        backgroundColor: "red-300",
      },
      disabled: {
        borderColor: "gray-200",
        color: "gray-300",
        backgroundColor: "gray-200",
      },
    },
    black: {
      default: {
        borderColor: "black",
        color: "white",
        backgroundColor: "black",
      },
      hoverAndFocus: {
        borderColor: "gray-400",
        color: "white",
        backgroundColor: "gray-400",
      },
      active: {
        borderColor: "black",
        color: "white",
        backgroundColor: "black",
      },
      disabled: {
        borderColor: "gray-200",
        color: "gray-300",
        backgroundColor: "gray-200",
      },
    },
    gray: {
      default: {
        borderColor: "gray-100",
        color: "black",
        backgroundColor: "gray-100",
      },
      hoverAndFocus: {
        borderColor: "gray-200",
        color: "black",
        backgroundColor: "gray-200",
      },
      active: {
        borderColor: "gray-300",
        color: "black",
        backgroundColor: "gray-300",
      },
      disabled: {
        borderColor: "gray-200",
        color: "gray-300",
        backgroundColor: "gray-200",
      },
    },
    white: {
      default: {
        borderColor: "white",
        color: "black",
        backgroundColor: "white",
      },
      hoverAndFocus: {
        borderColor: "gray-100",
        color: "black",
        backgroundColor: "gray-100",
      },
      active: {
        borderColor: "gray-200",
        color: "black",
        backgroundColor: "gray-200",
      },
      disabled: {
        borderColor: "gray-200",
        color: "gray-300",
        backgroundColor: "gray-200",
      },
    },
  },
  secondary: {
    black: {
      default: {
        borderColor: "black",
        color: "black",
        backgroundColor: "white",
      },
      hoverAndFocus: {
        borderColor: "gray-400",
        color: "gray-400",
        backgroundColor: "white",
      },
      active: {
        borderColor: "black",
        color: "black",
        backgroundColor: "white",
      },
      disabled: {
        borderColor: "gray-300",
        color: "gray-300",
        backgroundColor: "white",
      },
    },
    white: {
      default: {
        borderColor: "white",
        color: "white",
        backgroundColor: "transparent",
      },
      hoverAndFocus: {
        borderColor: "gray-100",
        color: "gray-100",
        backgroundColor: "transparent",
      },
      active: {
        borderColor: "gray-200",
        color: "gray-200",
        backgroundColor: "transparent",
      },
      disabled: {
        borderColor: "gray-300",
        color: "gray-300",
        backgroundColor: "transparent",
      },
    },
  },
};

export default themes;
