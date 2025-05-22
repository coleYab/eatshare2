import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { ChefHat, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
   return <footer className="w-full border-t bg-background py-6">
    <div className="container px-4 md:px-6">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-orange-500" />
            <span className="text-xl font-bold">Eat Share</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Share your culinary creations with the world. Discover, save, and connect with food enthusiasts
            globally.
          </p>
          <div className="mt-4 flex gap-4">
            {[{name: "Twitter", icon:  Twitter}, {name: "Instagram", icon: Instagram}, 
            {name: "Facebook", icon:  Facebook}, {name: "YouTube", icon: Youtube}].map((social, i) => (
              <Button key={i} variant="ghost" size="icon" className="rounded-full">
                <span className="sr-only">{social.name}</span>
                <social.icon className="h-5 w-5 rounded-full bg-muted" />
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium">Product</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {["Features", "How It Works", "Pricing", "FAQ"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium">Company</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {["About", "Blog", "Careers", "Press"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
              <li key={item}>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
        © 2025 Eat Share. All rights reserved.
      </div>
    </div>
  </footer>
}