import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">About TechNews</h3>
            <p className="text-gray-400">
              Navigating the digital frontier, TechNews delivers cutting-edge insights into technology's evolving landscape. From AI breakthroughs to startup innovations, we're your compass in the world of tech.
            </p>
          </div>

          {/* Collaborations & Sponsors */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Our Collaborators</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.mit.edu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition flex items-center"
                >
                  <i className="fas fa-university mr-2"></i>
                  MIT Technology Review
                </a>
              </li>
              <li>
                <a 
                  href="https://www.techcrunch.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition flex items-center"
                >
                  <i className="fas fa-newspaper mr-2"></i>
                  TechCrunch
                </a>
              </li>
              <li>
                <a 
                  href="https://www.openai.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition flex items-center"
                >
                  <i className="fas fa-robot mr-2"></i>
                  OpenAI
                </a>
              </li>
              <li>
                <a 
                  href="https://www.stanford.edu" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition flex items-center"
                >
                  <i className="fas fa-graduation-cap mr-2"></i>
                  Stanford Tech Initiative
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us & Social Media */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@technews.com" className="text-gray-400 hover:text-white transition flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  contact@technews.com
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition flex items-center">
                  <i className="fas fa-phone mr-2"></i>
                  +212 (555) 123-4567
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/technews" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition flex items-center"
                >
                  <i className="fab fa-linkedin mr-2"></i>
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/technews" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition flex items-center"
                >
                  <i className="fab fa-x-twitter mr-2"></i>
                  X (Twitter)
                </a>
              </li>
              <li>
                <a 
                  href="https://facebook.com/technews" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition flex items-center"
                >
                  <i className="fab fa-facebook mr-2"></i>
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400">Subscribe to our newsletter for the latest tech updates.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400">
              {new Date().getFullYear()} TechNews. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <span className="sr-only">GitHub</span>
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;