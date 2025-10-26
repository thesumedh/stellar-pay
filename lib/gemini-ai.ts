const GEMINI_API_KEY = "AIzaSyBoebm9AhXOz7APVzkOH47T0FvtTNTUyzw"

export async function generateAISummary(content: string): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Summarize this article in 2-3 sentences: ${content}`
          }]
        }]
      })
    })

    const data = await response.json()
    return data.candidates[0].content.parts[0].text
  } catch (error) {
    return "AI summary generation failed. Please try again."
  }
}