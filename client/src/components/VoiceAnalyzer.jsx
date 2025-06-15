import { useState } from "react";
import Recorder from "./Recorder";
import Result from "./Result";

const VoiceAnalyzer = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setError(null);
  };

  const handleAnalysisError = (error) => {
    setError(error);
    setIsAnalyzing(false);
    setAnalysisResult(null);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setError(null);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setError(null);
  };

  return (
    <section
      id="analyzer"
      className="py-20 px-4 bg-gradient-to-br from-purple-900/5 to-blue-900/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Voice Analyzer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Record your voice and get instant AI-powered analysis with detailed
            insights and personalized feedback
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="order-2 lg:order-1">
            <Recorder
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
              onReset={handleReset}
              isAnalyzing={isAnalyzing}
            />
          </div>

          <div className="order-1 lg:order-2">
            <Result
              result={analysisResult}
              isAnalyzing={isAnalyzing}
              error={error}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VoiceAnalyzer;
