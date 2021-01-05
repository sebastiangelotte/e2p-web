const AsyncAirtable = require("asyncairtable")

exports.handler = async event => {
  const asyncAirtable = new AsyncAirtable(
    process.env.AIRTABLE_API_KEY,
    "appZSS4vS2rTk6XqG",
    {
      endpointUrl: "https://api.airtable.com",
    }
  )

  const { email, name } = {
    email: "aaaa11122aa999aoass@99999.se",
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
    1
  )

  const createOrder = async userId => {
    await asyncAirtable.createRecord("Orders", {
      Course: course,
      Created: Date.now(),
      PaymentMethod: "Card",
      Status: "Completed",
      User: [userId],
    })
  }

  if (existingUsers.length === 0) {
    const newUser = await asyncAirtable.createRecord("Users", {
      Email: email,
      Name: name,
    })
    const userId = newUser.id
    createOrder(userId)
  } else {
    const userId = existingUsers[0].id
    createOrder(userId)
  }

  return {
    statusCode: 200,
  }
}
