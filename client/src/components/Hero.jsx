import { ArrowRight, Play, Star } from "lucide-react";

const Hero = () => {
  const scrollToAnalyzer = () => {
    document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/50 backdrop-blur-sm border border-purple-200 rounded-full px-6 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-500 mr-2" />
            <span className="text-sm font-medium text-gray-700">
              Trusted by 10,000+ speakers worldwide
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Perfect Your Voice
            <br />
            <span className="text-4xl md:text-6xl">with AI Power</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your speaking skills with real-time AI analysis. Get
            instant feedback on pace, pitch, volume, and confidence to become a
            more effective communicator.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={scrollToAnalyzer}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group flex items-center text-gray-700 hover:text-purple-600 transition-colors text-lg font-medium">
              <div className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-50 transition-colors">
                <Play className="w-5 h-5 ml-1" />
              </div>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm border border-purple-200 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-purple-100">Accuracy Rate</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
                <div className="text-3xl font-bold mb-2">&lt;2s</div>
                <div className="text-blue-100">Analysis Time</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl p-6 text-white">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-indigo-100">Available</div>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
