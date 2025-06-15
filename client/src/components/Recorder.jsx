import { useState, useRef } from "react";
import { Mic, Square, Play, RotateCcw, Loader2 } from "lucide-react";

function Recorder({
  onAnalysisStart,
  onAnalysisComplete,
  onAnalysisError,
  onReset,
  isAnalyzing,
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      setRecordingTime(0);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(timerRef.current);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      onAnalysisError(
        new Error("Error accessing microphone. Please check permissions.")
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAnalyze = async () => {
    if (!audioBlob) return;

    onAnalysisStart();

    try {
      console.log("=== STARTING VOICE ANALYSIS ===");

      // Convert audio blob to buffer for analysis
      const arrayBuffer = await audioBlob.arrayBuffer();
      const audioBuffer = new Uint8Array(arrayBuffer);

      console.log("Audio buffer created, length:", audioBuffer.length);

      // Send to your server endpoint for analysis
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const response = await fetch("/api/analyze-voice", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();

      console.log("=== ANALYSIS COMPLETE ===", result);
      onAnalysisComplete(result);
    } catch (error) {
      console.error("Error analyzing voice:", error);
      onAnalysisError(new Error("Voice analysis failed. Please try again."));
    }
  };

  const handleReset = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    audioChunksRef.current = [];
    onReset();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-purple-200 rounded-3xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Voice Recorder
        </h2>
        <p className="text-gray-600">
          Record your voice to get instant AI analysis
        </p>
      </div>

      {!audioBlob ? (
        <div className="text-center space-y-8">
          <div className="relative flex justify-center">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isAnalyzing}
              className={`relative w-32 h-32 rounded-full text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                isRecording
                  ? "bg-gradient-to-r from-red-500 to-pink-500 animate-pulse"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-purple-300"
              } ${isAnalyzing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex flex-col items-center justify-center">
                {isRecording ? (
                  <>
                    <Square className="w-8 h-8 mb-2" />
                    <span className="text-sm">Stop</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-8 h-8 mb-2" />
                    <span className="text-sm">Record</span>
                  </>
                )}
              </div>

              {isRecording && (
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping opacity-75"></div>
              )}
            </button>
          </div>

          {isRecording && (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-600 font-semibold text-lg">
                  Recording...
                </span>
              </div>
              <div className="text-3xl font-mono text-gray-700 bg-gray-100 rounded-xl px-6 py-3 inline-block">
                {formatTime(recordingTime)}
              </div>
              <p className="text-gray-500 text-sm">
                Recording for optimal analysis quality
              </p>
            </div>
          )}

          {!isRecording && (
            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                Click the record button to start capturing your voice
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-700 text-sm">
                  💡 <strong>Tip:</strong> Speak clearly for at least 3-5
                  seconds for best analysis results
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Play className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Recording Complete!
            </h3>
            <p className="text-gray-600 text-lg">
              Duration: {formatTime(recordingTime)}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6">
            <audio
              controls
              src={URL.createObjectURL(audioBlob)}
              className="w-full h-12 rounded-xl"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Analyzing Voice...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Mic className="w-5 h-5 mr-2" />
                  Analyze Voice
                </div>
              )}
            </button>

            <button
              onClick={handleReset}
              disabled={isAnalyzing}
              className={`flex-1 sm:flex-none bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-300 transition-all duration-300 ${
                isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <RotateCcw className="w-5 h-5 mr-2 inline" />
              Reset
            </button>
          </div>

          {recordingTime < 3 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-yellow-700 text-sm text-center">
                ⚠️ Short recording detected. For better analysis accuracy, try
                recording for at least 3-5 seconds.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Recorder;
