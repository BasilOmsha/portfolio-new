import type { Euler, Mesh, Vector3 } from 'three'

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
      baked7: Nodes
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
      baked7: Mesh
   }
}

export type CameraSettingsType = {
   fov: number
   position: [number, number, number]
}
