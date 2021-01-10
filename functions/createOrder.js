const AsyncAirtable = require("asyncairtable")

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const {
    email,
    name,
    course,
    date,
    paymentMethod,
    company,
    address,
    zipCode,
    county,
  } = body.data?.object.metadata || body
  console.log("BODY:", body)
  const asyncAirtable = new AsyncAirtable(
    process.env.AIRTABLE_API_KEY,
    "appZSS4vS2rTk6XqG",
    {
      endpointUrl: "https://api.airtable.com",
    }
  )

  const existingUsers = await asyncAirtable.select(
    "Users",
    {
      where: { email: email },
    },
    1 // page 1
  )

  const userExists = existingUsers.length !== 0

  const createOrder = async userId => {
    console.log("Creating order with userId:", userId)
    await asyncAirtable.createRecord("Orders", {
      Course: course,
      Date: date,
      Created: Date.now(),
      PaymentMethod: paymentMethod,
      Status: "Completed",
      User: [userId],
      Company: company,
      Address: address,
      ZipCode: zipCode,
      County: county,
    })
  }

  const createUser = async () => {
    console.log("Creating user..")
    return await asyncAirtable.createRecord("Users", {
      Email: email,
      Name: name,
    })
  }

  if (userExists) {
    console.log("User already exists..")
    await createOrder(existingUsers[0].id)
  } else {
    const newUser = await createUser()
    await createOrder(newUser.id)
  }

  return {
    statusCode: 200,
  }
}
