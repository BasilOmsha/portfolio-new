import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin)

export const expandHeroModelSection = (styles: Record<string, string>) => {
    if (window.innerWidth < 1280) return

    const heroModelSection = document.querySelector(`.${styles.hero_model_section}`) as HTMLElement
    const heroTextSection = document.querySelector(`.${styles.hero_text}`) as HTMLElement
    const heroLayoutSection = document.querySelector(`.${styles.hero_layout}`) as HTMLElement
    const heroTextRightSection = document.querySelector(`.${styles.hero_text_right}`) as HTMLElement

    const chars = document.querySelectorAll(`#${styles.chars}`) as NodeListOf<HTMLElement>
    const words = document.querySelectorAll(`#${styles.words}`) as NodeListOf<HTMLElement>

    if (!heroModelSection || !heroTextSection || !heroLayoutSection) return
    const splitLeft: SplitText = SplitText.create(chars, {
        type: 'lines, words, chars',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char'
    })

    const splitRight: SplitText = SplitText.create(words, {
        type: 'lines, words, chars',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char'
    })
    //Hero layout animation
    gsap.to(splitLeft.words, {
        x: -150,
        y: -80,
        opacity: 0,
        duration: 0.6,
        ease: 'power4.out',
        stagger: 0.07,
        onComplete: () => {
            // Hide the text section after the animation completes
            gsap.to(heroTextSection, {
                //x: -100,
                width: 0,
                padding: 0,
                opacity: 0,
                duration: 0.8,
                ease: 'sin.out'
            })
            gsap.to(heroModelSection, {
                // Animate the model section to expand
                width: '60%',
                alignSelf: 'start',
                duration: 0.8,
                ease: 'sin.out'
            })

            gsap.to(heroTextRightSection, {
                // Animate the right text section to expand
                display: 'flex',
                ease: 'sin.in',
                onComplete: () => {
                    gsap.to(words, {
                        // Animate the right text section
                        display: 'flex',
                        opacity: 1,
                        onStart: () => {
                            splitRight.words.forEach((word, i) => {
                                gsap.to(word, {
                                    opacity: 1,
                                    scrambleText: {
                                        text: word.textContent ?? '',
                                        chars: '01<div>[]{}#$@%&*=+^~</div>عربي|\\/アمイウغエオلカثキلクيケضコباسل',
                                        newClass: 'accent--text',
                                        revealDelay: 0.2,
                                        tweenLength: false
                                    },
                                    duration: 0.8,
                                    delay: i * 0.2,
                                    ease: 'power2.out'
                                })
                            })
                            gsap.fromTo(
                                splitRight.chars,
                                {
                                    opacity: 0,
                                    y: 20
                                },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.12,
                                    ease: 'power4.out',
                                    stagger: 0.08
                                }
                            )
                        }
                    })
                }
            })
        }
    })
}
