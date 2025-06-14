function Result({ result, isAnalyzing, error }) {
  if (error) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Analysis Results
        </h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <p className="text-red-600 font-medium">Analysis Failed</p>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {error.message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Analysis Results
        </h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Analyzing your voice...</p>
          <p className="text-sm text-gray-500 mt-2">
            This may take a few seconds
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Analysis Results
        </h2>
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
          <p className="text-gray-600">
            Record and analyze your voice to see results here
          </p>
        </div>
      </div>
    );
  }

  const getScoreColor = (value) => {
    const colors = {
      high: "text-green-500",
      medium: "text-yellow-500",
      low: "text-red-500",
      unclear: "text-gray-500", // Add unclear for cases where speech is not detected
    };
    return colors[value] || "text-gray-500";
  };

  const getScoreEmoji = (value) => {
    const emojis = {
      high: "🎯",
      medium: "👍",
      low: "⚠️",
      unclear: "❓", // Add unclear emoji
    };
    return emojis[value] || "📊";
  };

  // Generate a roasting paragraph based on analysis results
  const generateRoast = (result) => {
    if (!result) return "";

    let roast = "";

    // Use result.pace.category for conditional checks
    if (result.pace.category === "high") {
      roast +=
        "Whoa there, speed racer! Your words are flying faster than your audience's ability to catch them. ";
    } else if (result.pace.category === "low") {
      roast +=
        "Are you getting paid by the hour? Your slow pace could put a caffeine-addicted squirrel to sleep. ";
    }

    if (result.pitch.category === "high") {
      roast +=
        "Your high pitch could shatter glass. Dogs in the neighborhood are covering their ears. ";
    } else if (result.pitch.category === "low") {
      roast +=
        "That bass voice is so low it's practically underground. Are you auditioning for a movie trailer? ";
    }

    if (result.volume.category === "high") {
      roast +=
        "We can hear you just fine... from three blocks away! Indoor voice, please. ";
    } else if (result.volume.category === "low") {
      roast +=
        "Speak up! Even your shadow is leaning in to hear what you're saying. ";
    }

    if (result.confidence < 50) {
      roast +=
        "With that confidence level, even your echo is questioning your statements.";
    } else if (result.confidence > 90) {
      roast +=
        "Your confidence is impressive, but remember - even parrots sound confident repeating nonsense.";
    }

    return (
      roast ||
      "Your speaking is so perfectly mediocre, I couldn't even find anything to roast. Congratulations on being forgettably adequate!"
    );
  };

  // Generate pace data for the graph
  const generatePaceData = () => {
    // Mock data points for the pace graph (in a real app, this would come from the analysis)
    // Use result.pace.category for the baseWPM calculation
    const baseWPM =
      result.pace.category === "high"
        ? 170
        : result.pace.category === "medium"
        ? 150
        : 130;

    return [
      { time: "0-10s", wpm: baseWPM - 10 + Math.random() * 20 },
      { time: "10-20s", wpm: baseWPM - 5 + Math.random() * 30 },
      { time: "20-30s", wpm: baseWPM + Math.random() * 20 },
      { time: "30-40s", wpm: baseWPM - 15 + Math.random() * 25 },
    ];
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Analysis Results
      </h2>

      <div className="space-y-6">
        {/* Confidence Score */}
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Confidence Score</span>
          <span className="font-semibold">{result.confidence}%</span>
        </div>

        {/* Pace Graph */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Pace</span>
            <span
              className={`font-semibold ${getScoreColor(result.pace.category)}`}
            >
              {result.pace.category === "unclear"
                ? "Unclear"
                : result.pace.description}{" "}
              {getScoreEmoji(result.pace.category)}
            </span>
          </div>

          {/* Pace Graph */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-end h-32 space-x-2">
              {generatePaceData().map((point, index) => {
                const height = (point.wpm / 200) * 100; // Scale to percentage of max height
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1"
                  >
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-1">
                      {point.time}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-2">
              <div className="text-xs text-gray-500">Words Per Minute</div>
            </div>
          </div>
        </div>

        {/* Other metrics */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Pitch</span>
            <span
              className={`font-semibold ${getScoreColor(
                result.pitch.category
              )}`}
            >
              {result.pitch.category === "unclear"
                ? "Unclear"
                : result.pitch.description}{" "}
              {getScoreEmoji(result.pitch.category)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600">Volume</span>
            <span
              className={`font-semibold ${getScoreColor(
                result.volume.category
              )}`}
            >
              {result.volume.category === "unclear"
                ? "Unclear"
                : result.volume.description}{" "}
              {getScoreEmoji(result.volume.category)}
            </span>
          </div>
        </div>

        {/* AI Coach Feedback (Roast) */}
        <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-200">
          <div className="flex items-center mb-2">
            <span className="text-pink-500 mr-2">🎭</span>
            <h3 className="font-semibold text-gray-800">AI Coach Feedback</h3>
          </div>
          <p className="text-gray-700">{generateRoast(result)}</p>
        </div>
      </div>
    </div>
  );
}
export default Result;
