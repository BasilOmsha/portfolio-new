import { navLinks } from '@/constants'
import { useEffect, useState } from 'react'
import styles from './navbar.module.css'

function NavBar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            console.log('Scrolled:', isScrolled)
            setScrolled(isScrolled)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.notScrolled}`}>
            <div className={styles.inner}>
                <a className={styles.logo} href="#hero">
                    Basil Omsha | Dev Profile
                </a>
                <nav className={styles.desktop}>
                    <ul>
                        {navLinks.map(({ link, name }) => (
                            <li key={name} className={styles.navItem}>
                                <a href={link}>
                                    <span className={styles.navText}>{name}</span>
                                    <span className={styles.underline} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <a className={styles.contactBtn} href="#contact">
                    <div className={styles.contactInner}>
                        <span className={styles.contactText}>Contact me</span>
                    </div>
                </a>
            </div>
        </header>
    )
}

export default NavBar
