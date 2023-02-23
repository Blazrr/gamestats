import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initUser } from "slices/userSlice";
import type { RootState } from "store";
import Header from "./Header";
import Card from "./Card";

type Props = {};

const Main = (props: Props) => {
  return (
    <div>
      <Header/>
      <div className="mt-12 flex justify-center">
      <Card/>
      </div>
    </div>
  );
};

export default Main;
