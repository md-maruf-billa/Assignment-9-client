'use client';

import type React from 'react';

import { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Github,
  Linkedin,
  Facebook,
  Globe,
  X,
  User,
  Briefcase,
  CheckCircle,
  Folder,
  Save,
  Search,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AdminReviewPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const [categories, setCategories] = useState([
    {
      id: 'ac1466b4-d48a-46f7-bdd8-37cdbf60950c',
      categoryImage:
        'https://res.cloudinary.com/dza9jdqt6/image/upload/v1746917431/vi0xkwenexusnzcprk0u.png',
      name: 'Laptop',
      website: 'https://example.com/laptops',
      description:
        'High-performance laptops for work and gaming with the latest processors and graphics cards. Perfect for professionals and gamers alike.',
      productCount: 24,
      featured: true,
      createdAt: '2025-04-15T06:54:28.953Z',
      updatedAt: '2025-05-11T06:54:28.953Z',
      reviews: [
        {
          id: 'f5f8b360-f1bb-46ea-ab18-e3ad1bffd0f4',
          title: 'Basic Shipping',
          description: 'klfjdkfjdkjfdkf',
          rating: 5,
          categoryId: 'ac1466b4-d48a-46f7-bdd8-37cdbf60950c',
          productId: 'a2e0524f-49da-4fd3-a10a-c9269e08d444',
          isPremium: false,
          reviewerName: 'user',
          reviewerEmail: 'user@gmail.com',
          reviewerProfilePhoto: null,
          createdAt: '2025-05-11T05:49:17.353Z',
          updatedAt: '2025-05-11T05:49:44.643Z',
          isDeleted: false,
          upVotes: 3,
          downVotes: 2,
        },
      ],
    },
    {
      id: 'bc1466b4-d48a-46f7-bdd8-37cdbf60950d',
      categoryImage:
        'https://res.cloudinary.com/dza9jdqt6/image/upload/v1746917431/vi0xkwenexusnzcprk0u.png',
      name: 'Smartphones',
      website: 'https://example.com/smartphones',
      description:
        'Latest smartphones with cutting-edge technology, high-resolution cameras, and long-lasting batteries.',
      productCount: 36,
      featured: true,
      createdAt: '2025-04-10T06:54:28.953Z',
      updatedAt: '2025-05-09T06:54:28.953Z',
      reviews: [],
    },
    {
      id: 'cc1466b4-d48a-46f7-bdd8-37cdbf60950e',
      categoryImage:
        'https://res.cloudinary.com/dza9jdqt6/image/upload/v1746917431/vi0xkwenexusnzcprk0u.png',
      name: 'Audio Devices',
      website: 'https://example.com/audio',
      description:
        'Premium audio equipment including headphones, speakers, and sound systems for audiophiles.',
      productCount: 18,
      featured: false,
      createdAt: '2025-04-20T06:54:28.953Z',
      updatedAt: '2025-05-05T06:54:28.953Z',
      reviews: [],
    },
    {
      id: 'dc1466b4-d48a-46f7-bdd8-37cdbf60950f',
      categoryImage:
        'https://res.cloudinary.com/dza9jdqt6/image/upload/v1746917431/vi0xkwenexusnzcprk0u.png',
      name: 'Smart Home',
      website: 'https://example.com/smarthome',
      description:
        'Connected devices for the modern home, including speakers, displays, and automation tools.',
      productCount: 42,
      featured: false,
      createdAt: '2025-04-18T06:54:28.953Z',
      updatedAt: '2025-05-07T06:54:28.953Z',
      reviews: [],
    },
    {
      id: 'ec1466b4-d48a-46f7-bdd8-37cdbf60950g',
      categoryImage:
        'https://res.cloudinary.com/dza9jdqt6/image/upload/v1746917431/vi0xkwenexusnzcprk0u.png',
      name: 'Cameras',
      website: 'https://example.com/cameras',
      description:
        'Digital cameras for photography enthusiasts and professionals.',
      productCount: 15,
      featured: false,
      createdAt: '2025-04-22T06:54:28.953Z',
      updatedAt: '2025-05-03T06:54:28.953Z',
      reviews: [],
    },
    {
      id: 'fc1466b4-d48a-46f7-bdd8-37cdbf60950h',
      categoryImage:
        'https://res.cloudinary.com/dza9jdqt6/image/upload/v1746917431/vi0xkwenexusnzcprk0u.png',
      name: 'Gaming',
      website: 'https://example.com/gaming',
      description: 'Gaming consoles, accessories, and peripherals for gamers.',
      productCount: 28,
      featured: true,
      createdAt: '2025-04-25T06:54:28.953Z',
      updatedAt: '2025-05-01T06:54:28.953Z',
      reviews: [],
    },
  ]);

  const [developers, setDevelopers] = useState([
    {
      id: 'b90625ff-9657-4913-85b2-d4623b127adc',
      name: 'Md Abumahid',
      title: 'Backend Developer',
      profileImage:
        'https://res.cloudinary.com/dza9jdqt6/image/upload/v1746946469/pwberu5oizivzbctamhr.png',
      description: "I'm a passionate backend developer",
      gitHub: 'www.github.com/md-maruf-billa',
      linkedIn: 'www.linkedin.com/abumahid-islam',
      facebook: 'www.facebook.com',
      portfolio: 'www.abumahid.com',
      createdAt: '2025-05-11T06:54:28.953Z',
      updatedAt: '2025-05-11T06:54:28.953Z',
    },
    {
      id: 'c90625ff-9657-4913-85b2-d4623b127ade',
      name: 'Sarah Johnson',
      title: 'Frontend Developer',
      profileImage:
        'https://res.cloudinary.com/dza9jdqt6/image/upload/v1746946469/pwberu5oizivzbctamhr.png',
      description: 'Creative frontend developer with a passion for UI/UX',
      gitHub: 'www.github.com/sarahjohnson',
      linkedIn: 'www.linkedin.com/sarah-johnson',
      facebook: 'www.facebook.com/sarahj',
      portfolio: 'www.sarahjohnson.dev',
      createdAt: '2025-05-10T06:54:28.953Z',
      updatedAt: '2025-05-11T06:54:28.953Z',
    },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    categoryImage: '',
    website: '',
    description: '',
    productCount: 0,
    featured: false,
  });

  const [newDeveloper, setNewDeveloper] = useState({
    name: '',
    title: '',
    profileImage: '',
    description: '',
    gitHub: '',
    linkedIn: '',
    facebook: '',
    portfolio: '',
  });

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setNewCategory((prev) => ({ ...prev, featured: checked }));
  };

  const handleDeveloperChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDeveloper((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = () => {
    // In a real app, you would make an API call here
    const newCategoryObj = {
      id: Math.random().toString(36).substring(2, 15),
      ...newCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      reviews: [],
    };
    setCategories((prev) => [...prev, newCategoryObj]);
    setNewCategory({
      name: '',
      categoryImage: '',
      website: '',
      description: '',
      productCount: 0,
      featured: false,
    });
  };

  const handleAddDeveloper = () => {
    // In a real app, you would make an API call here
    const newDeveloperObj = {
      id: Math.random().toString(36).substring(2, 15),
      ...newDeveloper,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setDevelopers((prev) => [...prev, newDeveloperObj]);
    setNewDeveloper({
      name: '',
      title: '',
      profileImage: '',
      description: '',
      gitHub: '',
      linkedIn: '',
      facebook: '',
      portfolio: '',
    });
  };

  // Filter categories based on search query and featured filter
  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (showFeaturedOnly) {
      return matchesSearch && category.featured;
    }

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-4 md:py-6">
        <Tabs defaultValue="categories" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="developers">Our Developers</TabsTrigger>
          </TabsList>

          <TabsContent value="categories">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 md:p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  Product Categories
                </h2>

                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search categories..."
                      className="pl-9 w-full h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="featured-filter"
                        checked={showFeaturedOnly}
                        onCheckedChange={setShowFeaturedOnly}
                      />
                      <Label
                        htmlFor="featured-filter"
                        className="text-sm whitespace-nowrap"
                      >
                        Featured only
                      </Label>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 whitespace-nowrap h-9 px-3">
                          <Plus className="mr-1 h-4 w-4" /> New
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] p-0 max-h-[90vh] overflow-hidden">
                        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                          <DialogTitle className="text-xl">
                            Add New Category
                          </DialogTitle>
                          <DialogClose className="text-white hover:text-gray-300">
                            <X className="h-5 w-5" />
                          </DialogClose>
                        </div>
                        <ScrollArea className="p-6 max-h-[calc(90vh-8rem)]">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <div className="mb-4">
                                <Label htmlFor="name" className="block mb-2">
                                  Category Name
                                </Label>
                                <div className="relative">
                                  <span className="absolute left-3 top-3 text-gray-400">
                                    <Folder className="h-5 w-5" />
                                  </span>
                                  <Input
                                    id="name"
                                    name="name"
                                    value={newCategory.name}
                                    onChange={handleCategoryChange}
                                    placeholder="Enter category name"
                                    className="pl-10"
                                  />
                                </div>
                              </div>

                              <div className="mb-4">
                                <Label htmlFor="website" className="block mb-2">
                                  Website
                                </Label>
                                <div className="relative">
                                  <span className="absolute left-3 top-3 text-gray-400">
                                    <Globe className="h-5 w-5" />
                                  </span>
                                  <Input
                                    id="website"
                                    name="website"
                                    value={newCategory.website || ''}
                                    onChange={handleCategoryChange}
                                    placeholder="https://example.com"
                                    className="pl-10"
                                  />
                                </div>
                              </div>

                              <div className="mb-4">
                                <Label
                                  htmlFor="description"
                                  className="block mb-2"
                                >
                                  Description
                                </Label>
                                <Textarea
                                  id="description"
                                  name="description"
                                  value={newCategory.description || ''}
                                  onChange={handleCategoryChange}
                                  placeholder="Describe this category..."
                                  rows={5}
                                />
                              </div>

                              <div className="mb-4">
                                <Label
                                  htmlFor="productCount"
                                  className="block mb-2"
                                >
                                  Product Count
                                </Label>
                                <Input
                                  id="productCount"
                                  name="productCount"
                                  type="number"
                                  value={newCategory.productCount || ''}
                                  onChange={handleCategoryChange}
                                  placeholder="0"
                                />
                              </div>

                              <div className="flex items-center space-x-2 mb-4">
                                <Switch
                                  id="featured"
                                  checked={newCategory.featured}
                                  onCheckedChange={handleSwitchChange}
                                />
                                <Label htmlFor="featured">
                                  Featured Category
                                </Label>
                              </div>
                            </div>

                            <div>
                              <Label
                                htmlFor="categoryImage"
                                className="block mb-2"
                              >
                                Category Image
                              </Label>
                              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-[250px]">
                                {newCategory.categoryImage ? (
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={
                                        newCategory.categoryImage ||
                                        '/placeholder.svg'
                                      }
                                      alt="Category preview"
                                      fill
                                      className="object-contain"
                                    />
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="absolute top-2 right-2"
                                      onClick={() =>
                                        setNewCategory((prev) => ({
                                          ...prev,
                                          categoryImage: '',
                                        }))
                                      }
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <>
                                    <Image
                                      className="h-16 w-16 text-gray-400 mb-2"
                                      src="/placeholder.svg?height=64&width=64"
                                      alt="Upload"
                                      width={64}
                                      height={64}
                                    />
                                    <div className="text-center">
                                      <Button
                                        variant="link"
                                        className="text-amber-600 font-medium"
                                      >
                                        Upload a file
                                      </Button>
                                      <p className="text-sm text-gray-500">
                                        or drag and drop
                                      </p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        PNG, JPG, GIF, WEBP up to 10MB
                                      </p>
                                    </div>
                                    <Input
                                      id="categoryImage"
                                      name="categoryImage"
                                      type="text"
                                      value={newCategory.categoryImage}
                                      onChange={handleCategoryChange}
                                      placeholder="Or enter image URL"
                                      className="mt-4"
                                    />
                                  </>
                                )}
                              </div>

                              <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mt-4">
                                <h4 className="font-medium text-amber-800 mb-2">
                                  Category Tips
                                </h4>
                                <ul className="space-y-2">
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-amber-800">
                                      Add a professional image to increase brand
                                      recognition
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-amber-800">
                                      Include a website to drive traffic to your
                                      online presence
                                    </span>
                                  </li>
                                  <li className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm text-amber-800">
                                      Write a detailed description that clearly
                                      explains what this category offers
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </ScrollArea>
                        <div className="flex justify-end gap-2 p-4 border-t">
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button
                            onClick={handleAddCategory}
                            className="bg-amber-600 hover:bg-amber-700"
                          >
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <Separator />

              {filteredCategories.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Folder className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No categories found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <div className="p-3 md:p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-1">
                  {filteredCategories.map((category) => (
                    <Card
                      key={category.id}
                      className="overflow-hidden hover:shadow-md transition-all duration-300 border-gray-200 group"
                    >
                      <div className="flex flex-col items-center">
                        <div className="relative w-10 h-10 mt-2 overflow-hidden rounded-md">
                          <Image
                            src={
                              category.categoryImage ||
                              '/placeholder.svg?height=100&width=100'
                            }
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {category.featured && (
                            <div className="absolute top-0 right-0 z-10">
                              <div className="bg-amber-500 w-2 h-2 rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-1 text-center w-full">
                          <p className="text-[10px] font-medium truncate w-full">
                            {category.name}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="developers">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-3 md:p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  Our Developers
                </h2>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 h-9 px-3">
                      <Plus className="mr-1 h-4 w-4" /> Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] p-0 max-h-[90vh] overflow-hidden">
                    <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                      <DialogTitle className="text-xl">
                        Add New Team Member
                      </DialogTitle>
                      <DialogClose className="text-white hover:text-gray-300">
                        <X className="h-5 w-5" />
                      </DialogClose>
                    </div>
                    <ScrollArea className="p-6 max-h-[calc(90vh-8rem)]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-4">
                            <Label htmlFor="dev-name" className="block mb-2">
                              Name
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-3 text-gray-400">
                                <User className="h-5 w-5" />
                              </span>
                              <Input
                                id="dev-name"
                                name="name"
                                value={newDeveloper.name}
                                onChange={handleDeveloperChange}
                                placeholder="Enter name"
                                className="pl-10"
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <Label htmlFor="dev-title" className="block mb-2">
                              Title
                            </Label>
                            <div className="relative">
                              <span className="absolute left-3 top-3 text-gray-400">
                                <Briefcase className="h-5 w-5" />
                              </span>
                              <Input
                                id="dev-title"
                                name="title"
                                value={newDeveloper.title}
                                onChange={handleDeveloperChange}
                                placeholder="Enter job title"
                                className="pl-10"
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <Label
                              htmlFor="dev-description"
                              className="block mb-2"
                            >
                              Description
                            </Label>
                            <Textarea
                              id="dev-description"
                              name="description"
                              value={newDeveloper.description}
                              onChange={handleDeveloperChange}
                              placeholder="Enter description"
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                              <Label
                                htmlFor="dev-github"
                                className="block mb-2"
                              >
                                GitHub
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-400">
                                  <Github className="h-5 w-5" />
                                </span>
                                <Input
                                  id="dev-github"
                                  name="gitHub"
                                  value={newDeveloper.gitHub}
                                  onChange={handleDeveloperChange}
                                  placeholder="GitHub URL"
                                  className="pl-10"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <Label
                                htmlFor="dev-linkedin"
                                className="block mb-2"
                              >
                                LinkedIn
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-400">
                                  <Linkedin className="h-5 w-5" />
                                </span>
                                <Input
                                  id="dev-linkedin"
                                  name="linkedIn"
                                  value={newDeveloper.linkedIn}
                                  onChange={handleDeveloperChange}
                                  placeholder="LinkedIn URL"
                                  className="pl-10"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <Label
                                htmlFor="dev-facebook"
                                className="block mb-2"
                              >
                                Facebook
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-400">
                                  <Facebook className="h-5 w-5" />
                                </span>
                                <Input
                                  id="dev-facebook"
                                  name="facebook"
                                  value={newDeveloper.facebook}
                                  onChange={handleDeveloperChange}
                                  placeholder="Facebook URL"
                                  className="pl-10"
                                />
                              </div>
                            </div>

                            <div className="mb-4">
                              <Label
                                htmlFor="dev-portfolio"
                                className="block mb-2"
                              >
                                Portfolio
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-400">
                                  <Globe className="h-5 w-5" />
                                </span>
                                <Input
                                  id="dev-portfolio"
                                  name="portfolio"
                                  value={newDeveloper.portfolio}
                                  onChange={handleDeveloperChange}
                                  placeholder="Portfolio URL"
                                  className="pl-10"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="dev-profileImage"
                            className="block mb-2"
                          >
                            Profile Image
                          </Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center h-[250px]">
                            {newDeveloper.profileImage ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={
                                    newDeveloper.profileImage ||
                                    '/placeholder.svg'
                                  }
                                  alt="Profile preview"
                                  fill
                                  className="object-contain"
                                />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() =>
                                    setNewDeveloper((prev) => ({
                                      ...prev,
                                      profileImage: '',
                                    }))
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Image
                                  className="h-16 w-16 text-gray-400 mb-2"
                                  src="/placeholder.svg?height=64&width=64"
                                  alt="Upload"
                                  width={64}
                                  height={64}
                                />
                                <div className="text-center">
                                  <Button
                                    variant="link"
                                    className="text-amber-600 font-medium"
                                  >
                                    Upload a file
                                  </Button>
                                  <p className="text-sm text-gray-500">
                                    or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    PNG, JPG, GIF, WEBP up to 10MB
                                  </p>
                                </div>
                                <Input
                                  id="dev-profileImage"
                                  name="profileImage"
                                  type="text"
                                  value={newDeveloper.profileImage}
                                  onChange={handleDeveloperChange}
                                  placeholder="Or enter image URL"
                                  className="mt-4"
                                />
                              </>
                            )}
                          </div>

                          <div className="bg-amber-50 border border-amber-100 rounded-md p-4 mt-4">
                            <h4 className="font-medium text-amber-800 mb-2">
                              Profile Completion Tips
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-amber-800">
                                  Add a professional photo to make your profile
                                  more approachable
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-amber-800">
                                  Include social links to help visitors connect
                                  with you
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-amber-800">
                                  Write a detailed description highlighting your
                                  skills and experience
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    <div className="flex justify-end gap-2 p-4 border-t">
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button
                        onClick={handleAddDeveloper}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Separator />

              <div className="p-3 md:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {developers.map((developer) => (
                  <Card
                    key={developer.id}
                    className="overflow-hidden hover:shadow-md transition-all duration-300 border-gray-200 group"
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-28 w-full bg-gradient-to-b from-emerald-500 to-emerald-700">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3">
                          <div className="relative h-16 w-16 rounded-full border-2 border-white overflow-hidden shadow-lg">
                            <Image
                              src={
                                developer.profileImage ||
                                '/placeholder.svg?height=100&width=100'
                              }
                              alt={developer.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-10 p-3 text-center">
                      <CardTitle className="text-sm group-hover:text-emerald-600 transition-colors">
                        {developer.name}
                      </CardTitle>
                      <Badge className="mt-1 bg-emerald-100 text-emerald-800 border-emerald-200 text-xs py-0">
                        {developer.title}
                      </Badge>
                      <p className="mt-2 text-gray-600 text-xs line-clamp-2">
                        {developer.description}
                      </p>

                      <div className="flex justify-center gap-2 mt-3">
                        <a
                          href={developer.gitHub}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-emerald-600 transition-colors p-1 rounded-full hover:bg-emerald-50"
                        >
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </a>
                        <a
                          href={developer.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-emerald-600 transition-colors p-1 rounded-full hover:bg-emerald-50"
                        >
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                        <a
                          href={developer.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-emerald-600 transition-colors p-1 rounded-full hover:bg-emerald-50"
                        >
                          <Facebook className="h-4 w-4" />
                          <span className="sr-only">Facebook</span>
                        </a>
                        <a
                          href={developer.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-emerald-600 transition-colors p-1 rounded-full hover:bg-emerald-50"
                        >
                          <Globe className="h-4 w-4" />
                          <span className="sr-only">Portfolio</span>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
