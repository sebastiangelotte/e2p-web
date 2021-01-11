import React, { useMemo, useContext } from "react"

import { IntersectionContext } from "./intersectionObserver"
import { motion } from "framer-motion"

export const ScaleBox = ({
  children,
  delayOrder, // order of appearance
  duration = 0.25,
  easing = [0.42, 0, 0.58, 1],
}) => {
  const { inView } = useContext(IntersectionContext)
  const transition = useMemo(
    () => ({
      duration,
      delay: delayOrder / 5,
      ease: easing,
    }),
    [duration, delayOrder, easing]
  )

  const variants = {
    hidden: {
      y: "10px",
      opacity: 0,
      transition,
    },
    show: {
      y: "0px",
      opacity: 1,
      transition,
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  )
}
