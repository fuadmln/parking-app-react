import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner'
import { useVehicles } from '@/hooks/useVehicles'
import { useZones } from '@/hooks/useZones'
import { useParking } from '@/hooks/useParking'

function OrderParking(){
  const navigate = useNavigate()
  const { startParking, errors, loading } = useParking()
  const { zones } = useZones()
  const { vehicles } = useVehicles()
  const [vehicle_id, setVehicleId] = useState()
  const [zone_id, setZoneId] = useState()

  useEffect(() => setVehicleId(vehicles[0]?.id), [vehicles])
  useEffect(() => setZoneId(zones[0]?.id), [zones])

  async function handleSubmit(e){
    e.preventDefault()

    await startParking({ vehicle_id, zone_id })
  }
  
  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Order Parking</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="vehicle_id" className="required">Vehicle</label>
          <select
            name="vehicle_id"
            id="vehicle_id"
            className="form-input"
            value={ vehicle_id }
            disabled={ loading }
            onChange={ e => setVehicleId(e.target.value) }
          >
            { vehicles.length > 0 && vehicles.map(vehicle => (
              <option key={ vehicle.id } value={ vehicle.id }>
                { vehicle.plate_number.toUpperCase() } { ' '}
                { vehicle.description && '('+vehicle.description+')' }
              </option>
            ))
            }
          </select>
          <ValidationError errors={ errors } field="vehicle_id" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="zone_id" className="required">Zone</label>
          <select
            name="zone_id"
            id="zone_id"
            className="form-input"
            value={ zone_id }
            disabled={ loading }
            onChange={ (e) => setZoneId(e.target.value) }
          >
            { zones.length > 0 && zones.map((zone) => (
              <option key={ zone.id } value={ zone.id }>
                { zone.name }{' '}
                { `Rp.${zone.price_per_hour}/h` }
              </option>
            )) }
          </select>
          <ValidationError errors={ errors } field="zone_id" />
          <ValidationError errors={ errors } field="general" />
        </div>

        <div className="border-t h-[1px] my-6"></div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={ loading }
          >
            { loading && <IconSpinner /> }
            Start Parking
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            disabled={ loading }
            onClick={ () => navigate(route('parkings.active')) }
          >
            Cancel
          </button>
        </div>

      </div>
    </form>
  )
}

export default OrderParking