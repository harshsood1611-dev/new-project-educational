import { NextResponse } from "next/server";
import { getCourseById } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const course = await getCourseById(Number.parseInt(params.id, 10));
    if (!course) return NextResponse.json({ error: "Course not found" }, { status: 404 });
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}