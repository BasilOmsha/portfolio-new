uniform float uSize;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uResolution;
uniform float uSpreadOut;

attribute float aScale;
attribute float aElevation;
attribute vec3 aOffset;

varying float vPosY;

void main() {
    vec3 newPosition = position;
    newPosition.y = mod(uTime * uSpeed, aElevation) * 0.03;

    if (uSpreadOut > 0.5) {
        float particleId = aScale * 100.0;
        float angle = newPosition.y * 1.5 + particleId;
        float spread = 1.0 + newPosition.y * 3.0;
        float drift = sin(uTime * 0.5 + particleId) * 0.15;
        float sway = cos(uTime * 0.3 + particleId * 0.7) * 0.1;
        
        newPosition.x *= spread;
        newPosition.x += sin(angle) * 0.08 + drift;
        newPosition.z *= spread;
        newPosition.z += cos(angle) * 0.08 + sway;
    } else {
        newPosition.x /= max(0.9, (newPosition.y) * 10.0);
        newPosition.x += cos(newPosition.y * 30.0) * 0.01;
        newPosition.z /= max(0.9, (newPosition.y) * 10.0);
        newPosition.z += cos(newPosition.y * 30.0) * 0.01;
    }

    vPosY = newPosition.y;
    newPosition += aOffset;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = min((uSize * aScale), pow((uSize * aScale) / ((newPosition.y - aOffset.y) * (uSize * aScale)), 2.0) * 10.0);
    gl_PointSize *= uResolution.y;
    gl_PointSize *= (1.0 / -viewPosition.z);
}