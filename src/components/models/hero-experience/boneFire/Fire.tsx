import type { FireConfig } from '../types/types.ts'
import BoneFire from './fire/Fire.tsx'

/*
 *   Config
 */
const PARTICLES_COUNT = 150
const PARTICLES_COUNT2 = 25

const FIRE_COLOR2 = '#ff5a00'
const FIRE_COLOR1 = '#ff9a00'
const EMBER = '#800909'
const SMOKE = '#1f1f1f'

const Fire_Bottom: FireConfig = {
    size: 0.3,
    scale: [2.5, 1.8, 1],
    offsets: [[0, 0.5, 0.1]],
    color: FIRE_COLOR1
}

const Fire_Top: FireConfig = {
    size: 0.3,
    scale: [2.5, 1.8, 1],
    offsets: [[0, 0.55, 0.1]],
    color: FIRE_COLOR2
}

const Ember: FireConfig = {
    size: 0.09,
    scale: [3, 1.8, 1],
    offsets: [[0, 0.8, 0.1]],
    color: EMBER
}

const Smoke: FireConfig = {
    size: 0.4,
    scale: [2.5, 10.8, 1],
    offsets: [[0, 0.15, 0.1]],
    color: SMOKE
}

function Fire() {
    return (
        <>
            <BoneFire particlesCount={PARTICLES_COUNT} config={Fire_Bottom} />
            <BoneFire particlesCount={PARTICLES_COUNT} config={Fire_Top} />
            <BoneFire particlesCount={PARTICLES_COUNT2} config={Ember} />
            <BoneFire particlesCount={PARTICLES_COUNT} config={Smoke} />
        </>
    )
}

export default Fire
