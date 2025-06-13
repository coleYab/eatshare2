import { useState } from "react"
import { router } from "@inertiajs/react"
import {
    Heart,
    MessageCircle,
    UserPlus,
    UserCheck,
    MapPin,
    Calendar,
    Globe,
    Instagram,
    Twitter,
    Youtube,
    ChefHat,
    Award,
    Users,
    Clock,
    Star,
} from "lucide-react"
import { Link } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileData = {
    id: 1,
    name: "Chef Maria Rodriguez",
    username: "@username",
    bio: "🍳 Professional Chef & Food Artist\n🌟 Michelin Star Restaurant Owner\n📚 Cookbook Author\n",
    location: "Barcelona, Spain",
    website: "www.chefmaria.com",
    joinedDate: "March 2020",
    isVerified: true,
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    stats: {
        followers: 125400,
        following: 892,
        recipes: 347,
        totalLikes: 2100000,
        avgRating: 4.8,
        totalViews: 15600000,
    },
    socialLinks: {
        instagram: "https://instagram.com/chefmaria",
        twitter: "https://twitter.com/chefmaria",
        youtube: "https://youtube.com/chefmaria",
    },
    isFollowing: false,
}

// Mock recipe data
const recipes = [
    {
        id: 1,
        title: "Truffle Risotto",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300&h=300&fit=crop",
        likes: 15420,
        comments: 234,
        difficulty: "hard",
        cookTime: 45,
        rating: 4.9,
    },
    {
        id: 2,
        title: "Chocolate Soufflé",
        image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop",
        likes: 12890,
        comments: 189,
        difficulty: "hard",
        cookTime: 35,
        rating: 4.8,
    },
    {
        id: 3,
        title: "Mediterranean Paella",
        image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&h=300&fit=crop",
        likes: 18750,
        comments: 312,
        difficulty: "medium",
        cookTime: 60,
        rating: 4.9,
    },
    {
        id: 4,
        title: "Beef Wellington",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop",
        likes: 22100,
        comments: 445,
        difficulty: "hard",
        cookTime: 120,
        rating: 4.7,
    },
    {
        id: 5,
        title: "Lobster Thermidor",
        image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=300&h=300&fit=crop",
        likes: 16780,
        comments: 278,
        difficulty: "hard",
        cookTime: 40,
        rating: 4.8,
    },
    {
        id: 6,
        title: "Crème Brûlée",
        image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=300&h=300&fit=crop",
        likes: 14320,
        comments: 201,
        difficulty: "medium",
        cookTime: 25,
        rating: 4.9,
    },
    {
        id: 7,
        title: "Duck Confit",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop",
        likes: 13450,
        comments: 167,
        difficulty: "hard",
        cookTime: 180,
        rating: 4.6,
    },
    {
        id: 8,
        title: "Ratatouille",
        image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=300&h=300&fit=crop",
        likes: 11890,
        comments: 145,
        difficulty: "medium",
        cookTime: 50,
        rating: 4.7,
    },
    {
        id: 9,
        title: "Bouillabaisse",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop",
        likes: 17650,
        comments: 289,
        difficulty: "hard",
        cookTime: 90,
        rating: 4.8,
    },
]

