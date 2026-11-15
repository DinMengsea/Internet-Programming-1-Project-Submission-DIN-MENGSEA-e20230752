
import type { Application } from '../types'
import { get, post, put, remove } from './http'

export function getApplications(): Promise<Application[]> {
  return get<Application[]>('/applications')
}

export function getApplicationById(id: string): Promise<Application> {
  return get<Application>(`/applications/${encodeURIComponent(id)}`)
}

export function getApplicationsByUser(userId: string): Promise<Application[]> {
  return get<Application[]>(`/applications?userId=${encodeURIComponent(userId)}`)
}

export function createApplication(
  application: Application,
): Promise<Application> {
  return post<Application>('/applications', application)
}

export function updateApplication(
  id: string,
  application: Partial<Application>,
): Promise<Application> {
  return put<Application>(
    `/applications/${encodeURIComponent(id)}`,
    application,
  )
}

export function deleteApplication(id: string): Promise<void> {
  return remove(`/applications/${encodeURIComponent(id)}`)
}
