import { tLogin } from '@/types/login'

export const API_LOGIN = {
  postData: async (data: tLogin) => {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Error posting data')
    }
    const userData = await response.json()
    const users = await API_LOGIN.findAllUsers()

    const selectedUser = users.filter(
      (item: any) => item.username === data.username
    )[0]

    return { selectedUser, data: userData }
  },

  findAllUsers: async () => {
    const response = await fetch('https://fakestoreapi.com/users', {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Error posting data')
    }
    return response.json()
  },

  logout: () => {
    document.cookie =
      'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  },
}
