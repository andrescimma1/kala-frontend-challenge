export function parseUserId(id: number | string | undefined): number | null {
  if (id === undefined || id === '') {
    return null
  }

  const numericId = typeof id === 'number' ? id : Number(id)
  return Number.isFinite(numericId) && numericId > 0 ? numericId : null
}
