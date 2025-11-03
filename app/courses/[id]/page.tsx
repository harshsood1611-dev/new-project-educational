"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, BookOpen, Users, Download, Plus } from "lucide-react"

interface Course {
  id: number
  name: string
  category: string
  description: string
  duration: string
  eligibility: string
  detailed_description?: string
  fee?: string
  specializations?: string[]
  highlights?: string[]
  why_choose?: string[]
}

interface College {
  id: number
  name: string
  approval_type: string
  ranking_position: number
}

interface EnquiryForm {
  name: string
  email: string
  phone: string
  state: string
}

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null)
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<EnquiryForm>({
    name: "",
    email: "",
    phone: "",
    state: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await fetch(`/api/courses/${params.id}`)
        if (!courseRes.ok) throw new Error("Course fetch failed")
        const courseData = await courseRes.json()

        const enhancedCourse = {
          ...courseData,
          specializations: courseData.specializations || [
            "MBA (General Management)",
            "MBA (Finance)",
            "MBA (Marketing)",
          ],
          highlights: courseData.highlights || [],
          why_choose: courseData.why_choose || [],
        }
        setCourse(enhancedCourse)

        const collegesResponse = await fetch("/api/colleges")
        const collegesData = await collegesResponse.json()
        setColleges(collegesData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Enquiry submitted:", { ...formData, courseId: params.id })
    alert("Thank you for your enquiry! We will contact you soon.")
    setFormData({ name: "", email: "", phone: "", state: "" })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading course details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Course not found</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/courses" className="flex items-center gap-2 text-blue-900 hover:text-blue-800 font-medium">
              <ArrowLeft size={18} />
              Back to Courses
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-3">
                <p className="text-blue-600 font-semibold mb-2">{course.category} Distance Education</p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{course.name}</h1>
                <p className="text-lg text-gray-700 mb-6">
                  {course.description ||
                    `${course.name} is ideal for working professionals and students who wish to pursue their studies in the July 2025 academic session.`}
                </p>

                {/* Course Info Cards */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={20} className="text-blue-600" />
                      <span className="text-sm text-gray-600">Duration</span>
                    </div>
                    <p className="font-semibold text-gray-900">{course.duration}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={20} className="text-blue-600" />
                      <span className="text-sm text-gray-600">Eligibility</span>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{course.eligibility}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={20} className="text-blue-600" />
                      <span className="text-sm text-gray-600">Universities</span>
                    </div>
                    <p className="font-semibold text-gray-900">{colleges.length}+</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                    <Download size={18} className="mr-2" />
                    Download Brochure
                  </Button>
                  <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-white">
                    Get Help
                  </Button>
                  <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 bg-white">
                    <Plus size={18} className="mr-2" />
                    Add to Compare
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Details Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About Course */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About {course.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.detailed_description ||
                    `${course.name} is ideal for working professionals and students who wish to pursue their studies in the July 2025 academic session. With the option to choose from various ${course.category} distance education specialisations, such as Finance, Marketing, HR, IT, and more, learners can gain in-depth knowledge in their preferred field while experiencing real-life skills.`}
                </p>
              </div>

              {/* Specializations */}
              {course.specializations && course.specializations.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{course.category} Distance Education</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {course.specializations.map((spec, idx) => (
                      <div
                        key={idx}
                        className="border border-blue-300 rounded-lg p-4 bg-blue-50 hover:shadow-lg transition-shadow text-center"
                      >
                        <p className="font-semibold text-gray-900">{spec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Highlights */}
              {course.highlights && course.highlights.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Highlights</h2>
                  <ul className="space-y-3">
                    {course.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <span className="text-green-600 font-bold mt-1 flex-shrink-0">✓</span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Why Choose */}
              {course.why_choose && course.why_choose.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose {course.name}?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.why_choose.map((reason, idx) => (
                      <div
                        key={idx}
                        className="flex gap-3 p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                      >
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold text-sm">
                            ✓
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Universities Offering This Course */}
            <div>
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Universities Offering This Course</h3>
                <div className="space-y-3">
                  {colleges.map((college) => (
                    <Link
                      key={college.id}
                      href={`/universities/${college.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow hover:border-blue-300"
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{college.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{college.approval_type}</p>
                      <p className="text-xs text-gray-500">Ranking: #{college.ranking_position}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
