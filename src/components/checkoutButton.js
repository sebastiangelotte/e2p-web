import React from "react"
import { API } from "aws-amplify"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe("pk_test_iMg3jrAGkCY8LZezFr9ndteq")

const CheckoutButton = ({ email, priceId }) => {
  const redirectToCheckout = async () => {
    const fetchSession = async () => {
      const apiName = "stripeREST"
      const apiEndpoint = "/checkout"
      const body = {
        quantity: 1,
        client_reference_id: email || "test@test.se",
        priceId: priceId,
      }
      const session = await API.post(apiName, apiEndpoint, { body })
      return session
    }

    const session = await fetchSession()
    const sessionId = session.id
    const stripe = await stripePromise
    console.log("sessionID", session)
    stripe.redirectToCheckout({ sessionId })
  }

  return <button onClick={redirectToCheckout}>Continue to payment</button>
}

export default CheckoutButton
