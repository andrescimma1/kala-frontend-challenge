import type { UserAddress } from '../types/user'

export function formatAddress(address: UserAddress): string {
  const lines = [
    address.address,
    `${address.city}, ${address.state} ${address.postalCode}`,
    address.country,
  ]
  return lines.filter(Boolean).join('\n')
}

export function formatAddressInline(address: UserAddress): string {
  return `${address.address}, ${address.city}, ${address.stateCode} ${address.postalCode}, ${address.country}`
}
