
import { ArrowRight, Bookmark, Clock, Heart, Image } from "lucide-react";
import { Button } from "../ui/button";

export default function Trending() {
    return <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-500">
              Trending Now
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular Recipes This Week</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover what the community is cooking, loving, and sharing.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pt-12">
          {[
            {
              image: "https://www.sprinklesandsprouts.com/wp-content/uploads/2023/09/Garlic-Parmesan-Chicken-Pasta-Sq.jpg",
              title: "Creamy Garlic Parmesan Pasta",
              author: "Chef Maria",
              likes: "2.4k",
              time: "30 min",
            },
            {
              image: "https://bkmedia.bakingo.com/sq-round-shaped-chocolate-cake-1-cake0653choc-A.jpg",
              title: "Double Chocolate Fudge Cake",
              author: "Baking Master",
              likes: "1.8k",
              time: "45 min",
            },
            {
              image: "https://cdn.loveandlemons.com/wp-content/uploads/2020/08/quinoa-salad-500x500.jpg",
              title: "Mediterranean Quinoa Salad",
              author: "Healthy Eats",
              likes: "1.2k",
              time: "15 min",
            },
          ].map((recipe, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border shadow-sm">
              <div className="aspect-video overflow-hidden">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  width={400}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>By {recipe.author}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 fill-current text-red-500" />
                    <span>{recipe.likes}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{recipe.time}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="ghost" size="sm" className="text-orange-500 hover:text-orange-600">
                    View Recipe
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Bookmark className="h-4 w-4" />
                    <span className="sr-only">Save recipe</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="gap-1">
            View All Recipes
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>

}