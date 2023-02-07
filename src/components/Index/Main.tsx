import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initUser } from "slices/userSlice";
import type { RootState } from "store";

type Props = {};

const Main = (props: Props) => {
  const user = useSelector((state: RootState) => state.user.value);
  const dispatch = useDispatch();
  const supabase = useSupabaseClient<any>();
  const session: any = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", session.user.id);
      if (data) {
        dispatch(initUser(data[0]));
      } else {
        alert(error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div>
      {user.full_name}
    </div>
  );
};

export default Main;
