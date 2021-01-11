import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import getShareImage from "@jlengstorf/get-share-image"
import styled from "styled-components"
import { Button } from "./styledComponents"

const stripePromise = loadStripe("pk_test_iMg3jrAGkCY8LZezFr9ndteq") // publishable key, no worries

const CheckoutButton = ({
  priceId,
  name,
  shortDescription,
  metadata,
  children,
}) => {
  const image = getShareImage({
    title: name,
    tagline: shortDescription,
    cloudName: "e2p",
    imagePublicID: "product-image",
    titleFont: "Lato",
    taglineFont: "Lato",
    textColor: "11033E",
    textAreaWidth: 631,
    textLeftOffset: 54,
    titleFontSize: 50,
    taglineFontSize: 34,
    titleBottomOffset: 320,
    taglineTopOffset: 520,
    imageWidth: 800,
    imageHeight: 800,
    titleExtraConfig: "_bold",
  })

  const data = {
    successUrl:
      typeof window !== "undefined"
        ? window.location.origin + "/orderConfirmation"
        : null,
    cancelUrl: typeof window !== "undefined" ? window.location.href : null, // back to previous page if error
    name,
    priceId,
    image,
    metadata,
  }

  const redirectToCheckout = async () => {
    const response = await fetch("/.netlify/functions/createCheckout", {
      method: "POST", // needed to be able to send a body
      body: JSON.stringify(data),
    }).then(res => res.json())
    const stripe = await stripePromise
    stripe.redirectToCheckout({ sessionId: response.id })
  }

  return <StyledButton onClick={redirectToCheckout}>{children}</StyledButton>
}

export default CheckoutButton

const StyledButton = styled(Button)`
  background: linear-gradient(180deg, #fbc917 0%, #ff8364 100%);
  border: none;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 10px;
  width: 100%;
  font-size: 17px;
`
