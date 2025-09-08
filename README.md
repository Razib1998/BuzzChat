# Realtime Chat App (BuzzChat)

**Live Demo:** [https://buzz-chat-two.vercel.app](https://buzz-chat-two.vercel.app)

A full‑stack real‑time messaging app with online presence and image sharing. Built with **React**, **Context API**, **Tailwind**, **Node.js/Express**, **MongoDB/Mongoose**, **Socket.IO**, and **Cloudinary**. Authentication is via **JWT** (bearer token).

> ⚠️ **Production note (Vercel):** Serverless platforms like Vercel Functions do **not** keep Socket.IO connections or in‑memory presence (`userSocketMap`) reliably. See **Deployment** and **Troubleshooting** for stable options.

---

## ✨ Features

* 1:1 messaging (text + image uploads via Cloudinary)
* Real‑time delivery using Socket.IO
* Per‑chat unread counter (unseen messages)
* Online / offline presence indicator (green dot)
* Scroll‑to‑latest, message timestamps, and mobile‑friendly UI

---

## 🧱 Tech Stack

**Frontend**

* React + Context API
* Tailwind CSS (with utility classes)
* `react-hot-toast`

**Backend**

* Node.js + Express
* MongoDB + Mongoose
* Socket.IO
* Cloudinary (image hosting)
* JWT auth middleware

---

## 🗂 Project Structure (example)

```
root/
├─ client/                # React app
│  ├─ src/
│  │  ├─ Context/
│  │  │  ├─ AuthContext.jsx
│  │  │  └─ ChatContext.jsx
│  │  ├─ components/
│  │  │  └─ ChatContainer.jsx
│  │  ├─ assets/
│  │  └─ lib/utils.js
│  └─ ...
└─ server/                # Express API + Socket.IO
   ├─ controllers/
   │  └─ message.controller.js
   ├─ models/
   │  ├─ Message.js
   │  └─ User.js
   ├─ lib/cloudinary.js
   ├─ server.js
   └─ ...
```

---

## 🚀 Getting Started (Local)

### Prerequisites

* Node.js ≥ 18
* MongoDB (Atlas or local)
* Cloudinary account

### 1) Clone & Install

```bash
# in two terminals
cd server && npm i
cd ../client && npm i
```

### 2) Environment Variables

Create `server/.env`:

```ini
PORT=8080
MONGODB_URI=your_mongodb_uri
JWT_SECRET=super_secret
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
CLIENT_ORIGIN=http://localhost:5173   # or 3000, depending on your dev server
```

Create `client/.env` (pick one that matches your tooling):

```ini
# Vite
VITE_API_BASE_URL=http://localhost:8080
VITE_SOCKET_URL=http://localhost:8080

# Next.js (if applicable)
# NEXT_PUBLIC_API_URL=http://localhost:8080
# NEXT_PUBLIC_SOCKET_URL=http://localhost:8080
```

### 3) Run

```bash
# terminal A
cd server
npm run dev

# terminal B
cd client
npm run dev
```

Open the client URL printed in your terminal (e.g., `http://localhost:5173`).

---

## 🔌 API Endpoints

> Base URL defaults to `/api/v1`

* `GET /messages/users` — List all users except me + unseen counts
* `GET /messages/:id` — Get conversation (me ↔ \:id), also marks partner→me as seen
* `PUT /messages/mark/:id` — Mark a specific message as seen
* `POST /messages/send-message/:receiverId` — Send text or image

  * **Body**: `{ text?: string, image?: string(base64) }`
  * If `image` is provided, it is uploaded to Cloudinary; message stores `image` URL

**Message schema (simplified):**

```ts
{
  _id: string,
  senderId: string,
  receiverId: string,
  text?: string,
  image?: string,      // Cloudinary URL
  seen: boolean,
  createdAt: string,
  updatedAt: string
}
```

---

## ☁️ Deployment

You have two reliable paths:

### Option A — Persistent Socket.IO server

* Deploy **server** on a platform with long‑lived processes: Railway, Render, Fly.io, VPS.
* Deploy **client** on Vercel (or anywhere).
* Set CORS to your client domain and configure the Socket URL.
* Use `transports: ["websocket"]` on the client to avoid long‑polling issues behind proxies.

**Client config example:**

```js
import { io as ioc } from "socket.io-client";
export const socket = ioc(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  auth: { userId: authUser?._id },
});
```

### Option B — Managed realtime (Pusher / Ably / Supabase Realtime)

* Keep API on Vercel functions if you like; publish events via provider SDK from your controllers.
* Subscribe in the client to provider channels; remove Socket.IO server complexity.

**Pusher server (example):**

```js
await pusher.trigger(`user-${receiverId}`, "new-message", newMessage);
```

**Pusher client (example):**

```js
const channel = pusher.subscribe(`user-${authUser._id}`);
channel.bind("new-message", handler);
```

### Environment in Production

**Frontend (live):** [https://buzz-chat-two.vercel.app](https://buzz-chat-two.vercel.app)
**Server**

```ini
PORT=8080
MONGODB_URI=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_ORIGIN=https://your-frontend.vercel.app
```

**Client**

```ini
VITE_API_BASE_URL=https://your-server.example.com
VITE_SOCKET_URL=https://your-server.example.com
```

---

## 🛠 Troubleshooting

**“Works locally, not on Vercel”**

* Vercel serverless does not keep Socket.IO connections or in‑memory state (`userSocketMap`). Use **Option A** or **Option B** above.

**No real‑time updates**

* Ensure client is connecting with `transports: ["websocket"]`.
* Check CORS `origin` and `credentials` on both server and client.
* Verify your server URL is **https/wss** in production.

**Online status never updates**

* Make sure presence is broadcast on connect/disconnect (see snippet above).
* If using serverless, store presence in Redis or move to a persistent host.

**Images fail to upload**

* Confirm Cloudinary credentials and that you pass a **base64** data URL from the client.

**Messages appear out of order**

* Sort by `createdAt` when setting messages from the API:

  ```js
  setMessages(data.messages.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt)));
  ```

**Duplicate messages**

* Ensure you’re not registering the same `socket.on` handler multiple times without `off` in cleanup.

---

## 🔐 Security Notes

* Use HTTPS everywhere in production.
* Store JWT in `Authorization: Bearer <token>` header.
* Avoid exposing secrets to the client; only `VITE_*/NEXT_PUBLIC_*` vars are public.
* Consider rate‑limiting on message endpoints.

---

---

## ✅ Roadmap (nice‑to‑have)

* Typing indicators
* Message reactions and read receipts
* Group chats
* File attachments (non‑images)
* Push notifications
