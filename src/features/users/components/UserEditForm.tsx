import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Space,
} from 'antd'
import type { FormProps } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'
import type { UpdateUserPayload, User } from '../types/user'
import { useUpdateUserMutation } from '../hooks/useUpdateUserMutation'
import { UserEditSavingAlert } from './UserPageStates'

export interface UserEditFormValues {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  username?: string
  gender?: string
  companyName?: string
  companyTitle?: string
  companyDepartment?: string
}

interface UserEditFormProps {
  user: User
  userId: number
}

function mapValuesToPayload(
  values: UserEditFormValues,
  user: User,
): UpdateUserPayload {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phone: values.phone,
    age: values.age,
    username: values.username,
    gender: values.gender,
    company: {
      ...user.company,
      name: values.companyName ?? user.company.name,
      title: values.companyTitle ?? user.company.title,
      department: values.companyDepartment ?? user.company.department,
    },
  }
}

function getInitialValues(user: User): UserEditFormValues {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    age: user.age,
    username: user.username,
    gender: user.gender,
    companyName: user.company.name,
    companyTitle: user.company.title,
    companyDepartment: user.company.department,
  }
}

export function UserEditForm({ user, userId }: UserEditFormProps) {
  const [form] = Form.useForm<UserEditFormValues>()
  const navigate = useNavigate()
  const { mutate, isPending } = useUpdateUserMutation()

  useEffect(() => {
    form.setFieldsValue(getInitialValues(user))
  }, [form, user])

  const handleFinish: FormProps<UserEditFormValues>['onFinish'] = (values) => {
    mutate(
      { id: userId, payload: mapValuesToPayload(values, user) },
      {
        onSuccess: () => {
          message.success('User updated successfully')
          navigate(ROUTES.userDetail(userId))
        },
        onError: (err) => {
          message.error(err.message ?? 'Failed to update user')
        },
      },
    )
  }

  const handleCancel = () => {
    navigate(ROUTES.userDetail(userId))
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="user-edit__form"
      requiredMark="optional"
      disabled={isPending}
    >
      <UserEditSavingAlert visible={isPending} />

      <div className="user-edit__section">
        <h3 className="user-edit__section-title">Personal information</h3>
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="firstName"
              label="First name"
              rules={[{ required: true, message: 'First name is required' }]}
            >
              <Input placeholder="First name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="lastName"
              label="Last name"
              rules={[{ required: true, message: 'Last name is required' }]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: 'Age is required' },
                {
                  type: 'number',
                  min: 1,
                  max: 150,
                  message: 'Enter a valid age between 1 and 150',
                },
              ]}
            >
              <InputNumber
                min={1}
                max={150}
                className="user-edit__input-full"
                placeholder="Age"
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="gender" label="Gender">
              <Select
                allowClear
                placeholder="Select gender"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                  { value: 'other', label: 'Other' },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="username" label="Username">
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="user-edit__section">
        <h3 className="user-edit__section-title">Contact information</h3>
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email address' },
              ]}
            >
              <Input type="email" placeholder="Email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Phone is required' }]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <div className="user-edit__section">
        <h3 className="user-edit__section-title">Company</h3>
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <Form.Item name="companyName" label="Company name">
              <Input placeholder="Company name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="companyTitle" label="Job title">
              <Input placeholder="Job title" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="companyDepartment" label="Department">
              <Input placeholder="Department" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <Form.Item className="user-edit__actions">
        <Space wrap>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Save changes
          </Button>
          <Button onClick={handleCancel} disabled={isPending}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
