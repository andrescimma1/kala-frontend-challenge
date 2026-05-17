export interface AddressCoordinates {
  lat: number
  lng: number
}

export interface UserAddress {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  country: string
  coordinates?: AddressCoordinates
}

export interface UserBank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface UserHair {
  color: string
  type: string
}

export interface UserCompany {
  name: string
  title: string
  department: string
  address: UserAddress
}

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  birthDate: string
  image: string
  company: UserCompany
  role: string
  address?: UserAddress
  bank?: UserBank
  university?: string
  bloodGroup?: string
  height?: number
  weight?: number
  eyeColor?: string
  hair?: UserHair
  ein?: string
  ssn?: string
  userAgent?: string
}

export type UpdateUserPayload = Partial<
  Pick<
    User,
    | 'firstName'
    | 'lastName'
    | 'age'
    | 'email'
    | 'phone'
    | 'username'
    | 'gender'
    | 'company'
  >
>
