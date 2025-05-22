export default function HowItWorks() {
    return <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-orange-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-500">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              From Kitchen to Community in 3 Simple Steps
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sharing your culinary creations has never been easier.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 pt-12">
          {[
            {
              step: "01",
              title: "Capture Your Dish",
              description: "Take photos of your delicious creation and write down the recipe and instructions.",
            },
            {
              step: "02",
              title: "Share Your Recipe",
              description: "Post your recipe with photos, ingredients, and step-by-step instructions.",
            },
            {
              step: "03",
              title: "Connect & Grow",
              description: "Engage with the community, get feedback, and discover new recipes.",
            },
          ].map((step, i) => (
            <div key={i} className="relative flex flex-col items-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500 text-xl font-bold">
                {step.step}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-center text-muted-foreground">{step.description}</p>
              {i < 2 && (
                <div className="absolute left-[calc(100%_-_16px)] top-8 hidden h-[2px] w-[calc(100%_-_32px)] bg-orange-200 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
}