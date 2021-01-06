const AsyncAirtable = require("asyncairtable")

exports.handler = async event => {
  const body = JSON.parse(event.body)
  console.log("BODY:", body)
  const asyncAirtable = new AsyncAirtable(
    process.env.AIRTABLE_API_KEY,
    "appZSS4vS2rTk6XqG",
    {
      endpointUrl: "https://api.airtable.com",
    }
  )

  const { email, name } = {
    email: "555@99999.se",
    name: "dsdsd",
  }

  const { course } = {
    course: "Testkurs",
  }

  const existingUsers = await asyncAirtable.select(
    "Users",
    {
      where: { email: email },
    },
    1 // page 1
  )

  const userExists = existingUsers.length !== 0

  const createOrder = async userId => {
    await asyncAirtable.createRecord("Orders", {
      Course: course,
      Created: Date.now(),
      PaymentMethod: "Card",
      Status: "Completed",
      User: [userId],
    })
  }

  const createUser = async () => {
    return await asyncAirtable.createRecord("Users", {
      Email: email,
      Name: name,
    })
  }

  if (userExists) {
    createOrder(existingUsers[0].id)
  } else {
    const newUser = await createUser()
    createOrder(newUser.id)
  }

  return {
    statusCode: 200,
  }
}
