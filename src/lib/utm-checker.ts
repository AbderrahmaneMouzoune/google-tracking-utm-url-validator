export type UrlValidator = {
    url: string
    missingParameters: PossibleParameters[]
}

type PossibleParameters = "utm_source" | "utm_medium" | "utm_campaign" | "utm_content"

export function findUrlsWithoutUTM(string: string): UrlValidator[] {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Find all URLs in the string
    const urls = string.match(urlRegex);
    
    // Array to store objects containing URL and missing UTM parameters
    const urlsMissingUTM: UrlValidator[] = [];

    if (urls) {
        urls.forEach(function(url) {
            // Object to store URL and missing UTM parameters
            const urlData: UrlValidator = {
                url: url,
                missingParameters: []
            };

            // Check for missing UTM parameters
            if (!url.includes('utm_source')) {
                urlData.missingParameters.push('utm_source');
            }
            if (!url.includes('utm_medium')) {
                urlData.missingParameters.push('utm_medium');
            }
            if (!url.includes('utm_campaign')) {
                urlData.missingParameters.push('utm_campaign');
            }
            if (!url.includes('utm_content')) {
                urlData.missingParameters.push('utm_content');
            }

            // Add URL data to the array
            urlsMissingUTM.push(urlData);
        });
    }

    return urlsMissingUTM;
}