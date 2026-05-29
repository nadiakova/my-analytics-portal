"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type Row = { month: string; total_mln: number }

export default function Dashboard() {
  const [data, setData] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/sell-in")
      .then((r) => r.json())
      .then((rows) => {
        if (rows.error) setError(rows.error)
        else setData(rows)
        setLoading(false)
      })
      .catch((e) => { setError(e.message); setLoading(false) })
  }, [])

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Аналитический портал EKF</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-1">Sell-in по месяцам</h2>
        <p className="text-sm text-gray-500 mb-4">млн руб.</p>
        {loading && <p className="text-gray-400">Загрузка...</p>}
        {error && <p className="text-red-500 text-sm">Ошибка: {error}</p>}
        {!loading && !error && (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`${v} млн`, "Sell-in"]} />
              <Bar dataKey="total_mln" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </main>
  )
}
