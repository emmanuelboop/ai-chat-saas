# AI Chat SaaS

A full-stack AI-powered chat application that allows users to create accounts, manage multiple conversations, and interact with an AI assistant. The application features secure authentication, persistent chat history, conversation management, and cloud deployment using modern web technologies.

## Live Demo

https://ai-chat-saas-one.vercel.app/

---

## Features

- Secure user authentication with JWT
- User registration and login
- Password hashing with bcrypt
- OpenAI-powered AI assistant
- Create and manage multiple conversations
- Persistent chat history stored in MongoDB Atlas
- Automatically generated conversation titles
- Rename conversations
- Delete conversations
- Responsive user interface
- Cloud deployment with Vercel and Railway

---

## Screenshots

### Home Page

![Home](docs/screenshots/home.png)

### Signup Page

![Signup](docs/screenshots/signup.png)

### Login Page

![Login](docs/screenshots/login.png)

### Chat Page

![Chat](docs/screenshots/chat.png)

---

## How It Works

1. Users create an account or log in.
2. Authentication is handled using JWT tokens.
3. Users can start a new conversation with the AI assistant.
4. Messages are sent to the Express backend.
5. The backend forwards requests to the OpenAI API.
6. AI responses are returned to the frontend.
7. Conversations and message history are stored in MongoDB Atlas.
8. Users can revisit, rename, or delete previous conversations.

---

## Architecture

```text
User
  |
  v
React Frontend
  |
  v
Express REST API
  |
  +------------------+
  |                  |
  v                  v
MongoDB Atlas    OpenAI API
  |
  v
Chat History
```

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt

### AI

- OpenAI API

### Deployment

- Vercel
- Railway

---

## Project Structure

```text
ai-chat-saas/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── ...
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── ...
│
└── README.md
```

---

## Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- User-specific chat history
- Secure environment variables
- MongoDB Atlas cloud database

---

## Database Design

### Users

| Field | Type |
|---------|---------|
| id | ObjectId |
| username | String |
| password | String |

### Conversations

| Field | Type |
|---------|---------|
| id | ObjectId |
| userId | ObjectId |
| title | String |
| messages | Array |

Relationship:

```text
User (1)
   |
   └───< Conversations (Many)
```

---

## Challenges Solved

During development, several technical challenges were addressed:

- Managing JWT authentication across the application
- Designing MongoDB schemas for chat conversations
- Persisting conversation history between sessions
- Generating conversation titles automatically
- Managing multiple chat sessions per user
- Integrating the OpenAI API
- Deploying a full-stack application across multiple cloud platforms
- Handling frontend and backend communication securely

---

## What I Learned

This project helped me gain practical experience with:

- Full-stack application development
- React and TypeScript
- Authentication and authorization
- REST API development
- MongoDB data modeling
- Mongoose ODM
- OpenAI API integration
- State management
- Cloud deployment
- Secure password handling
- User-specific data management

---

## Future Improvements

- Streaming AI responses
- File uploads and document analysis
- Retrieval-Augmented Generation (RAG)
- Conversation search
- User profile settings
- Message editing
- Conversation sharing
- Usage analytics

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/emmanuelboop/ai-chat-saas.git
cd ai-chat-saas
```

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```

---

## Why I Built This Project

I built this project to gain hands-on experience developing AI-powered SaaS applications. The goal was to combine modern frontend development, backend API design, authentication, database management, and large language model integration into a production-ready application.

---

## Author

**Emmanuel Olabisi**

GitHub: https://github.com/emmanuelboop