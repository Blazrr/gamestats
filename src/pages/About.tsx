import { AnimatePresence,motion } from 'framer-motion'
import React from 'react'

type Props = {}

const About = (props: Props) => {
  return (
    <AnimatePresence>
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    >abohguft</motion.div>
    </AnimatePresence>
  )
}

export default About