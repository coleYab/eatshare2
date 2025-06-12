import { useState, useEffect } from "react"
import { Link } from '@inertiajs/react';
import {
    Search,
    Grid3X3,
    List,
    MapPin,
    Star,
    Users,
    ChefHat,
    UserPlus,
    UserCheck,
    Award,
    Sparkles,
    Crown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const featuredChefs = [
    {
        id: 1,
        name: "Gordon Ramsay",
        username: "@gordonramsay",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
        location: "London, UK",
        specialty: "Fine Dining",
        bio: "Michelin Star Chef & TV Personality",
        followers: 2500000,
        following: 892,
        recipes: 347,
        rating: 4.9,
        isVerified: true,
        isFollowing: false,
        badges: ["Michelin Star", "TV Chef", "Bestselling Author"],
        recentRecipes: [
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=80&h=80&fit=crop",
        ],
    },
    {
        id: 2,
        name: "Julia Child",
        username: "@juliachild",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
        location: "Paris, France",
        specialty: "French Cuisine",
        bio: "Master of French Cooking",
        followers: 1800000,
        following: 234,
        recipes: 289,
        rating: 4.8,
        isVerified: true,
        isFollowing: true,
        badges: ["French Master", "Cookbook Author", "Culinary Legend"],
        recentRecipes: [
            "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=80&h=80&fit=crop",
        ],
    },
    {
        id: 3,
        name: "Anthony Bourdain",
        username: "@anthonybourdain",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
        location: "New York, USA",
        specialty: "Global Cuisine",
        bio: "World Traveler & Food Explorer",
        followers: 3200000,
        following: 1456,
        recipes: 412,
        rating: 4.9,
        isVerified: true,
        isFollowing: false,
        badges: ["Travel Chef", "Author", "Cultural Explorer"],
        recentRecipes: [
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=80&h=80&fit=crop",
        ],
    },
]

const allChefs = [
    ...featuredChefs,
    {
        id: 4,
        name: "Maria Rodriguez",
        username: "@chefmaria",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
        location: "Barcelona, Spain",
        specialty: "Mediterranean",
        bio: "Passionate about Mediterranean flavors",
        followers: 125400,
        following: 892,
        recipes: 156,
        rating: 4.7,
        isVerified: true,
        isFollowing: false,
        badges: ["Rising Star", "Mediterranean Expert"],
        recentRecipes: [
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=80&h=80&fit=crop",
        ],
    },
    {
        id: 5,
        name: "Kenji Lopez",
        username: "@kenjilopez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
        location: "San Francisco, USA",
        specialty: "Asian Fusion",
        bio: "Science meets cooking",
        followers: 890000,
        following: 567,
        recipes: 234,
        rating: 4.8,
        isVerified: true,
        isFollowing: true,
        badges: ["Food Scientist", "Innovation Chef"],
        recentRecipes: [
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=80&h=80&fit=crop",
        ],
    },
    {
        id: 6,
        name: "Emma Thompson",
        username: "@emmathompson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
        location: "Melbourne, Australia",
        specialty: "Vegan Cuisine",
        bio: "Plant-based culinary artist",
        followers: 456000,
        following: 234,
        recipes: 189,
        rating: 4.6,
        isVerified: false,
        isFollowing: false,
        badges: ["Vegan Expert", "Sustainability Advocate"],
        recentRecipes: [
            "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=80&h=80&fit=crop",
        ],
    },
    {
        id: 7,
        name: "Carlos Mendez",
        username: "@carlosmendez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
        location: "Mexico City, Mexico",
        specialty: "Mexican Cuisine",
        bio: "Authentic Mexican flavors",
        followers: 678000,
        following: 345,
        recipes: 267,
        rating: 4.7,
        isVerified: true,
        isFollowing: false,
        badges: ["Authentic Mexican", "Spice Master"],
        recentRecipes: [
            "https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=80&h=80&fit=crop",
        ],
    },
    {
        id: 8,
        name: "Sakura Tanaka",
        username: "@sakuratanaka",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
        location: "Tokyo, Japan",
        specialty: "Japanese Cuisine",
        bio: "Traditional Japanese cooking",
        followers: 1200000,
        following: 123,
        recipes: 198,
        rating: 4.9,
        isVerified: true,
        isFollowing: true,
        badges: ["Sushi Master", "Traditional Japanese"],
        recentRecipes: [
            "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1544025162-d76694265947?w=80&h=80&fit=crop",
            "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=80&h=80&fit=crop",
        ],
    },
]

export default function DiscoverPage() {
    const [chefs, setChefs] = useState(allChefs)
    const [filteredChefs, setFilteredChefs] = useState(allChefs)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSpecialty, setSelectedSpecialty] = useState("all")
    const [sortBy, setSortBy] = useState("followers")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [followingStates, setFollowingStates] = useState<Record<number, boolean>>(
        Object.fromEntries(allChefs.map((chef) => [chef.id, chef.isFollowing])),
    )

    const specialties = [
        "all",
        "Fine Dining",
        "French Cuisine",
        "Global Cuisine",
        "Mediterranean",
        "Asian Fusion",
        "Vegan Cuisine",
        "Mexican Cuisine",
        "Japanese Cuisine",
    ]

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M"
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K"
        }
        return num.toString()
    }

    const handleFollow = (chefId: number, chefName: string) => {
        setFollowingStates((prev) => {
            const newState = !prev[chefId]
            return { ...prev, [chefId]: newState }
        })
    }

    // Filter and search logic
    useEffect(() => {
        let result = chefs

        // Apply search filter
        if (searchQuery) {
            result = result.filter(
                (chef) =>
                    chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        chef.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        chef.location.toLowerCase().includes(searchQuery.toLowerCase()),
            )
        }

        // Apply specialty filter
        if (selectedSpecialty !== "all") {
            result = result.filter((chef) => chef.specialty === selectedSpecialty)
        }

        // Apply sorting
        result = [...result].sort((a, b) => {
            switch (sortBy) {
                case "followers":
                    return b.followers - a.followers
                case "rating":
                    return b.rating - a.rating
                case "recipes":
                    return b.recipes - a.recipes
                case "name":
                    return a.name.localeCompare(b.name)
                default:
                    return 0
            }
        })

        setFilteredChefs(result)
    }, [searchQuery, selectedSpecialty, sortBy, chefs])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
            {/* Header */}
            <div className="backdrop-blur-sm border-b sticky top-0 z-40">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text">
                                Discover Amazing Chefs
                            </h1>
                            <p className="text-gray-600 mt-2">Find and follow the world's most talented culinary artists</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* View Toggle */}
                            <div className="flex items-center gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid3X3 size={18} />
                                </Button>
                                <Button
                                    variant={viewMode === "list" ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => setViewMode("list")}
                                >
                                    <List size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Featured Chefs Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Crown className="text-yellow-500" size={24} />
                        <h2 className="text-2xl font-bold text-gray-900">Featured Chefs</h2>
                        <Sparkles className="text-purple-500" size={20} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredChefs.map((chef) => (
                            <Card
                                key={chef.id}
                                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg"
                            >
                                {/* Cover Image */}
                                <div className="relative h-32 overflow-hidden">
                                    <img
                                        src={chef.coverImage || "/placeholder.svg"}
                                        alt={`${chef.name} cover`}
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {chef.isVerified && (
                                            <Badge className="bg-blue-500 hover:bg-blue-600">
                                                <Award size={12} className="mr-1" />
                                                Verified
                                            </Badge>
                                        )}
                                        <Badge className="bg-yellow-500 hover:bg-yellow-600">
                                            <Crown size={12} className="mr-1" />
                                            Featured
                                        </Badge>
                                    </div>

                                    {/* Follow Button */}
                                    <div className="absolute top-3 right-3">
                                        <Button
                                            size="sm"
                                            onClick={() => handleFollow(chef.id, chef.name)}
                                            className={`transition-all duration-300 ${
followingStates[chef.id]
? "bg-gray-200 text-gray-800 hover:bg-gray-300"
: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
}`}
                                        >
                                            {followingStates[chef.id] ? (
                                                <>
                                                    <UserCheck size={14} className="mr-1" />
                                                    Following
                                                </>
                                            ) : (
                                                    <>
                                                        <UserPlus size={14} className="mr-1" />
                                                        Follow
                                                    </>
                                                )}
                                        </Button>
                                    </div>
                                </div>

                                <CardHeader className="relative -mt-12 z-10">
                                    {/* Avatar */}
                                    <div className="flex items-start justify-between">
                                        <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                                            <AvatarImage src={chef.avatar || "/placeholder.svg"} alt={chef.name} />
                                            <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                                                {chef.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                            {chef.name}
                                        </h3>
                                        <p className="text-gray-600 font-medium">{chef.username}</p>
                                        <p className="text-sm text-gray-500 mt-1">{chef.bio}</p>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Location & Specialty */}
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1 text-gray-600">
                                            <MapPin size={14} />
                                            <span>{chef.location}</span>
                                        </div>
                                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                            {chef.specialty}
                                        </Badge>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-lg font-bold text-gray-900">{formatNumber(chef.followers)}</div>
                                            <div className="text-xs text-gray-500">Followers</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-gray-900">{chef.recipes}</div>
                                            <div className="text-xs text-gray-500">Recipes</div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center gap-1">
                                                <Star size={14} className="text-yellow-500 fill-current" />
                                                <span className="text-lg font-bold text-gray-900">{chef.rating}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">Rating</div>
                                        </div>
                                    </div>

                                    {/* Recent Recipes */}
                                    <div>
                                        <div className="text-sm font-medium text-gray-700 mb-2">Recent Recipes</div>
                                        <div className="flex gap-2">
                                            {chef.recentRecipes.map((recipe, index) => (
                                                <div key={index} className="relative w-12 h-12 rounded-lg overflow-hidden">
                                                    <img
                                                        src={recipe || "/placeholder.svg"}
                                                        alt={`Recipe ${index + 1}`}
                                                        className="object-cover hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-1">
                                        {chef.badges.slice(0, 2).map((badge, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                                {badge}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* All Chefs Section */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="text-blue-500" size={24} />
                        <h2 className="text-2xl font-bold text-gray-900">All Chefs</h2>
                    </div>

                    {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredChefs.map((chef) => (
                                <Link href={`/profile/${chef.id}`}>
                                <Card
                                    key={chef.id}
                                    className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-md"
                                >
                                    <div className="relative aspect-square overflow-hidden">
                                        <Link href={`profile/${chef.id}`}>
                                            <img
                                                src={chef.avatar || "/placeholder.svg"}
                                                alt={chef.name}
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </Link>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Quick Stats Overlay */}
                                        <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex justify-between text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Users size={14} />
                                                    <span>{formatNumber(chef.followers)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <ChefHat size={14} />
                                                    <span>{chef.recipes}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="fill-current" />
                                                    <span>{chef.rating}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Follow Button */}
                                        <div className="absolute top-3 right-3">
                                            <Button
                                                size="sm"
                                                onClick={() => handleFollow(chef.id, chef.name)}
                                                className={`transition-all duration-300 ${
followingStates[chef.id]
? "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
}`}
                                            >
                                                {followingStates[chef.id] ? <UserCheck size={14} /> : <UserPlus size={14} />}
                                            </Button>
                                        </div>

                                        {/* Verification Badge */}
                                        {chef.isVerified && (
                                            <div className="absolute top-3 left-3">
                                                <Badge className="bg-blue-500 hover:bg-blue-600">
                                                    <Award size={12} />
                                                </Badge>
                                            </div>
                                        )}
                                    </div>

                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors truncate">
                                            {chef.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 truncate">{chef.specialty}</p>
                                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                                            <MapPin size={12} />
                                            <span className="truncate">{chef.location}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                            <div className="space-y-4">
                                {filteredChefs.map((chef) => (
                                    <Card key={chef.id} className="group hover:shadow-lg transition-all duration-300 bg-white">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-6">

                                                <Link href={`profile/${chef.id}`}>
                                                    <Avatar className="w-16 h-16">
                                                        <AvatarImage src={chef.avatar || "/placeholder.svg"} alt={chef.name} />
                                                        <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                                                            {chef.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </Link>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-bold text-gray-900">{chef.name}</h3>
                                                        {chef.isVerified && (
                                                            <Badge className="bg-blue-500 hover:bg-blue-600">
                                                                <Award size={12} className="mr-1" />
                                                                Verified
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 mb-2">{chef.bio}</p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin size={14} />
                                                            <span>{chef.location}</span>
                                                        </div>
                                                        <Badge variant="secondary">{chef.specialty}</Badge>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-8 text-center">
                                                    <div>
                                                        <div className="text-lg font-bold text-gray-900">{formatNumber(chef.followers)}</div>
                                                        <div className="text-xs text-gray-500">Followers</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-bold text-gray-900">{chef.recipes}</div>
                                                        <div className="text-xs text-gray-500">Recipes</div>
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1">
                                                            <Star size={14} className="text-yellow-500 fill-current" />
                                                            <span className="text-lg font-bold text-gray-900">{chef.rating}</span>
                                                        </div>
                                                        <div className="text-xs text-gray-500">Rating</div>
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={() => handleFollow(chef.id, chef.name)}
                                                    className={`transition-all duration-300 ${
followingStates[chef.id]
? "bg-gray-200 text-gray-800 hover:bg-gray-300"
: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
}`}
                                                >
                                                    {followingStates[chef.id] ? (
                                                        <>
                                                            <UserCheck size={16} className="mr-2" />
                                                            Following
                                                        </>
                                                    ) : (
                                                            <>
                                                                <UserPlus size={16} className="mr-2" />
                                                                Follow
                                                            </>
                                                        )}
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                    {filteredChefs.length === 0 && (
                        <div className="text-center py-12">
                            <Users size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No chefs found</h3>
                            <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

