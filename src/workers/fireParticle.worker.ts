type ParticleData = {
    particlesCount: number
    offsetsLength: number
    offsets: number[][]
}

type WorkerMessage = {
    type: 'init'
    id: string
    data: ParticleData
}

let positionsArray: Float32Array
let scalesArray: Float32Array
let elevationArray: Float32Array
let offsetsArray: Float32Array

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
    const { type, id, data } = e.data

    if (type === 'init') {
        const count = data.particlesCount * data.offsetsLength

        positionsArray = new Float32Array(count * 3)
        scalesArray = new Float32Array(count)
        elevationArray = new Float32Array(count)
        offsetsArray = new Float32Array(count * 3)

        let currentSlot = 1

        for (let i = 0; i < count; i++) {
            positionsArray[i * 3 + 0] = (Math.random() - 0.5) * 0.2
            positionsArray[i * 3 + 1] = (Math.random() - 0.5) * 0.5
            positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 0.5

            scalesArray[i] = Math.random() * 0.5 + 0.5
            elevationArray[i] = 5 + Math.random() * 25.0

            if (i > (count / data.offsetsLength) * currentSlot) {
                currentSlot++
            }
            offsetsArray[i * 3 + 0] = data.offsets[currentSlot - 1][0]
            offsetsArray[i * 3 + 1] = data.offsets[currentSlot - 1][1]
            offsetsArray[i * 3 + 2] = data.offsets[currentSlot - 1][2]
        }

        self.postMessage(
            {
                type: 'initialized',
                id: id,
                positions: positionsArray,
                scales: scalesArray,
                elevation: elevationArray,
                offsets: offsetsArray
            },
            [positionsArray.buffer, scalesArray.buffer, elevationArray.buffer, offsetsArray.buffer]
        )
    }
}
