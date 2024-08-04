import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-start">
          {/* Company Info */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <div className="flex items-center mb-4">
              <img
                src="/path-to-logo/logo.png"
                alt="Whitespace UI"
                className="h-10 mr-3"
              />
              <span className="text-2xl font-bold">Meddina Artisanat</span>
            </div>
            <p className="text-sm mb-4">
              We love working with ambitious people. Let's build something great
              together now.
            </p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="border p-2 rounded-l-md"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="w-full lg:w-3/4 flex flex-wrap justify-between">
            <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
              <h5 className="text-lg font-semibold mb-4">Product</h5>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Pricing
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Case Studies
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Features
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
              <h5 className="text-lg font-semibold mb-4">Company</h5>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    About
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Careers
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    News
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Status
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-sm text-gray-600">
                    Report a Bug
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600">
                    Chat Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-1/2 md:w-1/4">
              <h5 className="text-lg font-semibold mb-4">Contact us</h5>
              <ul>
                <li className="mb-2">
                  <a
                    href="mailto:hello@whitespaceui.design"
                    className="text-sm text-gray-600">
                    hello@whitespaceui.design
                  </a>
                </li>
                <li className="mb-2">
                  <a href="tel:+1500300250" className="text-sm text-gray-600">
                    +1 (500) 300 250
                  </a>
                </li>
                <li>
                  <address className="text-sm text-gray-600">
                    3891 Ranchview Dr. Richardson, CA 62639
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-8">
          <p className="text-sm text-gray-600">
            © 2023 Meddina Artisanat - All rights reserved
          </p>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <a href="#" className="text-gray-600">
              <span>icon</span>
            </a>
            <a href="#" className="text-gray-600">
              <span>icon</span>
            </a>
            <a href="#" className="text-gray-600">
              <span>icon</span>
            </a>
            <a href="#" className="text-gray-600">
              <span>icon</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
