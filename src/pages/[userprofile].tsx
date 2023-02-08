import { supabase } from 'lib/supabaseClient'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    userData:any
}

const userprofile = ({userData}: Props) => {

    console.log(userData);

  return (
    <div>{userData[0].username} page</div>
  )
}


export const getServerSideProps: GetServerSideProps = async({params}) => {
    const userName = params?.userprofile

    const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("username", userName);
    return {
      props: {
       userData: data
      },
    }
  }


export default userprofile