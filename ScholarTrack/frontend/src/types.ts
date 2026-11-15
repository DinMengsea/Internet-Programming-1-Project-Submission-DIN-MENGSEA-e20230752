
export type OpportunityCategory =
  | 'Scholarship'
  | 'Competition'
  | 'Fellowship'
  | 'Internship'
  | 'Research'

export type ApplicationStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Accepted'
  | 'Rejected'

export interface Opportunity {
  id: string
  title: string
  provider: string
  category: OpportunityCategory
  country: string
  description: string
  funding: string
  fundingType: 'Fully Funded' | 'Partially Funded' | 'Award'
  deadline: string
  studyLevel: string[]
  fieldOfStudy: string[]
  imageUrl: string
  eligibility: string[]
  benefits: string[]
}

export interface Application {
  id: string
  userId: string
  opportunityId: string
  studentName: string
  email?: string
  motivation?: string
  status: ApplicationStatus
  submittedAt: string | null
  deadline: string
}

export interface Student {
  id: string
  fullName: string
  email: string
  role?: 'student' | 'admin'
}

export interface CategoryFilter {
  label: string
  value: OpportunityCategory | 'All'
}
