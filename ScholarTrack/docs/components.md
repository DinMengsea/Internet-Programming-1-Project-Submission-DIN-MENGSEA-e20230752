# ScholarTrack — Component Design

## 1. Application Structure

```text
App.vue
├── PublicLayout
│   ├── PublicHeader
│   │   ├── BrandLogo
│   │   ├── PublicNavigation
│   │   └── AuthButtons
│   ├── RouterView
│   └── AppFooter
└── DashboardLayout
    ├── PublicHeader
    ├── SidebarNavigation
    │   └── SidebarItem
    ├── RouterView
    └── AppFooter
```

## 2. Landing Page

```text
HomePage.vue
├── PublicHeader
├── HeroSection
│   ├── HeroText
│   ├── HeroActions
│   └── OpportunityCarousel
│       ├── CarouselImage
│       ├── CarouselControls
│       └── CarouselIndicators
└── AppFooter
```

| Component | Props | Events | State owner |
|---|---|---|---|
| PublicHeader | activePage | navigate | Vue Router |
| BrandLogo | brandName | None | Parent |
| PublicNavigation | items | navigate | PublicHeader |
| AuthButtons | None | login, signup | HomePage |
| HeroText | title, description | None | HomePage |
| HeroActions | primaryLabel | get-started | HomePage |
| OpportunityCarousel | slides | change-slide, select-slide | OpportunityCarousel |
| CarouselControls | canGoPrevious, canGoNext | previous, next | OpportunityCarousel |
| CarouselIndicators | total, activeIndex | select-slide | OpportunityCarousel |
| AppFooter | copyright | None | Parent |

## 3. Sign Up Page

```text
SignUpPage.vue
├── PublicHeader
├── SignUpForm
│   ├── FormHeading
│   ├── FormField (Full Name)
│   ├── FormField (Email)
│   ├── FormField (Password)
│   ├── FormField (Confirm Password)
│   ├── FormError
│   ├── SubmitButton
│   └── LoginLink
└── AppFooter
```

| Component | Props | Events | State owner |
|---|---|---|---|
| SignUpForm | loading, errorMessage | submit | SignUpPage handles submission |
| FormHeading | title, description | None | SignUpForm |
| FormField | label, modelValue, type, placeholder | update:modelValue | SignUpForm owns field values |
| FormError | message | None | SignUpPage |
| SubmitButton | label, loading, disabled | click | SignUpForm |
| LoginLink | label | click | SignUpPage handles navigation |

SignUpForm owns the name, email, password, confirmation, and validation state. SignUpPage handles submission results and navigation.

## 4. Explore Opportunities Page

```text
ExplorePage.vue
├── DashboardLayout
│   ├── PublicHeader
│   └── SidebarNavigation
│       └── SidebarItem
└── ExploreContent
    ├── PageHeading
    ├── OpportunitySearch
    ├── CategoryFilters
    ├── ResultsSummary
    └── OpportunityGrid
        └── OpportunityCard
            ├── OpportunityImage
            ├── OpportunityInfo
            └── DeadlineInfo
```

| Component | Props | Events | State owner |
|---|---|---|---|
| SidebarNavigation | items, activePage | navigate | Vue Router |
| SidebarItem | label, to, active | Router navigation | SidebarNavigation |
| ExploreContent | None | None | ExplorePage |
| PageHeading | title, description | None | ExplorePage |
| OpportunitySearch | modelValue | update:modelValue, search | ExplorePage |
| CategoryFilters | categories, selectedCategory | select-category | ExplorePage |
| ResultsSummary | count | None | ExplorePage |
| OpportunityGrid | opportunities | select-opportunity | ExplorePage |
| OpportunityCard | opportunity | view-details | OpportunityGrid forwards events |
| OpportunityImage | src, alt | None | OpportunityCard |
| OpportunityInfo | title, provider, description | None | OpportunityCard |
| DeadlineInfo | deadline, fundingType | None | OpportunityCard |

ExplorePage owns the search query, selected category, and filters. Filtered results are derived with computed(). Opportunity data comes from the opportunity store or sample data.

## 5. Opportunity Details Page

```text
OpportunityDetailsPage.vue
├── DashboardLayout
│   ├── PublicHeader
│   └── SidebarNavigation
└── OpportunityDetailsContent
    ├── BackNavigation
    ├── OpportunityHeader
    │   ├── OpportunityImage
    │   ├── OpportunityInfo
    │   └── ApplyButton
    └── OpportunityOverview
```

| Component | Props | Events | State owner |
|---|---|---|---|
| OpportunityDetailsContent | None | None | OpportunityDetailsPage |
| BackNavigation | label | back | OpportunityDetailsPage |
| OpportunityHeader | opportunity | apply | OpportunityDetailsPage |
| OpportunityImage | src, alt | None | OpportunityHeader |
| OpportunityInfo | title, provider, deadline, description | None | OpportunityHeader |
| ApplyButton | label, disabled | apply | OpportunityDetailsPage |
| OpportunityOverview | description | None | OpportunityDetailsPage |

OpportunityDetailsPage identifies the opportunity using the route parameter. The Apply button navigates to the application flow.

## 6. Application Confirmation Page

```text
ApplicationConfirmationPage.vue
├── PublicHeader
├── ConfirmationContent
│   ├── SuccessIcon
│   ├── ConfirmationMessage
│   ├── ConfirmationDescription
│   └── ViewApplicationButton
└── AppFooter
```

| Component | Props | Events | State owner |
|---|---|---|---|
| ConfirmationContent | applicationId | None | ApplicationConfirmationPage |
| SuccessIcon | icon | None | Parent |
| ConfirmationMessage | title | None | Parent |
| ConfirmationDescription | message | None | Parent |
| ViewApplicationButton | label | view-application | ApplicationConfirmationPage |

ApplicationConfirmationPage obtains the application reference from the route and displays confirmation information. Application records and statuses belong to the application store.

## 7. Shared State Ownership

| State or data | Owner | Used by |
|---|---|---|
| Current route | Vue Router | All pages |
| Opportunity records | useOpportunityStore or sample data | Explore, Details |
| Search query and category | ExplorePage | Explore components |
| Sign-up form values | SignUpForm | Sign Up |
| Application records and statuses | useApplicationStore | Confirmation and application management |
| Current user | useAuthStore | Header and authenticated pages |
| Active carousel slide | OpportunityCarousel | Landing Page |
| Temporary form errors | Relevant form component | Sign Up |

## 8. Props and Events Rules

1. Use defineProps() to receive parent data.
2. Use defineEmits() to communicate user actions to parents.
3. Do not directly mutate props inside child components.
4. Keep shared state in the closest common parent or an appropriate Pinia store.
5. Use Vue Router for navigation.
6. Use TypeScript interfaces for opportunities, users, and applications.
7. Use computed() for derived data, including filtered opportunities.

## 9. Implementation Order

1. Define TypeScript types and sample data.
2. Create shared components, including PublicHeader, SidebarNavigation, and OpportunityCard.
3. Build Explore Opportunities.
4. Build Opportunity Details.
5. Build Sign Up and Application Confirmation.
6. Build the Landing Page and refine responsive layouts.
7. Test components with Vitest.