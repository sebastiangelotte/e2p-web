const AsyncAirtable = require("asyncairtable")

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const {
    email,
    name,
    course,
    // } = body.data?.object.metadata || body
  } = body
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

  const createRequest = async userId => {
    console.log("Creating request with userId:", userId)
    await asyncAirtable.createRecord("Booking", {
      Course: course,
      Created: Date.now(),
      User: [userId],
      Email: email,
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
    await createRequest(existingUsers[0].id)
  } else {
    const newUser = await createUser()
    await createRequest(newUser.id)
  }

  return {
    statusCode: 200,
  }
}
