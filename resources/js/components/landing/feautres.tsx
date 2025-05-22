import { Heart, MessageCircle, Bookmark, Search, Users, Clock } from "lucide-react";

export default function Features() {
    return <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-500">Features</div>
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                        Everything You Need to Share Your Recipes
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Our platform combines the best of social media with specialized tools for food enthusiasts.
                    </p>
                </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
                {[
                    {
                        icon: <Heart className="h-10 w-10 text-orange-500" />,
                        title: "Share & Like",
                        description: "Share your recipes and like others' creations to build a community of food lovers.",
                    },
                    {
                        icon: <MessageCircle className="h-10 w-10 text-orange-500" />,
                        title: "Comment & Connect",
                        description: "Exchange cooking tips, ask questions, and connect with other food enthusiasts.",
                    },
                    {
                        icon: <Bookmark className="h-10 w-10 text-orange-500" />,
                        title: "Save Favorites",
                        description: "Bookmark recipes you love to easily find them later when you're ready to cook.",
                    },
                    {
                        icon: <Search className="h-10 w-10 text-orange-500" />,
                        title: "Discover Recipes",
                        description: "Find new recipes based on ingredients, cuisine type, or dietary preferences.",
                    },
                    {
                        icon: <Users className="h-10 w-10 text-orange-500" />,
                        title: "Follow Creators",
                        description: "Follow your favorite chefs and food creators to see their latest recipes.",
                    },
                    {
                        icon: <Clock className="h-10 w-10 text-orange-500" />,
                        title: "Step-by-Step Timers",
                        description: "Built-in timers for each cooking step to make following recipes easier.",
                    },
                ].map((feature, i) => (
                    <div key={i} className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                        {feature.icon}
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-center text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
}