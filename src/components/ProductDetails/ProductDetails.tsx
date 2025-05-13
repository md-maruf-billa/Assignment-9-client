"use client";

import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
    FaStar,
    FaRegStar,
    FaStarHalfAlt,
    FaComment,
    FaThumbsUp,
    FaTimes,
    FaUser,
    FaCalendarAlt,
    FaCheck,
    FaPaperPlane,
    FaRegComment, FaThumbsDown,
    FaTrash,
    FaCrown
} from 'react-icons/fa';
import {useUser} from "@/context/UserContext";
import {create_review_action, create_voter_action, unvoteAction, getAllVotesAction} from "@/services/review";
import {create_comment_action} from "@/services/comment";
import {get_product_by_category_id_action} from "@/services/product";
import Link from 'next/link';

// Types for the API response
interface ReviewComment {
    id: string;
    reviewId: string;
    accountId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    account: {
        id: string;
        email: string;
        password: string;
        role: string;
        createdAt: string;
        updatedAt: string;
        status: string;
        isDeleted: boolean;
        isCompleteProfile: boolean;
        isPremium: boolean;
        user: {
            id: string;
            name: string;
            accountId: string;
            profileImage: string;
            bio: string;
            createdAt: string;
            updatedAt: string;
            isDeleted: boolean;
        };
        admin: null;
    };
}

interface Vote {
    id: string;
    reviewId: string;
    accountEmail: string;
    type: 'UPVOTE' | 'DOWNVOTE';
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

interface Review {
    id: string;
    title: string;
    description: string;
    rating: number;
    categoryId: string;
    productId: string;
    isPremium: boolean;
    reviewerName: string;
    reviewerEmail: string;
    reviewerProfilePhoto: string | null;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    ReviewComment: ReviewComment[];
    votes: Vote[];
    upVotes?: number;
    downVotes?: number;
}

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    companyId: string;
    categoryId: string;
    reviews: Review[];
}

export interface ProductResponse {
    success: boolean;
    message: string;
    data: Product;
    meta: null;
}

// Form types
type ReviewFormValues = {
    title: string;
    description: string;
    rating: number;
};

type CommentFormValues = {
    content: string;
};

