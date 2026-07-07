export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  data?: unknown
}

class Logger {
  private isDebugEnabled = import.meta.env.DEV

  private formatMessage(level: LogLevel, message: string): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString()
    }
  }

  debug(message: string, data?: unknown) {
    if (!this.isDebugEnabled) return
    const entry = this.formatMessage('debug', message)
    if (data !== undefined) entry.data = data
    console.debug(`[DEBUG] ${entry.timestamp} ${message}`, data ?? '')
  }

  info(message: string, data?: unknown) {
    const entry = this.formatMessage('info', message)
    if (data !== undefined) entry.data = data
    console.info(`[INFO] ${entry.timestamp} ${message}`, data ?? '')
  }

  warn(message: string, data?: unknown) {
    const entry = this.formatMessage('warn', message)
    if (data !== undefined) entry.data = data
    console.warn(`[WARN] ${entry.timestamp} ${message}`, data ?? '')
  }

  error(message: string, data?: unknown) {
    const entry = this.formatMessage('error', message)
    if (data !== undefined) entry.data = data
    console.error(`[ERROR] ${entry.timestamp} ${message}`, data ?? '')
  }
}

export const logger = new Logger()
