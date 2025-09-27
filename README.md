# Personal Portfolio

# Table of Content - **Contact Form** with reCAPTCHA protection and backend API integration
- [Personal Portfolio](#personal-portfolio)
- [Table of Content - **Contact Form** with reCAPTCHA protection and backend API integration](#table-of-content---contact-form-with-recaptcha-protection-and-backend-api-integration)
  - [Intro](#intro)
  - [Tech Overview](#tech-overview)
  - [Features](#features)
  - [Techniques](#techniques)
    - [3D Scene Architecture](#3d-scene-architecture)
    - [Animation System](#animation-system)
    - [Custom Shaders](#custom-shaders)
    - [Performance Optimization](#performance-optimization)
  - [Running the Application](#running-the-application)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
  - [What to Expect](#what-to-expect)
  - [Improvements and Future Features](#improvements-and-future-features)

## Intro
This is an immersive 3D portfolio website showcasing interactive experiences and modern web technologies. Built as a comprehensive demonstration of full-stack development capabilities, the portfolio combines cutting-edge 3D graphics with responsive design and engaging animations.

## Tech Overview
 - **React 18** with **TypeScript** for type-safe component development and modern React features
 - **Three.js** and **React Three Fiber (R3F)** for 3D rendering, scene management, and WebGL integration
 - **GSAP (GreenSock)** for high-performance animations and scroll-triggered effects
 - **Custom CSS** for component-specific styling and responsive design
 - **Vite** as the build tool for fast development and optimized production builds
 - **Blender** for 3D model creation, optimization, and asset preparation
 - **Custom GLSL shaders** for advanced material effects and visual enhanances
 - **ASP.NET Core backend** with Clean Architecture for contact form functionality
 - **React Hook Form** with **Zod** validation for form management
 - **React Google ReCAPTCHA v3** for spam protection
 - **Vercel Analytics** for performance monitoring and user insights

## Features
- **Interactive 3D Hero Section** with custom models and animated materials
- **Immersive Tech Stack Visualization** using floating 3D icons with physics
- **Animated Project Showcases** with detailed technology breakdowns
- **Professional Experience Timeline** with interactive cards and certifications
- **Contact Form** with reCAPTCHA protection and email integration
- **Responsive Design** optimized for desktop, tablet, and mobile devices
- **Custom Cursor Effects** for desktop users
- **Smooth Scroll Animations** using GSAP ScrollTrigger
- **Performance Optimized** with lazy loading and efficient rendering

## Techniques
The project follows modern web development practices with a focus on performance, accessibility, and user experience.

### 3D Scene Architecture
The 3D scenes are built using React Three Fiber with custom components for different experiences:

```typescript
// Hero Experience with nature scene and animated materials
<Canvas
    shadows
    camera={{ position: [0, 0, 8], fov: 42 }}
    gl={{ alpha: false, antialias: false }}
>
    <Experience />
    <ContactExperience />
</Canvas>
```

**Nature Scene Implementation:**
```typescript
// Custom shader material for animated fire effects
const fireMaterial = new ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new Color('#ff6030') },
        uColorEnd: { value: new Color('#1e3932') }
    },
    vertexShader: fireVertexShader,
    fragmentShader: fireFragmentShader
});
```

### Animation System
GSAP powers the scroll-triggered animations throughout the site:

```typescript
// Hero section animation timeline
const tl = gsap.timeline()
tl.from('.hero-title', { y: 100, opacity: 0, duration: 1 })
  .from('.hero-subtitle', { y: 50, opacity: 0, duration: 0.8 }, '-=0.5')
  .from('.hero-cta', { scale: 0, opacity: 0, duration: 0.6 }, '-=0.3');

// Scroll-triggered project animations
ScrollTrigger.create({
    trigger: '.project-chapter',
    start: 'top 80%',
    onEnter: () => animateProjectCard()
});
```

### Custom Shaders
The project includes several custom GLSL shaders for enhanced visual effects:

**Fire Shader (fragment.glsl):**
```glsl
varying vec2 vUv;
varying float vElevation;
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

void main() {
    float mixStrength = vElevation * 0.5 + 0.5;
    vec3 color = mix(uColorStart, uColorEnd, mixStrength);
    gl_FragColor = vec4(color, 1.0);
}
```

### Performance Optimization
- **Efficient 3D Rendering:** Optimized geometry and materials for smooth 60fps performance
- **Image Optimization:** WebP format with fallbacks for better loading times
- **Bundle Splitting:** Code splitting for reduced initial load time
- **Memory Management:** Proper cleanup of Three.js resources and event listeners

## Running the Application
Simply after cloning the repo or downloading the project, open the terminal and run:

```sh
cd portfolio-new # moves to project directory

yarn # downloads all the necessary packages

yarn dev # Runs the app on localhost:5174
```

For production build:
```sh
yarn build # Creates optimized production build

yarn preview # Preview the production build locally
```

## Environment Variables

Below are the environment variables required for the application:

| Environment Variable     | Description                  | Required |
| ------------------------ | ---------------------------- | -------- |
| `VITE_API_BASE_URL`      | Base URL for development API | Yes      |
| `VITE_API_PROD_BASE_URL` | Base URL for production API  | Yes      |
| `VITE_APP_SITE_KEY`      | Google reCAPTCHA v2 site key | Yes      |

Create `.env.development` and `.env.production` files in the root directory:

**`.env.development`:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_SITE_KEY=your_recaptcha_site_key_here
```

**`.env.production`:**
```env
VITE_API_PROD_BASE_URL=https://your-backend-api.com/api
VITE_APP_SITE_KEY=your_recaptcha_site_key_here
```

## Project Structure
```
src/
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
├── index.css                  # Global styles
├── types.d.ts                 # TypeScript type definitions
├── vite-env.d.ts             # Vite environment types
├── api/                       # API services
│   ├── contact-service.ts     # Contact form API service
│   └── index.ts              # Axios configuration
├── components/               # Reusable UI components
│   ├── contact/              # Contact form components
│   ├── counter/              # Animated counter components
│   │   ├── AnimatedCounter.css
│   │   └── AnimatedCounter.tsx
│   ├── glow-card/           # Interactive card components
│   │   ├── GlowCard.css
│   │   └── GlowCard.tsx
│   ├── loaders/             # Loading components
│   │   └── AdvancedLoader.tsx
│   ├── models/              # 3D models and experiences
│   │   ├── contact/         # Contact section 3D components
│   │   │   ├── Computer.tsx
│   │   │   └── ContactExperience.tsx
│   │   └── hero-experience/ # Hero section 3D components
│   │       ├── Experience.tsx
│   │       ├── ExperienceButton.tsx
│   │       ├── Nature.tsx
│   │       ├── boneFire/    # Fire effects
│   │       │   ├── Fire.tsx
│   │       │   ├── fire/
│   │       │   │   └── Fire.tsx
│   │       │   └── material/
│   │       │       └── Material.tsx
│   │       ├── materials/   # 3D materials
│   │       │   └── materials.tsx
│   │       ├── shaders/     # GLSL shaders
│   │       │   ├── fire/
│   │       │   │   ├── fragment.glsl
│   │       │   │   └── vertex.glsl
│   │       │   ├── includes/
│   │       │   │   ├── perlin2d.glsl
│   │       │   │   └── perlin3d.glsl
│   │       │   ├── pole-light/
│   │       │   │   ├── fragment.glsl
│   │       │   │   └── vertex.glsl
│   │       │   ├── portal/
│   │       │   │   ├── fragment.glsl
│   │       │   │   └── vertex.glsl
│   │       │   └── text/
│   │       │       ├── fragment.glsl
│   │       │       └── vertex.glsl
│   │       └── types/       # 3D component types
│   │           └── types.ts
│   ├── project-chapter/     # Project showcase components
│   │   └── ProjectChapter.tsx
│   ├── tech-icons/          # Technology icon components
│   │   ├── ASPDotNETCore.tsx
│   │   └── TechIconCardExperience.tsx
│   └── title-header/        # Title header component
│       ├── TitleHeader.css
│       └── TitleHeader.tsx
├── constants/               # Static data and configurations
│   └── index.ts
├── gsap/                   # Animation configurations
│   └── heroAnimation.ts
├── hooks/                  # Custom React hooks
│   └── useCollisionDetection.ts
├── schemas/                # Zod validation schemas
│   └── contactForm.ts
└── sections/               # Main page sections
    ├── contact/            # Contact form section
    │   ├── Contact.css
    │   └── Contact.tsx
    ├── experience/         # Professional timeline
    │   ├── Experience.css
    │   └── Experience.tsx
    ├── footer/             # Footer section
    │   ├── Footer.css
    │   └── Footer.tsx
    ├── hero/               # Hero section with 3D scene
    │   ├── hero.css
    │   └── Hero.tsx
    ├── nav-bar/            # Navigation bar
    │   ├── navbar.css
    │   └── NavBar.tsx
    ├── projects/           # Project showcase
    │   ├── Projects.css
    │   └── Projects.tsx
    └── tech-stack/         # 3D tech visualization
        ├── TechStack.css
        └── TechStack.tsx
```

## What to Expect
- **Immersive 3D Experience** with interactive hero section and animated nature scene
- **Responsive Design** that works seamlessly across all devices
- **Smooth Animations** powered by GSAP for engaging user interactions
- **Professional Portfolio** showcasing 6 major projects with detailed technology breakdowns
- **Interactive Tech Stack** with 3D floating icons representing different technologies
- **Comprehensive Experience Timeline** including education, certifications, and work history
- **Functional Contact Form** with spam protection and backend API integration
- **Performance Optimized** for fast loading and smooth 60fps 3D rendering

## Improvements and Future Features
- **Enhanced 3D Interactions** with physics-based animations and particle systems
- **Dark/Light Mode Toggle** for improved user preference support
- **Enhanced Accessibility** with screen reader optimizations and keyboard navigation
- **Performance** optimization for smoother experience across different browsers and devices