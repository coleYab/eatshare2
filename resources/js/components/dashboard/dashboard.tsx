import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  Users,
  ChefHat,
  Heart,
  Eye,
  MessageCircle,
  Plus,
  Search,
  Bell,
  Award,
  Bookmark,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  Globe,
  Camera,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Mock data for dashboard
const dashboardStats = {
  totalRecipes: 1247,
  totalUsers: 45623,
  totalViews: 2847392,
  totalLikes: 892456,
  monthlyGrowth: {
    recipes: 12.5,
    users: 8.3,
    views: 23.7,
    likes: 15.2,
  },
}

const chartData = {
  monthly: [
    { month: "Jan", recipes: 65, users: 2400, views: 45000 },
    { month: "Feb", recipes: 78, users: 2800, views: 52000 },
    { month: "Mar", recipes: 92, users: 3200, views: 61000 },
    { month: "Apr", recipes: 105, users: 3600, views: 68000 },
    { month: "May", recipes: 118, users: 4100, views: 75000 },
    { month: "Jun", recipes: 134, users: 4500, views: 84000 },
  ],
  categories: [
    { name: "Italian", value: 35, color: "#FF6B6B" },
    { name: "Asian", value: 28, color: "#4ECDC4" },
    { name: "Mexican", value: 18, color: "#45B7D1" },
    { name: "French", value: 12, color: "#96CEB4" },
    { name: "Others", value: 7, color: "#FFEAA7" },
  ],
  engagement: [
    { day: "Mon", likes: 1200, comments: 340, shares: 180 },
    { day: "Tue", likes: 1450, comments: 420, shares: 220 },
    { day: "Wed", likes: 1680, comments: 380, shares: 190 },
    { day: "Thu", likes: 1320, comments: 450, shares: 240 },
    { day: "Fri", likes: 1890, comments: 520, shares: 280 },
    { day: "Sat", likes: 2100, comments: 680, shares: 350 },
    { day: "Sun", likes: 1750, comments: 590, shares: 310 },
  ],
}

const trendingRecipes = [
  {
    id: 1,
    title: "Spicy Korean Ramen",
    chef: "Chef Kim",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100&h=100&fit=crop",
    views: 15420,
    likes: 2340,
    trend: "up",
    percentage: 23.5,
  },
  {
    id: 2,
    title: "Classic Margherita Pizza",
    chef: "Chef Mario",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop",
    views: 12890,
    likes: 1980,
    trend: "up",
    percentage: 18.2,
  },
  {
    id: 3,
    title: "Chocolate Lava Cake",
    chef: "Chef Sarah",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop",
    views: 11750,
    likes: 1750,
    trend: "down",
    percentage: -5.3,
  },
  {
    id: 4,
    title: "Beef Tacos Supreme",
    chef: "Chef Carlos",
    image: "https://images.unsplash.com/photo-1565299585323-38174c4a6c7b?w=100&h=100&fit=crop",
    views: 9840,
    likes: 1420,
    trend: "up",
    percentage: 12.8,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "recipe",
    user: "Chef Maria",
    action: "published a new recipe",
    target: "Truffle Risotto",
    time: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    type: "like",
    user: "John Doe",
    action: "liked your recipe",
    target: "Chocolate Soufflé",
    time: "4 hours ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    type: "follow",
    user: "Emma Wilson",
    action: "started following you",
    target: "",
    time: "6 hours ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 4,
    type: "comment",
    user: "Mike Johnson",
    action: "commented on",
    target: "Mediterranean Paella",
    time: "8 hours ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
]

const quickActions = [
  { icon: Plus, label: "New Recipe", color: "bg-blue-500", href: "/recipes/new" },
  { icon: Globe, label: "Discover Recipie", color: "bg-red-500", href: "/live" },
  { icon: Globe, label: "Discover Chefs", color: "bg-cyan-500", href: "/live" },
  { icon: Bookmark, label: "Favourites", color: "bg-yellow-500", href: "/collections" },
]

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "recipe":
        return <ChefHat size={16} className="text-blue-500" />
      case "like":
        return <Heart size={16} className="text-red-500" />
      case "follow":
        return <Users size={16} className="text-green-500" />
      case "comment":
        return <MessageCircle size={16} className="text-purple-500" />
      default:
        return <Bell size={16} className="text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="border-b backdrop-blur-sm ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Welcome back! Here's what's happening with your recipes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col gap-2 hover:scale-105 transition-all duration-200 bg-white hover:bg-gray-50"
              >
                <div className={`p-2 rounded-lg ${action.color}`}>
                  <action.icon size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Recipes</CardTitle>
              <ChefHat className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalRecipes)}</div>
              <div className="flex items-center text-xs opacity-90">
                <ArrowUpRight className="mr-1 h-3 w-3" />+{dashboardStats.monthlyGrowth.recipes}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Users</CardTitle>
              <Users className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalUsers)}</div>
              <div className="flex items-center text-xs opacity-90">
                <ArrowUpRight className="mr-1 h-3 w-3" />+{dashboardStats.monthlyGrowth.users}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Views</CardTitle>
              <Eye className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalViews)}</div>
              <div className="flex items-center text-xs opacity-90">
                <ArrowUpRight className="mr-1 h-3 w-3" />+{dashboardStats.monthlyGrowth.views}% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Likes</CardTitle>
              <Heart className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatNumber(dashboardStats.totalLikes)}</div>
              <div className="flex items-center text-xs opacity-90">
                <ArrowUpRight className="mr-1 h-3 w-3" />+{dashboardStats.monthlyGrowth.likes}% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Analytics Charts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Analytics Overview</CardTitle>
                    <CardDescription>Recipe performance over the last 6 months</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    <TabsTrigger value="categories">Categories</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData.monthly}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="url(#colorViews)" />
                          <Area type="monotone" dataKey="users" stackId="1" stroke="#82ca9d" fill="url(#colorUsers)" />
                          <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="engagement" className="space-y-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.engagement}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="likes" fill="#FF6B6B" />
                          <Bar dataKey="comments" fill="#4ECDC4" />
                          <Bar dataKey="shares" fill="#45B7D1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>

                  <TabsContent value="categories" className="space-y-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData.categories}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {chartData.categories.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Trending Recipes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  Trending Recipes
                </CardTitle>
                <CardDescription>Most popular recipes this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingRecipes.map((recipe, index) => (
                    <div
                      key={recipe.id}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="text-lg font-bold text-gray-400 w-6">#{index + 1}</div>
                      <img
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{recipe.title}</h4>
                        <p className="text-sm text-gray-600">by {recipe.chef}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Eye size={14} />
                          {formatNumber(recipe.views)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Heart size={14} />
                          {formatNumber(recipe.likes)}
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 text-sm ${
                          recipe.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {recipe.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {Math.abs(recipe.percentage)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Goals */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates from your network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          {getActivityIcon(activity.type)}
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                            {activity.target && <span className="font-medium">{activity.target}</span>}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>

            {/* Goals & Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target size={20} />
                  Monthly Goals
                </CardTitle>
                <CardDescription>Track your progress this month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>New Recipes</span>
                    <span>8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Recipe Views</span>
                    <span>15.2K/20K</span>
                  </div>
                  <Progress value={76} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>New Followers</span>
                    <span>234/300</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Engagement Rate</span>
                    <span>4.2%/5%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap size={20} />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Today's Views</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Followers</span>
                  <span className="font-semibold text-green-600">+23</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Recipe Likes</span>
                  <span className="font-semibold text-red-600">+156</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Comments</span>
                  <span className="font-semibold text-blue-600">+42</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

