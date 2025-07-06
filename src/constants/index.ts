type NavLink = {
    name: string
    link: string
}

export const navLinks: NavLink[] = [
    {
        name: 'Work',
        link: '#work'
    },
    {
        name: 'Experience',
        link: '#experience'
    },
    {
        name: 'Skills',
        link: '#skills'
    },
    {
        name: 'Testimonials',
        link: '#testimonials'
    }
]

type WordItem = {
    text: string
    imgPath: string
}

export const words: WordItem[] = [
    { text: 'Ideas', imgPath: '/images/hero/ideas.svg' },
    { text: 'Concepts', imgPath: '/images/hero/concepts.svg' },
    { text: 'Designs', imgPath: '/images/hero/designs.svg' },
    { text: 'Code', imgPath: '/images/hero/code.svg' },
    { text: 'Ideas', imgPath: '/images/hero/ideas.svg' },
    { text: 'Concepts', imgPath: '/images/hero/concepts.svg' },
    { text: 'Designs', imgPath: '/images/hero/designs.svg' },
    { text: 'Code', imgPath: '/images/hero/code.svg' }
]
