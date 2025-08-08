import { ThreeElements } from '@react-three/fiber'

declare module '*.glsl' {
    const content: string
    export default content
}

declare global {
    namespace React {
        namespace JSX {
            // eslint-disable-next-line @typescript-eslint/no-empty-object-type
            interface IntrinsicElements extends ThreeElements {}
        }
    }
}
