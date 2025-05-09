"use client";
import { allCategory } from "@/services/category";
import { useEffect, useState } from "react";

// Define types for our data
type Review = {
  id: number;
  title: string;
  author: string;
  rating: number;
  category: string;
  excerpt: string;
  likes: number;
  comments: number;
  date: string;
  isPremium?: boolean;
};

type Category = {
  id: number;
  name: string;
};

export default function CategoryPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("Newest First");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sample data - in a real app, this would come from an API
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await allCategory();
        // Optionally include "All Categories" manually
        setCategories([{ id: 0, name: "All Categories" }, ...result]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // const categories: Category[] = [
  //   { id: 1, name: "All Categories" },
  //   { id: 2, name: "Gadgets" },
  //   { id: 3, name: "Clothing" },
  //   { id: 4, name: "Books" },
  //   { id: 5, name: "Home" },
  //   { id: 6, name: "Beauty" },
  //   { id: 7, name: "Food" },
  //   { id: 8, name: "Sports" },
  //   { id: 9, name: "Other" },
  // ];

  const reviews: Review[] = [
    {
      id: 1,
      title: "Amazing Wireless Headphones",
      author: "John Doe",
      rating: 4.5,
      category: "Gadgets",
      excerpt:
        "These headphones have incredible sound quality and battery life. The noise cancellation is top-notch and they're...",
      likes: 42,
      comments: 12,
      date: "15/05/2023",
    },
    {
      id: 2,
      title: "Disappointing Smartphone Experience",
      author: "Jane Smith",
      rating: 2.0,
      category: "Gadgets",
      excerpt:
        "The battery life is terrible and it overheats frequently. The camera quality is also not as advertised.",
      likes: 18,
      comments: 8,
      date: "10/05/2023",
    },
    {
      id: 3,
      title: "Perfect Running Shoes",
      author: "Mike Johnson",
      rating: 5.0,
      category: "Clothing",
      excerpt:
        "These running shoes provide excellent support and cushioning. The materials are...",
      likes: 36,
      comments: 5,
      date: "08/05/2023",
      isPremium: true,
    },
    {
      id: 4,
      title: "Engaging Mystery Novel",
      author: "Sarah Williams",
      rating: 4.0,
      category: "Books",
      excerpt:
        "This book kept me on the edge of my seat from start to finish. The plot twists were unexpected and the characters were well...",
      likes: 24,
      comments: 3,
      date: "05/05/2023",
    },
    {
      id: 5,
      title: "Versatile Kitchen Appliance",
      author: "David Brown",
      rating: 4.5,
      category: "Home",
      excerpt:
        "This kitchen appliance has made meal prep so much easier. It's versatile, easy to clean, and looks great on my countertop.",
      likes: 30,
      comments: 7,
      date: "01/05/2023",
    },
    {
      id: 6,
      title: "Revolutionary Gaming Console",
      author: "Alex Chen",
      rating: 5.0,
      category: "Gadgets",
      excerpt:
        "This gaming console has changed the way I experience games. The graphics are...",
      likes: 56,
      comments: 15,
      date: "28/04/2023",
      isPremium: true,
    },
  ];

  // Filter and sort reviews based on user selections
  const filteredReviews = reviews
    .filter(
      (review) =>
        (selectedCategory === "All Categories" ||
          review.category === selectedCategory) &&
        review.rating >= minRating &&
        (review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.author.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "Newest First") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "Highest Rated") {
        return b.rating - a.rating;
      } else {
        return a.rating - b.rating;
      }
    });

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
    // Prevent body scroll when modal is open
    if (!isFilterModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const resetFilters = () => {
    setSelectedCategory("All Categories");
    setMinRating(0);
    setSortBy("Newest First");
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            className="w-4 h-4 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              fillOpacity="0.5"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-500">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Reviews</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters - Hidden on mobile */}
        <div className="hidden md:block w-full md:w-64 shrink-0">
          <div className="sticky top-4">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className={`cursor-pointer ${
                      selectedCategory === category.name
                        ? "font-medium text-black"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Minimum Rating</h3>
              <div className="flex items-center gap-4">
                <div
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                  onClick={() => setMinRating(minRating > 0 ? 0 : minRating)}
                >
                  {minRating > 0 && (
                    <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3, 4, 5].map((rating) => (
                    <span
                      key={rating}
                      className={`text-gray-500 cursor-pointer ${
                        minRating === rating ? "font-bold text-black" : ""
                      }`}
                      onClick={() => setMinRating(rating)}
                    >
                      {rating}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Sort By</h3>
              <div className="relative">
                <select
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <button
              className="w-full py-2 text-gray-600 hover:text-gray-900"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search reviews..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="text-gray-400"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>

            <button
              onClick={toggleFilterModal}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
              Filters
            </button>
          </div>

          {/* Product Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <div
                key={review.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{review.title}</h3>
                    {review.isPremium && (
                      <span className="bg-yellow-400 text-xs font-medium px-2 py-1 rounded text-white">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    by {review.author}
                  </p>

                  <div className="flex items-center mb-2">
                    {renderStars(review.rating)}
                  </div>

                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded">
                      {review.category}
                    </span>
                  </div>

                  <p
                    className={`text-sm mb-4 ${
                      review.isPremium ? "blur-sm" : ""
                    }`}
                  >
                    {review.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>
                        <span>{review.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        </svg>
                        <span>{review.comments}</span>
                      </div>
                    </div>
                    <span>{review.date}</span>
                  </div>

                  {review.isPremium && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                        Unlock for $2.99
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredReviews.length > 0 ? (
            <div className="flex items-center justify-center mt-10">
              <nav className="flex items-center gap-1">
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                  Previous
                </button>
                <button className="w-10 h-10 rounded-md border border-gray-300 bg-gray-50 text-gray-900 hover:bg-gray-100">
                  1
                </button>
                <button className="w-10 h-10 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <button className="w-10 h-10 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                  3
                </button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 flex items-center gap-1">
                  Next
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No reviews match your filters. Try adjusting your criteria.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal (shown when isFilterModalOpen is true) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isFilterModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto shadow-xl transition-transform duration-300 ${
            isFilterModalOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filter Reviews</h2>
            <button
              onClick={toggleFilterModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>

          <p className="text-gray-500 mb-6">
            Refine your search with these filters
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Category</h3>
              <div className="relative">
                <select
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Minimum Rating</h3>
              <div className="flex items-center justify-between">
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <div
                    key={rating}
                    className="flex flex-col items-center gap-2"
                  >
                    <span
                      className={`text-gray-500 ${
                        minRating === rating ? "font-bold text-black" : ""
                      }`}
                    >
                      {rating}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-500"
                      onClick={() => setMinRating(rating)}
                    >
                      {minRating > rating && (
                        <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                      )}
                      {minRating === rating && (
                        <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Sort By</h3>
              <div className="relative">
                <select
                  className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                className="flex-1 py-2 px-4 bg-gray-200 rounded-md text-gray-700 font-medium hover:bg-gray-300"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                onClick={toggleFilterModal}
                className="flex-1 py-2 px-4 bg-black rounded-md text-white font-medium hover:bg-gray-800"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
