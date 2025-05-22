import { Apple, Play, Star } from "lucide-react";
import { Button } from "../ui/button";

export default function Download() {
    return  <section id="download" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-orange-50">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-500">
              Download Now
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Take Recipegram With You Everywhere
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Download our mobile app to discover, save, and share recipes on the go. Available for iOS and
              Android.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="gap-2 bg-black text-white hover:bg-gray-800">
              <Apple className="h-5 w-5" />
              App Store
            </Button>
            <Button className="gap-2 bg-black text-white hover:bg-gray-800">
              <Play className="h-5 w-5" />
              Google Play
            </Button>
          </div>
          <div className="flex items-center gap-2 pt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-current text-yellow-400" />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">4.9/5</span> from over 1,000 reviews
            </div>
          </div>
        </div>
        <div className="mx-auto lg:mx-0 relative">
          <div className="relative h-[500px] w-[300px] overflow-hidden rounded-xl shadow-xl">
            <img
              src="https://imqklgnm5v.ufs.sh/f/Ms72em4bR57yI3vUPsLijD9lrc3EIhwax2zWKPyn4bdYTqJZ"
              alt="App screenshot"
              width={300}
              height={500}
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 h-[200px] w-[150px] overflow-hidden rounded-lg shadow-lg">
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