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

type CounterIntems = {
    value: number
    suffix: string
    label: string
}

export const counterItems: CounterIntems[] = [
    {
        value: 3,
        suffix: '+',
        label: 'Years of Learning and Building'
    },
    // {
    //     value: 0,
    //     suffix: '+',
    //     label: 'Clients Yet. Looking forward to that first win!'
    // },
    {
        value: 30,
        suffix: '+',
        label: 'Personal, Professional & Academic Projects Completed'
    },
    {
        value: 110,
        suffix: '%',
        label: 'Commitment to Learning and Improving'
    }
]

type IconItem = {
    imgPath: string
}

export const logoIconsList: IconItem[] = [
    {
        imgPath: '/images/logos/company-logo-1.png'
    },
    {
        imgPath: '/images/logos/company-logo-2.png'
    },
    {
        imgPath: '/images/logos/company-logo-3.png'
    },
    {
        imgPath: '/images/logos/company-logo-4.png'
    },
    {
        imgPath: '/images/logos/company-logo-5.png'
    },
    {
        imgPath: '/images/logos/company-logo-6.png'
    },
    {
        imgPath: '/images/logos/company-logo-7.png'
    },
    {
        imgPath: '/images/logos/company-logo-8.png'
    },
    {
        imgPath: '/images/logos/company-logo-9.png'
    },
    {
        imgPath: '/images/logos/company-logo-10.png'
    },
    {
        imgPath: '/images/logos/company-logo-11.png'
    }
]
