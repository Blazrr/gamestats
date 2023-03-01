import { useEffect, useState } from "react";
import { LeagueProfile } from "utils/league";


const useFetch = (url:string) => {
    const [data, setData] = useState<unknown | null>(null)
    const [error, setError] = useState<unknown | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const fetchData = async() => {
            setLoading(true)    
            try{
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
                setLoading(false)
            }
            catch(error:unknown){
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    },[])

    return {loading, error, data}

}

export default useFetch