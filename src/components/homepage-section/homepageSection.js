import React from 'react'

const HomepageSection = (props) => {
    return (
        <div className="background--orange">
            <section className="section section--grid section--center-content">
                <div className="section__column">
                    <div className="pitch pitch--centered pitch--inverted">
                        <span className="pitch__pre-header">
                            Webinar:
                        </span>
                        <h2 className="pitch__heading">
                            {props.data.heading}
                        </h2>
                        <p className="pitch__text">
                            Utbildning i koncentrat - snabb &amp; effektiv kunskapsuppdatering
                        </p>
                        <a href={props.data.buttonLink}>
                            <button className="button button--white">
                                <i className="fas fa-arrow-right"></i>&nbsp;
                                {props.data.buttonText}
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomepageSection
