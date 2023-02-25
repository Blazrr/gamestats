import { supabase } from 'lib/supabaseClient';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeUser } from 'slices/userSlice';
import { RootState } from 'store';

type Props = {}

const SetColor = (props: Props) => {
    const user = useSelector((state: RootState) => state.user.value);
    const dispatch = useDispatch()
    const [color,setColor] = useState(user.background)

    const submitColor = async(e:string) => {
        setColor(e)
        console.log(e);
        const { error } = await supabase
        .from("profiles")
        .update({ background:  e  })
        .eq("id", user.id);
      dispatch(
        changeUser({
          ...user,
          background:  e ,
        })
      );
    }

  return (
    <div className='flex gap-2 items-center justify-center mt-8'>
        <div className={`h-12 w-12 rounded-full purpink  ${color == "purpink" && "border-2 border-white" }`} onClick={() => submitColor("purpink")}></div>
        <div className={`h-12 w-12 rounded-full bblue ${color == "bblue" && "border-2 border-white" }`} onClick={() => submitColor("bblue")}></div>

    </div>
  )
}

export default SetColor