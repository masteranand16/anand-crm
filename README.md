# SaaS CRM Dashboard

Welcome to the **SaaS CRM Dashboard**! This project is a highly-polished, modern, and fully responsive CRM (Customer Relationship Management) application built with React, TypeScript, and Tailwind CSS. 

Unlike standard dashboards, this project features a **premium cinematic design language**, boasting deep red and black gradients, glowing gold typography (`Cinzel` font), live particle animations, and a realistic theatrical boot sequence.

## Premium Features

- **Theatrical Boot Sequence:** A stunning 3-second loader utilizing `framer-motion` with letterbox sliding effects, glowing orbs, and scaling geometric logos.
- **Live Spark Animations:** Floating, glowing embers drift upwards in the background of both the Login and Dashboard screens, giving the app a dynamic, "live" feel.
- **Glassmorphism UI:** Frosted glass (backdrop-blur) sidebars and headers that let the animated background sparks subtly shine through.
- **Premium Aesthetics:** Custom `Cinzel` serif fonts, gold-accented typography (`#FFD700`), and deep pure black/maroon gradients replace traditional boring whites and grays.
- **Dashboard Home:** KPI cards, an interactive responsive revenue chart (via Recharts), and a recent activity feed.
- **Customers & Orders:** Data tables with scrollbar-free native scrolling, status filtering, and action buttons.
- **Settings:** Profile details form with full validation (Zod + React Hook Form).
- **Authentication (Mock):** A gorgeously designed login page with a floating, borderless card and remember me functionality.

## Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4) + Custom CSS Utilities
- **Animations:** Framer Motion
- **Routing:** React Router v6
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form + Zod
- **Charts:** Recharts
- **Icons:** Lucide React

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed (v18+ recommended).
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Experience the app:**
   Navigate to `http://localhost:5173` in your browser. Be sure to refresh to catch the cinematic boot loader!

5. **Build for production:**
   ```bash
   npm run build
   ```

## Assumptions and Known Limitations

- **Mock Authentication:** The authentication system is currently mocked. User credentials are not validated against a real backend, and the session state is managed locally via Zustand.
- **Local State:** All CRM data (KPIs, Customers, Orders) is hardcoded or managed purely in-memory using Zustand. Data will reset upon a page reload unless otherwise configured with local storage.
- **Responsive Design:** While optimized for mobile and desktop views, tablet orientation might require minor adjustments in complex table views.
- **Backend Integration:** This is a frontend-only application. To make it production-ready, you will need to connect the Zustand stores and form submissions to a real API.

## AI Usage Disclosure

- **AI Tools Used:** Gemini 3.1 Pro via Antigravity IDE integration.
- **Tasks Assisted With:**
  - Initial project scaffolding and generating the React component structure.
  - Generating boiler-plate for state management using Zustand and routing logic using React Router.
  - Crafting complex CSS animations, specifically the particle effects and `framer-motion` boot sequence transitions.
  - Setting up form validations with Zod and React Hook Form.
- **What I Wrote Myself:**
  - Defined the project requirements, design aesthetics, and the overarching "Cinematic Red & Gold" theme.
  - Fine-tuned the color palettes, layout dimensions, and typography hierarchy to ensure a premium feel.
  - Adjusted component integration, managed the data flow across routes, and refined the final UI responsiveness.
- **Independent Technical Decision:** 
  - I independently chose to use `Zustand` over `Redux` or Context API for state management. This decision was made because Zustand offers a much simpler, hook-based API with minimal boilerplate, which perfectly suits the rapid development and localized state needs of this mocked CRM dashboard without introducing unnecessary overhead.
