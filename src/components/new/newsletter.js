import React from "react"
import styled from "styled-components"
import bg from "../../images/newsletter-bg.svg"
import bubble1 from "../../images/bubble1.svg"
import bubble2 from "../../images/bubble2.svg"
import addToMailchimp from "gatsby-plugin-mailchimp"
import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({
    isVisible: false,
    header: "Ett meddelande",
    content: "",
  })

  const handleSubmit = event => {
    setIsLoading(true)
    event.preventDefault()
    addToMailchimp(email).then(data => {
      setIsLoading(false)
      setEmail(data)

      if (data.result === "success") {
        setMessage({
          isVisible: true,
          header: "Tack för din prenumeration!",
          content: "",
        })
      } else if (data.result === "error") {
        setMessage({
          isVisible: true,
          header: "Fel vid prenumeration.",
          content: "Försök igen.",
        })
      }

      document.getElementById("form-newsletter").reset() // reset form after submit
    })
  }

  const handleEmailChange = event => {
    setEmail(event.currentTarget.value)
  }

  return (
    <Wrapper>
      <Inner>
        <Heading>Prenumerera på vårt nyhetsbrev</Heading>
        <Form id="form-newsletter" onSubmit={handleSubmit}>
          <Input
            placeholder="Din e-mail"
            type="email"
            name="email"
            onChange={handleEmailChange}
          />
          <Button type="submit">{isLoading ? "Skickar..." : "Skicka"}</Button>
        </Form>
        <Text>
          Anmäl dig till vårt nyhetsbrev för smarta checklistor, enkla råd och
          tips.
        </Text>
        {message.isVisible && (
          <div>
            <h4>{message.header}</h4>
            <span>{message.content}</span>
          </div>
        )}
      </Inner>
    </Wrapper>
  )
}

export default Newsletter

const Wrapper = styled.section`
  padding: 102px 30px;
  color: #ffffff;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-image: url(${bubble1});
    background-position: left -250px bottom;
  }

  &:before {
    content: "";
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-image: url(${bubble2});
    background-position: right -380px top;

    @media screen and (max-width: 800px) {
      display: none;
    }
  }
`

const Inner = styled.div`
  max-width: 638px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`

const Heading = styled.h2`
  font-size: 48px;
  line-height: 60px;
  text-align: center;
  margin-bottom: 26px;

  @media screen and (max-width: 600px) {
    font-size: 35px;
  }
`

const Form = styled.form`
  margin-bottom: 19px;
  border-radius: 300px;
  background-color: #215edb;
  padding: 27px;
  display: flex;
  width: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const Input = styled.input`
  border: none !important;
  border-radius: 100px !important;
  flex-basis: 412px;
  margin-right: 26px;
  margin-bottom: 0 !important;
  padding: 18px 32px 14px 32px !important;
  font-size: 16px;

  &::placeholder {
    color: #c4c4c4;
  }

  @media screen and (max-width: 600px) {
    flex-basis: auto;
    margin-bottom: 15px !important;
    width: 100%;
    margin-right: 0;
  }
`

const Button = styled.button`
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border-radius: 100px;
  border: none;
  font-size: 16px;
  padding: 18px 45px 14px 45px;
  color: #ffffff;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const Text = styled.p`
  text-align: center;
  max-width: 388px;
  font-size: 16px;
  line-height: 125%;
`
