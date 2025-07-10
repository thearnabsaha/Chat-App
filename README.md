## TODO

1. Ensure the chat don't show only skeleton for the first time
2. Input send should add the input in the database
3. Implement frontend components.
4. Update message time handling in Prisma schema.
5. Add admin check for deletechat and delete room.

## Backend API Routes and Controllers

### User Routes (`/`)
| Method | Endpoint      | Description                              | Controller    | Auth Required |
|--------|--------------|------------------------------------------|--------------|--------------|
| POST   | /signup      | User registration                        | UserSignUp    | No           |
| POST   | /signin      | User login                               | UserSignIn    | No           |
| GET    | /health      | Health check endpoint                     | HealthCheck   | No           |
| GET    | /me          | Get current user profile                  | UserProfile   | Yes          |
| GET    | /            | Simple server response                    | Server        | No           |

### Chat Routes (`/chat`)
| Method | Endpoint         | Description                                 | Controller       | Auth Required |
|--------|------------------|---------------------------------------------|------------------|--------------|
| POST   | /                | Create a new chat message                    | CreateChats      | Yes          |
| GET    | /                | Get all chats                               | AllChats         | Yes          |
| GET    | /:id             | Get all chats for a specific room            | RoomChats        | Yes          |
| PUT    | /:id             | Update a chat message                        | updateChat       | Yes          |
| DELETE | /:id             | Delete a specific chat                       | deleteChat       | Yes          |
| DELETE | /room/:id        | Delete all chats for a room                  | deleteRoomChat   | Yes          |
| DELETE | /                | Delete all chats                             | deleteAllChats   | Yes          |

### Room Routes (`/room`)
| Method | Endpoint   | Description                                 | Controller    | Auth Required |
|--------|------------|---------------------------------------------|--------------|--------------|
| POST   | /          | Create a new room                           | CreateRoom    | Yes          |
| GET    | /          | Get all rooms for the current user           | FindRooms     | Yes          |
| GET    | /:id       | Get a specific room by ID                    | FindRoom      | Yes          |
| PUT    | /:id       | Update a room                                | UpdateRoom    | Yes          |
| DELETE | /:id       | Delete a specific room                       | deleteRoom    | Yes          |
| DELETE | /          | Delete all rooms                             | deleteRooms   | Yes          |

---

## Controller Details

| Controller File         | Function         | Description                                      |
|------------------------|------------------|--------------------------------------------------|
| user.controller.ts     | Server           | Returns a simple hello message.                  |
| user.controller.ts     | UserSignUp       | Handles user registration with validation and password hashing. |
| user.controller.ts     | UserSignIn       | Handles user login, password check, and JWT token generation. |
| user.controller.ts     | UserProfile      | Returns the current user's profile info.         |
| user.controller.ts     | HealthCheck      | Returns server health and uptime info.           |
| chat.controller.ts     | CreateChats      | Creates a new chat message in a room.            |
| chat.controller.ts     | AllChats         | Returns all chat messages.                       |
| chat.controller.ts     | RoomChats        | Returns all chat messages for a specific room.   |
| chat.controller.ts     | updateChat       | Updates a specific chat message.                 |
| chat.controller.ts     | deleteChat       | Deletes a specific chat message.                 |
| chat.controller.ts     | deleteRoomChat   | Deletes all chat messages for a specific room.   |
| chat.controller.ts     | deleteAllChats   | Deletes all chat messages.                       |
| room.controller.ts     | CreateRoom       | Creates a new room with the current user as admin. |
| room.controller.ts     | FindRooms        | Returns all rooms for the current user (admin).  |
| room.controller.ts     | FindRoom         | Returns a specific room by ID.                   |
| room.controller.ts     | UpdateRoom       | Updates a room's details.                        |
| room.controller.ts     | deleteRoom       | Deletes a specific room.                         |
| room.controller.ts     | deleteRooms      | Deletes all rooms.                               |

---

*All protected routes require a valid JWT token in the Authorization header.*

Chat App/
├── Dockerfile.prod
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.json
├── turbo.json
├── apps/
│   ├── express-server/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.tsbuildinfo
│   │   └── src/
│   │       ├── index.ts
│   │       ├── controllers/
│   │       │   ├── chat.controller.ts
│   │       │   ├── room.controller.ts
│   │       │   └── user.controller.ts
│   │       ├── middlewares/
│   │       │   └── jwtAuth.ts
│   │       ├── routes/
│   │       │   ├── chat.routes.ts
│   │       │   ├── room.routes.ts
│   │       │   └── user.routes.ts
│   │       └── utils/
│   │           └── config.ts
│   ├── web/
│   │   ├── components.json
│   │   ├── eslint.config.js
│   │   ├── next-env.d.ts
│   │   ├── next.config.mjs
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   ├── app/
│   │   │   ├── favicon.ico
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── (auth)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── signin/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── signup/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── room/
│   │   │       └── [slug]/
│   │   ├── components/
│   │   │   ├── CreateRoom.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── providers.tsx
│   │   │   └── Rooms.tsx
│   │   ├── hooks/
│   │   │   └── UseWebsockets.ts
│   │   ├── lib/
│   │   │   ├── config.ts
│   │   │   └── store/
│   │   │       ├── roomStore.ts
│   │   │       └── userStore.ts
│   │   └── public/
│   │       └── a.jpg
│   └── websockets-server/
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsconfig.tsbuildinfo
│       └── src/
│           └── index.ts
├── packages/
│   ├── backend-common/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       └── index.ts
│   ├── common/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       └── types.ts
│   ├── db/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   │       ├── migration_lock.toml
│   │   │       ├── 20250528053040_init/
│   │   │       ├── 20250603055017_added/
│   │   │       └── 20250604023419_added/
│   │   └── src/
│   │       └── index.ts
│   ├── eslint-config/
│   │   ├── base.js
│   │   ├── next.js
│   │   ├── package.json
│   │   ├── react-internal.js
│   │   └── README.md
│   ├── typescript-config/
│   │   ├── base.json
│   │   ├── nextjs.json
│   │   ├── package.json
│   │   ├── react-library.json
│   │   └── README.md
│   └── ui/
│       ├── components.json
│       ├── eslint.config.js
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── tsconfig.json
│       ├── tsconfig.lint.json
│       └── src/
│           ├── components/
│           │   ├── avatar.tsx
│           │   ├── button.tsx
│           │   ├── dialog.tsx
│           │   ├── dropdown-menu.tsx
│           │   ├── form.tsx
│           │   ├── input.tsx
│           │   ├── label.tsx
│           │   ├── resizable.tsx
│           │   └── skeleton.tsx
│