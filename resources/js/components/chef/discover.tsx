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
            <div className="backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-clip-text">
                                Discover Amazing Chefs
                            </h1>
                            <p className="text-gray-600 mt-2">Find and follow the world's most talented culinary artists</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="text-blue-500" size={24} />
                        <h2 className="text-2xl font-bold text-gray-900">All Chefs</h2>
                    </div>

                    <div className="space-y-4">
                        {filteredChefs.map((chef) => (
                            <Card key={chef.id} className="group hover:shadow-lg transition-all duration-300 bg-white">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-6">

                                        <Link href={`/profile/${chef.id}`}>
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

