import Experience from '@/components/models/hero-experience/Experience.tsx'

function Hero() {
    return (
        <>
            <div className="hero_section">
                <div className="hero_text">
                    <h1>Welcome to the Nature Experience</h1>
                    <p>
                        Explore the beauty of nature through this interactive 3D models.
                    </p>
                </div>
                {/* model section */}
                <div className="hero_section">
                    <Experience />
                </div>
            </div>
        </>
    )
}

export default Hero