# Quiz Builder Application

A full-stack web application designed to create, manage, and view custom quizzes. This project focuses on clean architecture, type safety, and robust security practices.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, TypeScript, Tailwind CSS.
- **Backend:** Node.js, Express.js, TypeScript.
- **Database:** SQLite (via Prisma ORM).

## Project Structure

The repository is structured as a monorepo for ease of development:
- `/frontend` - The UI layer using React and custom hooks for business logic.
- `/backend` - The REST API layer with Prisma integration.

---

## Setup & Installation

Follow these steps to run the project locally. 

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### 1. Backend Setup
1. Open your terminal and navigate to the backend directory:
   ```bash
   cd backend

2. Install dependencies:
    ```bash
    npm install

3. Create a .env file from the provided template:
    ```bash
    cp .env.example .env

4. Synchronize the database schema (Prisma):
    ```bash
    npx prisma db push

5. Populate the database with a sample quiz (recommended):
    ```bash
    npx prisma db seed

6. Start the development server:
    ```bash
    npm run dev

The API will be available at http://localhost:4000

### 2. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd frontend

2. Install dependencies:
    ```bash
    npm install

3. Create a .env.local file from the template:
    ```bash
    cp .env.example .env.local

4. Start the development server:
    ```bash
    npm run dev

The application will be available at http://localhost:3000