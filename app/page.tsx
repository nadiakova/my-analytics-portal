"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Янв", value: 120 },
  { month: "Фев", value: 145 },
  { month: "Мар", value: 98 },
  { month: "Апр", value: 210 },
  { month: "Май", value: 175 },
]

export default function Dashboard() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Аналитический портал</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Продажи по месяцам</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}