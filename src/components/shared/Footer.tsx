'use client';
import CountrySelector from './CountrySelector';
import { useState } from 'react';

function Footer() {
  const [expandedSection, setExpandedSection] = useState<string|number|null>(null);

  // Toggle mobile accordion sections
  const toggleSection = (section:string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Footer section data
  const footerSections = [
    {
      id: 'company',
      title: '★ ReviewHub',
      links: [
        'About us',
        'Jobs',
        'Contact',
        'Blog',
        'How ★ReviewHub works',
        'Transparency Report',
        'Press',
        'Investor Relations',
      ],
    },
    {
      id: 'community',
      title: 'Community',
      isHeader: true,
      links: ['Trust in reviews', 'Help Center', 'Log in', 'Sign up'],
    },
    {
      id: 'businesses',
      title: 'Businesses',
      isHeader: true,
      links: [
        'ReviewHub Business',
        'Products',
        'Plans & Pricing',
        'Business Login',
        'Blog for Business',
      ],
    },
    {
      id: 'social',
      title: 'Follow us on',
      isHeader: true,
      socialIcons: true,
    },
    {
      id: 'country',
      title: 'Country',
      isHeader: true,
      countrySelector: true,
    },
  ];

  return (
    <div className="bg-black">
      <footer className="container text-white py-10 px-4 mx-auto">
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
          {footerSections.map((section) => (
            <div key={section.id}>
              <h3
                className={`${
                  section.isHeader ? 'text-gray-400' : 'text-white text-xl'
                } font-semibold mb-4`}
              >
                {section.title}
              </h3>

              {section.links && (
                <ul className="space-y-2 text-sm text-gray-300">
                  {section.links.map((link, idx) => (
                    <li key={idx} className="hover:text-white cursor-pointer">
                      {link}
                    </li>
                  ))}
                </ul>
              )}

              {section.id === 'company' && (
                <button className="mt-4">
                  <h1>image</h1>
                </button>
              )}

              {section.socialIcons && (
                <div className="flex space-x-4 text-white text-xl">
                  <span className="cursor-pointer hover:text-gray-300">🌐</span>
                  <span className="cursor-pointer hover:text-gray-300">🐦</span>
                  <span className="cursor-pointer hover:text-gray-300">📸</span>
                  <span className="cursor-pointer hover:text-gray-300">💼</span>
                  <span className="cursor-pointer hover:text-gray-300">▶️</span>
                </div>
              )}

              {section.countrySelector && <CountrySelector />}
            </div>
          ))}
        </div>

        <div className="md:hidden space-y-2">
          {footerSections.map((section) => (
            <div key={section.id} className="border-b border-gray-800 pb-2">
              <button
                className="w-full flex justify-between items-center py-3"
                onClick={() => toggleSection(section.id)}
                aria-expanded={expandedSection === section.id}
              >
                <h3
                  className={`${
                    section.isHeader ? 'text-gray-400' : 'text-white'
                  } font-semibold`}
                >
                  {section.title}
                </h3>
                <span className="text-gray-400 text-lg">
                  {expandedSection === section.id ? '−' : '+'}
                </span>
              </button>

              {expandedSection === section.id && (
                <div className="py-3">
                  {section.links && (
                    <ul className="space-y-3 text-sm text-gray-300">
                      {section.links.map((link, idx) => (
                        <li
                          key={idx}
                          className="hover:text-white cursor-pointer"
                        >
                          {link}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.id === 'company' && (
                    <button className="mt-4">
                      <h1>image</h1>
                    </button>
                  )}

                  {section.socialIcons && (
                    <div className="flex space-x-4 text-white text-xl py-2">
                      {/* Replace with actual icons */}
                      <span className="cursor-pointer">🌐</span>
                      <span className="cursor-pointer">🐦</span>
                      <span className="cursor-pointer">📸</span>
                      <span className="cursor-pointer">💼</span>
                      <span className="cursor-pointer">▶️</span>
                    </div>
                  )}

                  {section.countrySelector && <CountrySelector />}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-xs sm:text-sm text-gray-400">
          <div className="flex flex-wrap gap-y-3 justify-center md:justify-start mb-6 md:mb-0">
            <span className="px-2 hover:text-white cursor-pointer">Legal</span>
            <span className="px-2 hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="px-2 hover:text-white cursor-pointer">
              Terms & Conditions
            </span>
            <span className="px-2 hover:text-white cursor-pointer">
              Guidelines for Reviewers
            </span>
            <span className="px-2 hover:text-white cursor-pointer">
              System status
            </span>
            <span className="px-2 hover:text-white cursor-pointer">
              Cookie preferences
            </span>
            <span className="px-2 hover:text-white cursor-pointer">
              Modern Slavery Statement
            </span>
          </div>

          <div className="text-center md:text-right mt-4 md:mt-0">
            © 2025 ★ReviewHub, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
