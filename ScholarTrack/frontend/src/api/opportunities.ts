
import type { Opportunity } from '../types'
import { get, post, put, remove } from './http'

export function getOpportunities(): Promise<Opportunity[]> {
  return get<Opportunity[]>('/opportunities')
}

export function getOpportunityById(id: string): Promise<Opportunity> {
  return get<Opportunity>(`/opportunities/${encodeURIComponent(id)}`)
}

export function createOpportunity(
  opportunity: Opportunity,
): Promise<Opportunity> {
  return post<Opportunity>('/opportunities', opportunity)
}

export function updateOpportunity(
  id: string,
  opportunity: Partial<Opportunity>,
): Promise<Opportunity> {
  return put<Opportunity>(
    `/opportunities/${encodeURIComponent(id)}`,
    opportunity,
  )
}

export function deleteOpportunity(id: string): Promise<void> {
  return remove(`/opportunities/${encodeURIComponent(id)}`)
}
