interface IThemes {
  [key: number]: { [key: string]: { [key: string]: string; }; };
}

const themes: IThemes = {
  10: {
    mobile: {
      fontSize: '10px',
      lineHeight: '14px'
    }
  },
  12: {
    mobile: {
      fontSize: '12px',
      lineHeight: '16px'
    }
  },
  14: {
    mobile: {
      fontSize: '14px',
      lineHeight: '20px'
    }
  },
  16: {
    mobile: {
      fontSize: '16px',
      lineHeight: '24px'
    }
  }
};

export default themes;
