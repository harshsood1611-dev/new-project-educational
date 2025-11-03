"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold text-blue-900">Distance</div>
              <div className="text-xs text-blue-600">Education School</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-900 font-medium">Courses</button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link href="/courses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  All Courses
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-900 font-medium">Universities</button>
              <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link href="/universities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  All Universities
                </Link>
              </div>
            </div>
            <Link href="/compare" className="text-gray-700 hover:text-blue-900 font-medium">
              Compare
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-900 font-medium">
              Admin
            </Link>
          </nav>

          {/* Compare Button */}
          <div className="hidden md:block">
            <Link href="/compare">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Compare</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/courses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Courses
            </Link>
            <Link href="/universities" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Universities
            </Link>
            <Link href="/compare" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Compare
            </Link>
            <Link href="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
