import { addEnquiry } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const required = ["name", "email", "phone", "course", "state"]
    for (const f of required) {
      if (!body[f]) return Response.json({ error: `Missing ${f}` }, { status: 400 })
    }
    const enquiry = addEnquiry(body)
    console.log("[v0] Enquiry received:", enquiry)
    return Response.json({ success: true, enquiry })
  } catch (error) {
    console.error("Error processing enquiry:", error)
    return Response.json({ error: "Server error" }, { status: 500 })
  }
}
