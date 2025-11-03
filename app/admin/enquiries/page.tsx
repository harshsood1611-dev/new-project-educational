"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Trash2, Mail, Phone, MapPin, Calendar } from "lucide-react"

interface Enquiry {
  id: number
  name: string
  email: string
  phone: string
  course_id?: number
  state: string
  message?: string
  created_at: string
}

export default function ManageEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      window.location.href = "/admin"
      return
    }
    fetchEnquiries()
  }, [])

  const fetchEnquiries = async () => {
    try {
      const response = await fetch("/api/admin/enquiries", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      const data = await response.json()
      setEnquiries(data)
    } catch (error) {
      console.error("Error fetching enquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await fetch(`/api/admin/enquiries/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        fetchEnquiries()
        setSelectedEnquiry(null)
      } catch (error) {
        console.error("Error deleting enquiry:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/admin/dashboard" className="text-blue-900 hover:text-blue-800 mb-2 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-blue-900">Student Enquiries</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enquiries List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">{enquiries.length} Enquiries</h2>
              </div>
              {loading ? (
                <div className="p-4 text-center text-gray-600">Loading...</div>
              ) : enquiries.length === 0 ? (
                <div className="p-4 text-center text-gray-600">No enquiries yet</div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {enquiries.map((enquiry) => (
                    <button
                      key={enquiry.id}
                      onClick={() => setSelectedEnquiry(enquiry)}
                      className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        selectedEnquiry?.id === enquiry.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <p className="font-semibold text-gray-900 text-sm">{enquiry.name}</p>
                      <p className="text-xs text-gray-600 truncate">{enquiry.email}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(enquiry.created_at).toLocaleDateString()}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Enquiry Details */}
          <div className="lg:col-span-2">
            {selectedEnquiry ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEnquiry.name}</h2>
                  <button onClick={() => handleDelete(selectedEnquiry.id)} className="text-red-600 hover:text-red-800">
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{selectedEnquiry.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{selectedEnquiry.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">State</p>
                      <p className="font-semibold text-gray-900">{selectedEnquiry.state}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-gray-600" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(selectedEnquiry.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {selectedEnquiry.message && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Message</p>
                      <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedEnquiry.message}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600">Select an enquiry to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
