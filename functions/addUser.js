const airtable = require("airtable")

exports.handler = async event => {
  airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  })

  const base = airtable.base("appZSS4vS2rTk6XqG")

  // const body = JSON.parse(event.body)
  const { email, name } = {
    email: "Gustaff@pasd.se",
    name: "Gustaff Wasa",
  }

  const { course } = {
    course: "Testkurs",
  }

  function getUserRecords() {
    return new Promise((resolve, reject) => {
        base("Users")
      .select({
        filterByFormula: `email = "${email}"`,
      })
      .firstPage(
        (err, records) => {
          if (err) {
            reject(err)
          }
          resolve(records)
        }
      )
    })
  }
  
  function createUser() {
    return new Promise((resolve, reject) => {
      base("Users").create(
        [
          {
            fields: {
              Email: email,
              Name: name,
            },
          },
        ],
        (err, records) => {
          if (err) {
            console.log("Error creating user")
            console.log(err)
            reject(err)
          }
          if (records.length === 0) {
            console.log("Records.length is 0 after creating new user")
            reject(err)
          }
          record = records[0]
          userId = record.getId()
  
          resolve(userId)
        }
      )
    })
  }

  const createOrder = async userId => {
    await base("Orders").create([
      {
        fields: {
          Course: course,
          Created: Date.now(),
          PaymentMethod: "Card",
          Status: "Completed",
          User: [userId],
        },
      },
    ])
  }
  
  records = await getUserRecords()
  if (records.length === 0) {
    // if user doesn't exist, create it
    const userId = await createUser()
    if (!userId) {
      return
    }
  }
  else {
    const record = records[0]
    const userId = records.getId()
  }

  await createOrder(userId)

  return {
    statusCode: 200,
  }
}
