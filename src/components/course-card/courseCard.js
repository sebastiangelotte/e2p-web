import React from 'react'
import { Link } from 'gatsby'

const CourseCard = (props) => {
    return (
      <Link to={`/courses/${props.data.slug}`} className="course-card ">
        <div className="course-card__inner">
          <div className="course-card__date">
            <span>{props.data.date}</span>
          </div>
          <div className="course-card__info">
            <div className="course-card__title">
            <h3>{props.data.title}</h3>
            </div>
            <div className="course-card__duration">
              Längd: {props.data.numberOfDays} dagar
            </div>
            <div className="course-card__location">
              Ort: Göteborg
            </div>
          </div>
          <div className="course-card__price">
            Pris: {props.data.price} kr
          </div>
        </div>
    </Link>
    )
}

export default CourseCard
