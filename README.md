# Dhiresh — Frontend Developer Portfolio

A premium, fully animated personal portfolio built with **Next.js (App Router)**, **React**, **JavaScript/JSX**, plain **CSS**, **Framer Motion**, **Lucide Icons**, and **Supabase** (database + authentication).

---

## 1. Install dependencies

```bash
npm install
```

## 2. Configure Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project dashboard, go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key
   - `service_role` secret key

## 3. Create your environment file

Copy the example file:

```bash
cp .env.local.example .env.local
```

## 4. Add your Supabase credentials

Open `.env.local` and fill in the three values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

⚠️ **Never** commit `.env.local` or expose `SUPABASE_SERVICE_ROLE_KEY` to the browser. It's only ever imported in `lib/supabase/server.js`, which is used exclusively by the server-side API route.

## 5. Open the Supabase SQL Editor

In your Supabase dashboard, go to **SQL Editor → New query**.

## 6. Run the schema

Paste the entire contents of `supabase/schema.sql` and run it. This creates the `contact_messages` table, enables Row Level Security, and sets up the correct policies:

- **Public (anon)** → can only `INSERT` new messages (the contact form).
- **Authenticated (admin)** → can `SELECT`, `UPDATE`, and `DELETE`.

## 7. Create an admin user

In your Supabase dashboard: **Authentication → Users → Add User**. Set an email and password — this is what you'll use to log into `/admin/login`.

## 8. Start the project

```bash
npm run dev
```

## 9. Open the admin login

Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 10. Log in and verify

Sign in with the admin user you created in step 7. You should land on `/admin` with live statistics (all zero until you submit a test message via `/contact`).

---

## Project Structure

```
app/                      Routes (App Router)
  ├── page.jsx             Home
  ├── about/page.jsx       About
  ├── projects/            Projects + /projects/[id]
  ├── contact/page.jsx     Contact
  ├── admin/
  │   ├── (auth)/login/    /admin/login — no sidebar
  │   └── (dashboard)/     /admin, /admin/messages — sidebar + auth guard
  └── api/contact/route.js Server-side contact form handler

components/                Reusable UI components
components/admin/          Admin-only components

data/                      Editable content (no need to touch JSX)
  ├── projects.js
  ├── skills.js
  └── socialLinks.js

lib/
  ├── supabase/client.js   Browser Supabase client (anon key)
  ├── supabase/server.js   Server-only Supabase client (service role key)
  ├── adminAuth.js         Admin auth context (Supabase Auth)
  ├── useContactMessages.js Hook for fetching/updating messages
  └── motionVariants.js    Shared Framer Motion animation variants

supabase/schema.sql        Full database schema + RLS policies
```

---

## Easy Customization

| What to change              | Where                                   |
|------------------------------|------------------------------------------|
| Name, bio, hero copy         | `components/Hero.jsx`, `components/AboutHero.jsx` |
| Skills                       | `data/skills.js`                         |
| Social links & email         | `data/socialLinks.js`                    |
| Resume file                  | Replace `public/resume.pdf` (add this file yourself) |
| Projects                     | `data/projects.js`                       |
| Project images               | `public/images/projects/`                |
| Accent color / design tokens | `app/globals.css` → `:root` variables (change `--accent`) |
| Navigation links             | `components/Navbar.jsx`                  |
| Contact info on Contact page | `components/ContactPageClient.jsx`, `components/GetInTouch.jsx` |

The accent color can be changed from a single place — the `--accent` variable at the top of `app/globals.css`.

---

## Notes

- **Resume**: add your real PDF to `public/resume.pdf`. The download buttons already point to that path — if the file is missing, clicking the button will simply 404 rather than breaking the site.
- **Favicon**: add a `favicon.ico` to the `app/` directory (or `public/`) to replace the Next.js default.
- **Project images**: `public/images/projects/` currently contains simple placeholder SVGs — swap in real screenshots and update the `image` path in `data/projects.js`.
- **Admin access model**: any Supabase Auth user who successfully logs in is treated as an admin (enforced by RLS `authenticated` role checks). If you plan on having multiple non-admin Supabase Auth users in the future, add an `is_admin` flag and tighten the policies in `supabase/schema.sql` accordingly.
