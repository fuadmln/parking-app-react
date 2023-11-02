import { useProfile } from '@/hooks/useProfile'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner'

function EditProfile(){
  const [profile, updateProfile] = useProfile()

  async function handleSubmit(e){
    e.preventDefault()
    await updateProfile(profile.data)
  }

  return (
    <form onSubmit={ handleSubmit }>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Edit Profile</h1>

        { profile.status &&
          <div className="alert alert-success mb-4" role="alert">
            { profile.status }
          </div>
        }

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name" className="required">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            autoComplete="name"
            value={ profile.data.name ?? '' }
            disabled={ profile.loading }
            onChange={ e => profile.setData({
              ...profile.data,
              name: e.target.value,
            }) }
          />
          <ValidationError errors={ profile.errors } field="name" />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="required">Email</label>
          <input
            type="email"
            name="email" 
            id="email"
            className="form-input"
            autoComplete="email"
            disabled={ profile.loading }
            value={ profile.data.email ?? '' }
            onChange={ event => profile.setData({
              ...profile.data, 
              email: event.target.value,
            }) }
          />
          <ValidationError errors={ profile.errors } field="email" />
        </div>

        <div className="border-t h-[1px] my-6"></div>

        <div className="flex flex-col gap-2 mb-4">
          <button type="submit" className="btn btn-primary" disabled={ profile.loading }>
            { profile.loading && <IconSpinner /> }
            Update Profile
          </button>
        </div>
      </div>
    </form>
  )
}

export default EditProfile