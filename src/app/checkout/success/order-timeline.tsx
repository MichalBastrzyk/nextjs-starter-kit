"use client"

import { CheckIcon } from "lucide-react"

import { formatDate } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Timeline,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"
import { useIsMobile } from "@/components/hooks/use-mobile"

import type { OrderStatus } from "./types"

interface TimelineCardProps {
  status: OrderStatus[]
  timelineStep: number
}

export function TimelineCard({ status, timelineStep }: TimelineCardProps) {
  const isMobile = useIsMobile()

  return (
    <Card className="pb-0">
      <CardHeader>
        <CardTitle>Your order is confirmed!</CardTitle>
        <CardDescription>
          You&apos;ll receive an email confirmation with your order number
          shortly.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:place-items-center">
        <Timeline
          defaultValue={timelineStep}
          orientation={isMobile ? "vertical" : "horizontal"}
        >
          {status.map((item) => (
            <TimelineItem key={item.id} step={item.id}>
              <TimelineHeader>
                <TimelineSeparator className="group-data-[orientation=vertical]/timeline:translate-y-6.5 group-data-[orientation=horizontal]/timeline:translate-x-6.5 group-data-[orientation=horizontal]/timeline:left-0 group-data-[orientation=vertical]/timeline:-left-6 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/timeline:w-[calc(100%-1.5rem-0.25rem)]" />
                <TimelineDate>
                  {item.date ? formatDate(item.date) : "Not started"}
                </TimelineDate>
                <TimelineTitle>{item.title}</TimelineTitle>
                <TimelineIndicator className="bg-primary/10 group-data-completed/timeline-item:bg-emerald-600 group-data-completed/timeline-item:text-primary-foreground group flex size-6 items-center justify-center border-none">
                  <CheckIcon
                    size={14}
                    className="group-not-data-completed/timeline-item:hidden"
                  />
                </TimelineIndicator>
              </TimelineHeader>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
      <CardFooter className="bg-muted rounded-b-xl border-t pb-6">
        <p className="text-muted-foreground">
          We&apos;ll update you via email when your order is shipped.
        </p>
      </CardFooter>
    </Card>
  )
}
