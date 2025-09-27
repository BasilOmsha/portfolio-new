import {
    BUILD_HASH,
    BUILD_TIMESTAMP,
    CURRENT_VERSION,
    VERSION_CHECK_CONFIG
} from '../constants/version.ts'
import type { UpdateCheckResult, VersionInfo, VersionManagerConfig } from '../types/version.ts'

export class VersionManager {
    private config: VersionManagerConfig
    private abortController: AbortController | null = null

    constructor(config: Partial<VersionManagerConfig> = {}) {
        this.config = {
            ...VERSION_CHECK_CONFIG,
            ...config
        }
    }

    /**
     * Get current application version info
     */
    getCurrentVersion(): VersionInfo {
        return {
            version: CURRENT_VERSION,
            buildHash: BUILD_HASH,
            timestamp: BUILD_TIMESTAMP
        }
    }

    /**
     * Fetch latest version from server with retry logic
     */
    private async fetchLatestVersion(): Promise<VersionInfo | null> {
        let lastError: Error | null = null

        for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
            try {
                this.abortController = new AbortController()

                const response = await fetch(this.config.manifestUrl, {
                    method: 'GET',
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        Pragma: 'no-cache',
                        Expires: '0'
                    },
                    signal: this.abortController.signal
                })

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                }

                const versionInfo: VersionInfo = await response.json()

                // Validate response structure
                if (!this.isValidVersionInfo(versionInfo)) {
                    throw new Error('Invalid version info structure')
                }

                return versionInfo
            } catch (error) {
                lastError = error as Error

                if (error instanceof Error && error.name === 'AbortError') {
                    throw error
                }

                if (attempt < this.config.retryAttempts) {
                    await this.delay(this.config.retryDelay * attempt) // Exponential backoff
                }
            }
        }

        throw lastError || new Error('Failed to fetch version after all retries')
    }

    /**
     * Check if update is available
     */
    async checkForUpdate(): Promise<UpdateCheckResult> {
        try {
            const latestVersion = await this.fetchLatestVersion()

            if (!latestVersion) {
                return { hasUpdate: false }
            }

            const currentVersion = this.getCurrentVersion()

            // Check if versions are different (build hash is the most reliable indicator)
            const hasUpdate =
                latestVersion.buildHash !== currentVersion.buildHash ||
                latestVersion.timestamp > currentVersion.timestamp

            if (hasUpdate) {
                return {
                    hasUpdate: true,
                    newVersion: latestVersion
                }
            }

            return { hasUpdate: false }
        } catch (error) {
            console.warn('Version check failed:', error)
            return { hasUpdate: false }
        }
    }

    /**
     * Cancel ongoing version check
     */
    cancel(): void {
        if (this.abortController) {
            this.abortController.abort()
            this.abortController = null
        }
    }

    /**
     * Validate version info structure
     */
    private isValidVersionInfo(obj: unknown): obj is VersionInfo {
        return (
            typeof obj === 'object' &&
            obj !== null &&
            'version' in obj &&
            'buildHash' in obj &&
            'timestamp' in obj &&
            typeof (obj as Record<string, unknown>).version === 'string' &&
            typeof (obj as Record<string, unknown>).buildHash === 'string' &&
            typeof (obj as Record<string, unknown>).timestamp === 'number'
        )
    }

    /**
     * Utility delay function
     */
    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}

// Singleton instance
export const versionManager = new VersionManager()
