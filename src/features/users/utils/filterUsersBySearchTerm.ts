import type { User } from '../types/user'

function normalizeSearchValue(value: string | number): string {
  return String(value).trim().toLowerCase()
}

export function filterUsersBySearchTerm(
  users: User[],
  searchTerm: string,
): User[] {
  const query = searchTerm.trim().toLowerCase()
  if (query.length === 0) {
    return users
  }

  const queryDigits = query.replace(/\D/g, '')

  return users.filter((user) => {
    const searchableValues = [
      user.firstName,
      user.lastName,
      `${user.firstName} ${user.lastName}`,
      user.username,
      user.email,
      user.company.name,
      user.company.department,
      user.company.title,
      user.age,
      user.phone,
    ].map(normalizeSearchValue)

    if (searchableValues.some((value) => value.includes(query))) {
      return true
    }

    if (queryDigits.length > 0) {
      const phoneDigits = user.phone.replace(/\D/g, '')
      return phoneDigits.includes(queryDigits)
    }

    return false
  })
}
