# Todo App

A Todo application built with TypeScript, React, and FastAPI with PostgreSQL database.

## Features

- User authentication (login/register)
- Create, read, update, and delete todos
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend**: React, TypeScript, React Router, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI, PostgreSQL
- **Infrastructure**: Docker

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.10+)
- Docker and Docker Compose

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/andgohq/devin-todo-test.git
   cd devin-todo-test
   ```

2. Start the PostgreSQL database:
   ```
   docker-compose -f docker/docker-compose.yml up -d
   ```

3. Set up the backend:
   ```
   cd backend
   poetry install
   poetry run python -m alembic upgrade head
   poetry run fastapi dev app/main.py
   ```

4. Set up the frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
devin-todo-test/
├── backend/             # FastAPI backend
│   ├── app/             # Application code
│   │   ├── api/         # API endpoints
│   │   ├── core/        # Core functionality
│   │   ├── db/          # Database models and schemas
│   │   ├── services/    # Business logic
│   │   └── main.py      # Application entry point
│   ├── alembic/         # Database migrations
│   └── pyproject.toml   # Python dependencies
├── frontend/            # React frontend
│   ├── public/          # Static files
│   ├── src/             # Source code
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── store/       # State management
│   │   ├── types/       # TypeScript types
│   │   ├── utils/       # Utility functions
│   │   ├── App.tsx      # Main application component
│   │   └── main.tsx     # Entry point
│   ├── package.json     # Node.js dependencies
│   └── tsconfig.json    # TypeScript configuration
└── docker/              # Docker configuration
    └── docker-compose.yml # Docker Compose configuration
```
