import { Button } from "../ui/button";

export default function Hero() {
    return <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-50 to-white">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Share Your Culinary Creations with the World
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Discover, share, and save delicious recipes from food enthusiasts around the globe. Your next
              favorite dish is just a tap away.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="bg-orange-500 hover:bg-orange-600">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="inline-block h-8 w-8 rounded-full border-2 border-background overflow-hidden"
                >
                  <img
                    src={`/placeholder.svg?height=32&width=32&text=${i}`}
                    alt="User"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Join <span className="font-medium text-foreground">10k+</span> food lovers
            </div>
          </div>
        </div>
        <div className="mx-auto lg:mx-0 relative">
          <div className="relative h-[500px] w-[300px] overflow-hidden rounded-xl shadow-xl">
            <img
              src="https://i.ibb.co/sdtgs8kQ/Home.jpg"
              alt="App screenshot"
              width={300}
              height={500}
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 h-[200px] w-[150px] overflow-hidden rounded-lg shadow-lg">
            <img
              src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTA3L2hpcHBvdW5pY29ybl9waG90b19vZl9kaXNzZWN0ZWRfZmxvYXRpbmdfdGFjb19zZXBhcmF0ZV9sYXllcl9vZl84M2Q0ODAwNC03MDc0LTRlZjItYjYyOC1jZTU3ODhiYzQxOGEucG5n.png"
              alt="Food photo"
              width={150}
              height={200}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
}