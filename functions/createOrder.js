const AsyncAirtable = require("asyncairtable")

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const { email, name, course, date } = body.data.object.metadata
  console.log("BODY:", body.data.object.metadata)
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
      // Date: date,
      // Created: Date.now(),
      // PaymentMethod: "Card",
      // Status: "Completed",
      User: [userId],
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
    createOrder(existingUsers[0].id)
  } else {
    const newUser = await createUser()
    createOrder(newUser.id)
  }

  return {
    statusCode: 200,
  }
}
