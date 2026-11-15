
import type { Student } from '../types'
import { get, post, put, remove } from './http'

export function getUsers(): Promise<Student[]> {
  return get<Student[]>('/users')
}

export function getUserById(id: string): Promise<Student> {
  return get<Student>(`/users/${encodeURIComponent(id)}`)
}

export function createUser(user: Student): Promise<Student> {
  return post<Student>('/users', user)
}

export function updateUser(
  id: string,
  user: Partial<Student>,
): Promise<Student> {
  return put<Student>(
    `/users/${encodeURIComponent(id)}`,
    user,
  )
}

export function deleteUser(id: string): Promise<void> {
  return remove(`/users/${encodeURIComponent(id)}`)
}
