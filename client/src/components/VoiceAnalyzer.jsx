import { useState } from "react";
import Recorder from "./Recorder";
import Result from "./Result";
import ReportGenrator from "./ReportGenrator";

const VoiceAnalyzer = () => {
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setError(null);
  };

  const handleAnalysisComplete = (analysisResult) => {
    setResult(analysisResult);
    setIsAnalyzing(false);
    setError(null);
  };

  const handleAnalysisError = (analysisError) => {
    setError(analysisError);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setRecordingTime(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Voice Analysis AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Record your voice and get instant AI-powered analysis of your
            speaking patterns, pace, pitch, and confidence levels
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recorder */}
          <div>
            <Recorder
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
              onReset={handleReset}
              isAnalyzing={isAnalyzing}
              onRecordingTimeUpdate={setRecordingTime}
            />
          </div>

          {/* Results */}
          <div>
            <Result result={result} isAnalyzing={isAnalyzing} error={error} />
          </div>
        </div>

        {/* Report Generator - Appears below when results are available */}
        {result && !isAnalyzing && !error && (
          <div className="max-w-4xl mx-auto">
            <ReportGenrator result={result} recordingTime={recordingTime} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>Powered by advanced AI voice analysis technology</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceAnalyzer;
