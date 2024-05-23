interface hexToRgbReturnProps {
    R: number;
    G: number;
    B: number;
}

export function hexToRgb(hex: string): hexToRgbReturnProps | null {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              R: parseInt(result[1], 16),
              G: parseInt(result[2], 16),
              B: parseInt(result[3], 16),
          }
        : null;
}