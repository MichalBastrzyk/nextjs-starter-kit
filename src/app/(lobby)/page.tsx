import Link from "next/link"

import {
  ArrowRightIcon,
  CheckIcon,
  CodeIcon,
  DatabaseIcon,
  PaletteIcon,
  RocketIcon,
  ShieldIcon,
  SmartphoneIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { Shell } from "@/components/shell"

import { siteConfig } from "@/config/site"

export default function Home() {
  return (
    <>
      <header className="bg-background/80 container sticky left-0 right-0 top-4 z-50 mx-auto mt-10 w-[calc(100%-2rem)] rounded-lg border py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Icons.logo className="size-4" />
            </div>
            {siteConfig.title}
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Continue</Link>
          </Button>
        </div>
      </header>
      <main>
        <section className="from-background to-muted w-full bg-gradient-to-b py-12 md:py-24 lg:py-32">
          <Shell className="space-y-10 text-center">
            <Badge variant="outline" className="mx-auto">
              Production-Ready • Next.js 15
            </Badge>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Ship Your Next.js 15 App Faster
              </h1>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                A lightweight, zero-bloat starter kit by{" "}
                <span className="font-medium">Michal Bastrzyk</span> designed to
                accelerate your development and get your ideas to production in
                record time
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/docs">
                  Start in 30 Seconds{" "}
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="https://github.com/MichalBastrzyk/nextjs-starter-kit">
                  View on GitHub <CodeIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Shell>
        </section>

        <section className="bg-background w-full py-12 md:py-24 lg:py-32">
          <Shell>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Minimal Setup, Maximum Speed
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-[700px]">
                A carefully crafted foundation with only essential tools to
                accelerate your development workflow
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<RocketIcon className="h-10 w-10" />}
                title="Next.js 15"
                description="Streamlined App Router setup with zero configuration required"
              />
              <FeatureCard
                icon={<ShieldIcon className="h-10 w-10" />}
                title="TypeScript"
                description="Pre-configured type safety that stays out of your way"
              />
              <FeatureCard
                icon={<PaletteIcon className="h-10 w-10" />}
                title="Tailwind CSS"
                description="Ready-to-use styling without the complexity"
              />
              <FeatureCard
                icon={<CodeIcon className="h-10 w-10" />}
                title="shadcn/ui Components"
                description="Copy-paste components that just work, no dependencies to manage"
              />
              <FeatureCard
                icon={<DatabaseIcon className="h-10 w-10" />}
                title="Drizzle ORM"
                description="Lightweight database setup with minimal boilerplate"
              />
              <FeatureCard
                icon={<SmartphoneIcon className="h-10 w-10" />}
                title="Ship Fast"
                description="From zero to production in minutes with optimized defaults"
              />
            </div>
            <div className="mt-10 text-center">
              <h3 className="mb-6 text-xl font-semibold">Just What You Need</h3>
              <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <Feature text="5-second setup process" />
                <Feature text="Single-command deployment" />
                <Feature text="Pre-configured TypeScript" />
                <Feature text="Optimized build system" />
                <Feature text="Ready-made UI patterns" />
                <Feature text="SEO best practices" />
              </div>
              <p className="text-muted-foreground mx-auto mt-8 max-w-2xl text-sm">
                Every feature is intentionally chosen to give you the perfect
                foundation without overwhelming you with options. Start with a
                clean slate that&apos;s ready for your creativity.
              </p>
            </div>
          </Shell>
        </section>

        <section className="bg-muted w-full py-12 md:py-24 lg:py-32">
          <Shell>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Launch in Record Time
              </h2>
              <p className="text-muted-foreground mx-auto mt-4 max-w-[700px]">
                Join developers who skip boilerplate setup and focus on building
                what matters
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                name="Sarah Chen"
                role="Frontend Developer"
                content="From git clone to production in under an hour. The shadcn/ui integration saved me days of component building. This is the most efficient starter I've ever used."
                avatar="SC"
              />
              <TestimonialCard
                name="Michael Johnson"
                role="Full Stack Engineer"
                content="No bloat, no unnecessary features. The Drizzle ORM setup with TypeScript is exactly what I needed. Just the essentials to ship fast without the cruft."
                avatar="MJ"
              />
              <TestimonialCard
                name="Alex Rodriguez"
                role="Tech Lead"
                content="We've cut our initial setup time by 90%. The project structure is so clean and intuitive. My team can now focus on building product instead of configuration."
                avatar="AR"
              />
            </div>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mx-auto max-w-2xl">
                Join these developers and many others who have transformed their
                workflow with this carefully crafted starter kit. Focus on what
                matters—building great products.
              </p>
            </div>
          </Shell>
        </section>

        <section className="bg-background w-full py-12 md:py-24 lg:py-32">
          <Shell>
            <div className="mx-auto max-w-[800px] space-y-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                From Zero to Deployed in Minutes
              </h2>
              <p className="text-muted-foreground md:text-xl">
                Start building with these three simple commands
              </p>
              <div className="bg-muted mx-auto mb-4 max-w-3xl overflow-x-auto rounded-lg p-4 text-left font-mono text-sm">
                <p>
                  <span className="text-muted-foreground">$</span> git clone
                  https://github.com/MichalBastrzyk/nextjs-starter-kit.git
                  my-project
                </p>
                <p>
                  <span className="text-muted-foreground">$</span> cd my-project
                  && npm install
                </p>
                <p>
                  <span className="text-muted-foreground">$</span> npm run dev
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                That&apos;s it! Your project will be running at{" "}
                <span className="font-semibold">http://localhost:3000</span>{" "}
                with hot reloading enabled.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/docs">
                    Start Building <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="/server-action-example">View Examples</Link>
                </Button>
              </div>
            </div>
          </Shell>
        </section>
      </main>
    </>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="text-primary mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

interface FeatureProps {
  text: string
}

function Feature({ text }: FeatureProps) {
  return (
    <div className="flex items-center gap-2">
      <CheckIcon className="text-primary h-5 w-5" />
      <span>{text}</span>
    </div>
  )
}

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  avatar: string
}

function TestimonialCard({
  name,
  role,
  content,
  avatar,
}: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="mb-6 italic">&ldquo;{content}&rdquo;</p>
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
