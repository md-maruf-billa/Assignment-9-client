'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';

// Define types for team member data
interface SocialLink {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'github';
  url: string;
}

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  image: string;
  quote: string;
  socialLinks: SocialLink[];
}

// Sample team data
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    designation: 'CEO & Founder',
    image: '/placeholder.svg?height=400&width=400',
    quote: 'Innovation distinguishes between a leader and a follower.',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/sarahjohnson' },
      { platform: 'facebook', url: 'https://facebook.com/sarahjohnson' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/sarahjohnson' },
      { platform: 'github', url: 'https://github.com/sarahjohnson' },
    ],
  },
  {
    id: '2',
    name: 'Michael Chen',
    designation: 'CTO',
    image: '/placeholder.svg?height=400&width=400',
    quote: 'Technology is best when it brings people together.',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/michaelchen' },
      { platform: 'facebook', url: 'https://facebook.com/michaelchen' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/michaelchen' },
      { platform: 'twitter', url: 'https://twitter.com/michaelchen' },
    ],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    designation: 'Lead Designer',
    image: '/placeholder.svg?height=400&width=400',
    quote: 'Design is not just what it looks like. Design is how it works.',
    socialLinks: [
      { platform: 'github', url: 'https://github.com/emilyrodriguez' },
      { platform: 'facebook', url: 'https://facebook.com/emilyrodriguez' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/emilyrodriguez' },
      { platform: 'twitter', url: 'https://twitter.com/emilyrodriguez' },
    ],
  },
  {
    id: '4',
    name: 'David Kim',
    designation: 'Marketing Director',
    image: '/placeholder.svg?height=400&width=400',
    quote:
      'Marketing is no longer about the stuff you make, but the stories you tell.',
    socialLinks: [
      { platform: 'twitter', url: 'https://twitter.com/davidkim' },
      { platform: 'facebook', url: 'https://facebook.com/davidkim' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/davidkim' },
      { platform: 'github', url: 'https://github.com/davidkim' },
    ],
  },
  {
    id: '5',
    name: 'Olivia Wilson',
    designation: 'Product Manager',
    image: '/placeholder.svg?height=400&width=400',
    quote: 'A good product manager is the CEO of the product.',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/oliviawilson' },
      { platform: 'twitter', url: 'https://twitter.com/oliviawilson' },
      { platform: 'github', url: 'https://github.com/oliviawilson' },
      { platform: 'facebook', url: 'https://facebook.com/oliviawilson' },
    ],
  },
  {
    id: '6',
    name: 'James Taylor',
    designation: 'Lead Developer',
    image: '/placeholder.svg?height=400&width=400',
    quote: "Code is like humor. When you have to explain it, it's bad.",
    socialLinks: [
      { platform: 'github', url: 'https://github.com/jamestaylor' },
      { platform: 'twitter', url: 'https://twitter.com/jamestaylor' },
      { platform: 'linkedin', url: 'https://linkedin.com/in/jamestaylor' },
      { platform: 'facebook', url: 'https://facebook.com/jamestaylor' },
    ],
  },
];

// Social icon component
const SocialIcon = ({ platform, url }: SocialLink) => {
  const iconSize = 18;

  const icons = {
    twitter: <Twitter size={iconSize} />,
    facebook: <Facebook size={iconSize} />,
    linkedin: <Linkedin size={iconSize} />,
    github: <Github size={iconSize} />,
  };

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 hover:text-primary transition-colors"
      aria-label={`${platform} profile`}
    >
      {icons[platform]}
    </Link>
  );
};

// Team member card component
const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-64 w-full">
        <Image
          src={member.image || '/placeholder.svg'}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-primary font-medium mb-2">{member.designation}</p>
        <div className="mt-2 mb-4 flex-grow">
          <blockquote className="italic text-gray-600 border-l-4 border-primary pl-4 py-1">
            "{member.quote}"
          </blockquote>
        </div>
        <div className="flex space-x-4 mt-auto">
          {member.socialLinks.map((link, index) => (
            <SocialIcon key={index} platform={link.platform} url={link.url} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main team section component
export default function TeamSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team of talented professionals is dedicated to
            delivering exceptional results and driving innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
