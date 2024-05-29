import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://google-tracking-utm-url-validator.vercel.app',
      lastModified: new Date(),
      alternates: {
        languages: {
          fr: 'https://google-tracking-utm-url-validator.vercel.app/fr',
        },
      },
    },
  ]
}
