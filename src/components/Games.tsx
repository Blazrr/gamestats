import React from 'react'
import League from './GameCards/League'
import Apex from './GameCards/Apex'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { AnimatePresence,motion } from 'framer-motion'
import { user } from 'utils/user'
import Valorant from './GameCards/Valorant'


type Props = {
  user:user
}

const Games = ({user}: Props) => {
  console.log(user);

  return (
    <AnimatePresence>

    <motion.div className="flex items-center justify-center mt-16 gap-4 flex-col"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} 
    >
    {user.lol != null && <League user={user} showDiv={false} />}
    {user.apex != null && <Apex showDiv={false} user={user} />}
    {user.valorant != null && <Valorant user={user} />}
  </motion.div>
    </AnimatePresence>
  )
}

export default Games