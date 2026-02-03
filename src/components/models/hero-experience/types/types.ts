import type { Color, Euler, Mesh, ShaderMaterial, Vector3 } from 'three'

type Nodes = {
    geometry: Mesh['geometry']
    position: Vector3
    rotation: Euler
    scale: Vector3
}

export type NatureTypes = {
    nodes: {
        portalLight: Nodes
        NTextEmission: Nodes
        OTextEmission: Nodes
        BTextEmission: Nodes
        ZTextEmission: Nodes
        poleLightEmission: Nodes
        RuneEmission3: Nodes
        RuneEmission1: Nodes
        RuneEmission2: Nodes
        baked8: Nodes
        [key: string]: Nodes | string
    }
    meshes: {
        portalLight: Mesh
        NTextEmission: Mesh
        OTextEmission: Mesh
        BTextEmission: Mesh
        ZTextEmission: Mesh
        poleLightEmission: Mesh
        RuneEmission3: Mesh
        RuneEmission1: Mesh
        RuneEmission2: Mesh
        baked8: Mesh
    }
}

export type CameraSettingsType = {
    fov: number
    position: [number, number, number]
}

export type MaterialType = ShaderMaterial & {
    uniforms: {
        uTime: { value: number }
        uColorStart: { value: Color }
        uColorEnd: { value: Color }
    }
    uTime: number
    uColorStart: Color
    uColorEnd: Color
}

export type FireConfig = {
    size: number
    scale: [number, number, number]
    offsets: [number, number, number][]
    color: string
    spreadOut?: boolean
    speed?: number
}

export type FireProps = {
    particlesCount: number
    config: FireConfig
}

export type MaterialProps = {
    size: number
    color: string
    spreadOut?: boolean
    speed?: number
}

export type FireShaderMaterial = ShaderMaterial & {
    uniforms: {
        uTime: { value: number }
        uResolution: { value: THREE.Vector2 }
        uSize: { value: number }
        uSpeed: { value: number }
        uColor: { value: Color }
        uIntensity: { value: number }
    }
}

export type ExperienceButtonProps = {
    onButtonToggle: (enabled: boolean) => void
}

export type LevaValues = {
    x: number
    y: number
    z: number
    rotationx: number
    rotationy: number
    rotationz: number
    wireframe: boolean
}

export type OriginalValues = {
    x: number
    y: number
    z: number
    rotationX: number
    rotationY: number
    rotationZ: number
}

export type SetLevaValues = (values: LevaValues) => void
