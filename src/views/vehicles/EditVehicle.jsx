import { useNavigate, useParams } from 'react-router-dom'
import { useVehicle } from '@/hooks/useVehicle'
import { route } from '@/routes'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner'


function EditVehicle(){
  const params = useParams()
  const { vehicle, updateVehicle } = useVehicle(params.id)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()

    await updateVehicle(vehicle.data)
  }

  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Add Vehicle</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="plate_number" className="requiired">License Plate</label>
          <input
            type="text"
            id="plate_number"
            name="plate_number"
            className="form-input plate"
            value ={ vehicle.data.plate_number ?? '' }
            disabled={ vehicle.loading }
            onChange={ e => vehicle.setData({
              ...vehicle.data,
              plate_number: e.target.value,
            }) }
          />
          <ValidationError errors={ vehicle.errors } field="plate_number" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-input"
            value ={ vehicle.data.description ?? '' }
            disabled={ vehicle.loading }
            onChange={ e => vehicle.setData({
              ...vehicle.data,
              description: e.target.value,
            }) }
          />
          <ValidationError errors={ vehicle.errors } field="description" />
        </div>

        <div className="border-t h-[1px] my-6"></div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={ vehicle.loading }
          >
            { vehicle.loading && <IconSpinner /> }
            Update Vehicle
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            disabled={ vehicle.loading }
            onClick={ () => navigate(route('vehicles.index')) }
          >
            Cancel
          </button>
        </div>

      </div>
    </form>
  )
}

export default EditVehicle