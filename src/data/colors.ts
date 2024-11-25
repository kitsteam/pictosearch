
export const primary = {
    main: '#00456f',
    light: '#336a8b',
    dark: '#00304d',
};

export const secondary = {
    main: '#00a3d3',
    light: '#33b5db',
    dark: '#007293',
    contrastText: '#ffffff',
};

export const tenseColors = ['#000000', '#ffffff', '#ffeb3b'];

export const fontColors = ["#ffffff", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b", "#000000"];

export const pluralColors = ['#000000', '#ffffff', '#ffeb3b'];

export const identifierColors = ['#000000', '#ffffff', '#ffeb3b'];

export const borderColors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];

export const backgroundColors = ["transparent", "#ffffff", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#607d8b"];

export enum SkinColor {
    white = '#F5E5DE',
    black = '#A65C17',
    assian = '#F4ECAD',
    mulatto = '#E3AB72',
    aztec = '#CF9D7C',
};

export type SkinColorKeys = keyof typeof SkinColor;

export const skinColorReverseMapping = (color: SkinColor): SkinColorKeys | undefined => {
  const result = (Object.keys(SkinColor) as SkinColorKeys[]).find(key => SkinColor[key] === color);
  return result;
}

export enum HairColor {
    brown = '#A65E26',
    blonde = '#FDD700',
    red = '#ED4120',
    black = '#020100',
    gray = '#E1E1E1',
    darkGray = '#AAABAB',
    darkBrown = '#6A2703',
}

export type HairColorKeys = keyof typeof HairColor;

export const hairColorReverseMapping = (color: HairColor): HairColorKeys | undefined => {
  const result = (Object.keys(HairColor) as HairColorKeys[]).find(key => HairColor[key] === color);
  return result;
}