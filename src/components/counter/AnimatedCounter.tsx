import CountUp from 'react-countup'

import { counterItems } from '@/constants'
import './AnimatedCounter.css'

export function AnimatedCounter() {
    return (
        <div id="counter" className="animated-counter">
            <div className="counter-grid">
                {counterItems.map((item) => (
                    <div key={item.label} className="counter-card">
                        <div className="counter-number">
                            <CountUp suffix={item.suffix} end={item.value} />
                        </div>
                        <div className="counter-label">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
