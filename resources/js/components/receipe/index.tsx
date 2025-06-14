"use client"

import { useState } from "react"
import { Link, router } from "@inertiajs/react"
import {
  Search,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Plus,
  Loader2,
  Send,
  X,
  HomeIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "../ui/separator"

// Define filter condition types
type FilterField = "preparation_time" | "cooking_time" | "serving" | "difficulty" | "title"
type FilterOperator = "eq" | "gt" | "lt" | "gte" | "lte" | "contains"

interface FilterCondition {
  id: string
  field: FilterField
  operator: FilterOperator
  value: string | number
}

// Helper function to get operator label
const getOperatorLabel = (operator: FilterOperator): string => {
  switch (operator) {
    case "eq":
      return "equals"
    case "gt":
      return "greater than"
    case "lt":
      return "less than"
    case "gte":
      return "greater than or equal to"
    case "lte":
      return "less than or equal to"
    case "contains":
      return "contains"
    default:
      return operator
  }
}

// Helper function to get field label
const getFieldLabel = (field: FilterField): string => {
  switch (field) {
    case "preparation_time":
      return "Preparation Time"
    case "cooking_time":
      return "Cooking Time"
    case "serving":
      return "Servings"
    case "difficulty":
      return "Difficulty"
    case "title":
      return "Title"
    default:
      return field
  }
}

export default function RecipePage({ data }: { data: any }) {
  // State for recipes and filtering
  const [recipes, setRecipes] = useState<any[]>(() => {
    return data.data.map((recipe) => ({
      ...recipe,
      total_time: recipe.preparation_time + recipe.cooking_time,
    }))
  })
  const [searchQuery, setSearchQuery] = useState("")
  
  // State for query builder
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([])
  const [newCondition, setNewCondition] = useState<Partial<FilterCondition>>({
    field: "title",
    operator: "contains",
    value: "",
  })

  // State for loading
  const [isLoading, setIsLoading] = useState(false)

  // Define available filter fields
  const filterFields: { value: FilterField; label: string }[] = [
    { value: "title", label: "Title" },
    { value: "preparation_time", label: "Preparation Time" },
    { value: "cooking_time", label: "Cooking Time" },
    { value: "serving", label: "Servings" },
    { value: "difficulty", label: "Difficulty" },
  ]

  // Define available operators based on field type
  const getOperatorsForField = (field: FilterField) => {
    switch (field) {
      case "title":
        return [
          { value: "contains", label: "contains" },
          { value: "eq", label: "equals" },
        ]
      case "difficulty":
        return [{ value: "eq", label: "equals" }]
      default:
        return [
          { value: "eq", label: "equals" },
          { value: "gt", label: "greater than" },
          { value: "lt", label: "less than" },
          { value: "gte", label: "greater than or equal to" },
          { value: "lte", label: "less than or equal to" },
        ]
    }
  }

  // Function to add a new filter condition
  const addFilterCondition = () => {
    if (
      !newCondition.field ||
      !newCondition.operator ||
      newCondition.value === undefined ||
      newCondition.value === ""
    ) {
      return
    }

    const id = `filter-${Date.now()}`
    setFilterConditions([...filterConditions, { ...(newCondition as FilterCondition), id }])

    // Reset new condition form
    setNewCondition({
      field: "title",
      operator: "contains",
      value: "",
    })
  }

  // Function to remove a filter condition
  const removeFilterCondition = (id: string) => {
    setFilterConditions(filterConditions.filter((condition) => condition.id !== id))
  }

  // Function to reset all filters
  const resetFilters = () => {
    setFilterConditions([])
    setSearchQuery("")
  }

  // Function to build query parameters from filter conditions
  const buildQueryParams = () => {
    let param = ""
    for (const condition of filterConditions) {
      const curParam = `${condition.field}[${condition.operator}]=${condition.value}`
      param = param ? `${param}&${curParam}` : curParam
    }
    return param
  }

  // Function to fetch recipes from the backend
  const fetchRecipes = async () => {
    setIsLoading(true)
    const queryParams = buildQueryParams()
    router.get(`/receipe?${queryParams}`, {}, {
      preserveState: true,
      onFinish: () => setIsLoading(false),
    })
  }

  // Get difficulty badge color
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

  // Search recipes
  const searchRecipes = () => {
    router.get('/search', { query: searchQuery }, {
      preserveState: true,
      onFinish: () => setIsLoading(false),
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Delicious Recipes</h1>

      {/* Search and Filter Bar - Desktop */}
      <div className="hidden md:flex items-center justify-between mb-8 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search recipes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={searchRecipes}>Search</Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
              {filterConditions.length > 0 && (
                <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {filterConditions.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-8">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Filter Query Builder</h3>
              <p className="text-sm text-muted-foreground">
                Build complex queries by adding multiple filter conditions.
              </p>

              {/* Active filter conditions */}
              {filterConditions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Active Filters:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterConditions.map((condition) => (
                      <div
                        key={condition.id}
                        className="flex items-center justify-between bg-muted p-2 rounded-md text-sm"
                      >
                        <span>
                          {getFieldLabel(condition.field)} {getOperatorLabel(condition.operator)}{" "}
                          <strong>{condition.value}</strong>
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFilterCondition(condition.id)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Add new filter condition */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Add Filter:</h4>

                {/* Field selection */}
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Field</label>
                  <Select
                    value={newCondition.field}
                    onValueChange={(value) =>
                      setNewCondition({
                        ...newCondition,
                        field: value as FilterField,
                        operator: getOperatorsForField(value as FilterField)[0].value,
                        value: "",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterFields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Operator selection */}
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Operator</label>
                  <Select
                    value={newCondition.operator}
                    onValueChange={(value) =>
                      setNewCondition({
                        ...newCondition,
                        operator: value as FilterOperator,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {newCondition.field &&
                        getOperatorsForField(newCondition.field).map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Value input */}
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Value</label>
                  {newCondition.field === "difficulty" ? (
                    <Select
                      value={newCondition.value?.toString() || ""}
                      onValueChange={(value) =>
                        setNewCondition({
                          ...newCondition,
                          value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={
                        ["preparation_time", "cooking_time", "serving"].includes(newCondition.field || "")
                          ? "number"
                          : "text"
                      }
                      placeholder="Enter value"
                      value={newCondition.value?.toString() || ""}
                      onChange={(e) => {
                        const value = ["preparation_time", "cooking_time", "serving"].includes(newCondition.field || "")
                          ? Number(e.target.value)
                          : e.target.value
                        setNewCondition({
                          ...newCondition,
                          value,
                        })
                      }}
                    />
                  )}
                </div>

                <Button onClick={addFilterCondition} className="w-full">
                  <Plus size={16} className="mr-2" /> Add Filter
                </Button>
              </div>

              <Separator />

              {/* Action buttons */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetFilters} size="sm">
                  Reset All
                </Button>
                <Button onClick={fetchRecipes} disabled={isLoading} size="sm">
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" /> Loading...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" /> Apply Filters
                    </>
                  )}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Search and Filter Bar - Mobile */}
      <div className="flex md:hidden items-center gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search recipes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={searchRecipes}>Search</Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <span className="sr-only">Open filters</span>
              <Filter size={16} />
              {filterConditions.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {filterConditions.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Build your query to filter recipes.</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-4">
              {/* Active filter conditions */}
              {filterConditions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Active Filters:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filterConditions.map((condition) => (
                      <div
                        key={condition.id}
                        className="flex items-center justify-between bg-muted p-2 rounded-md text-sm"
                      >
                        <span>
                          {getFieldLabel(condition.field)} {getOperatorLabel(condition.operator)}{" "}
                          <strong>{condition.value}</strong>
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeFilterCondition(condition.id)}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Add new filter condition */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Add Filter:</h4>

                {/* Field selection */}
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Field</label>
                  <Select
                    value={newCondition.field}
                    onValueChange={(value) =>
                      setNewCondition({
                        ...newCondition,
                        field: value as FilterField,
                        operator: getOperatorsForField(value as FilterField)[0].value,
                        value: "",
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {filterFields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Operator selection */}
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Operator</label>
                  <Select
                    value={newCondition.operator}
                    onValueChange={(value) =>
                      setNewCondition({
                        ...newCondition,
                        operator: value as FilterOperator,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select operator" />
                    </SelectTrigger>
                    <SelectContent>
                      {newCondition.field &&
                        getOperatorsForField(newCondition.field).map((op) => (
                          <SelectItem key={op.value} value={op.value}>
                            {op.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Value input */}
                <div>
                  <label className="text-xs text-muted-foreground block mb-1">Value</label>
                  {newCondition.field === "difficulty" ? (
                    <Select
                      value={newCondition.value?.toString() || ""}
                      onValueChange={(value) =>
                        setNewCondition({
                          ...newCondition,
                          value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={
                        ["preparation_time", "cooking_time", "serving"].includes(newCondition.field || "")
                          ? "number"
                          : "text"
                      }
                      placeholder="Enter value"
                      value={newCondition.value?.toString() || ""}
                      onChange={(e) => {
                        const value = ["preparation_time", "cooking_time", "serving"].includes(newCondition.field || "")
                          ? Number(e.target.value)
                          : e.target.value
                        setNewCondition({
                          ...newCondition,
                          value,
                        })
                      }}
                    />
                  )}
                </div>

                <Button onClick={addFilterCondition} className="w-full">
                  <Plus size={16} className="mr-2" /> Add Filter
                </Button>
              </div>

              <Separator />

              {/* Action buttons */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={resetFilters} size="sm">
                  Reset All
                </Button>
                <Button onClick={fetchRecipes} disabled={isLoading} size="sm">
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" /> Loading...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" /> Apply Filters
                    </>
                  )}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Apply Filters Button */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-gray-500">
          Showing {data.data.length} of {data.total} recipes
        </p>
        <Button onClick={fetchRecipes} disabled={isLoading} className="sm:w-auto w-full" variant="default">
          {isLoading ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" /> Loading...
            </>
          ) : (
            <>
              <Send size={16} className="mr-2" /> Apply Filters & Get Recipes
            </>
          )}
        </Button>
      </div>

      {/* Active Filters Display */}
      {filterConditions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {filterConditions.map((condition) => (
              <Badge key={condition.id} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                <span>
                  {getFieldLabel(condition.field)} {getOperatorLabel(condition.operator)}{" "}
                  <strong>{condition.value}</strong>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1"
                  onClick={() => removeFilterCondition(condition.id)}
                >
                  <X size={12} />
                </Button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-7">
              Clear All
            </Button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center my-12">
          <div className="flex flex-col items-center">
            <Loader2 size={40} className="animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading recipes...</p>
          </div>
        </div>
      )}

      {/* Recipe Grid */}
      {!isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors duration-200">
                    {recipe.title}
                  </CardTitle>
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{recipe.description}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Clock size={16} className="text-gray-400" />
                    <span>Prep: {recipe.preparation_time} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock size={16} className="text-gray-400" />
                    <span>Cook: {recipe.cooking_time} min</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Users size={16} className="text-gray-400" />
                    <span>Serves: {recipe.serving}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full transition-all duration-200 hover:scale-105">
                  <Link href={`receipe/${recipe.id}`} prefetch>
                    View Recipe
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No recipes found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or search query</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )
      )}

      {/* Pagination Controls */}
      {!isLoading && data.data.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-1">
            <Link href={data.first_page_url || "#"} preserveState>
              <Button
                variant="outline"
                size="icon"
                disabled={!data.first_page_url}
                className="hidden sm:flex"
              >
                <ChevronsLeft size={16} />
                <span className="sr-only">First page</span>
              </Button>
            </Link>
            <Link href={data.prev_page_url || "#"} preserveState>
              <Button
                variant="outline"
                size="icon"
                disabled={!data.prev_page_url}
              >
                <ChevronLeft size={16} />
                <span className="sr-only">Previous page</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              disabled
            >
              <HomeIcon size={16} />
              <span className="sr-only">Current page</span>
            </Button>
            <Link href={data.next_page_url || "#"} preserveState>
              <Button
                variant="outline"
                size="icon"
                disabled={!data.next_page_url}
              >
                <ChevronRight size={16} />
                <span className="sr-only">Next page</span>
              </Button>
            </Link>
            <Link href={data.last_page_url || "#"} preserveState>
              <Button
                variant="outline"
                size="icon"
                disabled={!data.last_page_url}
                className="hidden sm:flex"
              >
                <ChevronsRight size={16} />
                <span className="sr-only">Last page</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}