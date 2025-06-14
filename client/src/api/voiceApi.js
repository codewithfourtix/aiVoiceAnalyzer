const API_BASE_URL = "/api"

export const analyzeVoice = async (audioBlob) => {
  const formData = new FormData()
  formData.append("audio", audioBlob, "recording.wav")

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 seconds timeout

  try {
    const response = await fetch(`${API_BASE_URL}/analyze-voice`, {
      method: "POST",
      body: formData,
      signal: controller.signal
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.')
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

export const healthCheck = async () => {
  const response = await fetch(`${API_BASE_URL}/health`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}
