const AVATAR_COLORS = [
  '#1677ff',
  '#52c41a',
  '#fa8c16',
  '#722ed1',
  '#eb2f96',
  '#13c2c2',
] as const

export function getUserInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function getAvatarColor(seed: number): string {
  return AVATAR_COLORS[Math.abs(seed) % AVATAR_COLORS.length]
}

export function formatRowIndex(index: number, skip: number): string {
  return String(skip + index + 1).padStart(2, '0')
}

export function formatShowingRange(
  currentPage: number,
  pageSize: number,
  total: number,
): string {
  if (total === 0) {
    return 'Showing 0 of 0 users'
  }

  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, total)
  return `Showing ${start}-${end} of ${total} users`
}
