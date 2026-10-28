
import type {
  Opportunity,
  CategoryFilter,
} from '../types.js'

export const opportunities: Opportunity[] = [
  {
    id: 'opp-001',
    title: 'MEXT Scholarship',
    provider: 'Japanese Government',
    category: 'Scholarship',
    country: 'Japan',
    description:
      'A sample listing for students interested in pursuing higher education in Japan.',
    funding: 'Tuition and living support',
    fundingType: 'Fully Funded',
    deadline: '2027-05-15',
    studyLevel: ['Undergraduate', 'Graduate'],
    fieldOfStudy: [
      'Engineering',
      'Computer Science',
      'Science',
    ],
    imageUrl: '/images/japan.jpg',
    eligibility: [
      'Meet the applicable academic requirements',
      'Meet the relevant age and nationality requirements',
      'Submit the required application documents',
    ],
    benefits: [
      'Tuition support',
      'Potential living allowance',
      'Opportunity to study in Japan',
    ],
  },
  {
    id: 'opp-002',
    title: 'Chevening Scholarship',
    provider: 'UK Government',
    category: 'Scholarship',
    country: 'United Kingdom',
    description:
      'A sample listing for students exploring postgraduate study opportunities in the UK.',
    funding: 'Tuition and living support',
    fundingType: 'Fully Funded',
    deadline: '2027-11-01',
    studyLevel: ['Graduate'],
    fieldOfStudy: [
      'Business',
      'Technology',
      'Public Policy',
    ],
    imageUrl: '/images/uk.jpg',
    eligibility: [
      'Meet the applicable eligibility requirements',
      'Meet the work experience requirements',
      'Submit the required application documents',
    ],
    benefits: [
      'Tuition support',
      'Living allowance',
      'Academic and professional development',
    ],
  },
  {
    id: 'opp-003',
    title: 'Student Innovation Challenge',
    provider: 'ScholarTrack Demo',
    category: 'Competition',
    country: 'Cambodia',
    description:
      'A fictional competition for students developing innovative technology solutions.',
    funding: 'Cash prizes and recognition',
    fundingType: 'Award',
    deadline: '2027-03-20',
    studyLevel: ['Undergraduate'],
    fieldOfStudy: [
      'Computer Science',
      'Data Science',
      'Engineering',
    ],
    imageUrl: '/images/innovation.jpg',
    eligibility: [
      'Be a university student',
      'Submit an original project proposal',
    ],
    benefits: [
      'Opportunity to win prizes',
      'Project presentation experience',
      'Networking opportunities',
    ],
  },
]

export const categories: CategoryFilter[] = [
  { label: 'All', value: 'All' },
  { label: 'Scholarships', value: 'Scholarship' },
  { label: 'Competitions', value: 'Competition' },
  { label: 'Fellowships', value: 'Fellowship' },
  { label: 'Internships', value: 'Internship' },
  { label: 'Research', value: 'Research' },
]
