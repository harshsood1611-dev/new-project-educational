import { getColleges } from "@/lib/db"

export async function GET() {
  try {
    const colleges = getColleges()
    return Response.json(colleges)
  } catch (err) {
    console.error("Error fetching colleges:", err)
    return Response.json({ error: "Failed to fetch colleges" }, { status: 500 })
  }
}
