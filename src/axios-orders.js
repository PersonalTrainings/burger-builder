import axios  from 'axios'

const instance = axios.create({
  baseURL: 'https://react-my-burger-97087.firebaseio.com'
})

export default instance