# Personal Portfolio

# Table of Contents
- [Personal Portfolio](#personal-portfolio)
- [Table of Contents](#table-of-contents)
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
 - **Tailwind CSS 4** for utility-first styling and responsive design
 - **Vite** as the build tool for fast development and optimized production builds
 - **Blender** for 3D model creation, optimization, and asset preparation
 - **Custom GLSL shaders** for advanced material effects and visual enhancements
 - **EmailJS** for contact form functionality without backend dependencies
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
- **Lazy Loading:** Components and assets loaded on demand
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

| Environment Variable       | Description                           | Required |
| -------------------------- | ------------------------------------- | -------- |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS service ID for contact form   | Yes      |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID for contact form  | Yes      |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS public key for authentication | Yes      |
| `VITE_RECAPTCHA_SITE_KEY`  | Google reCAPTCHA v3 site key          | Yes      |

Create a `.env.local` file in the root directory:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
```

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── models/         # 3D models and experiences
│   ├── glow-card/      # Interactive card components
│   └── counter/        # Animated counter components
├── sections/           # Main page sections
│   ├── hero/          # Hero section with 3D scene
│   ├── projects/      # Project showcase
│   ├── experience/    # Professional timeline
│   ├── tech-stack/    # 3D tech visualization
│   └── contact/       # Contact form
├── constants/          # Static data and configurations
├── schemas/           # Zod validation schemas
├── hooks/             # Custom React hooks
├── gsap/              # Animation configurations
└── types.d.ts         # TypeScript type definitions
```

## What to Expect
- **Immersive 3D Experience** with interactive hero section and animated nature scene
- **Responsive Design** that works seamlessly across all devices
- **Smooth Animations** powered by GSAP for engaging user interactions
- **Professional Portfolio** showcasing 6 major projects with detailed technology breakdowns
- **Interactive Tech Stack** with 3D floating icons representing different technologies
- **Comprehensive Experience Timeline** including education, certifications, and work history
- **Functional Contact Form** with spam protection and email delivery
- **Performance Optimized** for fast loading and smooth 60fps 3D rendering
- **Accessibility Features** following WCAG guidelines for inclusive design

## Improvements and Future Features
- **Enhanced 3D Interactions** with physics-based animations and particle systems
- **Dark/Light Mode Toggle** for improved user preference support
- **Multi-language Support** for international accessibility
- **Blog Integration** for sharing development insights and tutorials
- **Advanced Analytics** for deeper user behavior insights
- **Progressive Web App (PWA)** features for offline functionality
- **Enhanced Accessibility** with screen reader optimizations and keyboard navigation
- **Performance Monitoring** with Core Web Vitals tracking
- **3D Model Compression** for even faster loading times
- **Interactive Project Demos** embedded within the portfolio
- **Advanced Shader Effects** for more stunning visual presentations
- **Voice Navigation** for accessibility and modern interaction patterns
