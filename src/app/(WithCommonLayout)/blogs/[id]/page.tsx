"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaCalendarAlt, FaUser, FaClock, FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { FaArrowRightLong, FaArrowLeftLong } from 'react-icons/fa6';
import { motion } from 'framer-motion';

const BlogDetailsPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<any>(null);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    // Mock data for a single blog post
    const blogData = {
        id: 1,
        title: "How to Respond to Negative Reviews: A Complete Guide",
        excerpt: "Learn effective strategies for responding to negative reviews and turning unhappy customers into loyal advocates for your business.",
        content: [
            {
                type: "paragraph",
                text: "In today's digital marketplace, customer reviews can make or break a business. Negative reviews, in particular, can be challenging to handle, but they also present an opportunity to demonstrate your commitment to customer satisfaction and potentially turn a negative experience into a positive one."
            },
            {
                type: "heading",
                text: "Why Responding to Negative Reviews Matters"
            },
            {
                type: "paragraph",
                text: "When potential customers research your business, they're not just looking at your star rating—they're reading reviews and, importantly, your responses. According to a survey by BrightLocal, 89% of consumers read businesses' responses to reviews. How you respond to criticism speaks volumes about your business values and customer service philosophy."
            },
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
                alt: "Person typing on laptop responding to reviews",
                caption: "Responding promptly to reviews shows customers you value their feedback."
            },
            {
                type: "heading",
                text: "The Psychology Behind Negative Reviews"
            },
            {
                type: "paragraph",
                text: "Understanding why customers leave negative reviews can help you respond more effectively. Often, customers write negative reviews because they feel unheard, disappointed, or frustrated. They're seeking acknowledgment of their experience and, in many cases, a resolution to their problem."
            },
            {
                type: "paragraph",
                text: "By responding thoughtfully to negative reviews, you can address these emotional needs and potentially repair the relationship. Even if you can't win back that specific customer, your response shows future customers that you take feedback seriously and are committed to making things right."
            },
            {
                type: "heading",
                text: "Step-by-Step Guide to Responding to Negative Reviews"
            },
            {
                type: "list",
                items: [
                    "Respond promptly – Aim to respond within 24-48 hours",
                    "Thank the customer for their feedback",
                    "Apologize for their negative experience",
                    "Take responsibility (even if you feel the criticism is unfair)",
                    "Explain what happened (without making excuses)",
                    "Offer to make it right",
                    "Take the conversation offline by providing contact information",
                    "Keep it professional and positive"
                ]
            },
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
                alt: "Team meeting discussing customer feedback",
                caption: "Regular team meetings to review customer feedback can help improve service quality."
            },
            {
                type: "heading",
                text: "Sample Response Templates"
            },
            {
                type: "paragraph",
                text: "While each response should be personalized, having templates can help ensure you cover all the important elements. Here's a basic template you can adapt:"
            },
            {
                type: "quote",
                text: "Dear [Customer Name], Thank you for taking the time to share your feedback. We're sorry to hear that your experience with [specific issue] didn't meet your expectations. At [Your Business], we strive to provide excellent service, and we clearly fell short in your case. [Brief explanation if relevant]. We'd like to make this right for you. Please contact me directly at [email/phone] so we can resolve this issue and improve your experience with us. [Your Name], [Your Position]"
            },
            {
                type: "heading",
                text: "Turning Negative Reviews into Positive Outcomes"
            },
            {
                type: "paragraph",
                text: "A well-handled negative review can actually become a powerful marketing tool. When potential customers see that you respond thoughtfully to criticism and work to resolve issues, it builds trust in your brand. In fact, some studies suggest that businesses with a few negative reviews (that have been handled well) are perceived as more authentic than those with only perfect reviews."
            },
            {
                type: "paragraph",
                text: "Additionally, negative reviews often contain valuable feedback that can help you identify areas for improvement in your business. By addressing these issues, you can prevent similar negative experiences for future customers."
            },
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop",
                alt: "Business team analyzing customer feedback data",
                caption: "Use negative reviews as opportunities for business improvement and team training."
            },
            {
                type: "heading",
                text: "When to Consider Removing Reviews"
            },
            {
                type: "paragraph",
                text: "While most negative reviews should be addressed rather than removed, there are some exceptions. Reviews that contain hate speech, personal attacks, false information, or competitor sabotage may violate platform policies and can often be flagged for removal. However, use this option sparingly and only in clear cases of policy violations."
            },
            {
                type: "heading",
                text: "Conclusion"
            },
            {
                type: "paragraph",
                text: "Responding to negative reviews effectively is an essential skill in today's business environment. By approaching criticism with empathy, professionalism, and a genuine desire to improve, you can transform negative reviews from potential liabilities into opportunities to demonstrate your commitment to customer satisfaction."
            },
            {
                type: "paragraph",
                text: "Remember, the goal isn't to achieve perfect reviews across the board—that's neither realistic nor necessarily desirable. Instead, aim to show that you value all feedback and are committed to continuously improving your products or services based on customer input."
            }
        ],
        category: "customer reviews",
        author: {
            name: "Sarah Johnson",
            role: "Customer Experience Specialist",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
            bio: "Sarah has over 10 years of experience in customer service and reputation management. She specializes in helping businesses transform their customer feedback processes."
        },
        date: "June 15, 2023",
        readTime: "8 min read",
        tags: ["customer service", "negative reviews", "reputation management", "business growth"],
        featuredImage: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop"
    };

    // Mock data for related posts
    const relatedPostsData = [
        {
            id: 2,
            title: "The Impact of Reviews on Purchase Decisions: Latest Research",
            excerpt: "Discover the latest research on how customer reviews influence purchase decisions and why they're more important than ever for your business.",
            category: "marketing",
            author: "Michael Chen",
            date: "July 3, 2023",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
            readTime: "6 min read"
        },
        {
            id: 3,
            title: "Building Trust Online: The Role of Customer Reviews",
            excerpt: "Explore how customer reviews help build trust with potential customers and establish credibility for your brand in the digital marketplace.",
            category: "reputation management",
            author: "Emily Rodriguez",
            date: "July 22, 2023",
            image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop",
            readTime: "5 min read"
        },
        {
            id: 5,
            title: "The Psychology Behind Customer Reviews: Why They Matter",
            excerpt: "Delve into the psychological aspects of why customers trust reviews from strangers and how businesses can leverage this understanding.",
            category: "customer reviews",
            author: "Alex Thompson",
            date: "August 28, 2023",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop",
            readTime: "7 min read"
        }
    ];

    // Simulate fetching data
    useEffect(() => {
        // In a real application, you would fetch the blog post data based on the ID
        // For this example, we'll use the mock data
        setTimeout(() => {
            setBlog(blogData);
            setRelatedPosts(relatedPostsData);
            setIsLoading(false);
        }, 500);
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#FAF8F5]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-[#FAF8F5] px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
                <p className="text-gray-600 mb-8">The blog post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                <Link
                    href="/blogs"
                    className="inline-flex items-center px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                >
                    <FaArrowLeftLong className="mr-2" />
                    Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF8F5] min-h-screen pb-20">
            {/* Hero Section with Featured Image */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
                <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full capitalize mb-4 inline-block">
                                {blog.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white max-w-4xl mb-4">
                                {blog.title}
                            </h1>
                            <div className="flex flex-wrap items-center text-white gap-4 md:gap-6">
                                <div className="flex items-center">
                                    <FaCalendarAlt className="mr-2" />
                                    <span>{blog.date}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaUser className="mr-2" />
                                    <span>{blog.author.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <FaClock className="mr-2" />
                                    <span>{blog.readTime}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <motion.div
                        className="p-6 md:p-10"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                    >
                        {/* Blog Content */}
                        <div className="prose prose-lg max-w-none">
                            {blog.content.map((item: any, index: number) => {
                                switch (item.type) {
                                    case 'paragraph':
                                        return (
                                            <motion.p
                                                key={index}
                                                className="mb-6 text-gray-700"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                            >
                                                {item.text}
                                            </motion.p>
                                        );
                                    case 'heading':
                                        return (
                                            <motion.h2
                                                key={index}
                                                className="text-2xl font-bold text-gray-900 mt-8 mb-4"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                            >
                                                {item.text}
                                            </motion.h2>
                                        );
                                    case 'image':
                                        return (
                                            <motion.div
                                                key={index}
                                                className="my-8"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1, duration: 0.7 }}
                                            >
                                                <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                                                    <Image
                                                        src={item.url}
                                                        alt={item.alt}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                {item.caption && (
                                                    <p className="text-sm text-gray-500 text-center mt-2 italic">
                                                        {item.caption}
                                                    </p>
                                                )}
                                            </motion.div>
                                        );
                                    case 'list':
                                        return (
                                            <motion.ul
                                                key={index}
                                                className="list-disc pl-6 mb-6 space-y-2 text-gray-700"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                            >
                                                {item.items.map((listItem: string, i: number) => (
                                                    <li key={i}>{listItem}</li>
                                                ))}
                                            </motion.ul>
                                        );
                                    case 'quote':
                                        return (
                                            <motion.blockquote
                                                key={index}
                                                className="border-l-4 border-amber-500 pl-4 italic my-6 text-gray-700"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                            >
                                                {item.text}
                                            </motion.blockquote>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>

                        {/* Tags */}
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags:</h3>
                            <div className="flex flex-wrap gap-2">
                                {blog.tags.map((tag: string, index: number) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Share Buttons */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Share this article:</h3>
                            <div className="flex gap-3">
                                <motion.a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaFacebookF />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaTwitter />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaLinkedinIn />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-[#e60023] text-white flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FaPinterestP />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Author Bio */}
                <motion.div
                    className="bg-white rounded-xl shadow-sm overflow-hidden mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <div className="w-24 h-24 relative rounded-full overflow-hidden flex-shrink-0">
                            <Image
                                src={blog.author.image}
                                alt={blog.author.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">{blog.author.name}</h3>
                            <p className="text-amber-600 mb-3">{blog.author.role}</p>
                            <p className="text-gray-600">{blog.author.bio}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10">
                    <motion.div
                        whileHover={{ x: -5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Link
                            href="/blogs"
                            className="inline-flex items-center text-gray-700 hover:text-amber-600 transition-colors duration-200"
                        >
                            <FaArrowLeftLong className="mr-2" />
                            Back to Blogs
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Related Posts Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>

                    <motion.div
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
                        {relatedPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                className="bg-white rounded-xl overflow-hidden shadow-sm"
                                variants={fadeIn}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center text-gray-500 text-sm mb-3 gap-4">
                                        <div className="flex items-center">
                                            <FaCalendarAlt className="mr-1" />
                                            <span>{post.date}</span>
                                        </div>
                                        <div>{post.readTime}</div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                    >
                                        <Link
                                            href={`/blogs/${post.id}`}
                                            className="inline-flex items-center font-semibold text-amber-600 hover:text-amber-800 transition-colors duration-200"
                                        >
                                            Read More
                                            <FaArrowRightLong className="ml-2" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Newsletter Section */}
            <motion.div
                className="bg-amber-50 py-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <motion.div
                        className="bg-white p-8 md:p-12 rounded-xl shadow-sm relative overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-100 rounded-full opacity-50"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-amber-100 rounded-full opacity-50"></div>

                        <div className="relative z-10 text-center md:text-left md:flex items-center justify-between">
                            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Enjoyed this article?
                                </h3>
                                <p className="text-gray-600">
                                    Subscribe to our newsletter to get more insights on review management and customer experience delivered straight to your inbox.
                                </p>
                            </div>
                            <div className="md:w-1/3">
                                <form className="flex flex-col sm:flex-row md:flex-col gap-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="px-4 py-3 bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                                        required
                                    />
                                    <motion.button
                                        type="submit"
                                        className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Subscribe
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                className="bg-gray-900 text-white py-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-extrabold mb-4">Ready to improve your review management?</h2>
                        <p className="text-lg mb-8 max-w-3xl mx-auto">
                            Join thousands of businesses that use ReviewHub to collect, manage, and leverage customer reviews to grow their business.
                        </p>
                        <motion.div
                            className="flex flex-col sm:flex-row justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/plans" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 transition duration-300 shadow-lg">
                                    View Plans
                                    <FaArrowRightLong className="ml-2" />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-md text-white hover:bg-gray-800 transition duration-300">
                                    Contact Us
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogDetailsPage;


