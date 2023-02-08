import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initUser } from "slices/userSlice";
import type { RootState } from "store";
import Header from "./Header";

type Props = {};

const Main = (props: Props) => {

  return (
    <div>
      <Header/>
    </div>
  );
};

export default Main;
