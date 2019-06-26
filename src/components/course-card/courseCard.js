import React from 'react'
import { Link } from 'gatsby'

import {
  Item,
  Button,
  Icon,
  Label,
  Rating
} from 'semantic-ui-react'

const style = {
  link: {
    display: 'block'
  }
}

const CourseCard = (props) => {
    return (
      <Item>
        {/* <span>{props.data.date}</span> */}
        <Item.Content>
          <Item.Header as='a'>{props.data.title}</Item.Header>
          <Item.Meta>
            <span>Göteborg</span>
          </Item.Meta>
          {/* <Item.Description>{paragraph}</Item.Description> */}
          <Item.Extra>
            <Link style={style.link} to={`/courses/${props.data.slug}`}>
              <Button content="Läs mer" icon="arrow right" labelPosition="left" floated='right' />
            </Link>
            <Label basic>{props.data.numberOfDays} dag{props.data.numberOfDays > 1 ? 'ar' : ''}</Label>
            <Label as='a' basic image>
              <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              {props.data.courseLeader.name}
            </Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    )
}

export default CourseCard
