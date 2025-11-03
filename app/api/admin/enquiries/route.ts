export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  const enquiries = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      course_id: 1,
      state: "Delhi",
      message: "Interested in MBA programs",
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@example.com",
      phone: "9876543211",
      course_id: 3,
      state: "Mumbai",
      message: "Looking for MCA course details",
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "9876543212",
      course_id: 5,
      state: "Bangalore",
      message: "Interested in B.Com program",
      created_at: new Date().toISOString(),
    },
  ]

  return Response.json(enquiries)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const authHeader = request.headers.get("authorization")

  if (!authHeader?.startsWith("Bearer ")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Mock: Delete enquiry from database
  console.log("[v0] Deleting enquiry:", params.id)

  return Response.json({ success: true })
}
