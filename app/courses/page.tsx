"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Course {
  id: number
  name: string
  category: string
  description: string
  duration: string
  eligibility: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses")
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const categories = [...new Set(courses.map((c) => c.category))]
  const filteredCourses = selectedCategory ? courses.filter((c) => c.category === selectedCategory) : courses

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">All Courses</h1>

          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === "" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-900 text-white"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          {loading ? (
            <div className="text-center py-12">Loading courses...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.category}</p>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>
                      <strong>Duration:</strong> {course.duration}
                    </p>
                    <p>
                      <strong>Eligibility:</strong> {course.eligibility}
                    </p>
                  </div>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors">
                    Enquire Now
                  </button>
                  <Link
                    href={`/courses/${course.id}`}
                    className="block w-full mt-2 text-center bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
