"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Edit2, Trash2, X } from "lucide-react"

interface Course {
  id: number
  name: string
  category: string
  description: string
  duration: string
  eligibility: string
  detailed_description?: string
  fee?: string
}

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    duration: "",
    eligibility: "",
    detailed_description: "",
    fee: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      window.location.href = "/admin"
      return
    }
    fetchCourses()
  }, [])

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

  const handleEdit = (course: Course) => {
    setFormData({
      name: course.name,
      category: course.category,
      description: course.description,
      duration: course.duration,
      eligibility: course.eligibility,
      detailed_description: course.detailed_description || "",
      fee: course.fee || "",
    })
    setEditingId(course.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({
          name: "",
          category: "",
          description: "",
          duration: "",
          eligibility: "",
          detailed_description: "",
          fee: "",
        })
        setEditingId(null)
        setShowForm(false)
        fetchCourses()
      }
    } catch (error) {
      console.error("Error adding course:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await fetch(`/api/admin/courses/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        fetchCourses()
      } catch (error) {
        console.error("Error deleting course:", error)
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: "",
      category: "",
      description: "",
      duration: "",
      eligibility: "",
      detailed_description: "",
      fee: "",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <Link href="/admin/dashboard" className="text-blue-900 hover:text-blue-800 mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-blue-900">Manage Courses</h1>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm)
              if (showForm) handleCancel()
            }}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Plus size={20} />
            Add Course
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingId ? "Edit Course" : "Add New Course"}</h2>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter course name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <Input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., MBA, MCA"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
                  <Input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 2 years"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fee</label>
                  <Input
                    type="text"
                    value={formData.fee}
                    onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                    placeholder="e.g., ₹50,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Eligibility *</label>
                  <Input
                    type="text"
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    placeholder="e.g., Bachelor's Degree"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter course description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
                <textarea
                  value={formData.detailed_description}
                  onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
                  placeholder="Enter detailed course information"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white">
                  {editingId ? "Update Course" : "Add Course"}
                </Button>
                <Button type="button" onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Courses Table */}
        {loading ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Eligibility</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{course.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{course.eligibility}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(course)} className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
