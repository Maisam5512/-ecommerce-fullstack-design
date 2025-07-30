import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Brand"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-2xl font-bold text-blue-500">Brand</span>
            </div>
            <p className="text-gray-600 text-sm mb-6 max-w-xs leading-relaxed">
              Best information about the company gies here but now lorem ipsum is
            </p>
            <div className="flex space-x-3">
              {[
                Facebook,
                Twitter,
                Linkedin,
                Instagram,
                Youtube
              ].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">About</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Find store</a></li>
              <li><a href="#" className="hover:text-blue-600">Categories</a></li>
              <li><a href="#" className="hover:text-blue-600">Blogs</a></li>
            </ul>
          </div>

          {/* Partnership */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Partnership</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Find store</a></li>
              <li><a href="#" className="hover:text-blue-600">Categories</a></li>
              <li><a href="#" className="hover:text-blue-600">Blogs</a></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Information</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600">Money Refund</a></li>
              <li><a href="#" className="hover:text-blue-600">Shipping</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact us</a></li>
            </ul>
          </div>

          {/* For Users + Get App */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">For users</h4>
            <ul className="space-y-3 text-sm text-gray-600 mb-8">
              <li><a href="#" className="hover:text-blue-600">Login</a></li>
              <li><a href="#" className="hover:text-blue-600">Register</a></li>
              <li><a href="#" className="hover:text-blue-600">Settings</a></li>
              <li><a href="#" className="hover:text-blue-600">My Orders</a></li>
            </ul>

            {/* Get App Section */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Get app</h4>
              <div className="space-y-3">
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src="/images/Appstore.png"
                    alt="Download on the App Store"
                    width={135}
                    height={40}
                    className="hover:opacity-90 transition-opacity"
                  />
                </a>
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Image
                    src="/images/playstore.png"
                    alt="Get it on Google Play"
                    width={135}
                    height={40}
                    className="hover:opacity-90 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <div className="mb-4 md:mb-0">© 2023 Ecommerce.</div>
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="flag">🇺🇸</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  )
}





