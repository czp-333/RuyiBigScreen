import { describe, it, expect } from 'vitest'
import { formatNumber, formatPercent, formatDateTime } from '@/utils/format'

describe('format utilities', () => {
  it('formats numbers below 10000', () => {
    expect(formatNumber(1234)).toBe('1,234')
  })

  it('formats numbers above 10000 as 万', () => {
    expect(formatNumber(12345)).toBe('1.23万')
  })

  it('formats numbers above 100000000 as 亿', () => {
    expect(formatNumber(123456789)).toBe('1.23亿')
  })

  it('formats percent', () => {
    expect(formatPercent(99.5)).toBe('99.50%')
  })

  it('formats datetime', () => {
    const date = new Date('2024-01-15T08:30:45')
    const result = formatDateTime(date)
    expect(result).toContain('2024-01-15')
    expect(result).toContain('08:30:45')
  })
})
