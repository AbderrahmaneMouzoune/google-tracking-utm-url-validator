export default function processFiles(
  files: File[],
  callback: (content: string) => void
) {
  const fileContents: string[] = []

  // Loop through each uploaded file
  files.forEach((file, index) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const content = event.target.result as string
        fileContents.push(content)

        // Check URLs without UTM parameters in the file content
        if (fileContents.length === files.length) {
          const combinedContent = fileContents.join("\n") // Combine contents if multiple files
          callback(combinedContent)
        }
      }
    }

    reader.readAsText(file) // Read file as text
  })
}
