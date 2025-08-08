 uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform float uIntensity;
uniform float uFlickerSpeed;

varying vec2 vUv;

#include ../includes/perlin2d.glsl

void main() {
    // Multi-frequency flicker with noise
    float time = uTime * uFlickerSpeed;
    float flicker = 
        0.6 + 
        0.25 * sin(time * 5.2) + 
        0.15 * sin(time * 12.7) + 
        0.10 * perlin2d(vec2(time * 20.0, 0.5));

    flicker = clamp(flicker, 0.4, 1.2);

    vec3 color = mix(uColorStart, uColorEnd, vUv.y);

    color *= uIntensity * flicker;

    gl_FragColor = vec4(color, 1.0);
}