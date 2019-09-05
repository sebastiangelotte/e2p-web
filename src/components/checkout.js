// import React from "react"

// // hardcoded amount (in US cents) to charge users
// // you could set this variable dynamically to charge different amounts
// const amount = 2500

// // Below is where the checkout component is defined.
// // It has several functions and some default state variables.
// const Checkout = class extends React.Component {
//   state = {
//     disabled: false,
//     buttonText: "Köp",
//     paymentMessage: "",
//   }

//   resetButton() {
//     this.setState({ disabled: false, buttonText: "Köp" })
//   }

//   componentDidMount() {
//     this.stripeHandler = window.StripeCheckout.configure({
//       // You’ll need to add your own Stripe public key to the `checkout.js` file.
//       // key: 'pk_test_STRIPE_PUBLISHABLE_KEY',
//       key: "pk_test_iMg3jrAGkCY8LZezFr9ndteq",
//       closed: () => {
//         this.resetButton()
//       },
//     })
//   }

//   openStripeCheckout(event) {
//     event.preventDefault()
//     this.setState({ disabled: true, buttonText: "WAITING..." })
//     this.stripeHandler.open({
//       name: "Webinar:",
//       amount: amount,
//       description: "Att leda utan att vara chef",
//       token: token => {
//         fetch(
//           `https://b8ohp90348.execute-api.us-east-1.amazonaws.com/dev/checkout`,
//           {
//             method: "POST",
//             mode: "no-cors",
//             body: JSON.stringify({
//               token,
//               amount,
//             }),
//             headers: new Headers({
//               "Content-Type": "application/json",
//             }),
//           }
//         )
//           .then(res => {
//             console.log("Transaction processed successfully")
//             this.resetButton()
//             this.setState({ paymentMessage: "Betalning lyckades!" })
//             return res
//           })
//           .catch(error => {
//             console.error("Error:", error)
//             this.setState({ paymentMessage: "Betalning misslyckades" })
//           })
//       },
//     })
//   }

//   render() {
//     return (
//       <button
//         className="button"
//         onClick={event => this.openStripeCheckout(event)}
//         disabled={this.state.disabled}
//       >
//         {this.state.buttonText}
//       </button>
//     )
//   }
// }

// export default Checkout
