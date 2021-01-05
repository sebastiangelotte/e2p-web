const airtable = require("airtable")

exports.handler = async event => {
  airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: process.env.AIRTABLE_API_KEY,
  })

  const base = airtable.base("appZSS4vS2rTk6XqG")

  // const body = JSON.parse(event.body)
  const { email, name } = {
    email: "aoa@pasd.se",
    name: "dsdsd",
  }

  const { course } = {
    course: "Testkurs",
  }

  base("Orders").create([
    {
      fields: {
        Course: course,
        Created: Date.now(),
        PaymentMethod: "Card",
        Status: "Completed",
      },
    },
  ])
  base("Users")
    .select({
      filterByFormula: `email = "${email}"`,
    })
    .eachPage(
      records => {
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
            err => {
              if (err) {
                console.log(err)
                return
              }
            }
          )
        }
      },
      (err, records) => {
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
