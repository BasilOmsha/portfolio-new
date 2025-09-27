declare const __APP_VERSION__: string
declare const __BUILD_HASH__: string
declare const __BUILD_TIMESTAMP__: number

export const CURRENT_VERSION: string = __APP_VERSION__
export const BUILD_HASH: string = __BUILD_HASH__
export const BUILD_TIMESTAMP: number = __BUILD_TIMESTAMP__

export const VERSION_CHECK_CONFIG = {
    checkInterval: 5 * 60 * 1000, // 5 minutes
    manifestUrl: '/version.json',
    retryAttempts: 3,
    retryDelay: 2000, // 2 seconds
    storageKey: 'app_version_info',
    lastCheckKey: 'last_version_check'
} as const
