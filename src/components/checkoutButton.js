import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import getShareImage from "@jlengstorf/get-share-image"

const stripePromise = loadStripe("pk_test_iMg3jrAGkCY8LZezFr9ndteq") // publishable key, no worries

const CheckoutButton = ({ priceId, name, shortDescription, metadata }) => {
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
    cancelUrl: document.location.href, // back to previous page if error
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

  return <button onClick={redirectToCheckout}>Checkout</button>
}

export default CheckoutButton
