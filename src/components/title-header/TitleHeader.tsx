import './TitleHeader.css'

export type TitleHeaderProps = {
    title: string
    // sub: string
}

function TitleHeader({ title }: TitleHeaderProps) {
    return (
        <div className="title-header-container">
            {/* <div className="hero-badge">
                <p>{sub}</p>
            </div> */}
            <div>
                <h1 className="title-text">{title}</h1>
            </div>
        </div>
    )
}

export default TitleHeader
