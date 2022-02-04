export const shadow: any = {
  /*Grays Light-Dark*/
  lightColorNeutralWhite: 'var(--light-color-neutral-white)',
  darkColorNeutralWhite: 'var(--dark-color-neutral-white)',

  lightBoxShadow4: 'var(--light-box-shadow-4)',
  lightBoxShadow8: 'var(--light-box-shadow-8)',
  lightBoxShadow12: 'var(--light-box-shadow-12)',

  darkBoxShadow4: 'var(--dark-box-shadow-4)',
  darkBoxShadow8: 'var(--dark-box-shadow-8)',
  darkBoxShadow12: 'var(--dark-box-shadow-12)',
}

export const themeDarkShadow: { [key: string]: string } = {
  shadow4: shadow.darkBoxShadow4,
  shadow8: shadow.darkBoxShadow8,
  shadow12: shadow.darkBoxShadow12,
}

export const themeLightShadow: { [key: string]: string } = {
  shadow4: shadow.lightBoxShadow4,
  shadow8: shadow.lightBoxShadow8,
  shadow12: shadow.lightBoxShadow12,
}
