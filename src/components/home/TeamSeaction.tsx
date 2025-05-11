import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Github, Linkedin, Globe } from 'lucide-react'; // Globe used for portfolio
import { get_all_team_members_action } from "@/services/team";
import {JSX} from "react";

// Define types based on your Zod schema
interface TeamMember {
  id: string;
  name: string;
  title: string;
  profileImage?: string;
  description: string;
  gitHub: string;
  linkedIn: string;
  facebook: string;
  portfolio: string;
}

// Social icon component
const SocialIcon = ({ platform, url }: { platform: string; url: string }) => {
  const iconSize = 18;

  const icons: Record<string, JSX.Element> = {
    github: <Github size={iconSize} />,
    linkedin: <Linkedin size={iconSize} />,
    facebook: <Facebook size={iconSize} />,
    portfolio: <Globe size={iconSize} />,
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
              src={member.profileImage || '/placeholder.svg'}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold">{member.name}</h3>
          <p className="text-primary font-medium mb-2">{member.title}</p>
          <div className="mt-2 mb-4 flex-grow">
            <blockquote className="italic text-gray-600 border-l-4 border-primary pl-4 py-1">
              "{member.description}"
            </blockquote>
          </div>

          <div className="flex space-x-4 mt-auto">
            {member.gitHub && <SocialIcon platform="github" url={member.gitHub} />}
            {member.linkedIn && <SocialIcon platform="linkedin" url={member.linkedIn} />}
            {member.facebook && <SocialIcon platform="facebook" url={member.facebook} />}
            {member.portfolio && <SocialIcon platform="portfolio" url={member.portfolio} />}
          </div>
        </div>
      </div>
  );
};

// Main team section component
export default async function TeamSection() {
  const { data } = await get_all_team_members_action();

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
            {data?.map((member: TeamMember) => (
                <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
  );
}
