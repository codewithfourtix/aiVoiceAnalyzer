"use client"

import { useState, useRef } from "react"
import { analyzeVoice } from "../api/voiceApi"

function Recorder({ onAnalysisStart, onAnalysisComplete, onAnalysisError, onReset, isAnalyzing }) {
  const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [recordingTime, setRecordingTime] = useState(0)

  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])
  const timerRef = useRef(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []
      setRecordingTime(0)

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        setAudioBlob(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
        clearInterval(timerRef.current)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      onAnalysisError(new Error("Error accessing microphone. Please check permissions."))
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleAnalyze = async () => {
    if (!audioBlob) return

    onAnalysisStart()

    try {
      const result = await analyzeVoice(audioBlob)
      onAnalysisComplete(result)
    } catch (error) {
      console.error("Error analyzing voice:", error)
      onAnalysisError(error)
    }
  }

  const handleReset = () => {
    setAudioBlob(null)
    setRecordingTime(0)
    audioChunksRef.current = []
    onReset()
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Voice Recorder</h2>

      {!audioBlob ? (
        <div className="text-center space-y-6">
          <div className="relative">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isAnalyzing}
              className={`w-32 h-32 rounded-full text-white font-bold text-lg transition-all duration-300 ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 animate-pulse-slow"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
              } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isRecording ? (
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-white rounded mb-2"></div>
                  <span className="text-sm">Stop</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-white rounded-full mb-2"></div>
                  <span className="text-sm">Record</span>
                </div>
              )}
            </button>
          </div>

          {isRecording && (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-600 font-semibold">Recording...</span>
              </div>
              <div className="text-2xl font-mono text-gray-700">{formatTime(recordingTime)}</div>
            </div>
          )}

          {!isRecording && <p className="text-gray-600">Click the record button to start capturing your voice</p>}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Recording Complete!</h3>
            <p className="text-gray-600">Duration: {formatTime(recordingTime)}</p>
          </div>

          <div className="space-y-4">
            <audio controls src={URL.createObjectURL(audioBlob)} className="w-full" />

            <div className="flex space-x-3">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`btn-primary flex-1 ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  "Analyze Voice"
                )}
              </button>

              <button
                onClick={handleReset}
                disabled={isAnalyzing}
                className={`btn-secondary ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Recorder
