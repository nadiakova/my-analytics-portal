import { createClient } from "@clickhouse/client"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const password = Buffer.from(process.env.CLICKHOUSE_PASSWORD_B64 || "", "base64").toString("utf8")

    const client = createClient({
      host: `https://${process.env.CLICKHOUSE_HOST}:${process.env.CLICKHOUSE_PORT}`,
      username: process.env.CLICKHOUSE_USER,
      password,
      tls: { ca_cert: Buffer.from(process.env.CLICKHOUSE_CA_CERT_BASE64 || "", "base64") },
    })

    const result = await client.query({
      query: `
        SELECT
          formatDateTime(toStartOfMonth(date), '%Y-%m') AS month,
          round(sum(amount) / 1000000, 1) AS total_mln
        FROM sales_force.sell_in
        GROUP BY month
        ORDER BY month
      `,
      format: "JSONEachRow",
    })

    const rows = await result.json()
    return NextResponse.json(rows)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
