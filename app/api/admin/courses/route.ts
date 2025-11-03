import { addCourse, deleteCourse, updateCourse } from "@/lib/db"

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  try {
    const course = addCourse(body)
    return Response.json({ success: true, course })
  } catch (err) {
    console.error("Error adding course:", err)
    return Response.json({ error: "Failed to add course" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    deleteCourse(Number.parseInt(params.id))
    return Response.json({ success: true })
  } catch (err) {
    console.error("Error deleting course:", err)
    return Response.json({ error: "Failed to delete course" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }
  const body = await request.json()
  try {
    const updated = updateCourse(Number.parseInt(params.id), body)
    return Response.json({ success: true, course: updated })
  } catch (err) {
    console.error("Error updating course:", err)
    return Response.json({ error: "Failed to update course" }, { status: 500 })
  }
}
