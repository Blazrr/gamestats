import Link from 'next/link'
import React from 'react'
import {FaGithubSquare, FaLinkedin} from "react-icons/fa"
import GlitchedTitle from '../Commons/GlitchedTitle'
import Navbar from '../Navbar/Navbar'
import { useRouter } from 'next/router'

type Props = {}

const Footer = (props: Props) => {
    const router = useRouter().route;
  return (
    <div className='bg-[#1A202C] !w-full absolute !bottom-0  left-0  p-8 flex justify-between items-center'>
        <div>
            <Link href="/Contact" className='btn'>Contact Us</Link>
        </div>
        <div>
            <h2 className='text-3xl font-semibold'>Geekard</h2>
        </div>
        <div className='flex flex-col justify-center items-center'>
            <span>Socials</span>
            <ul className='flex  items-center justify-center space-x-6 mt-4'>
                <Link href='https://www.linkedin.com/in/samielm/'><FaLinkedin className='h-10 w-10 hover:scale-110 transition-all '/></Link>
                <Link href="https://github.com/Blazrr"><FaGithubSquare className='h-10 w-10 hover:scale-110 transition-all' /> </Link>
            </ul>
        </div>
    </div>
  )
}

export default Footer