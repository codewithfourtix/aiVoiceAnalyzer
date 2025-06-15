import {
  AlertTriangle,
  CheckCircle,
  Loader2,
  BarChart,
  TrendingUp,
  Clock,
  Volume2,
  Activity,
} from "lucide-react";
import PaceChart from "./PaceChart";
import OverallPerformanceChart from "./OverallPerformanceChart";

function Result({ result, isAnalyzing, error }) {
  if (error) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-red-200 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
          Analysis Results
        </h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <p className="text-red-600 font-semibold text-xl mb-3">
            Analysis Failed
          </p>
          <p className="text-gray-600 text-center leading-relaxed mb-6">
            {error.message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-purple-200 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
          Analysis Results
        </h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-purple-300 animate-ping opacity-50"></div>
          </div>
          <p className="text-gray-700 text-xl font-semibold mb-3">
            Analyzing your voice...
          </p>
          <p className="text-gray-500">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white/60 backdrop-blur-sm border border-purple-200 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
          Analysis Results
        </h2>
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BarChart className="w-10 h-10 text-white" />
          </div>
          <p className="text-gray-600 text-lg">
            Record and analyze your voice to see results here
          </p>
        </div>
      </div>
    );
  }

  // Debug: Log the result structure to console
  const getScoreColor = (value) => {
    const colors = {
      high: "text-green-500",
      medium: "text-yellow-500",
      low: "text-red-500",
      unclear: "text-gray-500",
    };
    return colors[value] || "text-gray-500";
  };

  const getScoreEmoji = (value) => {
    const emojis = {
      high: "🎯",
      medium: "👍",
      low: "⚠️",
      unclear: "❓",
    };
    return emojis[value] || "📊";
  };

  const getCategoryDisplayText = (category) => {
    const displayTexts = {
      high: "High",
      medium: "Medium",
      low: "Low",
      unclear: "Unclear",
    };
    return displayTexts[category] || category;
  };

  const generateRoast = (result) => {
    if (!result) return "";

    let roast = "";

    if (result.pace?.category === "high") {
      roast +=
        "Whoa there, speed racer! Your words are flying faster than your audience's ability to catch them. ";
    } else if (result.pace?.category === "low") {
      roast +=
        "Are you getting paid by the hour? Your slow pace could put a caffeine-addicted squirrel to sleep. ";
    }

    if (result.pitch?.category === "high") {
      roast +=
        "Your high pitch could shatter glass. Dogs in the neighborhood are covering their ears. ";
    } else if (result.pitch?.category === "low") {
      roast +=
        "That bass voice is so low it's practically underground. Are you auditioning for a movie trailer? ";
    }

    if (result.volume?.category === "high") {
      roast +=
        "We can hear you just fine... from three blocks away! Indoor voice, please. ";
    } else if (result.volume?.category === "low") {
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

  // Safe access to result properties with fallbacks
  const pace = result.pace || {
    category: "unclear",
    description: "No pace data available",
  };
  const pitch = result.pitch || {
    category: "unclear",
    description: "No pitch data available",
  };
  const volume = result.volume || {
    category: "unclear",
    description: "No volume data available",
  };
  const confidence = result.confidence || 0;
  const speechDetected =
    result.speechDetected !== undefined ? result.speechDetected : false;
  const durationSeconds = result.durationSeconds || 0;

  // Debug: Log the result structure to console
  console.log("Analysis result received:", result);
  console.log("Pace description:", pace.description);
  console.log("Pitch description:", pitch.description);
  console.log("Volume description:", volume.description);

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-purple-200 rounded-3xl p-8 shadow-xl">
      <div className="flex items-center justify-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Analysis Complete
        </h2>
      </div>

      <div className="space-y-8">
        {/* Audio Info Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Audio Analysis Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">Duration:</span>
              <span className="ml-2 font-semibold text-gray-800">
                {durationSeconds.toFixed(1)}s
              </span>
            </div>
            <div className="flex items-center">
              <Volume2 className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">Speech Detected:</span>
              <span
                className={`ml-2 font-semibold ${
                  speechDetected ? "text-green-600" : "text-red-600"
                }`}
              >
                {speechDetected ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">Confidence:</span>
              <span className="ml-2 font-semibold text-gray-800">
                {confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
              <span className="text-gray-700 font-semibold text-lg">
                Overall Confidence Score
              </span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {confidence}%
            </div>
          </div>
        </div>

        {/* Detailed Analysis Cards */}
        <div className="space-y-6">
          {/* Pace Analysis */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-semibold text-lg">
                Pace Analysis
              </span>
              <div className="flex items-center">
                <span
                  className={`font-bold text-lg ${getScoreColor(
                    pace.category
                  )}`}
                >
                  {getCategoryDisplayText(pace.category)}
                </span>
                <span className="ml-2 text-2xl">
                  {getScoreEmoji(pace.category)}
                </span>
              </div>
            </div>
            <p>{pace.description}</p>
            <div className="bg-gray-50 rounded-xl p-4">
              <PaceChart
                paceCategory={pace.category}
                durationSeconds={durationSeconds}
              />
            </div>
          </div>

          {/* Pitch Analysis */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-semibold text-lg">
                Pitch Analysis
              </span>
              <div className="flex items-center">
                <span
                  className={`font-bold text-lg ${getScoreColor(
                    pitch.category
                  )}`}
                >
                  {getCategoryDisplayText(pitch.category)}
                </span>
                <span className="ml-2 text-2xl">
                  {getScoreEmoji(pitch.category)}
                </span>
              </div>
            </div>
            <p>{pitch.description}</p>
          </div>

          {/* Volume Analysis */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 font-semibold text-lg">
                Volume Analysis
              </span>
              <div className="flex items-center">
                <span
                  className={`font-bold text-lg ${getScoreColor(
                    volume.category
                  )}`}
                >
                  {getCategoryDisplayText(volume.category)}
                </span>
                <span className="ml-2 text-2xl">
                  {getScoreEmoji(volume.category)}
                </span>
              </div>
            </div>
            <p>{volume.description}</p>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
          <OverallPerformanceChart userConfidence={confidence} />
        </div>

        {/* AI Coach Feedback */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-200">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3">🎭</span>
            <h3 className="text-xl font-bold text-gray-800">
              AI Coach Feedback
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            {generateRoast(result)}
          </p>
        </div>

        {/* Debug Information (remove in production) */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
            <h3 className="text-lg font-bold text-yellow-800 mb-4">
              Debug Information (Development Only)
            </h3>
            <pre className="bg-yellow-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
