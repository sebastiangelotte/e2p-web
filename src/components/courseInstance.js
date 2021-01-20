import React, { useState } from "react"
import styled from "styled-components"
import { BsCalendar, BsClock, BsTag } from "react-icons/bs"
import { FaMapMarkerAlt } from "react-icons/fa"
import { SiZoom } from "react-icons/si"
import { Button } from "./styledComponents"
import Modal from "./modal"
import BookingForm from "../components/forms/bookingForm"
import CustomRequestForm from "../components/forms/customRequestForm"

const CourseInstance = ({ instance, course, customRequest }) => {
  const [showOpenSignupModal, setShowOpenSignupModal] = useState(false)

  return (
    <Wrapper>
      <Details>
        {customRequest ? <b>Företagsinternt:</b> : <b>Kurstillfälle:</b>}
        <Date title="Datum">
          <BsCalendar />
          {instance.date}
        </Date>
        {instance.online ? (
          <City title="Plats">
            <FaMapMarkerAlt />
            Online via <StyledSiZoom />
          </City>
        ) : (
          <City title="Plats">
            <FaMapMarkerAlt />
            {instance.city}
          </City>
        )}
        <Price title="Pris">
          <BsTag />
          {customRequest
            ? "Pris offereras"
            : Number(course.price).toLocaleString() + " SEK exkl. moms"}
        </Price>
        <Duration title="Längd">
          <BsClock /> {course.duration}
        </Duration>
      </Details>

      <BookButton onClick={() => setShowOpenSignupModal(true)}>
        {customRequest ? "Skicka förfrågan" : "Boka"}
      </BookButton>
      <Modal
        isOpen={showOpenSignupModal}
        closeModal={() => setShowOpenSignupModal(false)}
      >
        {customRequest ? (
          <CustomRequestForm course={course} instance={instance} />
        ) : (
          <BookingForm course={course} instance={instance} />
        )}
      </Modal>
    </Wrapper>
  )
}

export default CourseInstance

const Wrapper = styled.article`
  background-color: #fff;
  padding: 20px;
  border-radius: 18px;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(135, 146, 161, 0.16),
    0px 6px 41px rgba(135, 146, 161, 0.11);
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Details = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Date = styled.time`
  font-style: normal;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 24px;
`

const City = styled.address`
  font-style: normal;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 24px;
`

const Price = styled.span`
  font-style: normal;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 24px;
`

const Duration = styled.span`
  font-style: normal;
  display: flex;
  align-items: center;
  gap: 7px;
  height: 24px;
`

const BookButton = styled(Button)`
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border: none;
  font-size: 15px;
  font-weight: bold;
  padding: 5px 15px;
  margin-bottom: 0;
  width: 100%;
`

const StyledSiZoom = styled(SiZoom)`
  font-size: 46px;
`
