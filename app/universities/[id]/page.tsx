"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Star, Download, Plus } from "lucide-react"
import Image from "next/image"

interface College {
  id: number
  name: string
  description: string
  approval_type: string
  ranking_position: number
  logo_url?: string
  website?: string
  detailed_description?: string
  rating?: number
  established_year?: number
  location?: string
  accreditations?: Array<{ name: string; description: string; icon?: string }>
  highlights?: Array<{ label: string; value: string }>
  courses_offered?: Array<{ name: string; degree: string; duration: string; fee: string; emi: boolean }>
  why_choose?: string[]
}

interface Course {
  id: number
  name: string
  category: string
  duration: string
}

interface EnquiryForm {
  name: string
  email: string
  phone: string
  state: string
}

export default function UniversityDetailsPage({ params }: { params: { id: string } }) {
  const [college, setCollege] = useState<College | null>(null)
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("about")
  const [formData, setFormData] = useState<EnquiryForm>({
    name: "",
    email: "",
    phone: "",
    state: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collegeRes = await fetch(`/api/colleges/${params.id}`)
        if (!collegeRes.ok) throw new Error("College fetch failed")
        const collegeData = await collegeRes.json()
        setCollege(collegeData)

        const coursesRes = await fetch("/api/courses")
        const coursesData = await coursesRes.json()
        setCourses(coursesData)
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
    console.log("Enquiry submitted:", { ...formData, collegeId: params.id })
    alert("Thank you for your enquiry! We will contact you soon.")
    setFormData({ name: "", email: "", phone: "", state: "" })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading university details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!college) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">University not found</p>
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
            <Link
              href="/universities"
              className="flex items-center gap-2 text-blue-900 hover:text-blue-800 font-medium"
            >
              <ArrowLeft size={18} />
              Back to Universities
            </Link>
          </div>
        </div>

        <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          {/* Banner Background */}
          <div className="absolute inset-0 opacity-20">
            <Image src="/university-campus-banner.jpg" alt="University Banner" fill className="object-cover" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                    <Image
                      src="/generic-university-logo.png"
                      alt={college.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{college.name} - Online</h1>
                    <p className="text-lg text-blue-100 mb-4">{college.description}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-blue-200"}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold">{college.rating}/5</span>
                      </div>
                      <span className="text-sm text-blue-100">Based on student reviews</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-wrap">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                    <Download size={18} className="mr-2" />
                    Download Brochure
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    Get Help
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    <Plus size={18} className="mr-2" />
                    Add to Compare
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-fit">
                <Image
                  src="/university-building-campus.jpg"
                  alt={college.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{college.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{college.location}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Established:</span> {college.established_year}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Approval:</span> {college.approval_type}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Ranking:</span> #{college.ranking_position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Navigation */}
        <div className="bg-blue-600 text-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto gap-1">
              {[
                "about",
                "courses",
                "emi",
                "benefits",
                "exam",
                "approvals",
                "placement",
                "degree",
                "admission",
                "alternative",
                "faqs",
              ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab ? "border-white text-white" : "border-transparent text-blue-100 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {activeTab === "about" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About {college.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {college.detailed_description ||
                    `Imagine getting a higher education degree without disturbing work-life balance. Sounds Great, Right? Manipal Online University Admissions are a golden opportunity for learners who want to continue their studies while working. A variety of Manipal Online courses to earn undergraduate and postgraduate valid degrees with flexible learning.`}
                </p>
              </div>

              {/* Accreditations Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {college.name} Online Accreditations and Approvals
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {college.accreditations?.map((accred, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-gray-900 mb-3">{accred.name}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{accred.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Highlights of {college.name} Online</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      {college.highlights?.map((highlight, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                          <td className="border border-gray-200 px-6 py-4 font-semibold text-gray-900 w-1/3">
                            {highlight.label}
                          </td>
                          <td className="border border-gray-200 px-6 py-4 text-gray-700">{highlight.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Online Degree Courses with Updated Fees for 2025
              </h2>
              <p className="text-gray-700 mb-6">
                {college.name} offers various undergraduate and postgraduate programs tailored to meet students'
                academic and professional aspirations. These degree courses allow students to learn from anywhere and
                anytime.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Course</th>
                      <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Degree Type</th>
                      <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Duration</th>
                      <th className="border border-gray-300 px-6 py-3 text-left font-semibold">Semester Fee</th>
                      <th className="border border-gray-300 px-6 py-3 text-left font-semibold">EMI Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {college.courses_offered?.map((course, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="border border-gray-300 px-6 py-4 font-semibold text-gray-900">{course.name}</td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{course.degree}</td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{course.duration}</td>
                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{course.fee}</td>
                        <td className="border border-gray-300 px-6 py-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${course.emi ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                          >
                            {course.emi ? "Yes" : "No"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "emi" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">EMI Options Available At {college.name}</h2>
              <p className="text-gray-700 mb-6">
                {college.name} offers flexible and convenient EMI (Equated Monthly Installment) facilities to help
                students manage their educational expenses effectively.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Flexible Payment Plans",
                    desc: "Multiple EMI options with flexible tenures to suit different financial needs.",
                  },
                  {
                    title: "Zero or Low Interest",
                    desc: "Some EMI plans have zero or minimal interest rates, making education more affordable.",
                  },
                  {
                    title: "Simple Online Application",
                    desc: "The EMI facility can be easily availed through the online payment portal.",
                  },
                  {
                    title: "Collaboration with Banks",
                    desc: "Partners with leading financial institutions to provide seamless EMI services.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "benefits" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Should You Choose {college.name}?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {college.why_choose?.map((reason, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold">
                        ✓
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700">{reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {["exam", "approvals", "placement", "degree", "admission", "alternative", "faqs"].includes(activeTab) && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Content for {activeTab} section coming soon...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
