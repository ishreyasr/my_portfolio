🚀 Shreyas Portfolio 2.0

A modern, interactive portfolio website built with Next.js 15, featuring stunning animations, smooth scrolling, and a unique preloader experience.

🌐 Live Demo

Visit the live site: shrey16.vercel.app

✨ Features

🎨 Visual Experience
- Animated Preloader: Mysterious symbol transitions with glitch effects and audio integration
- Smooth Scrolling: Enhanced with Lenis for buttery-smooth page transitions
- Custom Cursor: Interactive cursor with hover effects
- Particle Background: Dynamic particle system for visual appeal
- Scroll Progress Indicator: Real-time scroll progress visualization

🎯 Core Sections
- Hero Banner: Eye-catching introduction with animated elements
- About Me: Personal information and background
- Skills: Technical skills showcase with interactive elements
- Experience: Professional journey and achievements
- Projects: Portfolio of work with detailed descriptions
- Contact: Multiple ways to get in touch

🛠 Technical Features
- Responsive Design: Optimized for all device sizes
- Performance Optimized: Built with Next.js 15 for optimal performance
- TypeScript: Full type safety throughout the application
- GSAP Animations: Professional-grade animations and transitions
- Audio Integration: Background music with user controls
- Analytics: Google Analytics and Hotjar integration

🛠 Tech Stack

Frontend Framework
- Next.js 15 - React framework with App Router
- React 19 - Latest React features and improvements
- TypeScript - Type-safe development

Styling & UI
- Tailwind CSS - Utility-first CSS framework
- Tailwind CSS Animate - Animation utilities
- Lucide React - Beautiful icon library
- Class Variance Authority - Component variant management

Animations & Interactions
- GSAP - Professional animation library
- @gsap/react - React integration for GSAP
- Lenis - Smooth scrolling library

Development Tools
- ESLint - Code linting
- Prettier - Code formatting
- PostCSS - CSS processing
- SVGR - SVG to React component conversion

📦 Installation

Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

Setup Instructions

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd portfolio-2.0
   ```

2. Install dependencies
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Run the development server
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. Open your browser
   Navigate to http://localhost:3000

🚀 Deployment

Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

Manual Build
```bash
# Build the application
pnpm build

# Start the production server
pnpm start
```

📁 Project Structure

```
portfolio-2.0/
├── app/                    # Next.js App Router
│   ├── _components/       # Page-specific components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Preloader.tsx      # Animated preloader
│   ├── Navbar.tsx         # Navigation bar
│   ├── CustomCursor.tsx   # Custom cursor
│   └── ...               # Other components
├── public/               # Static assets
├── types/                # TypeScript type definitions
└── lib/                  # Utility functions
```

🎨 Customization

Colors & Themes
- Primary colors are defined in tailwind.config.ts
- Custom CSS variables in app/globals.css
- Font variables for Anton and Roboto Flex

Animations
- GSAP animations are configured in individual components
- Preloader effects can be customized in components/Preloader.tsx
- Particle system settings in components/ParticleBackground.tsx

Content
- Update personal information in respective component files
- Add projects in app/_components/ProjectList.tsx
- Modify skills in app/_components/Skills.tsx

📊 Performance

- Lighthouse Score: Optimized for performance, accessibility, and SEO
- Core Web Vitals: Excellent scores across all metrics
- Bundle Size: Optimized with Next.js built-in optimizations

🔧 Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm export       # Export static site

# Icons
pnpm svgr:icons   # Generate React components from SVGs
```

📈 Analytics & Monitoring

- Google Analytics: Track user behavior and performance
- Hotjar: Heatmaps and user session recordings
- Vercel Analytics: Built-in performance monitoring

🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

📄 License

This project is licensed under a Custom License - All Rights Reserved. See the LICENSE file for details.

Before copying, reproducing, or using any part of this portfolio (including design, code, animations, or content), you must:

1. Obtain explicit written consent from the creator (Shreyas R)
2. Provide proper attribution and creator credits in your project
3. Include a link back to the original portfolio: shrey16.vercel.app

Failure to comply with these requirements will result in the revocation of any granted permissions and may result in legal action.

For permission requests, contact: ishreyasr@gmail.com

📞 Contact

- Portfolio: shrey16.vercel.app
- GitHub: Your GitHub Profile
- LinkedIn: Your LinkedIn Profile

---

⭐ Star this repository if you found it helpful!