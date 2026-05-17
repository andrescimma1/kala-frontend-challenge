import { Card, Descriptions, Typography } from 'antd'
import type { DescriptionsProps } from 'antd'
import type { User, UserAddress } from '../types/user'
import { formatAddress } from '../utils/formatAddress'

const { Title } = Typography

interface UserDetailSectionsProps {
  user: User
}

interface DetailSectionProps {
  title: string
  items: DescriptionsProps['items']
}

function DetailSection({ title, items }: DetailSectionProps) {
  if (!items?.length) {
    return null
  }

  return (
    <Card bordered={false} className="user-detail__section">
      <Title level={5} className="user-detail__section-title">
        {title}
      </Title>
      <Descriptions
        column={{ xs: 1, sm: 1, md: 2 }}
        items={items}
        className="user-detail__descriptions"
      />
    </Card>
  )
}

function buildAddressItems(
  label: string,
  address?: UserAddress,
): NonNullable<DescriptionsProps['items']> {
  if (!address) {
    return []
  }

  return [
    { key: `${label}-street`, label: 'Street', children: address.address },
    {
      key: `${label}-city`,
      label: 'City / State',
      children: `${address.city}, ${address.state} (${address.stateCode})`,
    },
    { key: `${label}-postal`, label: 'Postal code', children: address.postalCode },
    { key: `${label}-country`, label: 'Country', children: address.country },
    {
      key: `${label}-full`,
      label: 'Full address',
      children: <span className="user-detail__multiline">{formatAddress(address)}</span>,
    },
  ]
}

export function UserDetailSections({ user }: UserDetailSectionsProps) {
  const personalItems: DescriptionsProps['items'] = [
    { key: 'firstName', label: 'First name', children: user.firstName },
    { key: 'lastName', label: 'Last name', children: user.lastName },
    {
      key: 'maidenName',
      label: 'Maiden name',
      children: user.maidenName || '—',
    },
    { key: 'age', label: 'Age', children: user.age },
    { key: 'gender', label: 'Gender', children: user.gender },
    { key: 'birthDate', label: 'Birth date', children: user.birthDate },
    { key: 'username', label: 'Username', children: `@${user.username}` },
    { key: 'role', label: 'Role', children: user.role },
    ...(user.bloodGroup
      ? [{ key: 'bloodGroup', label: 'Blood group', children: user.bloodGroup }]
      : []),
    ...(user.eyeColor
      ? [{ key: 'eyeColor', label: 'Eye color', children: user.eyeColor }]
      : []),
    ...(user.hair
      ? [
          {
            key: 'hair',
            label: 'Hair',
            children: `${user.hair.color}, ${user.hair.type}`,
          },
        ]
      : []),
    ...(user.height !== undefined
      ? [{ key: 'height', label: 'Height (cm)', children: user.height }]
      : []),
    ...(user.weight !== undefined
      ? [{ key: 'weight', label: 'Weight (kg)', children: user.weight }]
      : []),
    ...(user.university
      ? [{ key: 'university', label: 'University', children: user.university }]
      : []),
  ]

  const contactItems: DescriptionsProps['items'] = [
    { key: 'email', label: 'Email', children: user.email },
    { key: 'phone', label: 'Phone', children: user.phone },
  ]

  const companyItems: DescriptionsProps['items'] = [
    { key: 'companyName', label: 'Company', children: user.company.name },
    { key: 'title', label: 'Job title', children: user.company.title },
    { key: 'department', label: 'Department', children: user.company.department },
    ...buildAddressItems('company', user.company.address),
  ]

  const bankItems: DescriptionsProps['items'] = user.bank
    ? [
        { key: 'cardType', label: 'Card type', children: user.bank.cardType },
        { key: 'currency', label: 'Currency', children: user.bank.currency },
        { key: 'cardNumber', label: 'Card number', children: user.bank.cardNumber },
        { key: 'cardExpire', label: 'Expires', children: user.bank.cardExpire },
        { key: 'iban', label: 'IBAN', children: user.bank.iban },
      ]
    : []

  const additionalItems: DescriptionsProps['items'] = [
    ...(user.ein ? [{ key: 'ein', label: 'EIN', children: user.ein }] : []),
    ...(user.ssn ? [{ key: 'ssn', label: 'SSN', children: user.ssn }] : []),
    ...(user.userAgent
      ? [{ key: 'userAgent', label: 'User agent', children: user.userAgent }]
      : []),
  ]

  return (
    <div className="user-detail__sections">
      <DetailSection title="Personal information" items={personalItems} />
      <DetailSection title="Contact information" items={contactItems} />
      <DetailSection title="Address" items={buildAddressItems('home', user.address)} />
      <DetailSection title="Company" items={companyItems} />
      {bankItems.length > 0 && (
        <DetailSection title="Bank information" items={bankItems} />
      )}
      {additionalItems.length > 0 && (
        <DetailSection title="Additional information" items={additionalItems} />
      )}
    </div>
  )
}
