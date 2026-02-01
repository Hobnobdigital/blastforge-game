export function vec2Dist(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}
export function gridDist(a, b) {
    return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
}
export function lerp(a, b, t) {
    return a + (b - a) * t;
}
export function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
}
//# sourceMappingURL=math.js.map