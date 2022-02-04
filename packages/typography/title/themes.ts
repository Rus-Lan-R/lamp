interface IThemes {
  [key: number]: { [key: string]: { [key: string]: string; }; };
}

const themes: IThemes = {
  1: {
    mobile: {
      fontSize: '32px',
      lineHeight: '40px'
    },
    tablet: {
      fontSize: '40px',
      lineHeight: '48px'
    },
    desktop: {
      fontSize: '48px',
      lineHeight: '56px'
    }
  },
  2: {
    mobile: {
      fontSize: '28px',
      lineHeight: '36px'
    },
    tablet: {
      fontSize: '32px',
      lineHeight: '40px'
    },
    desktop: {
      fontSize: '40px',
      lineHeight: '48px'
    }
  },
  3: {
    mobile: {
      fontSize: '24px',
      lineHeight: '32px'
    },
    tablet: {
      fontSize: '28px',
      lineHeight: '36px'
    },
    desktop: {
      fontSize: '32px',
      lineHeight: '40px'
    }
  },
  4: {
    mobile: {
      fontSize: '20px',
      lineHeight: '28px'
    },
    tablet: {
      fontSize: '24px',
      lineHeight: '32px'
    },
    desktop: {
      fontSize: '24px',
      lineHeight: '32px'
    }
  },
  5: {
    mobile: {
      fontSize: '18px',
      lineHeight: '24px'
    },
    tablet: {
      fontSize: '20px',
      lineHeight: '24px'
    },
    desktop: {
      fontSize: '20px',
      lineHeight: '24px'
    }
  },
  6: {
    mobile: {
      fontSize: '16px',
      lineHeight: '20px'
    },
    tablet: {
      fontSize: '16px',
      lineHeight: '20px'
    },
    desktop: {
      fontSize: '16px',
      lineHeight: '20px'
    }
  }
};

export default themes;
