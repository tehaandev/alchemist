# Alchemist - RAG-as-a-Service Platform

Alchemist is a full-stack web application that transforms documents into an intelligent knowledge base through retrieval-augmented generation (RAG). Users can upload documents, generate embeddings, and chat with their content using AI models of choice.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Usage](#usage)
7. [Directory Structure](#directory-structure)
8. [Contributing](#contributing)
9. [License](#license)

## Features

1. **User Authentication**: Cookie‑based auth flows with Next.js API routes and Prisma.
2. **Document Management**: Upload, list, and manage files in S3 (or Supabase bucket).
3. **Embeddings Pipeline**: Generate and remove embeddings for uploaded documents via OpenAI/Pinecone.
4. **Semantic Chat Interface**: Real‑time chat UI with session management and model selection.
5. **Server‑Side Actions**: Typed API routes with TypeScript and Next.js App Router.
6. **Responsive UI**: Custom, pixel‑perfect components built with Tailwind CSS and Radix UI primitives.

## Tech Stack

1. **Frontend**: Next.js 14 (App Router), React, Tailwind CSS
2. **Backend**: Next.js API routes, Node.js, Prisma ORM (PostgreSQL)
3. **Database**: PostgreSQL via Prisma on Supabase
4. **Storage**: AWS S3 (or Supabase storage)
5. **AI / Embeddings**: OpenAI API, Pinecone
6. **State & Data Fetching**: TanStack React Query
7. **Authentication**: JWT cookies + Prisma sessions
8. **Deployment**: Vercel (Next.js), AWS EC2 (optional)

## Prerequisites

1. Node.js >= 18.x
2. npm or yarn
3. PostgreSQL database
4. AWS account with S3 bucket (or Supabase credentials)
5. OpenAI API key (and Pinecone/Gemini credentials if using)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/<your-org>/alchemist.git
   cd alchemist
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE

# S3 / Supabase Storage
SUPABASE_BUCKET_NAME=<your-bucket>
AWS_ACCESS_KEY_ID=<your-access-key>
AWS_SECRET_ACCESS_KEY=<your-secret-key>
AWS_REGION=<your-region>

# OpenAI / AI Providers
OPENAI_API_KEY=<your-openai-key>
PINECONE_API_KEY=<your-pinecone-key>
PINECONE_ENVIRONMENT=<your-pinecone-env>
GEMINI_API_KEY=<if-applicable>
```

## Usage

1. Start development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser at `http://localhost:3000`.
3. Sign up or log in, upload documents, generate embeddings, and start chatting!

## Directory Structure

```
app/                # Next.js App Router pages and API routes
  api/ document/     # REST endpoints for file uploads and listings
  chat/              # Chat UI and session pages
  documents/         # Document upload & listing UI
components/         # Reusable UI components & providers
features/           # React Query hooks and service modules
lib/                # Utility functions and external-client wrappers
prisma/             # Prisma schema and migration files
constants.ts        # Shared constants (e.g., AI model configs)
next.config.ts      # Next.js configuration
package.json        # Dependencies and scripts
README.md           # This file
```

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m "feat: add ..."`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a Pull Request and describe your changes.

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) spec and maintain code quality with linting and tests.
