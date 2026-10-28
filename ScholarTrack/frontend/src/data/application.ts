
import type { Application } from '../types'

export const applications: Application[] = [
  {
    id: 'app-001',
    opportunityId: 'opp-001',
    studentName: 'Demo Student',
    status: 'Submitted',
    submittedAt: '2026-10-10',
    deadline: '2027-05-15',
  },
  {
    id: 'app-002',
    opportunityId: 'opp-002',
    studentName: 'Demo Student',
    status: 'Draft',
    submittedAt: null,
    deadline: '2027-11-01',
  },
  {
    id: 'app-003',
    opportunityId: 'opp-003',
    studentName: 'Demo Student',
    status: 'Under Review',
    submittedAt: '2026-10-20',
    deadline: '2027-03-20',
  },
]
