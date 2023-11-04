import axios from 'axios'
import { useEffect, useState } from 'react'

function ParkingHistory(){
  const [parkings, setParkings] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    getParkingHistory({ signal: controller.signal })
    return () => controller.abort()
  }, [])

  async function getParkingHistory({ signal } = {} ){
    return axios.get('parkings/history', { signal })
      .then(response => setParkings(response.data.data))
      .catch(() => {})
  }

  return (
    <div className="flex flex-col mx-auto md:w-96 w-full">
      <h1 className="heading">Parking History</h1>

      <div className="flex flex-col gap-1">
        { parkings.length > 0 && parkings.map(parking => (
          <div key={ parking.id } className="flex flex-col p-2 border gap-1">
            <div className="plate text-2xl">
              { parking.vehicle.plate_number }
            </div>
            <div className="bg-gray-100 p-2">
              { parking.zone.name }{' '}
              { `Rp. ${parking.zone.price_per_hour}/h` }
            </div>
            <div>
              <div className="font-bold uppercase">from</div>
              <span className="font-mono">{ parking.start_time }</span>
            </div>
            <div className="flex items-top">
              <span className="pt-0.5">Rp. </span>
              <span className="text-2xl font-bold ml-auto">
                { parking.total_price }
              </span>
            </div>
            <button type="button" className="btn btn-secondary uppercase">
              view details
            </button>
          </div>
        )) }
      </div>
    </div>
  )
}

export default ParkingHistory