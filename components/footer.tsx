import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-200 via-blue-200 to-purple-200 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient-primary">StockToons</h3>
            <p className="text-slate-700 font-medium">
              Making stock market education fun and accessible for everyone, from kids to adults.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 hover:text-blue-600 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 hover:text-rose-500 cursor-pointer transition-colors" />
              <Linkedin className="h-6 w-6 hover:text-blue-700 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-emerald-700">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/stocks/categories" className="hover:text-blue-600 transition-colors font-medium">
                  Browse Stocks
                </Link>
              </li>
              <li>
                <Link href="/analysis" className="hover:text-blue-600 transition-colors font-medium">
                  Market Analysis
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-600 transition-colors font-medium">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-blue-600 transition-colors font-medium">
                  Learning Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Kids Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-purple-700">For Kids</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/kids/simulator" className="hover:text-blue-600 transition-colors font-medium">
                  Stock Simulator
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-blue-600 transition-colors font-medium">
                  Educational Games
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-blue-600 transition-colors font-medium">
                  Learning Videos
                </Link>
              </li>
              <li>
                <Link href="/kids/stocks/categories" className="hover:text-blue-600 transition-colors font-medium">
                  Kid-Friendly Stocks
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-cyan-700">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium">support@stocktoons.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">1-800-STOCKS</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-emerald-300 mt-8 pt-8 text-center">
          <p className="text-slate-700 font-medium">
            &copy; 2024 StockToons. Made with <Heart className="inline h-4 w-4 text-rose-500" /> for financial
            education. All rights reserved. |
            <Link href="/privacy" className="hover:text-blue-600 ml-1 font-bold">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-blue-600 ml-1 font-bold">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
