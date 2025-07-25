# TWITTER CLONE

[![Twitter Clone](./src/app/twitter-image.jpeg)](https://twitter-alihamas.vercel.app)

A full-stack Twitter clone built with: [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [Supabase](https://supabase.com/), [TanStack Query](https://tanstack.com/query/latest), [shadcn/ui](https://ui.shadcn.com/), and [TailwindCSS](https://tailwindcss.com/).

![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React.js](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TanStack Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Tailwindcss](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%20ui-161618.svg?style=for-the-badge&logo=radix-ui&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## Features

- Social authentication via google and github
- Create, delete, like, repost and bookmark posts
- Infinite scrolling and dynamic routing
- Profile editing and image uploads

## Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/alihamasdev/twitter-clone.git
   ```

2. **Install dependencies:**

   ```sh
   bun install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your Supabase and database credentials.

4. **Run database migrations:**

   ```sh
   bunx prisma migrate dev
   ```

5. **Start the development server:**
   ```sh
   bun dev
   ```

## Project Structure

- `src/` — App source code
- `prisma/` — Prisma schema
- `public/` — Static assets
- `.env` — Environment variables

## Contributing

Feel free to fork and submit pull requests. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

Explore the codebase and contribute at [GitHub Repository](https://github.com/alihamasdev/twitter-clone)
