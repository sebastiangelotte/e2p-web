import React from 'react'
import { Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'


const HomepageSection = (props) => {
    const pitchIsInverted = props.data.theme === 'white' ? false : true

    return (
        <div className={`background--${props.data.theme}`}>
            <section className="section section--grid section--center-content">
                <div className="section__column">
                    <div className={`pitch pitch--centered ${pitchIsInverted ? 'pitch--inverted': ''}`}>
                        <h2 className="pitch__heading">
                            {props.data.heading}
                        </h2>
                        <p className="pitch__text">
                            {documentToReactComponents(props.data.description.json)}
                        </p>
                        {props.data.buttonLink && props.data.buttonText ? (
                            <Link to={props.data.buttonLink}>
                                <button className="button button--white">
                                    <i className="fas fa-arrow-right"></i>&nbsp;
                                    {props.data.buttonText}
                                </button>
                            </Link>
                        ) : ''}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomepageSection
