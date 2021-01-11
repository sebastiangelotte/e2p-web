import React, { useState } from "react"
import styled from "styled-components"

const InvoiceForm = () => {
  const [showContactPerson, setShowContactPerson] = useState(false)
  return (
    <>
      <Section>
        <h3>Faktureringsinformation</h3>
        <input type="text" placeholder="Företag *" required />
        <input
          type="text"
          placeholder="Fakturaadress *"
          required
          name="fakturaadress"
        />
        <input
          type="text"
          placeholder="Postnummer *"
          required
          name="postnummer"
        />
        <input type="text" placeholder="Ort *" required name="ort" />
        <MutedButton
          onClick={e => {
            e.preventDefault()
            setShowContactPerson(true)
          }}
        >
          Annan kontaktperson?
        </MutedButton>
      </Section>
      {showContactPerson && (
        <>
          <Section>
            <h3>Kontaktperson</h3>
            <input type="text" placeholder="Namn" name="kontaktperson-namn" />
            <input
              type="email"
              placeholder="E-post"
              name="kontaktperson-epost"
            />
            <input type="text" placeholder="Postnummer" />
            <input type="text" placeholder="Ort" name="kontaktperson-ort" />
          </Section>
        </>
      )}
    </>
  )
}

export default InvoiceForm

const MutedButton = styled(Button)`
  width: 100%;
  background-color: #1a1a1a;
  padding: 8px 10px;
`
