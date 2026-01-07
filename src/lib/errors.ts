/**
 * Error handling utilities
 * Prevents information disclosure while maintaining detailed server-side logging
 */

import { NextResponse } from 'next/server'

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  metadata?: Record<string, unknown>
  error?: {
    message: string
    stack?: string
  }
}

/**
 * Structured logger
 * In production, consider integrating with services like Sentry, LogRocket, or Datadog
 */
export const logger = {
  info: (message: string, metadata?: Record<string, unknown>) => {
    log('info', message, metadata)
  },
  warn: (message: string, metadata?: Record<string, unknown>) => {
    log('warn', message, metadata)
  },
  error: (message: string, error?: Error, metadata?: Record<string, unknown>) => {
    log('error', message, {
      ...metadata,
      error: error ? {
        message: error.message,
        stack: error.stack,
      } : undefined,
    })
  },
  debug: (message: string, metadata?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      log('debug', message, metadata)
    }
  },
}

function log(level: LogLevel, message: string, metadata?: Record<string, unknown>) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(metadata && { metadata }),
  }

  // In production, send to logging service
  // For now, use console with structured format
  const logMessage = JSON.stringify(entry)
  
  switch (level) {
    case 'error':
      console.error(logMessage)
      break
    case 'warn':
      console.warn(logMessage)
      break
    case 'debug':
      console.debug(logMessage)
      break
    default:
      console.log(logMessage)
  }
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true,
    public internalDetails?: unknown
  ) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
  }
}

/**
 * Handle API errors safely
 * Logs full details server-side but returns generic messages to clients
 */
export function handleApiError(error: unknown): NextResponse {
  // Log full error details server-side
  const errorDetails = {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
    internalDetails: error instanceof AppError ? error.internalDetails : undefined,
  }

  logger.error('API Error', error instanceof Error ? error : new Error(String(error)), errorDetails)

  // Return generic error to client
  if (error instanceof AppError && error.isOperational) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }

  // Don't expose internal errors
  return NextResponse.json(
    { error: 'An unexpected error occurred' },
    { status: 500 }
  )
}

/**
 * Create a safe error response
 * Use this instead of directly returning error messages
 */
export function createErrorResponse(
  message: string,
  statusCode: number = 500
): NextResponse {
  return NextResponse.json(
    { error: message },
    { status: statusCode }
  )
}

