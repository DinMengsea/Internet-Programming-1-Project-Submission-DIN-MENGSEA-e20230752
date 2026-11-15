# ScholarTrack – Frontend

ScholarTrack is a student opportunity discovery and application platform. It helps students explore scholarships, competitions, fellowships, internships, and research opportunities, view opportunity details, and submit applications.

## Technology Stack

- **Frontend:** Vue 3, TypeScript, Vite
- **Routing:** Vue Router
- **State Management:** Pinia
- **Styling:** CSS
- **Mock REST API:** JSON Server
- **Data Storage:** `db.json`

## Project Setup

### 1. Install Dependencies

Navigate to the frontend directory and install the dependencies:

```bash
npm install
```

### 2. Run the Mock API Server

Open a terminal in the frontend directory and run:

```bash
npm run api
```

The JSON Server will run at:

```text
http://localhost:3000
```

Available API resources:

| Resource | Endpoint |
|---|---|
| Users | `/users` |
| Opportunities | `/opportunities` |
| Applications | `/applications` |
| Saved Opportunities | `/savedOpportunities` |

### 3. Run the Frontend

Open a second terminal in the frontend directory and run:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

**Note:** Keep both terminals running while developing the application.

## Main Application Routes

| Route | Description |
|---|---|
| `/explore` | Browse and search opportunities |
| `/opportunities/:id` | View details of a specific opportunity |
| `/:pathMatch(.*)*` | Display the 404 Not Found page |

## Main Features

- **Opportunity Exploration:** Browse and search available opportunities.
- **Opportunity Details:** View descriptions, eligibility requirements, benefits, funding, and deadlines.
- **Application Submission:** Submit applications through a validated form.
- **Form Validation:** Validate required fields, email format, and motivation length, with error messages displayed under each field.
- **State Management:** Use Pinia to manage opportunity data, loading states, errors, and empty results.
- **REST API Integration:** Retrieve and submit data through JSON Server.

## Project Structure

```text
frontend/
├── db.json
├── public/
├── src/
│   ├── api/
│   │   ├── http.ts
│   │   ├── opportunities.ts
│   │   ├── applications.ts
│   │   └── users.ts
│   ├── components/
│   ├── data/
│   ├── router/
│   │   └── index.ts
│   ├── stores/
│   │   └── opportunity.ts
│   ├── view/
│   │   ├── ExplorePage.vue
│   │   ├── OpportunitiesDetailPage.vue
│   │   └── NotFoundView.vue
│   ├── types.ts
│   ├── App.vue
│   └── main.ts
├── package.json
└── README.md
```

## Development Commands

### Start Development Server

```bash
npm run dev
```

### Start Mock API Server

```bash
npm run api
```

### Type Check

```bash
npm run type-check
```

### Build for Production

```bash
npm run build