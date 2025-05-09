'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileQuestion,
  HelpCircle,
  LifeBuoy,
  Mail,
  MessageSquare,
  Phone,
  Play,
  Search,
  Settings,
  Users,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function GetHelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ data
  const faqItems = [
    {
      question: 'How do I approve pending reviews?',
      answer:
        "Navigate to the Reviews section in the sidebar, then click on the 'Pending' tab. You can review each submission and click the 'Approve' button to publish it on your site.",
    },
    {
      question: 'Can I edit user reviews?',
      answer:
        'Admin users cannot directly edit review content to maintain authenticity. However, you can flag inappropriate content or contact the user to request changes.',
    },
    {
      question: 'How do I add a new product category?',
      answer:
        "Go to Products → Categories and click the 'Add Category' button. Fill in the required information and save to create a new category for your products.",
    },
    {
      question: 'How can I export review data?',
      answer:
        "In the Reviews section, click on the 'Export' button in the top right corner. You can choose to export as CSV or Excel format for your records or analysis.",
    },
    {
      question: 'How do I change notification settings?',
      answer:
        "Go to your profile settings by clicking on your avatar in the top right, then select 'Notification Preferences' to customize when and how you receive alerts.",
    },
    {
      question: 'How do I moderate inappropriate reviews?',
      answer:
        "When viewing a review, click the 'Flag' button to mark it for moderation. You can then choose to hide, delete, or send a warning to the user who posted it.",
    },
    {
      question: 'Can I customize the rating system?',
      answer:
        'Yes, go to Settings → Reviews and you can customize the rating scale (1-5 stars, 1-10, etc.), add custom rating categories, and change the display options.',
    },
    {
      question: 'How do I feature specific reviews on the homepage?',
      answer:
        "In the Reviews section, find the review you want to feature, click the three-dot menu, and select 'Feature on Homepage'. You can manage all featured reviews in the Marketing section.",
    },
    {
      question: 'Is there a way to automatically approve reviews?',
      answer:
        "Yes, go to Settings → Reviews → Moderation and enable 'Auto-approve reviews'. You can set conditions like 'only for verified purchases' or 'users with previous approved reviews'.",
    },
    {
      question: 'How do I respond to user reviews as an admin?',
      answer:
        "Open the review, scroll to the bottom, and use the 'Add Official Response' box. Your response will be highlighted as coming from the admin team.",
    },
    {
      question: 'Can I import reviews from other platforms?',
      answer:
        'Yes, go to Reviews → Import and select the platform you want to import from. We support importing from major review platforms and CSV files.',
    },
    {
      question: 'How do I set up email notifications for new reviews?',
      answer:
        "Go to Settings → Notifications, enable 'Review Notifications' and select which events should trigger an email (new reviews, reported reviews, etc.).",
    },
  ];

  // Team members data
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Support Lead',
      image: '/placeholder.svg?height=80&width=80',
      email: 'alex@reviewhub.com',
      phone: '+1 (555) 123-4567',
      expertise: ['Product Management', 'User Reviews', 'Account Issues'],
    },
    {
      name: 'Sarah Chen',
      role: 'Technical Support',
      image: '/placeholder.svg?height=80&width=80',
      email: 'sarah@reviewhub.com',
      phone: '+1 (555) 234-5678',
      expertise: ['API Integration', 'Data Migration', 'Technical Issues'],
    },
    {
      name: 'Marcus Williams',
      role: 'Customer Success',
      image: '/placeholder.svg?height=80&width=80',
      email: 'marcus@reviewhub.com',
      phone: '+1 (555) 345-6789',
      expertise: ['Onboarding', 'Best Practices', 'Strategy'],
    },
    {
      name: 'Priya Patel',
      role: 'Product Specialist',
      image: '/placeholder.svg?height=80&width=80',
      email: 'priya@reviewhub.com',
      phone: '+1 (555) 456-7890',
      expertise: ['Feature Training', 'Product Updates', 'Customization'],
    },
    {
      name: 'David Kim',
      role: 'Security Expert',
      image: '/placeholder.svg?height=80&width=80',
      email: 'david@reviewhub.com',
      phone: '+1 (555) 567-8901',
      expertise: ['Account Security', 'Permissions', 'Data Protection'],
    },
    {
      name: 'Olivia Martinez',
      role: 'Training Specialist',
      image: '/placeholder.svg?height=80&width=80',
      email: 'olivia@reviewhub.com',
      phone: '+1 (555) 678-9012',
      expertise: ['Admin Training', 'Workshops', 'Documentation'],
    },
  ];

  // YouTube videos data
  const youtubeVideos = [
    {
      title: 'How to Manage Customer Reviews Effectively',
      videoId: 'Zq5fmkH0T78', // This is a placeholder - replace with actual YouTube video IDs
      duration: '10:15',
      views: '15.2k',
      channel: 'Review Hub Tutorials',
      description:
        'Learn the best practices for managing customer reviews on your platform.',
    },
    {
      title: 'Setting Up Your Product Catalog',
      videoId: 'GZ2dmbDmB5I', // This is a placeholder - replace with actual YouTube video IDs
      duration: '8:42',
      views: '8.7k',
      channel: 'Review Hub Tutorials',
      description:
        'A step-by-step guide to setting up and organizing your product catalog.',
    },
    {
      title: 'Advanced Review Analytics Dashboard',
      videoId: 'ny2rBxwvxBY', // This is a placeholder - replace with actual YouTube video IDs
      duration: '12:38',
      views: '5.3k',
      channel: 'Review Hub Tutorials',
      description:
        'Dive deep into analytics to understand customer sentiment and trends.',
    },
    {
      title: 'Responding to Negative Reviews',
      videoId: '37x5dKW-X5U', // This is a placeholder - replace with actual YouTube video IDs
      duration: '7:21',
      views: '23.1k',
      channel: 'Review Hub Tutorials',
      description:
        'Strategies for professionally handling negative customer feedback.',
    },
    {
      title: 'Customizing Your Review Forms',
      videoId: 'n_UhsBZNADM', // This is a placeholder - replace with actual YouTube video IDs
      duration: '9:05',
      views: '4.8k',
      channel: 'Review Hub Tutorials',
      description:
        'Learn how to create custom review forms to gather specific feedback.',
    },
    {
      title: 'Moderating User-Generated Content',
      videoId: '6Jv0wsAlFnU', // This is a placeholder - replace with actual YouTube video IDs
      duration: '11:17',
      views: '7.2k',
      channel: 'Review Hub Tutorials',
      description:
        'Best practices for content moderation and maintaining community standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="text-xl font-semibold">Get Help</h1>
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <form className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search help articles..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        </header>
        <main className="p-6">
          <Tabs defaultValue="all" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="guides">Guides</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
              <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>

            <TabsContent value="all" className="space-y-6">
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Quick Help</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-base">
                        <FileQuestion className="mr-2 h-5 w-5 text-rose-500" />
                        Frequently Asked Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription>
                        Find answers to common questions about managing reviews
                        and products.
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-2"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        View FAQs
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-base">
                        <BookOpen className="mr-2 h-5 w-5 text-emerald-500" />
                        Documentation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription>
                        Comprehensive guides on using all features of the Review
                        Hub admin panel.
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-2"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read Docs
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-base">
                        <Play className="mr-2 h-5 w-5 text-sky-500" />
                        Video Tutorials
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription>
                        Watch step-by-step video guides on how to use Review Hub
                        effectively.
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-2"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Watch Videos
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Popular Topics</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-base">
                        <Users className="mr-2 h-5 w-5 text-violet-500" />
                        Managing User Reviews
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            How to approve pending reviews
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            Flagging inappropriate content
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            Responding to user reviews
                          </Link>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-base">
                        <Settings className="mr-2 h-5 w-5 text-amber-500" />
                        Product Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            Adding new products to catalog
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            Updating product information
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            Managing product categories
                          </Link>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-base">
                        <LifeBuoy className="mr-2 h-5 w-5 text-red-500" />
                        Troubleshooting
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            Common error messages
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            Dashboard loading issues
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Link href="#" className="hover:underline">
                            Image upload problems
                          </Link>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="rounded-lg border bg-card p-6">
                <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:mb-0 sm:mr-6">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium">Need more help?</h3>
                    <p className="text-muted-foreground">
                      Our support team is available 24/7 to assist you with any
                      questions.
                    </p>
                  </div>
                  <div className="mt-4 sm:ml-auto sm:mt-0">
                    <Button>Contact Support</Button>
                  </div>
                </div>
              </section>
            </TabsContent>

            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to common questions about the Review Hub admin
                    dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Can't find what you're looking for?
                  </p>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: 'Getting Started Guide',
                    description:
                      'Learn the basics of the Review Hub admin dashboard',
                    icon: BookOpen,
                    color: 'text-emerald-500',
                  },
                  {
                    title: 'Managing User Accounts',
                    description:
                      'How to handle user registrations and permissions',
                    icon: Users,
                    color: 'text-violet-500',
                  },
                  {
                    title: 'Review Moderation',
                    description: 'Best practices for moderating user reviews',
                    icon: MessageSquare,
                    color: 'text-sky-500',
                  },
                  {
                    title: 'Product Management',
                    description: 'Adding and organizing your product catalog',
                    icon: Settings,
                    color: 'text-amber-500',
                  },
                  {
                    title: 'Analytics & Reporting',
                    description: 'Understanding your dashboard analytics',
                    icon: FileQuestion,
                    color: 'text-rose-500',
                  },
                  {
                    title: 'Advanced Settings',
                    description: 'Customizing your Review Hub experience',
                    icon: Settings,
                    color: 'text-indigo-500',
                  },
                ].map((guide, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center text-base">
                        <guide.icon className={`mr-2 h-5 w-5 ${guide.color}`} />
                        {guide.title}
                      </CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start px-2"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Read Guide
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {youtubeVideos.map((video, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={`https://www.youtube.com/embed/${video.videoId}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{video.title}</CardTitle>
                      <CardDescription className="flex items-center justify-between">
                        <span>{video.channel}</span>
                        <span>
                          {video.views} views • {video.duration}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {video.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Video Playlists</CardTitle>
                  <CardDescription>
                    Explore our curated playlists for in-depth learning on
                    specific topics.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      {
                        title: 'Getting Started Series',
                        count: '8 videos',
                        icon: BookOpen,
                        color: 'text-emerald-500',
                      },
                      {
                        title: 'Advanced Admin Features',
                        count: '12 videos',
                        icon: Settings,
                        color: 'text-violet-500',
                      },
                      {
                        title: 'Customer Engagement Strategies',
                        count: '6 videos',
                        icon: Users,
                        color: 'text-amber-500',
                      },
                    ].map((playlist, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                      >
                        <div
                          className={`rounded-full bg-background p-2 ${playlist.color}`}
                        >
                          <playlist.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-medium">{playlist.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {playlist.count}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button variant="outline" className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    View All Playlists
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Support Team</CardTitle>
                  <CardDescription>
                    Meet our dedicated support team who are here to help you
                    with any questions or issues.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center rounded-lg border p-4 text-center"
                      >
                        <Avatar className="h-20 w-20 mb-3">
                          <AvatarImage
                            src={member.image || '/placeholder.svg'}
                            alt={member.name}
                          />
                          <AvatarFallback>
                            {member.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {member.role}
                        </p>

                        <div className="mt-2 space-y-2 w-full">
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{member.email}</span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{member.phone}</span>
                          </div>
                        </div>

                        <div className="mt-4 w-full">
                          <p className="text-xs font-medium mb-1">Expertise:</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {member.expertise.map((skill, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-6 py-4">
                  <p className="text-sm text-muted-foreground">
                    Support hours: Monday-Friday, 9am-6pm EST
                  </p>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Team
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Schedule a Consultation</CardTitle>
                  <CardDescription>
                    Book a one-on-one session with a support specialist to get
                    personalized help.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4 text-center sm:flex-row sm:space-x-4 sm:space-y-0 sm:text-left">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-medium">Expert Guidance</h3>
                      <p className="text-muted-foreground">
                        Our team offers personalized consultations to help you
                        get the most out of Review Hub. Whether you need help
                        with setup, optimization, or troubleshooting, we're here
                        to help.
                      </p>
                    </div>
                    <div className="sm:ml-auto">
                      <Button>Schedule Call</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
