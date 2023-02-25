import { AnimatePresence ,motion} from 'framer-motion'
import React from 'react'
import { user } from 'utils/user'

type Props = {
  user:user
}

const Socials = ({user}: Props) => {
  return (
    <AnimatePresence>

    <motion.div className="flex items-center justify-center mt-16 gap-4 flex-col"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} 
    >
    <h1>Socials</h1>
  </motion.div>
    </AnimatePresence>
  )
}

export default Socials