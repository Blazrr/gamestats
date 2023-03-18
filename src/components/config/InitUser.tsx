import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from 'lib/supabaseClient';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initUser } from 'slices/userSlice';
import { RootState } from 'store';

type Props = {}

const InitUser = (props: Props) => {
    const dispatch = useDispatch();
    const session = useSession();
    const user = useSelector((state: RootState) => state.user.value);
    useEffect(() => {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", session?.user.id);
        if (data) {
          dispatch(initUser(data[0]));
        }
        if (error) {
        }
      };
      if (user.username == undefined ) {
        fetchData();
      }
    }, [session,[]]);
  
  return (
    <div></div>
  )
}

export default InitUser