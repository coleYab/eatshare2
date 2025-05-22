import type React from "react"
import { useState, useEffect } from "react"
import { Link, usePage } from "@inertiajs/react"
import { ArrowLeft, ChefHat, Clock, ImagePlus, Plus, Save, Trash2, Upload, X } from "lucide-react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SharedData } from "@/types"
import { json } from "stream/consumers"

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface Step {
  description: string;
  time: string;
}

interface Recipe {
  id?: string;
  title?: string;
  description?: string;
  preparation_time?: string;
  cooking_time?: string;
  servings?: string;
  difficulty?: string;
  ingredients?: any[];
  steps?: any[];
  tags?: string[];
  image?: string;
  is_public?: boolean;
  allow_comments?: boolean;
}

interface CreateRecipeProps {
  edit: boolean;
  recipe?: Recipe;
}

export default function CreateRecipe({ edit, recipe }: CreateRecipeProps) {
  const [ingredients, setIngredients] = useState<any[]>(recipe?.ingredients || [{ name: "", amount: "", unit: "" }])
  const [steps, setSteps] = useState<any[]>(recipe?.steps || [{ description: "", time: "" }])
  const [selectedTags, setSelectedTags] = useState<string[]>(recipe?.tags || [])
  const [imagePreview, setImagePreview] = useState<string | null>(recipe?.image || null)

  const { data, setData, post, put, processing, errors } = useForm({
    id: recipe?.id || '',
    title: recipe?.title || '',
    description: recipe?.description || '',
    preparation_time: recipe?.preparation_time || '',
    cooking_time: recipe?.cooking_time || '',
    servings: recipe?.servings || '',
    difficulty: recipe?.difficulty || '',
    ingredients: ingredients,
    steps: steps,
    tags: selectedTags,
    image: recipe?.image || '',
    is_public: recipe?.is_public !== undefined ? recipe.is_public : true,
    allow_comments: recipe?.allow_comments !== undefined ? recipe.allow_comments : true,
  })

  useEffect(() => {
    if (recipe) {
      setData({
        id: recipe.id || '',
        title: recipe.title || '',
        description: recipe.description || '',
        preparation_time: recipe.preparation_time || '',
        cooking_time: recipe.cooking_time || '',
        servings: recipe.servings || '',
        difficulty: recipe.difficulty || '',
        ingredients: recipe.ingredients || [{ name: "", amount: "", unit: "" }],
        steps: recipe.steps || [{ description: "", time: "" }],
        tags: recipe.tags || [],
        image: recipe.image || '',
        is_public: recipe.is_public !== undefined ? recipe.is_public : true,
        allow_comments: recipe.allow_comments !== undefined ? recipe.allow_comments : true,
      })
      setIngredients(recipe.ingredients || [{ name: "", amount: "", unit: "" }])
      setSteps(recipe.steps || [{ description: "", time: "" }])
      setSelectedTags(recipe.tags || [])
      setImagePreview(recipe.image || null)
    }
  }, [recipe])

  useEffect(() => {
    setData('ingredients', ingredients)
  }, [ingredients])

  useEffect(() => {
    setData('steps', steps)
  }, [steps])

  useEffect(() => {
    setData('tags', selectedTags)
  }, [selectedTags])

  useEffect(() => {
    setData('image', imagePreview || '')
  }, [imagePreview])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const filteredIngredients = ingredients.filter((a) => a.name !== "")
    const filteredSteps = steps.filter((a) => a.description !== "")

    setIngredients(filteredIngredients)
    setSteps(filteredSteps)

    console.log(data)
    if (edit && data.id) {
      put(`/receipe/${data.id}`, {
        onError: (e) => {
          console.log(JSON.stringify(e))
        }
      })
    } else {
      post('/receipe')
    }
  }

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }])
  }

  const removeIngredient = (index: number) => {
    const newIngredients = [...ingredients]
    newIngredients.splice(index, 1)
    setIngredients(newIngredients)
  }

  const addStep = () => {
    setSteps([...steps, { description: "", time: "" }])
  }

  const removeStep = (index: number) => {
    const newSteps = [...steps]
    newSteps.splice(index, 1)
    setSteps(newSteps)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(e.target.value)
  }

  const availableTags = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snack",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Low-Carb",
    "Keto",
    "Paleo",
    "Mediterranean",
    "Italian",
    "Mexican",
    "Asian",
    "Indian",
    "French",
    "Quick",
    "Easy",
    "Gourmet",
    "Healthy",
    "Comfort Food",
  ]

  const { auth } = usePage<SharedData>().props

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button
            onClick={handleSubmit}
            variant="outline"
            className="gap-2"
            disabled={processing}
          >
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
          <Button
            onClick={handleSubmit}
            className="gap-2 bg-orange-500 hover:bg-orange-600"
            disabled={processing}
          >
            <Upload className="h-4 w-4" />
            Publish Recipe
          </Button>
        </div>
      </header>

      <main className="container py-6 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{edit ? "Edit Recipe" : "Create New Recipe"}</h1>
            <p className="text-muted-foreground">Share your culinary creation with the world</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=JD" alt="@johndoe" />
              <AvatarFallback>{auth.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              Publishing as <span className="font-medium">{auth.user.name}</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Recipe Details</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="publish">Publish</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the essential details about your recipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Recipe Title</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="e.g. Homemade Chocolate Chip Cookies"
                  />
                  {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your recipe in a few sentences..."
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="min-h-[120px]"
                  />
                  {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="prep-time">Preparation Time (minutes)</Label>
                    <Input
                      id="prep-time"
                      value={data.preparation_time}
                      onChange={(e) => setData('preparation_time', e.target.value)}
                      type="number"
                      min="0"
                      placeholder="e.g. 15"
                    />
                    {errors.preparation_time && <p className="text-sm text-destructive">{errors.preparation_time}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cook-time">Cooking Time (minutes)</Label>
                    <Input
                      id="cook-time"
                      value={data.cooking_time}
                      onChange={(e) => setData('cooking_time', e.target.value)}
                      type="number"
                      min="0"
                      placeholder="e.g. 25"
                    />
                    {errors.cooking_time && <p className="text-sm text-destructive">{errors.cooking_time}</p>}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="servings">Servings</Label>
                    <Input
                      id="servings"
                      value={data.servings}
                      onChange={(e) => setData('servings', e.target.value)}
                      type="number"
                      min="1"
                      placeholder="e.g. 4"
                    />
                    {errors.servings && <p className="text-sm text-destructive">{errors.servings}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={data.difficulty} onValueChange={(value) => setData('difficulty', value)}>
                      <SelectTrigger id="difficulty">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.difficulty && <p className="text-sm text-destructive">{errors.difficulty}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recipe Image</CardTitle>
                <CardDescription>Enter the URL of a high-quality image of your finished dish</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-4">
                  {imagePreview ? (
                    <div className="relative w-full max-w-md">
                      <img
                        src={imagePreview}
                        alt="Recipe preview"
                        width={500}
                        height={300}
                        className="rounded-lg object-cover aspect-video"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-8 w-8 rounded-full"
                        onClick={() => setImagePreview(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full max-w-md border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center">
                      <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Enter an image URL below</p>
                        <p className="text-xs text-muted-foreground">Use a valid image URL (PNG, JPG, or WEBP)</p>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-center w-full max-w-md">
                    <div className="w-full space-y-2">
                      <Label htmlFor="recipe-image-url">Image URL</Label>
                      <Input
                        id="recipe-image-url"
                        type="url"
                        placeholder="e.g. https://example.com/recipe-image.jpg"
                        value={imagePreview || ''}
                        onChange={handleImageUrlChange}
                      />
                      {errors.image && <p className="text-sm text-destructive">{errors.image}</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>List all ingredients needed for your recipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-end gap-3">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor={`ingredient-${index}`}>Ingredient</Label>
                      <Input
                        id={`ingredient-${index}`}
                        placeholder="e.g. All-purpose flour"
                        value={ingredient.name}
                        onChange={(e) => {
                          const newIngredients = [...ingredients]
                          newIngredients[index].name = e.target.value
                          setIngredients(newIngredients)
                        }}
                      />
                    </div>
                    <div className="w-20 space-y-2">
                      <Label htmlFor={`amount-${index}`}>Amount</Label>
                      <Input
                        id={`amount-${index}`}
                        placeholder="e.g. 2"
                        value={ingredient.amount}
                        onChange={(e) => {
                          const newIngredients = [...ingredients]
                          newIngredients[index].amount = e.target.value
                          setIngredients(newIngredients)
                        }}
                      />
                    </div>
                    <div className="w-24 space-y-2">
                      <Label htmlFor={`unit-${index}`}>Unit</Label>
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) => {
                          const newIngredients = [...ingredients]
                          newIngredients[index].unit = value
                          setIngredients(newIngredients)
                        }}
                      >
                        <SelectTrigger id={`unit-${index}`}>
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cup">cup</SelectItem>
                          <SelectItem value="tbsp">tbsp</SelectItem>
                          <SelectItem value="tsp">tsp</SelectItem>
                          <SelectItem value="oz">oz</SelectItem>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="ml">ml</SelectItem>
                          <SelectItem value="piece">piece</SelectItem>
                          <SelectItem value="to taste">to taste</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mb-2 text-muted-foreground hover:text-destructive"
                      onClick={() => removeIngredient(index)}
                      disabled={ingredients.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2" onClick={addIngredient}>
                  <Plus className="h-4 w-4" />
                  Add Ingredient
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cooking Instructions</CardTitle>
                <CardDescription>Provide step-by-step instructions for preparing your recipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {steps.map((step, index) => (
                  <div key={index} className="space-y-4 border-b pb-6 last:border-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Step {index + 1}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeStep(index)}
                        disabled={steps.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`step-${index}`}>Instructions</Label>
                      <Textarea
                        id={`step-${index}`}
                        placeholder="Describe this step in detail..."
                        className="min-h-[100px]"
                        value={step.description}
                        onChange={(e) => {
                          const newSteps = [...steps]
                          newSteps[index].description = e.target.value
                          setSteps(newSteps)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`time-${index}`}>Time Required (optional)</Label>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {step.time ? `${step.time} minutes` : "No time set"}
                          </span>
                        </div>
                      </div>
                      <Input
                        id={`time-${index}`}
                        type="number"
                        min="0"
                        placeholder="Time in minutes"
                        value={step.time}
                        onChange={(e) => {
                          const newSteps = [...steps]
                          newSteps[index].time = e.target.value
                          setSteps(newSteps)
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <span>Add Image to Step</span>
                        <span className="text-xs text-muted-foreground">(Coming soon)</span>
                      </Label>
                      <div className="flex items-center justify-center w-full border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center opacity-50">
                        <ImagePlus className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2" onClick={addStep}>
                  <Plus className="h-4 w-4" />
                  Add Step
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="publish" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tags & Categories</CardTitle>
                <CardDescription>Help others discover your recipe by adding relevant tags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                        <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                    {selectedTags.length === 0 && (
                      <span className="text-sm text-muted-foreground">No tags selected</span>
                    )}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label>Available Tags</Label>
                    <div className="flex flex-wrap gap-2">
                      {availableTags
                        .filter((tag) => !selectedTags.includes(tag))
                        .map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-muted"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visibility & Settings</CardTitle>
                <CardDescription>Control who can see your recipe and how it appears</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="public">Public Recipe</Label>
                      <p className="text-sm text-muted-foreground">Make your recipe visible to everyone</p>
                    </div>
                    <Switch
                      id="public"
                      checked={data.is_public}
                      onCheckedChange={(checked) => setData('is_public', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="comments">Allow Comments</Label>
                      <p className="text-sm text-muted-foreground">Let others comment on your recipe</p>
                    </div>
                    <Switch
                      id="comments"
                      checked={data.allow_comments}
                      onCheckedChange={(checked) => setData('allow_comments', checked)}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="difficulty-slider">Recipe Difficulty</Label>
                      <span className="text-sm font-medium">{data.difficulty || "Medium"}</span>
                    </div>
                    <Slider
                      id="difficulty-slider"
                      value={[data.difficulty === "easy" ? 0 : data.difficulty === "medium" ? 50 : 100]}
                      max={100}
                      step={50}
                      onValueChange={(value) => {
                        const difficulty = value[0] === 0 ? "easy" : value[0] === 50 ? "medium" : "hard"
                        setData('difficulty', difficulty)
                      }}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Easy</span>
                      <span>Medium</span>
                      <span>Hard</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to Publish</CardTitle>
                <CardDescription>Review your recipe before sharing it with the world</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg bg-muted p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <ChefHat className="h-4 w-4 text-orange-500" />
                      <span className="text-muted-foreground">Recipe Preview</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <h3 className="font-medium">Your recipe is almost ready!</h3>
                      <p className="text-sm text-muted-foreground">
                        Make sure you've filled out all the necessary information before publishing.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <span className="text-sm font-medium">Ingredients</span>
                      <p className="text-sm text-muted-foreground">
                        {ingredients.filter((i) => i.name).length} ingredients added
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium">Instructions</span>
                      <p className="text-sm text-muted-foreground">
                        {steps.filter((s) => s.description).length} steps added
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium">Tags</span>
                      <p className="text-sm text-muted-foreground">{selectedTags.length} tags selected</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm font-medium">Images</span>
                      <p className="text-sm text-muted-foreground">{imagePreview ? "1" : "0"} main image added</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleSubmit}
                  disabled={processing}
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>
                <Button
                  className="gap-2 bg-orange-500 hover:bg-orange-600"
                  onClick={handleSubmit}
                  disabled={processing}
                >
                  <Upload className="h-4 w-4" />
                  Publish Recipe
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}