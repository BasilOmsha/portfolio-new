uniform vec3 uColor;
uniform float uTime;
uniform float uIntensity;

varying float vPosY;

void main() {
    // Circle Shape
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = step(0.5, strength);
    strength = 1.0 - strength;

    vec3 gradientColor = uColor / (max(0.1, vPosY) * 255.0);

    vec3 color = mix(vec3(0.0), gradientColor, strength);
    color *= uIntensity;
    gl_FragColor = vec4(color, 1.0) * min((10.0), max(0.1, 1.0 / (vPosY)));

    // Square shape: 
    // float insideX = step(0.0, gl_PointCoord.x) * step(gl_PointCoord.x, 1.0);
    // float insideY = step(0.0, gl_PointCoord.y) * step(gl_PointCoord.y, 1.0);
    // float strength = insideX * insideY; // 1.0 inside square, 0.0 outside

    // vec3 gradientColor = uColor / (max(0.1, vPosY) * 255.0);
    // vec3 color = mix(vec3(0.0), gradientColor, strength);
    // gl_FragColor = vec4(color, 1.0) * min((10.0), max(0.1, 1.0 / (vPosY)));

}