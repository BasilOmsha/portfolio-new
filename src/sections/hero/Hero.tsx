import Experience from '@/components/models/hero-experience/Experience.tsx'

import './hero.css'

function Hero() {
    return (
        <>
            <section id="hero" className="hero_section">
                <div className="hero_background"></div>
                <div className="hero_text">
                    <h1>Welcome to the Nature Experience</h1>
                    <p>Explore the beauty of nature through this interactive 3D models.</p>
                </div>
                {/* model section */}
                <div className="hero_model_section">
                    <Experience />
                </div>
            </section>
        </>
    )
}

export default Hero
