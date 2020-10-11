import React, { useRef } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { MdClose } from "react-icons/md"
import useClickOutside from "../../hooks/useClickOutside"

const Modal = ({ children, closeModal, isOpen }) => {
  const innerElement = useRef()

  useClickOutside(innerElement, () => {
    isOpen && closeModal()
  })

  return (
    isOpen &&
    createPortal(
      <Overlay>
        <Inner ref={innerElement}>
          <ScrollInner>
            <CloseButton onClick={closeModal} />
            {children}
          </ScrollInner>
        </Inner>
      </Overlay>,
      document.getElementById("modal")
    )
  )
}

export default Modal

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Inner = styled.div`
  background-color: #fff;
  padding: 60px 0 20px 20px;
  height: 100%;
  border-radius: 16px;
  position: relative;
  width: 100%;
  max-width: 400px;
  max-height: 700px;
  overflow: hidden;
`

const ScrollInner = styled.div`
  overflow: auto;
  height: 100%;
  padding-right: 20px;
`

const CloseButton = styled(MdClose)`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
`

