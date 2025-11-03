export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="text-gray-400 text-sm">
              India's top reliable distance education platform offering UGC-DEB approved programs.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/courses" className="hover:text-white">
                  Courses
                </a>
              </li>
              <li>
                <a href="/universities" className="hover:text-white">
                  Universities
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-white">
                  Admin
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">Email: info@distanceeducationschool.com</p>
            <p className="text-gray-400 text-sm">Phone: +91-XXXXXXXXXX</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <p className="text-gray-400 text-sm">Social media links here</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Distance Education School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
