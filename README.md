# 🧠 AI-Powered Collaborative Document Editor

A full-stack, real-time collaborative document editor built with **Next.js**, **Tailwind CSS**, **Clerk**, **Firebase**, **Liveblocks**, and **Google Gemini API**. This application allows users to sign in securely, manage organizations and workspaces, collaborate on documents in real-time, and generate AI-based content using Gemini API.

---

## 🚀 Key Features

- 🔐 Authentication using Clerk (Email & Social Login)
- 🏢 Organization and Workspace management
- 🎨 Beautiful UI with Tailwind CSS
- ⚙️ Firebase backend for real-time data handling
- 🤖 AI document generation using Google Gemini API
- 💬 Live comments and notifications with Liveblocks
- 📝 Rich-text editing with Editor.js
- 👥 Real-time collaboration across multiple users
- ☁️ Easy deployment to Vercel or any cloud provider

---

## 🛠️ Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database/Backend**: [Firebase](https://firebase.google.com/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/)
- **Realtime Collaboration**: [Liveblocks](https://liveblocks.io/)
- **Text Editor**: [Editor.js](https://editorjs.io/)

---

📚 Functionality Overview
Authentication: Secure email/password & social login flows powered by Clerk.

Workspace Management: Create and organize workspaces within organizations.

Collaborative Editing: Real-time document collaboration with Editor.js + Liveblocks.

AI-Powered Templates: Auto-generate document templates using the Gemini API.

Comments & Notifications: Engage with documents and receive instant updates.

## 📦 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository, Install Dependencies, Configure Environment, and Run the App

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install

# Create environment file
touch .env.local

Then, add the following to your .env.local file:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
FIREBASE_API_KEY=your-firebase-api-key
GEMINI_API_KEY=your-google-gemini-api-key

Now, run the development server:
npm run dev

Open your browser and visit:
http://localhost:3000
