export type UrlValidator = {
  url: string
  missingParameters: PossibleParameters[]
}

type PossibleParameters =
  | 'utm_source'
  | 'utm_medium'
  | 'utm_campaign'
  | 'utm_content'

export function findUrlsWithoutUTM(htmlString: string): UrlValidator[] {
  // Regular expression to match URLs within <a> tags
  const urlRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/g

  // Find all URLs within <a> tags in the HTML string
  let match
  const urls: string[] = []
  while ((match = urlRegex.exec(htmlString)) !== null) {
    urls.push(match[1])
  }

  // Array to store objects containing URL and missing UTM parameters
  const urlsMissingUTM: UrlValidator[] = []

  urls.forEach(function (url) {
    // Object to store URL and missing UTM parameters
    const urlData: UrlValidator = {
      url: url,
      missingParameters: [],
    }

    // Check for missing UTM parameters
    if (!url.includes('utm_source')) {
      urlData.missingParameters.push('utm_source')
    }
    if (!url.includes('utm_medium')) {
      urlData.missingParameters.push('utm_medium')
    }
    if (!url.includes('utm_campaign')) {
      urlData.missingParameters.push('utm_campaign')
    }
    if (!url.includes('utm_content')) {
      urlData.missingParameters.push('utm_content')
    }

    // Add URL data to the array
    urlsMissingUTM.push(urlData)
  })

  return urlsMissingUTM
}
