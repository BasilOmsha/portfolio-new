import { createHash } from 'crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

const generateVersion = () => {
    const environment =
        process.env.NODE_ENV ||
        (process.env.VERCEL_ENV === 'production' ? 'production' : 'development')

    let packageJson
    try {
        packageJson = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf8'))
    } catch (error) {
        console.error('Failed to read package.json:', error)
        process.exit(1)
    }

    const version = packageJson.version

    const buildHash =
        environment === 'production'
            ? createHash('sha1')
                  .update(
                      `${Date.now()}-${Math.random()}-${process.env.VERCEL_GIT_COMMIT_SHA || 'local'}`
                  )
                  .digest('hex')
                  .substring(0, 10)
            : 'development'

    const timestamp = Date.now()

    const versionInfo = {
        version,
        buildHash,
        timestamp,
        environment
    }

    const publicDir = join(rootDir, 'public')
    mkdirSync(publicDir, { recursive: true })

    writeFileSync(join(publicDir, 'version.json'), JSON.stringify(versionInfo, null, 2))

    console.log(`✅ Version manifest generated for ${environment}:`, versionInfo)
}

try {
    generateVersion()
} catch (error) {
    console.error('❌ Failed to generate version info:', error)
    process.exit(1)
}
