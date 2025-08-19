import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-300 via-pink-300 via-blue-300 to-green-300 text-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">StockToons</h3>
            <p className="text-purple-700">
              Making stock market education fun and accessible for everyone, from kids to adults.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-pink-600 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-pink-600 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-pink-600 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-pink-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-700">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/stocks/categories" className="hover:text-pink-600 transition-colors">
                  Browse Stocks
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="hover:text-pink-600 transition-colors">
                  Market Analysis
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-pink-600 transition-colors">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-pink-600 transition-colors">
                  Learning Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Kids Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-700">For Kids</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kids/simulator" className="hover:text-pink-600 transition-colors">
                  Stock Simulator
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-pink-600 transition-colors">
                  Educational Games
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-pink-600 transition-colors">
                  Learning Videos
                </Link>
              </li>
              <li>
                <Link href="/kids/stocks/categories" className="hover:text-pink-600 transition-colors">
                  Kid-Friendly Stocks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-700">Contact Us</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@stocktoons.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">1-800-STOCKS</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-400 mt-8 pt-8 text-center">
          <p className="text-purple-700">
            &copy; 2024 StockToons. All rights reserved. |
            <Link href="/privacy" className="hover:text-pink-600 ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-pink-600 ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
