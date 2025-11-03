export async function POST(request: Request) {
  const { email, password } = await request.json()

  // Mock authentication - replace with actual database query
  if (email === "admin@example.com" && password === "password123") {
    return Response.json({
      token: "mock-jwt-token-" + Date.now(),
      user: { email, name: "Admin User" },
    })
  }

  return Response.json({ error: "Invalid credentials" }, { status: 401 })
}
