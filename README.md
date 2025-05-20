# Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js and Tailwind CSS. Features a fixed sidebar, smooth scrolling sections, and theme switching.

## Folder Structure

```
v2/
├── app/                      # Next.js app directory
│   ├── blog/                 # Blog detail page
│   │   └── page.tsx
│   ├── components/           # React components
│   │   ├── Blog.tsx          # Blog section component
│   │   ├── Education.tsx     # Education section component
│   │   ├── Experience.tsx    # Experience section component
│   │   ├── Projects.tsx      # Projects section component
│   │   ├── RippleButton.tsx  # Button with ripple effect
│   │   ├── Sidebar.tsx       # Fixed sidebar component
│   │   └── ThemeToggle.tsx   # Theme toggle component
│   ├── education/            # Education detail page
│   │   └── page.tsx
│   ├── experience/           # Experience detail page
│   │   └── page.tsx
│   ├── projects/             # Projects detail page
│   │   └── page.tsx
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── public/                   # Static assets
│   └── images/               # Image files
├── .gitignore
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Features

- Fixed sidebar with navigation
- Smooth scrolling between sections
- Light/dark theme toggle
- Animated page transitions
- Responsive design
- Snap scrolling
- Ripple effect on buttons

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd v2
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com).

1. Push your code to a GitHub repository
2. Import your project into Vercel
3. Vercel will detect that you're using Next.js and set up the build configuration for you
4. Your site will be deployed automatically

### Deploy to other platforms

To deploy to other platforms:

1. Build the application
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server
   ```bash
   npm run start
   # or
   yarn start
   ```

## Customization

- Edit the data in component files to add your own content
- Modify the color scheme in `tailwind.config.js`
- Add your own images to the `public/images` directory

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)