const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const { name, priceId, image } = body
  const { currency, unit_amount: amount } = await stripe.prices.retrieve(
    priceId
  ) // get price from stripe to avoid scamz

  const session = await stripe.checkout.sessions.create({
    success_url: `https://www.easy2perform.se`,
    cancel_url: `https://www.easy2perform.se`,
    payment_method_types: ["card"],
    line_items: [
      {
        currency,
        amount,
        name,
        quantity: 1,
        images: [image],
      },
    ],
    mode: "payment",
  })

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  }
}