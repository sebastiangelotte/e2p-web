import React, { useRef } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { MdClose } from "react-icons/md"
import useClickOutside from "../hooks/useClickOutside"
import { ScaleBox } from "./scaleBox"

const Modal = ({ children, closeModal, isOpen }) => {
  const innerElement = useRef()

  useClickOutside(innerElement, () => {
    isOpen && closeModal()
  })

  return (
    isOpen &&
    createPortal(
      <Overlay>
        <ScaleBox>
          <Inner ref={innerElement}>
            <ScrollInner>
              <CloseButton onClick={closeModal} />
              {children}
            </ScrollInner>
          </Inner>
        </ScaleBox>
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
  background-color: #f2f9ff;
  padding: 30px 0 20px 20px;
  border-radius: 16px;
  position: relative;
  height: 90vh;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
`

const ScrollInner = styled.div`
  overflow: auto;
  height: 100%;
  padding: 1px 20px 1px 1px;
`

const CloseButton = styled(MdClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  padding: 3px;
  background-color: var(--color-heading);
  border-radius: 50%;
  color: #fff;
`
