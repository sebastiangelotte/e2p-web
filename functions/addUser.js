const airtable = require("airtable")

exports.handler = async event => {
  airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  })

  const base = airtable.base("appZSS4vS2rTk6XqG")

  // const body = JSON.parse(event.body)
  const { email, name } = {
    email: "aoa@pa123123ssd.se",
    name: "dsdsd",
  }

  const { course } = {
    course: "Testkurs",
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

  base("Users")
    .select({
      filterByFormula: `email = "${email}"`,
    })
    .firstPage(
      (err, records) => {
        if (records.length === 0) {
          // if user doesn't exist, create it
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
                console.log(err)
                return
              }
              createOrder(records[0].id)
            }
          )
        } else {
          createOrder(records[0].id)
        }
      },
      function (err, records) {
        if (err) {
          console.log(err)
          return
        }
      }
    )

  return {
    statusCode: 200,
  }
}
