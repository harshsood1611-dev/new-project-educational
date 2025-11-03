"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { Search } from "lucide-react"

const courseCategories = [
  { name: "MBA", icon: "💼" },
  { name: "MCA", icon: "💻" },
  { name: "MCOM", icon: "📊" },
  { name: "MA", icon: "📚" },
  { name: "MSC", icon: "🔬" },
  { name: "MJMC", icon: "📰" },
  { name: "BBA", icon: "🎓" },
  { name: "BCA", icon: "💾" },
  { name: "BCOM", icon: "📈" },
  { name: "BA", icon: "✍️" },
  { name: "BSC", icon: "🧪" },
  { name: "BJMC", icon: "📺" },
]

const topUniversities = [
  { name: "LPU Online", rank: "Top 10 MBA Universities" },
  { name: "JAIN Online", rank: "UGC-DEB Approved" },
  { name: "Manipal Online", rank: "Top MCA Universities" },
  { name: "Uttaranchal University", rank: "NIRF Ranked" },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    state: "",
  })
  const [submitLoading, setSubmitLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitLoading(true)
    setSubmitMessage("")

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage("Thank you! We will contact you soon.")
        setFormData({ name: "", phone: "", email: "", course: "", state: "" })
      } else {
        setSubmitMessage("Error submitting enquiry. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setSubmitMessage("Error submitting enquiry. Please try again.")
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="text-sm font-semibold mb-2">#India'sTopReliable</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">DISTANCE EDUCATION SCHOOL</h1>
              <p className="text-xl text-blue-100 mb-8">We Ease the Process to Achieve Distance & Online Degree</p>

              {/* Search Bar */}
              <div className="flex gap-2 mb-8">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search Course & University e.g. BA MBA MA BBA"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white text-gray-900 placeholder-gray-500"
                  />
                </div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                  <Search size={20} />
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-blue-100">Top 10 MBA Universities in India</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-blue-100">UGC-DEB Approved Universities 2025</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">200+</div>
                  <div className="text-sm text-blue-100">Top 10 MCA Universities in India</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-100">NIRF Ranked Universities 2025</div>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white rounded-lg p-6 text-gray-900">
              <h3 className="text-2xl font-bold text-orange-500 mb-2">Enquire Now</h3>
              <p className="text-gray-600 mb-4">Get 100% Free Counselling</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Name *</label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone *</label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Enter Your Number"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Enter Your Mail ID"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Course *</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Course</option>
                    <option value="MBA">MBA</option>
                    <option value="MCA">MCA</option>
                    <option value="MA">MA</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Your State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="terms" className="w-4 h-4" />
                  <label htmlFor="terms" className="text-xs text-gray-600">
                    I agree to receive university updates via email
                  </label>
                </div>
                <Button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  {submitLoading ? "Submitting..." : "Submit"}
                </Button>
                {submitMessage && (
                  <p
                    className={`text-sm text-center ${
                      submitMessage.includes("Thank you") ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Top Leading - Universities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {courseCategories.map((category) => (
              <Link
                key={category.name}
                href={`/courses?category=${category.name}`}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div className="font-semibold text-gray-900">{category.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Top Online & Distance Education Universities in 2025</h2>
          <p className="text-center text-gray-600 mb-12">
            Explore updated information about leading UGC-DEB-approved universities offering online & distance education
            in the July 2025 academic session.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {topUniversities.map((uni) => (
              <div
                key={uni.name}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">{uni.name}</h3>
                <p className="text-gray-600">{uni.rank}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button className="bg-green-600 hover:bg-green-700 text-white">View More</Button>
            <Link href="/compare">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent">
                Compare Universities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MBA Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">MBA Distance Education</h2>
          <p className="text-center text-gray-600 mb-12">
            MBA Distance Education is ideal for working professionals and students who wish to pursue their studies in
            the July 2025 academic session. With the option to choose from various MBA distance education
            specialisations, such as Finance, Marketing, HR, IT, and more, learners can gain in-depth knowledge in their
            preferred field while experiencing real-life skills.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              "MBA (General Management)",
              "MBA (Finance)",
              "MBA (Marketing)",
              "MBA (HR Management)",
              "MBA (Operation)",
              "MBA (Information Technology)",
              "MBA (Supply Chain Management)",
              "MBA (Data Analytics)",
              "MBA (Business Analytics)",
            ].map((specialization) => (
              <div
                key={specialization}
                className="bg-white p-4 rounded-lg border border-blue-500 text-center hover:shadow-lg transition-shadow"
              >
                <p className="font-semibold text-gray-900">{specialization}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
