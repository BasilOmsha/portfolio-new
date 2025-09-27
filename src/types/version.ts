export interface VersionInfo {
    version: string
    buildHash: string
    timestamp: number
    environment?: string
}

export interface UpdateNotificationState {
    isUpdateAvailable: boolean
    currentVersion: string
    newVersion: string
    isVisible: boolean
}

export type UpdateCheckResult = { hasUpdate: false } | { hasUpdate: true; newVersion: VersionInfo }

export interface VersionManagerConfig {
    checkInterval: number // milliseconds
    manifestUrl: string
    retryAttempts: number
    retryDelay: number
}