export default function ProfilePage() {
    const [profile, setProfile] = useState(profileData)
    const [activeTab, setActiveTab] = useState("recipes")
    const [isFollowing, setIsFollowing] = useState(profile.isFollowing)
    const [followersCount, setFollowersCount] = useState(profile.stats.followers)

    const handleFollow = () => {
        setIsFollowing(!isFollowing)
        router.get('/user/1/follow');
        setFollowersCount((prev) => (isFollowing ? prev - 1 : prev + 1))
    }

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M"
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K"
        }
        return num.toString()
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "easy":
                return "bg-green-100 text-green-800"
            case "medium":
                return "bg-yellow-100 text-yellow-800"
            case "hard":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                        {/* Profile Picture */}
                        <div className="relative">
                            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-lg">
                                <AvatarImage src={profile.profileImage || "/placeholder.svg"} alt={profile.name} />
                                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-orange-400 to-red-500 text-white">
                                    {profile.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            {profile.isVerified && (
                                <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                                    <Award size={16} className="text-white" />
                                </div>
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{profile.name}</h1>
                                    {profile.isVerified && (
                                        <Badge className="bg-blue-500 hover:bg-blue-600">
                                            <Award size={12} className="mr-1" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-gray-600 font-medium">{profile.username}</p>
                            </div>

                            {/* Bio */}
                            <div className="space-y-2">
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{profile.bio}</p>

                                {/* Location and Join Date */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        <span>{profile.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>Joined {profile.joinedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Globe size={14} />
                                        <a href={profile.website} className="text-blue-600 hover:underline">
                                            {profile.website}
                                        </a>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-3">
                                    <Button variant="ghost" size="icon" className="text-pink-600 hover:bg-pink-50">
                                        <Instagram size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-blue-500 hover:bg-blue-50">
                                        <Twitter size={18} />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50">
                                        <Youtube size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Follow Button */}
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={handleFollow}
                                className={`px-8 py-2 font-semibold transition-all duration-300 ${
isFollowing
? "bg-gray-200 text-gray-800 hover:bg-gray-300"
: "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
}`}
                            >
                                {isFollowing ? (
                                    <>
                                        <UserCheck size={18} className="mr-2" />
                                        Following
                                    </>
                                ) : (
                                        <>
                                            <UserPlus size={18} className="mr-2" />
                                            Follow
                                        </>
                                    )}
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                            <div className="text-2xl font-bold text-blue-600">{formatNumber(followersCount)}</div>
                            <div className="text-sm text-blue-700 font-medium">Followers</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                            <div className="text-2xl font-bold text-green-600">{formatNumber(profile.stats.following)}</div>
                            <div className="text-sm text-green-700 font-medium">Following</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                            <div className="text-2xl font-bold text-orange-600">{formatNumber(profile.stats.recipes)}</div>
                            <div className="text-sm text-orange-700 font-medium">Recipes</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl">
                            <div className="text-2xl font-bold text-red-600">{formatNumber(profile.stats.totalLikes)}</div>
                            <div className="text-sm text-red-700 font-medium">Total Likes</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl">
                            <div className="text-2xl font-bold text-indigo-600">{formatNumber(profile.stats.totalViews)}</div>
                            <div className="text-sm text-indigo-700 font-medium">Total Views</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="container mx-auto px-4 mt-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl shadow-sm">
                        <TabsTrigger value="recipes" className="flex items-center gap-2">
                            <ChefHat size={16} />
                            Recipes
                        </TabsTrigger>
                        <TabsTrigger value="saved" className="flex items-center gap-2">
                            <Heart size={16} />
                            Saved
                        </TabsTrigger>
                        <TabsTrigger value="tagged" className="flex items-center gap-2">
                            <Users size={16} />
                            Following
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="recipes" className="mt-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recipes.map((recipe) => (
                                <Link href={`/receipe/${recipe.id}`}>
                                    <Card
                                        key={recipe.id}
                                        className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                                    >
                                        <div className="relative aspect-square overflow-hidden">
                                            <img
                                                src={recipe.image || "/placeholder.svg"}
                                                alt={recipe.title}
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />

                                            {/* Overlay on hover */}
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="flex items-center gap-4 text-white">
                                                    <div className="flex items-center gap-1">
                                                        <Heart size={20} />
                                                        <span className="font-semibold">{formatNumber(recipe.likes)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageCircle size={20} />
                                                        <span className="font-semibold">{recipe.comments}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Difficulty Badge */}
                                            <Badge className={`absolute top-3 left-3 ${getDifficultyColor(recipe.difficulty)}`}>
                                                {recipe.difficulty}
                                            </Badge>

                                            {/* Rating Badge */}
                                            <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                                                <Star size={12} className="mr-1 fill-current" />
                                                {recipe.rating}
                                            </Badge>
                                        </div>

                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                                                {recipe.title}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{recipe.cookTime} min</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1">
                                                        <Heart size={14} />
                                                        <span>{formatNumber(recipe.likes)}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MessageCircle size={14} />
                                                        <span>{recipe.comments}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="saved" className="mt-6">
                        <div className="text-center py-12">
                            <Heart size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No saved recipes yet</h3>
                            <p className="text-gray-500">Recipes you save will appear here</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="tagged" className="mt-6">
                        <div className="text-center py-12">
                            <Users size={48} className="mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">You are not following any user yet</h3>
                            <p className="text-gray-500">Users you have followed will appear here</p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

