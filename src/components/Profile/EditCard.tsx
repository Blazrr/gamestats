import React from 'react'
import CurrCard from './CurrCard'
import SetColor from '../SetCard/SetColor'
import SetPeriph from '../SetCard/SetPeriph'
import SetApex from '../SetCard/SetApex'
import SetValorant from '../SetCard/SetValorant'
import { RootState } from 'store'
import { useSelector } from 'react-redux'
import SetGithub from '../SetCard/SetGithub'
type Props = {}

const EditCard = (props: Props) => {
    const user = useSelector((state: RootState) => state.user.value);

  return (
    <div>
         <h3 className="text-center text-3xl mt-6">
                    Edit your Game Cards
                  </h3>
                  <div className="mt-8 flex gap-6 flex-wrap items-center justify-center">
                    {/* <SetLeague showDiv={true} /> */}
                    <SetApex showDiv={true} />
                    <SetValorant showDiv={true} />
                  </div>
                  <h3 className="text-center text-3xl mt-6">
                    Edit your Setup Cards
                  </h3>
                  <SetPeriph />
                  <h3 className="text-center text-3xl mt-6">
                    Edit your Socials Color
                  </h3>
                  <div className="mt-8 flex gap-6 flex-wrap items-center justify-center">
                    <SetGithub/>
                  </div>
                  <h3 className="text-center text-3xl mt-6">
                    Edit your Card Color
                  </h3>
                  <SetColor />

                  <CurrCard user={user} />
    </div>
  )
}

export default EditCard