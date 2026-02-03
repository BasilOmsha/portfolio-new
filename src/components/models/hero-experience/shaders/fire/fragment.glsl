uniform vec3 uColor;
uniform float uTime;
uniform float uIntensity;
uniform float uSpreadOut;

varying float vPosY;

void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    float strength;
    float alpha;
    
    if (uSpreadOut > 0.5) {
        strength = 1.0 - smoothstep(0.0, 0.5, dist);
        
        vec3 emberColor = uColor;
        vec3 hotCore = min(emberColor * 3.0, vec3(1.0));
        vec3 gradientColor = mix(emberColor, hotCore, pow(strength, 1.5));
        
        float flicker = 0.8 + 0.2 * sin(uTime * 8.0 + vPosY * 50.0);
        float fadeOut = 1.0 - smoothstep(0.0, 0.15, vPosY);
        
        vec3 color = gradientColor * uIntensity * flicker;
        alpha = strength * fadeOut;
        
        gl_FragColor = vec4(color, alpha);
    } else {
        strength = 1.0 - step(0.5, dist);

        vec3 gradientColor = uColor / (max(0.1, vPosY) * 255.0);
        vec3 color = mix(vec3(0.0), gradientColor, strength) * uIntensity;
        
        gl_FragColor = vec4(color, 1.0) * min(10.0, max(0.1, 1.0 / vPosY));
    }
}