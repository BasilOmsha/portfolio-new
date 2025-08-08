import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

import poleLightFragmentShader from '../shaders/pole-light/fragment.glsl'
import poleLightVertexShader from '../shaders/pole-light/vertex.glsl'
import portalFragmentShader from '../shaders/portal/fragment.glsl'
import portalVertexShader from '../shaders/portal/vertex.glsl'
import textFragmentShader from '../shaders/text/fragment.glsl'
import textVertexShader from '../shaders/text/vertex.glsl'

import type { MaterialType } from '../types/types'

export const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#75ba4f')
    },
    portalVertexShader,
    portalFragmentShader
) as unknown as new () => MaterialType

export const PoleLightMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffb07a'),
        uColorEnd: new THREE.Color('#ffb07a'),
        uIntensity: 5.0,
        uFlickerSpeed: 1.0
    },
    poleLightVertexShader,
    poleLightFragmentShader
) as unknown as new () => MaterialType

export const TextMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#00f0f6'),
        uColorEnd: new THREE.Color('#00f0f6'),
        uIntensity: 8.0
    },
    textVertexShader,
    textFragmentShader
) as unknown as new () => MaterialType
