"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push("/")
    } else {
      const data = await res.json()
      setError(data.error || "Ошибка входа")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold mb-6 text-center">Аналитический портал EKF</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </main>
  )
}
