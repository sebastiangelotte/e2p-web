import React from "react"
import { Link } from "gatsby"

import { Item, Button, Label, Popup, Icon } from "semantic-ui-react"

import CourseLeader from "../course-leader/courseLeader"

const style = {
  popup: {
    padding: 0,
  },
}

const CourseCard = props => {
  return (
    <>
      {props.simple ? (
        <Item>
          <Item.Content>
            <Item.Header>{props.data.title}</Item.Header>
            <Item.Extra>
              {props.data.date && (
                <Label basic>
                  <Icon name="calendar alternate outline" />
                  {props.data.date}
                </Label>
              )}
              <Label basic>
                <Icon name="clock outline" />
                {props.data.numberOfDays} dag
                {props.data.numberOfDays > 1 ? "ar" : ""}
              </Label>
              <Label basic>
                <Icon name="map marker alternate" />
                {props.data.city}
              </Label>
              {props.data.courseLeader && (
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
              )}
            </Item.Extra>
            {!props.showFiles ? (
              <Item.Extra>
                {props.data.tags &&
                  props.data.tags.map((tag, index) => {
                    return (
                      <Label key={index} size="tiny" floated="left">
                        <Icon name="tag" />
                        {tag}
                      </Label>
                    )
                  })}
                <Link to={`/courses/${props.data.slug}`}>
                  <Button
                    content="Läs mer"
                    icon="arrow right"
                    labelPosition="right"
                    floated="right"
                  />
                </Link>
              </Item.Extra>
            ) : (
              <Item.Extra>
                <h4>Kursmaterial</h4>
                {props.data.courseMaterial &&
                  props.data.courseMaterial.map((item, index) => {
                    return (
                      <div key={index}>
                        <Icon name="download" />
                        <a
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          href={item.file.url}
                        >
                          {item.title}
                        </a>
                      </div>
                    )
                  })}
              </Item.Extra>
            )}
          </Item.Content>
        </Item>
      ) : (
        <Item>
          <Item.Content>
            <Item.Header>{props.data.title}</Item.Header>
            <Item.Extra>
              {props.data.date && (
                <Label basic>
                  <Icon name="calendar alternate outline" />
                  {props.data.date}
                </Label>
              )}
              <Label basic>
                <Icon name="clock outline" />
                {props.data.numberOfDays} dag
                {props.data.numberOfDays > 1 ? "ar" : ""}
              </Label>
              {props.data.city && (
                <Label basic>
                  <Icon name="map marker alternate" />
                  {props.data.city}
                </Label>
              )}
              {props.data.courseLeader && (
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
              )}
              {props.data.price && (
                <Label basic>
                  {Number(props.data.price).toLocaleString()} SEK exkl. moms
                </Label>
              )}
            </Item.Extra>
            <Item.Extra>
              {props.data.tags &&
                props.data.tags.map((tag, index) => {
                  return (
                    <Label key={index} size="tiny" floated="left">
                      <Icon name="tag" />
                      {tag}
                    </Label>
                  )
                })}
              <Link to={`/courses/${props.data.slug}`}>
                <Button
                  positive
                  content="Läs mer"
                  icon="arrow right"
                  labelPosition="right"
                  floated="right"
                />
              </Link>
            </Item.Extra>
          </Item.Content>
        </Item>
      )}
    </>
  )
}

export default CourseCard
