import CountrySelector from "./CountrySelector";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white px-6 md:px-16 py-10">
        <div className="grid md:grid-cols-5 gap-10">
          {/* Logo and About */}
          <div>
            <h2 className="text-white text-xl font-bold mb-4">★ Trustpilot</h2>
            <div className="space-y-2 text-sm text-gray-300">
              <p>About us</p>
              <p>Jobs</p>
              <p>Contact</p>
              <p>Blog</p>
              <p>How Trustpilot works</p>
              <p>Transparency Report</p>
              <p>Press</p>
              <p>Investor Relations</p>
              <button className="mt-4">
                <h1>image</h1>
                {/* <img src="/apple-store-badge.svg" alt="Download on App Store" className="h-10" /> */}
              </button>
            </div>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-gray-400 font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Trust in reviews</li>
              <li>Help Center</li>
              <li>Log in</li>
              <li>Sign up</li>
            </ul>
          </div>

          {/* Businesses */}
          <div>
            <h3 className="text-gray-400 font-semibold mb-4">Businesses</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Trustpilot Business</li>
              <li>Products</li>
              <li>Plans & Pricing</li>
              <li>Business Login</li>
              <li>Blog for Business</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-gray-400 font-semibold mb-4">Follow us on</h3>
            <div className="flex space-x-4 text-white text-xl">
              {/* Replace with actual icons */}
              <span>🌐</span>
              <span>🐦</span>
              <span>📸</span>
              <span>💼</span>
              <span>▶️</span>
            </div>
          </div>

          {/* Country Selector */}
          <div>
            <CountrySelector />
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-x-4">
            <span>Legal</span>
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
            <span>Guidelines for Reviewers</span>
            <span>System status</span>
            <span>Cookie preferences</span>
            <span>Modern Slavery Statement</span>
          </div>
          <div>© 2025 Trustpilot, Inc. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
