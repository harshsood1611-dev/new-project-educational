"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"

interface College {
  id: number
  name: string
  description: string
  approval_type: string
  ranking_position: number
}

interface Course {
  id: number
  name: string
  category: string
  duration: string
  eligibility: string
}

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedColleges, setSelectedColleges] = useState<number[]>([])
  const [selectedCourses, setSelectedCourses] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [comparisonType, setComparisonType] = useState<"colleges" | "courses">("colleges")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesRes, coursesRes] = await Promise.all([fetch("/api/colleges"), fetch("/api/courses")])
        const collegesData = await collegesRes.json()
        const coursesData = await coursesRes.json()
        setColleges(collegesData)
        setCourses(coursesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleCollege = (id: number) => {
    setSelectedColleges((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id].slice(-4)))
  }

  const toggleCourse = (id: number) => {
    setSelectedCourses((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id].slice(-4)))
  }

  const getSelectedColleges = () => colleges.filter((c) => selectedColleges.includes(c.id))
  const getSelectedCourses = () => courses.filter((c) => selectedCourses.includes(c.id))

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading comparison data...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Compare Universities & Courses</h1>
          <p className="text-gray-600 mb-8">
            Compare up to 4 universities or courses side-by-side to make an informed decision
          </p>

          {/* Comparison Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setComparisonType("colleges")
                setSelectedCourses([])
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                comparisonType === "colleges" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Compare Universities
            </button>
            <button
              onClick={() => {
                setComparisonType("courses")
                setSelectedColleges([])
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                comparisonType === "courses" ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
              }`}
            >
              Compare Courses
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Selection Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {comparisonType === "colleges" ? "Select Universities" : "Select Courses"}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {comparisonType === "colleges"
                    ? `${selectedColleges.length}/4 selected`
                    : `${selectedCourses.length}/4 selected`}
                </p>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {comparisonType === "colleges"
                    ? colleges.map((college) => (
                        <label
                          key={college.id}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedColleges.includes(college.id)}
                            onChange={() => toggleCollege(college.id)}
                            disabled={selectedColleges.length >= 4 && !selectedColleges.includes(college.id)}
                            className="w-4 h-4"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-gray-900">{college.name}</p>
                            <p className="text-xs text-gray-600">#{college.ranking_position}</p>
                          </div>
                        </label>
                      ))
                    : courses.map((course) => (
                        <label
                          key={course.id}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCourses.includes(course.id)}
                            onChange={() => toggleCourse(course.id)}
                            disabled={selectedCourses.length >= 4 && !selectedCourses.includes(course.id)}
                            className="w-4 h-4"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-gray-900">{course.name}</p>
                            <p className="text-xs text-gray-600">{course.category}</p>
                          </div>
                        </label>
                      ))}
                </div>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="lg:col-span-3">
              {comparisonType === "colleges" ? (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {selectedColleges.length === 0 ? (
                    <div className="p-12 text-center">
                      <p className="text-gray-600 mb-4">Select universities to compare</p>
                      <Plus size={32} className="mx-auto text-gray-400" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-32">Criteria</th>
                            {getSelectedColleges().map((college) => (
                              <th
                                key={college.id}
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 min-w-48"
                              >
                                <div className="flex items-start justify-between">
                                  <span>{college.name}</span>
                                  <button
                                    onClick={() => toggleCollege(college.id)}
                                    className="text-gray-400 hover:text-red-600"
                                  >
                                    <X size={18} />
                                  </button>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Ranking</td>
                            {getSelectedColleges().map((college) => (
                              <td key={college.id} className="px-6 py-4 text-sm text-gray-700">
                                #{college.ranking_position}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Approval</td>
                            {getSelectedColleges().map((college) => (
                              <td key={college.id} className="px-6 py-4 text-sm text-gray-700">
                                {college.approval_type}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Description</td>
                            {getSelectedColleges().map((college) => (
                              <td key={college.id} className="px-6 py-4 text-sm text-gray-700">
                                {college.description}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  {selectedCourses.length === 0 ? (
                    <div className="p-12 text-center">
                      <p className="text-gray-600 mb-4">Select courses to compare</p>
                      <Plus size={32} className="mx-auto text-gray-400" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-32">Criteria</th>
                            {getSelectedCourses().map((course) => (
                              <th
                                key={course.id}
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 min-w-48"
                              >
                                <div className="flex items-start justify-between">
                                  <span>{course.name}</span>
                                  <button
                                    onClick={() => toggleCourse(course.id)}
                                    className="text-gray-400 hover:text-red-600"
                                  >
                                    <X size={18} />
                                  </button>
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Category</td>
                            {getSelectedCourses().map((course) => (
                              <td key={course.id} className="px-6 py-4 text-sm text-gray-700">
                                {course.category}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Duration</td>
                            {getSelectedCourses().map((course) => (
                              <td key={course.id} className="px-6 py-4 text-sm text-gray-700">
                                {course.duration}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Eligibility</td>
                            {getSelectedCourses().map((course) => (
                              <td key={course.id} className="px-6 py-4 text-sm text-gray-700">
                                {course.eligibility}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">Description</td>
                            {getSelectedCourses().map((course) => (
                              <td key={course.id} className="px-6 py-4 text-sm text-gray-700">
                                {course.description}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
