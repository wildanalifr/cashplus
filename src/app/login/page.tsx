'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { API_LOGIN } from '@/api/login'

export default function Page() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: API_LOGIN.postData,
    onSuccess: (data) => {
      document.cookie = `auth_token=${data.data.token}; path=/`
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: data.selectedUser.id,
          name: data.selectedUser.name,
        })
      )
      router.push('/')
    },
    onError: (error) => {
      console.error('Error:', error.message)
      alert('error nih')
    },
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = { username, password }
    mutate(data)
  }

  return (
    <div className="max-w-lg mx-auto mt-28 p-6 border rounded ">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Username</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}
