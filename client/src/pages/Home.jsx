"use client";

import { useState } from "react";
import Recorder from "../components/Recorder";
import Result from "../components/Result";

function Home() {
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Voice AI Evaluator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Record your voice and get instant analysis of your speaking
            patterns, including pace, pitch, and volume characteristics.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Recorder
              onAnalysisStart={handleAnalysisStart}
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisError={handleAnalysisError}
              onReset={handleReset}
              isAnalyzing={isAnalyzing}
            />
          </div>

          <div>
            <Result 
              result={analysisResult} 
              isAnalyzing={isAnalyzing} 
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
