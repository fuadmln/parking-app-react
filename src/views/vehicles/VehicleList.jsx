import { Link } from 'react-router-dom'
import { route } from '@/routes'
import { useVehicles } from '@/hooks/useVehicles'
import { useVehicle } from '@/hooks/useVehicle'
import PropTypes from 'prop-types'

function VehicleList(){
  const { vehicles, loading: vehiclesLoading, getVehicles } = useVehicles()
  const { destroyVehicle, vehicle } = useVehicle()
  const destroyLoading =  vehicle.loading

  return (
    <div className="flex flex-col mx-auto md:w-96 w-full">
      <h1 className="heading">My Vehicles</h1>

      <Link to={ route('vehicles.create') } className="btn btn-primary">
        Add Vehicle
      </Link>

      <div className="border-t h-[1px] my-6"></div>

      <div className="flex flex-col gap-2">
        { vehiclesLoading ? (
          <div className="text-center text-gray-600">Loading vehicle...</div>
        ) : vehicles.length > 0 ? 
          vehicles.map(vehicle => (
            <VehicleItem
              key={ vehicle.id }
              vehicle={ vehicle }
              hooks={ {
                destroyVehicle, 
                destroyLoading,
                getVehicles,
              } }
            />
          )) : vehicles.length === 0 ? (
            <div className="text-center text-gray-600">No Vehicle yet</div>
          ) : (
            <div className="text-center text-red-500">Error fetching vehicles</div>
          )
        }
      </div>
    </div>
  )
}

function VehicleItem({ vehicle, hooks }){
  return(
    <div key={ vehicle.id } className="flex bg-gray-100 w-full p-2 justify-between">
      <div>
        <div className="text-xl plate">
          { vehicle.plate_number }
        </div>
        <div className="font-normal text-gray-600 pl-2 grow tuncrate">
          { vehicle.description }
        </div>
      </div>

      <div className="flex gap-1">
        <Link
          to={ route('vehicles.edit', { id: vehicle.id }) }
          className="btn btn-secondary text-sm"
        >
          Edit
        </Link>
        <button
          type="button"
          className="btn text-white bg-red-600 hover:bg-red-500 text-sm"
          disabled={ hooks.destroyLoading }
          onClick={ async () => {
            await hooks.destroyVehicle(vehicle)
            await hooks.getVehicles()
          }}
        >
          X
        </button>
      </div>
    
    </div>
  )
}

VehicleItem.propTypes = {
  vehicle: PropTypes.object,
  hooks: PropTypes.object,
}

export default VehicleList