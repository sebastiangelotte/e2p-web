import React from "react"
import { Link } from "gatsby"

import { Item, Button, Label, Popup } from "semantic-ui-react"

import CourseLeader from "../course-leader/courseLeader"

const style = {
  link: {
    display: "block",
  },
  popup: {
    padding: 0,
  },
}

const CourseCard = props => {
  return (
    <Item>
      <Item.Content>
        <Item.Header>{props.data.title}</Item.Header>
        <Item.Extra>
          <Label basic>
            {props.data.numberOfDays} dag
            {props.data.numberOfDays > 1 ? "ar" : ""}
          </Label>
          <Popup
            trigger={
              <Label as="a" basic image>
                <img
                  alt={props.data.courseLeader.name}
                  src={props.data.courseLeader.image.fixed.src}
                />
                {props.data.courseLeader.name}
              </Label>
            }
            on="click"
            content={<CourseLeader data={props.data.courseLeader} />}
            style={style.popup}
          ></Popup>
          {props.data.tags &&
            props.data.tags.map(tag => {
              return <Label size="tiny">{tag}</Label>
            })}
        </Item.Extra>
        <Item.Meta>
          <Link style={style.link} to={`/courses/${props.data.slug}`}>
            <Button
              content="Läs mer"
              icon="arrow right"
              labelPosition="left"
              floated="right"
            />
          </Link>
        </Item.Meta>
      </Item.Content>
    </Item>
  )
}

export default CourseCard
