import { useNavigate } from 'react-router-dom'
import { route } from '@/routes'
import axios from 'axios'

export function useAuth(){
  const navigate = useNavigate()

  async function register(data){
    return axios.post('auth/register', data)
      .then(() => {
        navigate(route('vehicles.index'))
      })
      .catch(() => {
        console.log('error register')
      })
  }

  return { register }
}