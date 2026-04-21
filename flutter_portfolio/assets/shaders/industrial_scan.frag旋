#version 460 core

#include <flutter/runtime_effect.glsl>

uniform vec2 uSize;
uniform float uTime;

out vec4 fragColor;

void main() {
    vec2 uv = FlutterFragCoord().xy / uSize;
    
    // Create a diagonal "scan" line
    float scanPos = mod(uTime * 0.5, 2.0) - 0.5;
    float dist = abs(uv.x + uv.y - scanPos);
    
    // Define the glow intensity
    float glow = smoothstep(0.15, 0.0, dist);
    
    // Base industrial color (Cyan)
    vec3 accentColor = vec3(0.0, 0.95, 1.0);
    
    // Result color
    vec3 finalColor = accentColor * glow * 0.3;
    
    fragColor = vec4(finalColor, finalColor.x > 0.0 ? 0.3 : 0.0);
}
