import {Facebook, Github, Globe, Linkedin} from 'lucide-react'; // Globe used for portfolio
import {get_all_team_members_action} from "@/services/team";

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

// Main team section component
export default async function TeamSection() {
    const {data} = await get_all_team_members_action();

    return (
        <section className="py-16 bg-gray-50 my-10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Our diverse team of talented professionals is dedicated to
                        delivering exceptional results and driving innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
                    {data?.map((member: TeamMember) => (
                        <div
                            key={member.id}
                            className="flex flex-col items-center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl">
                            <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                                 src={member?.profileImage}
                                 alt=""/>

                            <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize">{member?.name}</h1>

                            <p className="mt-2 text-gray-500 capitalize ">{member?.title}</p>

                            <div className="flex items-center gap-6 mt-5">
                                <a href={member?.gitHub} target="_blank" rel="noopener noreferrer">
                                    <Github className="size-5" />
                                </a>
                                <a href={member?.linkedIn} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="size-5" />
                                </a>
                                <a href={member?.facebook} target="_blank" rel="noopener noreferrer">
                                    <Facebook className="size-5" />
                                </a>
                                <a href={member?.portfolio} target="_blank" rel="noopener noreferrer">
                                    <Globe className="size-5" />
                                </a>
                            </div>
                        </div>


                    ))}
                </div>
            </div>
        </section>
    );
}
