import { addCollege, deleteCollege, updateCollege } from "@/lib/db"

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  try {
    const college = addCollege(body)
    return Response.json({ success: true, college })
  } catch (err) {
    console.error("Error adding college:", err)
    return Response.json({ error: "Failed to add college" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    deleteCollege(Number.parseInt(params.id))
    return Response.json({ success: true })
  } catch (err) {
    console.error("Error deleting college:", err)
    return Response.json({ error: "Failed to delete college" }, { status: 500 })
  }
}
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  try {
    const updated = updateCollege(Number.parseInt(params.id), body)
    return Response.json({ success: true, college: updated })
  } catch (err) {
    console.error("Error updating college:", err)
    return Response.json({ error: "Failed to update college" }, { status: 500 })
  }
}
