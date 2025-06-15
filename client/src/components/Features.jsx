import { Mic, BarChart3, Brain, Zap, Shield, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Real-time Recording",
      description:
        "High-quality audio capture with advanced noise reduction technology",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms analyze your speech patterns",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Detailed Insights",
      description:
        "Comprehensive reports on pace, pitch, volume, and confidence",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Feedback",
      description:
        "Get immediate results and actionable improvement suggestions",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy Secure",
      description:
        "Your voice data is processed securely and never stored permanently",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-language",
      description: "Support for multiple languages and accents worldwide",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how our AI-powered voice analysis can transform your
            communication skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/60 backdrop-blur-sm border border-purple-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
