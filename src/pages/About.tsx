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
    className='w-4/5 mx-auto'
    >
      <h3 className='text-center text-5xl font-bold mt-8'>About GeeKard</h3>
      <p className='mt-12 text-xl'>
      Our site is like Linktree, but designed specifically for gamers. It&apos;s a one-stop-shop for all your gaming-related links, allowing you to easily share your social media profiles, Twitch channel, YouTube videos, Discord server, and more with your audience. Whether you&apos;re a casual streamer or a professional esports player, our site provides a customizable hub where you can showcase all your gaming content in one place. With our easy-to-use interface, you can create a personalized page that reflects your unique style and brand. Plus, our site is mobile-friendly, so your followers can access your links on-the-go. So why juggle multiple links when you can have them all in one convenient location? Join our community of gamers today and level up your online presence!
      </p>
    </motion.div>
    </AnimatePresence>
  )
}

export default About