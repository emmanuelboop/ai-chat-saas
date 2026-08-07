# NovaChat — AI Chat SaaS

> A production-style, full-stack AI chat platform with real-time streaming responses, JWT authentication, and persistent conversation history.

**[Live Demo →](https://ai-chat-saas-one.vercel.app/)**

Built to demonstrate end-to-end SaaS development — from React UI and REST API design to OpenAI integration, database modeling, and cloud deployment.

---

## Highlights

| Area | What I Built |
|------|-------------|
| **Real-time AI** | Server-Sent Events (SSE) streaming — tokens render live as OpenAI generates them |
| **Full-stack auth** | JWT login/signup, bcrypt password hashing, protected client routes |
| **Data persistence** | MongoDB Atlas + Mongoose — users, conversations, and message history |
| **Modern UI** | React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Markdown rendering |
| **Cloud deployment** | Frontend on Vercel, backend on Railway |

---

## Tech Stack

**Frontend:** React 19 · TypeScript · Vite · React Router · Tailwind CSS 4 · shadcn/ui · react-markdown

**Backend:** Node.js · Express 5 · MongoDB Atlas · Mongoose · JWT · bcrypt · OpenAI SDK

**Deployment:** Vercel · Railway

---

## Features

- **Streaming AI responses** — token-by-token output via SSE for a ChatGPT-like experience
- **User authentication** — secure signup/login with JWT tokens stored client-side
- **Multi-conversation management** — create, rename, and delete chat sessions
- **Persistent history** — all messages saved to MongoDB and restored on login
- **Auto-generated titles** — first message becomes the conversation name
- **Signed-in user display** — username and email shown in the sidebar and chat header
- **Markdown support** — AI responses rendered with syntax-aware formatting
- **Responsive, polished UI** — dark gradient theme with glassmorphism and smooth UX

---

## Architecture

```text
┌─────────────┐     SSE stream      ┌──────────────┐     OpenAI API     ┌─────────┐
│   React     │ ◄────────────────── │   Express    │ ◄────────────────► │  GPT    │
│  Frontend   │ ──── REST / JSON ─► │   Backend    │                    │ 3.5     │
└─────────────┘                     └──────┬───────┘                    └─────────┘
                                           │
                                           ▼
                                    ┌──────────────┐
                                    │ MongoDB Atlas│
                                    │ Users + Chats│
                                    └──────────────┘
```

**Request flow:**
1. User authenticates → receives a JWT
2. User sends a message → saved to MongoDB
3. Frontend opens an SSE connection to `/chat`
4. Backend streams OpenAI tokens back in real time
5. Complete response is persisted and shown in the conversation

---

## Screenshots

> To refresh these images after UI changes, run `npm run dev` then `node scripts/capture-screenshots.mjs` (requires Playwright).

### Home Page

![Home](docs/screenshots/home.png)

### Signup Page

![Signup](docs/screenshots/signup.png)

### Login Page

![Login](docs/screenshots/login.png)

### Chat Page

![Chat](docs/screenshots/chat.png)

---

## Project Structure

```text
ai-chat-saas/
├── src/                        # React frontend
│   ├── api/                    # HTTP clients (chat, conversations)
│   ├── components/             # ChatArea, Sidebar, MessageBubble, UI
│   ├── hooks/                  # useConversations state management
│   ├── lib/                    # Auth helpers, utilities
│   ├── pages/                  # Home, Login, Signup, Chat
│   └── types/                  # TypeScript interfaces
│
├── server/                     # Express backend
│   ├── config/                 # DB connection, OpenAI client, Mongoose models
│   ├── controllers/            # Auth and chat route handlers
│   ├── routes/                 # Express routers
│   ├── services/               # OpenAI streaming service
│   └── prompts/                # System prompt
│
└── docs/screenshots/           # README screenshots
```

---

## Skills Demonstrated

- Full-stack JavaScript/TypeScript development
- REST API design and Server-Sent Events (SSE) streaming
- OpenAI API integration with real-time token delivery
- JWT authentication and secure password handling
- MongoDB schema design and Mongoose ODM
- React state management and custom hooks
- Responsive UI with Tailwind CSS and component libraries
- Monorepo-style frontend/backend organization
- Environment-based configuration and cloud deployment

---

## Database Design

### Users

| Field | Type | Notes |
|-------|------|-------|
| email | String | Unique, used for login |
| password | String | bcrypt-hashed |

### Conversations

| Field | Type | Notes |
|-------|------|-------|
| userId | ObjectId | References User |
| title | String | Auto-generated from first message |
| messages | Array | `{ role, content }` pairs |

```text
User (1) ────< Conversations (Many)
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- OpenAI API key

### 1. Clone the repository

```bash
git clone https://github.com/emmanuelboop/ai-chat-saas.git
cd ai-chat-saas
```

### 2. Backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
MONGODB_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

```bash
npm start
```

### 3. Frontend

```bash
cd ..
npm install
```

Create `.env.local` in the project root:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Roadmap

- [ ] JWT middleware on protected backend routes
- [ ] Conversation search
- [ ] File uploads and document analysis
- [ ] Retrieval-Augmented Generation (RAG)
- [ ] User profile settings

---

## Author

**Emmanuel Olabisi**

- GitHub: [emmanuelboop](https://github.com/emmanuelboop)
- Live Demo: [ai-chat-saas-one.vercel.app](https://ai-chat-saas-one.vercel.app/)

---

*Built as a portfolio project to showcase full-stack development skills with modern AI integration.*
