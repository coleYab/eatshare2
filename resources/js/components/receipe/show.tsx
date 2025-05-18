import { useState } from "react"
import { Link, useForm } from "@inertiajs/react"
import {
  ArrowLeft,
  BookMarked,
  ChefHat,
  Clock,
  Copy,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Play,
  Share2,
  Star,
  ThumbsUp,
  Timer,
  Utensils,
  Users,
  Edit,
  Trash,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { router } from "@inertiajs/react"
// import Rating from "./rating"
import { formatDistanceToNow } from 'date-fns'
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"
// import ReceipePage from "@/pages/receipe"

export default function ShowRecepie({ recipe }: { recipe: any }) {
  const [saved, setSaved] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(423)
  const [activeStep, setActiveStep] = useState(0)

  const { data, setData, post, processing, errors, reset } = useForm({
    message: '',
    rating: 0,
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(`/receipe/${recipe.id}/comment`, {
      onSuccess: () => reset(),
    });
  };


  const stats = {
    likes: 423,
    comments: 87,
    saves: 256,
    shares: 142,
    rating: 4.8,
    reviewCount: 64,
  }

  const toggleSave = () => {
    setSaved(!saved)
  }

  const toggleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  const [comments, setComments] = useState(recipe.comments.slice(0, 6));

  const handleDelete = () => {
    router.delete(`/recepie/${recipe.id}`)
  }

  return (
    <div className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
        <div className="lg:col-span-3 relative">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{recipe.title}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-5">{recipe.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              {/* Author */}
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={recipe.user?.avatar} alt={recipe.user.name} />
                  <AvatarFallback>{recipe.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium flex items-center">
                    {recipe.user.name}
                    {recipe.user?.isVerified && (
                      <svg className="ml-1 h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{recipe.author?.username || "username"}</div>
                </div>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(stats.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                    />
                  ))}
                </div>
                <span className="font-medium">{stats.rating}</span>
                <span className="text-muted-foreground">({stats.reviewCount} reviews)</span>
              </div>

              <Separator orientation="vertical" className="h-6" />

              {/* Stats */}
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-1" title="Likes">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{likesCount}</span>
                </div>
                <div className="flex items-center gap-1" title="Comments">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span>{stats.comments}</span>
                </div>
                <div className="flex items-center gap-1" title="Saves">
                  <BookMarked className="h-4 w-4 text-green-500" />
                  <span>{stats.saves}</span>
                </div>
                <Link href={`/recepie/${recipe.id}/edit`}>
                  <div className="flex items-center gap-1" title="Saves">
                    <Edit className="h-4 w-4 text-green-500" />
                    <span>Edit</span>
                  </div>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger className="flex gap-1"><Trash className=" h-4 w-4 text-red-500" /> Delete </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your recepie.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          <div className="aspect-[4/3] rounded-xl overflow-hidden">
            <img
              src={recipe.image || "https://cdn.pixabay.com/photo/2015/04/08/13/13/pasta-712664_1280.jpg"}
              alt={recipe.title}
              className="object-cover"
            />
          </div>


        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Time details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg text-center">
                  <Clock className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs text-muted-foreground">Prep Time</span>
                  <span className="font-medium">{recipe.preparation_time} min</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg text-center">
                  <Utensils className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs text-muted-foreground">Cook Time</span>
                  <span className="font-medium">{recipe.cooking_time} min</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-muted rounded-lg text-center">
                  <Timer className="h-5 w-5 mb-1 text-orange-500" />
                  <span className="text-xs text-muted-foreground">Total Time</span>
                  <span className="font-medium">{recipe.preparation_time + recipe.cooking_time} min</span>
                </div>
              </div>

              {/* Additional details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-orange-500" />
                    <span>Servings</span>
                  </div>
                  <span className="font-medium">{recipe.serving} Peices</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-4 w-4 text-orange-500" />
                    <span>Difficulty</span>
                  </div>
                  <Badge variant="outline">{recipe.difficulty}</Badge>
                </div>
                <Separator />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2 bg-orange-500 hover:bg-orange-600">
                <Play className="h-4 w-4" />
                Start Cooking
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Ingredients & Instructions Tabs */}
      <Tabs defaultValue="ingredients" className="mb-10">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
        </TabsList>
        <TabsContent value="ingredients" className="mt-6">
          <div className="rounded-xl p-6 border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Ingredients</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  For <strong>{recipe.servings}</strong> servings
                </span>
              </div>
            </div>

            <ul className="space-y-3 mt-4">
              {recipe.ingredients.map((ingredient: any, index: any) => (
                <li key={index} className="flex items-start gap-3 pb-2 border-b">
                  <div className="w-6 h-6 flex-shrink-0 rounded-full border flex items-center justify-center mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{ingredient.name}</span>
                    {(ingredient.amount || ingredient.unit) && (
                      <span className="text-muted-foreground ml-2">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="instructions" className="mt-6">
          <div className="rounded-xl p-6 border shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Instructions</h2>
            </div>

            <div className="space-y-6">
              {recipe.steps.map((step: any, index: any) => (
                <div
                  key={index}
                  className={`flex gap-4 pb-6 ${index < recipe.steps.length - 1 ? "border-b" : ""} ${activeStep === index ? "bg-orange-50 dark:bg-orange-900 -mx-4 px-4 py-4 rounded-lg" : ""}`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full ${activeStep === index ? "bg-orange-500 text-white" : "bg-muted text-foreground"} flex items-center justify-center font-medium`}
                    >
                      {index + 1}
                    </div>
                    {index < recipe.steps.length - 1 && <div className="flex-1 w-0.5 bg-muted" />}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                    {step.time && (
                      <div className="flex items-center gap-1 text-sm text-orange-600 mt-2">
                        <Clock className="h-4 w-4" />
                        <span>{step.time} minutes</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Reviews & Comments</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl font-bold mb-2">{stats.rating}</div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(stats.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {stats.reviewCount} reviews</p>
                </div>
              </CardContent>
            </Card>


            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-muted-foreground mb-3">Have you made this recipe?</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-left block">
                    Your Comment
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Share your experience..."
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className={cn(errors.message && 'border-destructive')}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm text-left">{errors.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-left block">Rating</Label>
                  <div className="flex justify-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setData('rating', star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={cn(
                            'w-6 h-6',
                            (hoveredRating >= star || (!hoveredRating && data.rating >= star))
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && (
                    <p className="text-destructive text-sm text-center">{errors.rating}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={processing || !data.rating || !data.message }
                  className="bg-orange-500 hover:bg-orange-600 w-full"
                >
                  Share Your Experience
                </Button>
              </form>
            </div>
          </div>
          <div className="flex flex-col w-full lg:col-span-3 space-y-6">
            <div className="grid  md:grid-cols-2 gap-2">
              {comments.map((comment) => (
                <Card key={comment.id} className="p-4 bg-white shadow-md rounded-md mb-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{comment.message}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(comment.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-500">{comment.rating} Stars</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => setComments(recipe.comments)}
              disabled={comments.length === recipe.comments.length}
              className="w-1/2 mx-auto"
            >
              Load More Reviews
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
