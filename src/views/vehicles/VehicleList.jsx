import { Link } from 'react-router-dom'
import { route } from '@/routes'
import { useVehicles } from '@/hooks/useVehicles'
import { useVehicle } from '@/hooks/useVehicle'

function VehicleList(){
  const { vehicles, loading, getVehicles } = useVehicles()
  const { destroyVehicle, loading: destroyLoading } = useVehicle()

  return (
    <div className="flex flex-col mx-auto md:w-96 w-full">
      <h1 className="heading">My Vehicles</h1>

      <Link to={ route('vehicles.create') } className="btn btn-primary">
        Add Vehicle
      </Link>

      <div className="border-t h-[1px] my-6"></div>

      <div className="flex flex-col gap-2">
        { loading ? (
          <div className="text-center text-gray-600">Loading vehicle...</div>
        ) : vehicles.length > 0 ? 
          vehicles.map(vehicle => (
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
                  disabled={ destroyLoading }
                  onClick={ async () => {
                    await destroyVehicle(vehicle)
                    await getVehicles()
                  }}
                >
                  X
                </button>
              </div>
            
            </div>
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

export default VehicleList