'use client';
import CountrySelector from './CountrySelector';
import { useState } from 'react';
import Link from "next/link";
export const dynamic = "force-static";
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
        {
          title:"Plans",
          href:"/plans"
        },
        {
          title:"Services",
          href:"/services"
        }
      ],
    },
    {
      id: 'community',
      title: 'Community',
      isHeader: true,
      links: [
        {
          title:"Trust in reviews",
          href:"/"
        },
        {
          title:"Help Center",
          href:"/"
        },
        {
          title:"Log In",
          href:"/login"
        },
        {
          title:"Sing Up",
          href:"/register"
        }
      ],
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
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
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
                      <Link href={link?.href}>{link?.title}</Link>
                    </li>
                  ))}
                </ul>
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
                          <Link href={link?.href}>{link?.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.id === 'company' && (
                    <button className="mt-4">
                      <h1>image</h1>
                    </button>
                  )}

                  {section.countrySelector && <CountrySelector />}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-xs sm:text-sm text-gray-400">
          <div className="text-center md:text-right mt-4 md:mt-0">
            © 2025 ★ReviewHub, Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
