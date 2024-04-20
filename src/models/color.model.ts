type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HSL = `hsl(${number}, ${string}, ${string})`;
type HSLA = `hsla(${number}, ${string}, ${string}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX | HSL | HSLA;