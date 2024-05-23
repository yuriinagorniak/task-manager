import { hexToRgb } from "./hexToRgb";

export function getContrastColor(hex: string): "#ffffff" | "#000000" {
    const rgbColor = hexToRgb(hex);
    let brightness: number | null = null;
    if (rgbColor) {
        const { R, G, B } = rgbColor;
        brightness = R * 0.299 + G * 0.587 + B * 0.114;
    }

    return brightness ? (brightness > 150 ? "#000000" : "#ffffff") : "#ffffff";
}