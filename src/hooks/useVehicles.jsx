import axios from 'axios'
import { useEffect, useState } from 'react'

export function useVehicles(){
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    getVehicles({ signal: controller.signal })
    return () => { controller.abort() }
  }, [])

  async function getVehicles({ signal } = {}){
    setLoading(true)
    return axios.get('vehicles', { signal })
      .then(response => {
        setVehicles(response.data.data)
      })
      .catch(() => {
        console.log('error fetching vehicles')
        // setVehicles(null)
      })
      .finally(() => setLoading(false))
  }

  return { vehicles, loading }
}