# CREATE STUDIO

A modern, high-performance portfolio and services website for a creative design studio. Built with Next.js, React, and Three.js for immersive 3D experiences.

## 🚀 Features

- **Next.js 16** - Latest React framework with App Router
- **3D Graphics** - React Three Fiber for interactive 3D elements
- **Smooth Animations** - GSAP for fluid motion and transitions
- **Modern UI** - Tailwind CSS with shadcn components
- **Responsive Design** - Mobile-optimized experience
- **Performance Optimized** - Vercel Analytics and Speed Insights
- **TypeScript** - Type-safe development

## 📋 Services

- App Development
- Branding & Design
- Website Development
- Digital Marketing
- AI Video Production
- Social Media Management
- Influencer Marketing
- Creative Strategy & Growth
- Design Consultation

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.9
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4.3.2
- **3D**: Three.js, React Three Fiber
- **Animation**: GSAP 3.15.0, Motion
- **Components**: Radix UI, shadcn
- **Language**: TypeScript

## 📦 Installation

### Prerequisites
- Node.js 18+ (npm or yarn)

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/aptruminds/createstudio.git
cd createstudio/site-next
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 🏗️ Project Structure

```
site-next/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── preview/           # Preview routes
├── components/            # React components
│   ├── Section*.tsx       # Page sections
│   ├── ui/                # UI components
│   └── archive/           # Archived components
├── public/                # Static assets
│   ├── services/          # Service icons & videos
│   ├── work/              # Portfolio images
│   └── team/              # Team photos
├── lib/                   # Utilities
├── package.json
└── tsconfig.json
```

## 🎨 Key Components

- **Section1Hero** - Hero/landing section with animations
- **Section2Gallery** - Image gallery with hover effects
- **Section3ServicesGrid** - Services showcase
- **Section4Showreel** - Video showreel section
- **Section7Pricing** - Pricing plans
- **Section8Contact** - Contact form
- **3D Components** - Interactive 3D elements (Gallery, Cards, Frames)

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

The project includes Vercel Analytics and Speed Insights for performance monitoring.

## 📝 Environment Variables

Create a `.env.local` file if needed for any API endpoints or analytics.

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

### Code Quality
- TypeScript for type safety
- ESLint configuration available
- Tailwind CSS for consistent styling

## 📄 License

Private repository.

## 👥 Contributors

- Ayush Pathak (ayush.pathak@truminds.com)

---
