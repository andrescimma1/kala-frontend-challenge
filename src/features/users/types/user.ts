export interface UserAddress {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  country: string
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
