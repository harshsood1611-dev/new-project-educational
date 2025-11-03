"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogOut, Users, BookOpen, MessageSquare } from "lucide-react"

interface Stats {
  colleges: number
  courses: number
  enquiries: number
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    colleges: 0,
    courses: 0,
    enquiries: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      window.location.href = "/admin"
    } else {
      setIsAuthenticated(true)
      fetchStats()
    }
  }, [])

  const fetchStats = async () => {
    try {
      const [collegesRes, coursesRes, enquiriesRes] = await Promise.all([
        fetch("/api/colleges"),
        fetch("/api/courses"),
        fetch("/api/admin/enquiries", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }),
      ])

      const colleges = await collegesRes.json()
      const courses = await coursesRes.json()
      const enquiries = await enquiriesRes.json()

      setStats({
        colleges: colleges.length,
        courses: courses.length,
        enquiries: enquiries.length,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    window.location.href = "/admin"
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-gray-700 hover:text-red-600">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Colleges Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Manage Colleges</h2>
              <Users size={24} className="text-blue-900" />
            </div>
            <p className="text-gray-600 mb-4">Add, edit, or delete universities</p>
            <Link href="/admin/colleges">
              <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white">Manage Colleges</Button>
            </Link>
          </div>

          {/* Courses Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Manage Courses</h2>
              <BookOpen size={24} className="text-green-600" />
            </div>
            <p className="text-gray-600 mb-4">Add, edit, or delete courses</p>
            <Link href="/admin/courses">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Manage Courses</Button>
            </Link>
          </div>

          {/* Enquiries Card */}
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">View Enquiries</h2>
              <MessageSquare size={24} className="text-orange-600" />
            </div>
            <p className="text-gray-600 mb-4">View and manage student enquiries</p>
            <Link href="/admin/enquiries">
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">View Enquiries</Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-900">{stats.colleges}</div>
              <p className="text-gray-600 mt-2">Total Colleges</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-4xl font-bold text-green-900">{stats.courses}</div>
              <p className="text-gray-600 mt-2">Total Courses</p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="text-4xl font-bold text-orange-900">{stats.enquiries}</div>
              <p className="text-gray-600 mt-2">Total Enquiries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