interface ProductDetailsProps {
    productData: ProductResponse;
    isLoading?: boolean;
    setRefatch: React.Dispatch<React.SetStateAction<boolean>>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productData, isLoading,setRefatch }) => {
    const {user} = useUser()
    console.log(user);
    // State for modals
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    // State for comments
    const commentInputRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});
    const [commentExpanded, setCommentExpanded] = useState<{ [key: string]: boolean }>({});
    const [isPostingComment, setIsPostingComment] = useState<{ [key: string]: boolean }>({});
    const [votes, setVotes] = useState<Vote[]>([]);

    // load related product
    useEffect(() => {
        const fetchData = async ()=>{
            const res = await get_product_by_category_id_action(productData?.data?.categoryId as string);
            setRelatedProducts(res?.data)
        }
        fetchData()
    }, [productData?.data?.categoryId]);

    // Fetch votes when component mounts
    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const response = await getAllVotesAction();
                if (response.success) {
                    setVotes(response.data);
                }
            } catch (error) {
                console.error('Error fetching votes:', error);
            }
        };
        fetchVotes();
    }, []);

    // Forms setup
    const {
        register: registerReview,
        handleSubmit: handleSubmitReview,
        reset: resetReviewForm,
        formState: { errors: reviewErrors },
    } = useForm<ReviewFormValues>();

    const {
        register: registerComment,
        handleSubmit: handleSubmitComment,
        reset: resetCommentForm,
        formState: { errors: commentErrors },
    } = useForm<CommentFormValues>();

    // Product data
    const product = productData?.data;

    // Helper functions
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Filter approved reviews
    const approvedReviews = product?.reviews?.filter(review => review.status === 'APPROVED') || [];
    
    // Update the average rating calculation to use approved reviews
    const calculateAverageRating = (reviews: Review[]) => {
        if (!reviews || reviews.length === 0) return 0;
        const approvedReviews = reviews.filter(review => review.status === 'APPROVED');
        if (approvedReviews.length === 0) return 0;
        const sum = approvedReviews.reduce((total, review) => total + review.rating, 0);
        return sum / approvedReviews.length;
    };

    const renderStarRating = (rating: number, size = 'text-xl') => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className={`${size} text-amber-400`} />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className={`${size} text-amber-400`} />);
            } else {
                stars.push(<FaRegStar key={i} className={`${size} text-amber-400`} />);
            }
        }

        return <div className="flex">{stars}</div>;
    };

    // Modal handlers
    const openReviewModal = () => {
        setIsReviewModalOpen(true);
        setSelectedRating(0);
    };

    const closeReviewModal = () => {
        setIsReviewModalOpen(false);
        resetReviewForm();
        setSelectedRating(0);
    };

    // Form submission handlers
    const onSubmitReview = async (data: ReviewFormValues) => {
        if (!user?.email) {
            toast.error('Please Login first!!');
            return;
        }  if (selectedRating === 0) {
            toast.error('Please select a rating');
            return;
        }
        setIsSubmitting(true);
        try {
            const reviewPayload={
                title: data.title,
                description: data.description,
                rating: selectedRating,
                productId:productData?.data?.id,
                categoryId:productData?.data?.categoryId,
                reviewerName:user?.user?.name || user?.admin?.name,
                isPremium: user?.role == "ADMIN",
            }

            const res = await create_review_action(reviewPayload)
            if(res.success){
                toast.success('Review submitted successfully!');
                setRefatch(true)
                closeReviewModal();
            }else{
                toast.error(res.message);
            }
        } catch (error) {
            toast.error('Failed to submit review');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCommentSubmit = async (reviewId: string, data: CommentFormValues) => {
        if(!user?.email){
            toast.error('Please Login first!!');
            return;
        }
        if (!data.content.trim()) {
            toast.error('Comment cannot be empty');
            return;
        }
        setIsPostingComment(prev => ({ ...prev, [reviewId]: true }));
        try {
            const res = await create_comment_action({
                reviewId,
                accountId: user.id,
                content: data?.content
            });
            if(res.success){
                toast.success('Comment added successfully!');
                setRefatch(true)
                resetCommentForm();
                // Close the comment input
                setCommentExpanded(prev => ({ ...prev, [reviewId]: false }));
            }else{
                toast.error(res.message);
            }

        } catch (error) {
            console.error('Error posting comment:', error);
            toast.error('Failed to post comment');
        } finally {
            setIsPostingComment(prev => ({ ...prev, [reviewId]: false }));
        }
    };

    const handleVote = async (reviewId: string, type: string) => {
        let newType = type === "UP" ? 'UPVOTE' : 'DOWNVOTE'
        if(!user?.email){
            toast.error('Please Login first!!');
            return;
        }
        try {
            const res = await create_voter_action({reviewId, type: newType})
            if(res.success){
                toast.success('Vote recorded!');
                // Refresh votes after successful vote
                const votesResponse = await getAllVotesAction();
                if (votesResponse.success) {
                    setVotes(votesResponse.data);
                }
                setRefatch(true)
            }else{
                toast.error(res.message || 'Failed to record vote');
            }
        } catch (error) {
            console.error('Error voting:', error);
            toast.error('Failed to record vote');
        }
    };

    const handleUnvote = async (reviewId: string) => {
        if(!user?.email){
            toast.error('Please Login first!!');
            return;
        }
        try {
            const res = await unvoteAction(reviewId);
            if(res.success){
                toast.success('Vote removed!');
                // Refresh votes after successful unvote
                const votesResponse = await getAllVotesAction();
                if (votesResponse.success) {
                    setVotes(votesResponse.data);
                }
                setRefatch(true);
            } else {
                toast.error(res.message || 'Failed to remove vote');
            }
        } catch (error) {
            console.error('Error removing vote:', error);
            toast.error('Failed to remove vote');
        }
    };

    // Toggle comment input
    const toggleCommentInput = (reviewId: string) => {
        setCommentExpanded(prev => ({
            ...prev,
            [reviewId]: !prev[reviewId]
        }));

        // Focus the textarea when expanded
        if (!commentExpanded[reviewId]) {
            setTimeout(() => {
                commentInputRefs.current[reviewId]?.focus();
            }, 100);
        }
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const reviewItem = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    // Helper function to get vote counts for a review
    const getVoteCounts = (reviewId: string) => {
        const reviewVotes = votes.filter(vote => vote.reviewId === reviewId && !vote.isDeleted);
        return {
            upVotes: reviewVotes.filter(vote => vote.type === 'UPVOTE').length,
            downVotes: reviewVotes.filter(vote => vote.type === 'DOWNVOTE').length
        };
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h3>
                <p className="text-gray-600">The product you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    const averageRating = calculateAverageRating(approvedReviews);

    return (
        <div className="bg-[#FAF8F5] min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                    {/* Product Details Section */}
                    <div className="flex flex-col md:flex-row">
                        {/* Product Image */}
                        <div className="md:w-1/2 relative">
                            <div className="h-96 md:h-full relative">
                                <Image
                                    src={product.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image'}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {approvedReviews.length > 0 && (
                                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md flex items-center">
                                    <FaStar className="text-amber-400 mr-1" />
                                    <span className="font-bold">{averageRating.toFixed(1)}</span>
                                    <span className="text-gray-500 text-sm ml-1">({approvedReviews.length})</span>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2 p-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                            <div className="flex items-center mb-4">
                                {approvedReviews.length > 0 ? (
                                    <>
                                        {renderStarRating(averageRating)}
                                        <span className="ml-2 text-gray-600">
                      {averageRating.toFixed(1)} ({approvedReviews.length} reviews)
                    </span>
                                    </>
                                ) : (
                                    <span className="text-gray-500">No reviews yet</span>
                                )}
                            </div>

                            <div className="text-2xl font-bold text-amber-600 mb-6">
                                ${product.price.toFixed(2)}
                            </div>

                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                                <p className="text-gray-700">{product.description}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <button
                                    onClick={openReviewModal}
                                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors duration-200"
                                >
                                    <FaStar className="mr-2" />
                                    Write a Review
                                </button>
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <div className="flex items-center text-sm text-gray-500 mb-1">
                                    <FaCalendarAlt className="mr-2" />
                                    Added on {formatDate(product.createdAt)}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                                    In Stock
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Reviews Section */}
                    <div className="border-t border-gray-200 p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                                <p className="text-gray-600">
                                    {approvedReviews.length > 0
                                        ? `${approvedReviews.length} reviews for this product`
                                        : 'Be the first to review this product'}
                                </p>
                            </div>

                        </div>

                        {/* Rating Summary */}
                        {approvedReviews.length > 0 && (
                            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
                                        <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</div>
                                        {renderStarRating(averageRating, 'text-2xl')}
                                        <p className="text-gray-600 mt-2">{approvedReviews.length} reviews</p>
                                    </div>

                                    <div className="md:w-3/4 space-y-2">
                                        {[5, 4, 3, 2, 1].map(rating => {
                                            const count = approvedReviews.filter(r => Math.floor(r.rating) === rating).length;
                                            const percentage = approvedReviews.length > 0
                                                ? Math.round((count / approvedReviews.length) * 100)
                                                : 0;

                                            return (
                                                <div key={rating} className="flex items-center">
                                                    <div className="w-12 text-right mr-2">{rating} stars</div>
                                                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-amber-400 rounded-full"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="w-12 text-left ml-2">{percentage}%</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Reviews List */}
                        {approvedReviews.length > 0 ? (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                                className="space-y-6"
                            >
                                {approvedReviews.map(review => (
                                    <motion.div
                                        key={review.id}
                                        variants={reviewItem}
                                        className="border border-gray-200 rounded-lg p-6"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-start">
                                                <div className="mr-4">
                                                    {review.reviewerProfilePhoto ? (
                                                        <Image
                                                            src={review?.reviewerProfilePhoto}
                                                            alt={review?.reviewerName}
                                                            width={600}
                                                            height={600}
                                                            className="rounded-full size-10 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <FaUser className="text-gray-500" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{review?.reviewerName}</h3>
                                                    <div className="flex items-center mt-1">
                                                        {renderStarRating(review?.rating, 'text-sm')}
                                                        <span className="ml-2 text-sm text-gray-500">
                              {formatDate(review.createdAt)}
                            </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {review.isPremium && (
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                        Premium Review
                                                    </span>
                                                    <Link 
                                                        href="/plans" 
                                                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-colors duration-200"
                                                    >
                                                        Buy Premium
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        <h4 className={`${user?.isPremium
                                            ? "blur-none"
                                            : review?.isPremium
                                                ? "blur-sm"
                                                : ""}`}>{review.title}</h4>
                                        <p className={`text-gray-700 mb-4 ${user?.isPremium
                                            ? "blur-none"
                                            : review?.isPremium
                                                ? "blur-sm"
                                                : ""}`}>{review.description}</p>

                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={() => handleVote(review.id, 'UP')}
                                                className="flex items-center text-green-500 hover:text-green-600"
                                            >
                                                <FaThumbsUp className="mr-1" />
                                                <span>{getVoteCounts(review.id).upVotes}</span>
                                            </button>
                                            <button
                                                onClick={() => handleVote(review.id, 'DOWN')}
                                                className="flex items-center text-red-500 hover:text-red-600"
                                            >
                                                <FaThumbsDown className="mr-1" />
                                                <span>{getVoteCounts(review.id).downVotes}</span>
                                            </button>
                                            <button
                                                onClick={() => handleUnvote(review.id)}
                                                className="flex items-center text-gray-500 hover:text-red-500 group relative"
                                                title="Remove your vote"
                                            >
                                                <FaTrash className="mr-1" />
                                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    Remove vote
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => toggleCommentInput(review.id)}
                                                className="flex items-center text-gray-500 hover:text-amber-500 transition-colors duration-200"
                                            >
                                                <FaComment className="mr-1" />
                                                <span>{review?.ReviewComment?.length}</span>
                                            </button>
                                        </div>


                                        {/* Comments Section */}
                                        {review?.ReviewComment?.length > 0 && (
                                            <div className="bg-gray-50 p-4 rounded-md mb-4">
                                                <h5 className="font-medium text-gray-900 mb-3">Comments</h5>
                                                <div className="space-y-4">
                                                    {review?.ReviewComment?.map(comment => (
                                                        <div key={comment.id} className="flex space-x-3 items-center">
                                                            <div className="flex-shrink-0">
                                                                {comment.account.user?.profileImage ? (
                                                                    <Image
                                                                        src={comment.account.user.profileImage}
                                                                        alt={comment.account.user.name}
                                                                        width={600}
                                                                        height={600}
                                                                        className="rounded-full size-8 object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                                        <FaUser className="text-gray-500 text-xs" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="bg-white p-3 rounded-lg shadow-sm">
                                                                    <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-gray-900">
                                      {comment.account.user?.name || 'Anonymous'}
                                    </span>
                                                                        <span className="text-xs text-gray-500">
                                      {formatDate(comment.createdAt)}
                                    </span>
                                                                    </div>
                                                                    <p className="text-gray-700 text-sm">{comment.content}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Comment Input */}
                                        <AnimatePresence>
                                            {commentExpanded[review.id] && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="mt-4"
                                                >
                                                    <form onSubmit={(e) => {
                                                        e.preventDefault();
                                                        const form = e.target as HTMLFormElement;
                                                        const content = (form.elements.namedItem("content") as HTMLInputElement).value;

                                                        handleSubmitComment(() => handleCommentSubmit(review.id, {
                                                            content,
                                                        }))();
                                                    }}
                                                    >
                                                        <div className="flex space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                                    <FaUser className="text-gray-500 text-xs" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                <textarea
                                    {...registerComment('content')}
                                    ref={(el) => { commentInputRefs.current[review.id] = el; }}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                    placeholder="Add a comment..."
                                    rows={3}
                                    name={"content"}
                                ></textarea>
                                                                {commentErrors.content && (
                                                                    <p className="mt-1 text-sm text-red-600">{commentErrors.content.message}</p>
                                                                )}
                                                                <div className="flex justify-end mt-2 space-x-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => toggleCommentInput(review.id)}
                                                                        className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                    <button
                                                                        type="submit"
                                                                        disabled={isPostingComment[review.id]}
                                                                        className={`px-3 py-1.5 bg-amber-500 text-white rounded-md text-sm font-medium hover:bg-amber-600 flex items-center ${
                                                                            isPostingComment[review.id] ? 'opacity-70 cursor-not-allowed' : ''
                                                                        }`}
                                                                    >
                                                                        {isPostingComment[review.id] ? (
                                                                            <>
                                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                                </svg>
                                                                                Posting...
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <FaPaperPlane className="mr-1" />
                                                                                Post
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {!commentExpanded[review.id] && (
                                            <button
                                                onClick={() => toggleCommentInput(review.id)}
                                                className="text-sm text-amber-600 hover:text-amber-800 flex items-center mt-2"
                                            >
                                                <FaRegComment className="mr-1" />
                                                Add a comment
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <FaRegStar className="mx-auto text-gray-400 text-4xl mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Reviews Yet</h3>
                                <p className="text-gray-600 max-w-md mx-auto mb-6">
                                    Be the first to share your experience with this product. Your review helps others make informed decisions.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={openReviewModal}
                                    className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
                                >
                                    <FaStar className="mr-2" />
                                    Write a Review
                                </motion.button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Related Products Section - Placeholder */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts?.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                                <div className="h-48 p-2">
                                    <Image
                                    src={item?.imageUrl}
                                    width={400}
                                    height={400}
                                    alt={item?.name}
                                    className={"h-48"}                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900">{item?.name}</h3>
                                    <div className="flex items-center mt-1">
                                        <div className="flex text-amber-400">
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaStar />
                                            <FaRegStar />
                                        </div>
                                        <span className="text-sm text-gray-500 ml-1">(24)</span>
                                    </div>
                                    <div className="mt-2 font-bold text-amber-600">${item?.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Review Modal */}
            <AnimatePresence>
                {isReviewModalOpen && (
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="bg-gray-900 p-6 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-white">Write a Review</h2>
                                <button
                                    onClick={closeReviewModal}
                                    className="text-gray-300 hover:text-white"
                                >
                                    <FaTimes className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmitReview(onSubmitReview)} className="p-6">
                                <div className="mb-6">
                                    <div className="flex flex-col items-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Rate this product</h3>
                                        <div className="flex space-x-1">
                                            {[1, 2, 3, 4, 5].map((rating) => (
                                                <motion.button
                                                    key={rating}
                                                    type="button"
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setSelectedRating(rating)}
                                                    onMouseEnter={() => setHoverRating(rating)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    className="text-3xl focus:outline-none"
                                                >
                                                    {(hoverRating || selectedRating) >= rating ? (
                                                        <FaStar className="text-amber-400" />
                                                    ) : (
                                                        <FaRegStar className="text-amber-400" />
                                                    )}
                                                </motion.button>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-gray-600">
                                            {selectedRating === 1 && "Poor"}
                                            {selectedRating === 2 && "Fair"}
                                            {selectedRating === 3 && "Good"}
                                            {selectedRating === 4 && "Very Good"}
                                            {selectedRating === 5 && "Excellent"}
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                            Review Title
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            {...registerReview('title', { required: 'Title is required' })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="Summarize your experience"
                                        />
                                        {reviewErrors.title && (
                                            <p className="mt-1 text-sm text-red-600">{reviewErrors.title.message}</p>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                            Review Details
                                        </label>
                                        <textarea
                                            id="description"
                                            rows={5}
                                            {...registerReview('description', { required: 'Review details are required' })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                            placeholder="What did you like or dislike about this product? How was your experience using it?"
                                        ></textarea>
                                        {reviewErrors.description && (
                                            <p className="mt-1 text-sm text-red-600">{reviewErrors.description.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-amber-50 p-4 rounded-lg mb-6">
                                    <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                                        <FaCheck className="mr-2 text-amber-600" />
                                        Review Guidelines
                                    </h4>
                                    <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                                        <li>Focus on the product features and your experience</li>
                                        <li>Be specific and provide examples</li>
                                        <li>Keep it honest and helpful for other customers</li>
                                        <li>Avoid offensive language and personal information</li>
                                    </ul>
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={closeReviewModal}
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <FaStar className="mr-2" />
                                                Submit Review
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetails;


