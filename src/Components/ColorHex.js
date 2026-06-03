export default function ColorHex(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
}

export function ColorRGB(rgb) {
    const [r, g, b] = rgb.split(',').map(value => Number(value.trim()));

    return (
        '#' +
        [r, g, b]
            .map(value => value.toString(16).padStart(2, '0'))
            .join('')
    );
}