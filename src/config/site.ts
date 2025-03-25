export const siteConfig = {
  url: "https://commerce.appi.codes",
  title: "Commerce",
  contactEmail: "michal.bastrzyk.pl@gmail.com",
  socialMedia: {
    twitter: "https://twitter.com/michalbastrzykk",
    instagram: "https://instagram.com/michalbastrzyk",
  },
  currency: "USD",
  locale: "en",
} as const

export const seoConfig = {
  defaultTitle: "Commerce - Your Online Store",
  titleTemplate: "%s | Commerce",
  openGraph: {
    type: "website",
    site_name: "Commerce",
    images: ["/images/og-default.jpg"],
  },
  description: "The best place to find awesome products at great prices.",
  keywords: ["ecommerce", "store", "shopping", "awesome products"],
  authors: [{ name: "Michał Bastrzyk", url: "https://appi.codes" }],
  creator: "Michał Bastrzyk",
}

export const analyticsConfig: {
  googleAnalyticsId?: string
  facebookPixelId?: string
} = {
  googleAnalyticsId: undefined,
  facebookPixelId: undefined,
} as const
