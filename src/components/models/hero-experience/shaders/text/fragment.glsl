uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform float uIntensity;

varying vec2 vUv;

void main() {
    vec3 color = mix(uColorStart, uColorEnd, vUv.y);
    color *= uIntensity;
    gl_FragColor = vec4(color, 1.0);
}