"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import Link from "next/link"

interface College {
  id: number
  name: string
  description: string
  approval_type: string
  ranking_position: number
}

export default function UniversitiesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch("/api/colleges")
        const data = await response.json()
        setColleges(data)
      } catch (error) {
        console.error("Error fetching colleges:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchColleges()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Top Universities</h1>
          <p className="text-gray-600 mb-12">
            Explore India's leading UGC-DEB approved universities offering online and distance education programs.
          </p>

          {loading ? (
            <div className="text-center py-12">Loading universities...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colleges.map((college) => (
                <div
                  key={college.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{college.name}</h3>
                  <p className="text-sm font-semibold text-blue-900 mb-4">{college.approval_type}</p>
                  <p className="text-gray-700 mb-4">{college.description}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Ranking:</strong> #{college.ranking_position}
                  </p>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors">
                    Enquire Now
                  </button>
                  <Link
                    href={`/universities/${college.id}`}
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
