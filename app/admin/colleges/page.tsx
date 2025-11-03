"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Edit2, Trash2, X } from "lucide-react"

interface College {
  id: number
  name: string
  description: string
  approval_type: string
  ranking_position: number
  website?: string
  detailed_description?: string
}

export default function ManageColleges() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    approval_type: "",
    ranking_position: 0,
    website: "",
    detailed_description: "",
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      window.location.href = "/admin"
      return
    }
    fetchColleges()
  }, [])

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

  const handleEdit = (college: College) => {
    setFormData({
      name: college.name,
      description: college.description,
      approval_type: college.approval_type,
      ranking_position: college.ranking_position,
      website: college.website || "",
      detailed_description: college.detailed_description || "",
    })
    setEditingId(college.id)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/admin/colleges", {
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
          description: "",
          approval_type: "",
          ranking_position: 0,
          website: "",
          detailed_description: "",
        })
        setEditingId(null)
        setShowForm(false)
        fetchColleges()
      }
    } catch (error) {
      console.error("Error adding college:", error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this college?")) {
      try {
        await fetch(`/api/admin/colleges/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        fetchColleges()
      } catch (error) {
        console.error("Error deleting college:", error)
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: "",
      description: "",
      approval_type: "",
      ranking_position: 0,
      website: "",
      detailed_description: "",
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
            <h1 className="text-2xl font-bold text-blue-900">Manage Colleges</h1>
          </div>
          <Button
            onClick={() => {
              setShowForm(!showForm)
              if (showForm) handleCancel()
            }}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Plus size={20} />
            Add College
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingId ? "Edit College" : "Add New College"}</h2>
              <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">College Name *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter college name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                  <Input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter college description"
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
                  placeholder="Enter detailed college information"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Approval Type *</label>
                  <Input
                    type="text"
                    value={formData.approval_type}
                    onChange={(e) => setFormData({ ...formData, approval_type: e.target.value })}
                    placeholder="e.g., UGC-DEB Approved"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ranking Position *</label>
                  <Input
                    type="number"
                    value={formData.ranking_position}
                    onChange={(e) => setFormData({ ...formData, ranking_position: Number.parseInt(e.target.value) })}
                    placeholder="Enter ranking"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-white">
                  {editingId ? "Update College" : "Add College"}
                </Button>
                <Button type="button" onClick={handleCancel} variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Colleges Table */}
        {loading ? (
          <div className="text-center py-12">Loading colleges...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Approval Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ranking</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {colleges.map((college) => (
                  <tr key={college.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{college.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{college.approval_type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">#{college.ranking_position}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(college)} className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(college.id)} className="text-red-600 hover:text-red-800">
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
