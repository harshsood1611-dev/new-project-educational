import { getCollegeById } from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const college = getCollegeById(Number.parseInt(params.id))
    if (!college) return Response.json({ error: "College not found" }, { status: 404 })
    return Response.json(college)
  } catch (err) {
    console.error("Error fetching college:", err)
    return Response.json({ error: "Failed to fetch college" }, { status: 500 })
  }
}
