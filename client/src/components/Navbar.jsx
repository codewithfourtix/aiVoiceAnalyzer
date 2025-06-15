import { useState } from "react";
import { Menu, X, Mic } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-purple-100 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              VoiceAI
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("analyzer")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Analyzer
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
            >
              Contact
            </button>
            <button
              onClick={() => scrollToSection("analyzer")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Try Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-purple-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-purple-100 py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors font-medium px-4"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors font-medium px-4"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("analyzer")}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors font-medium px-4"
              >
                Analyzer
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors font-medium px-4"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection("team")}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors font-medium px-4"
              >
                Team
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-gray-700 hover:text-purple-600 transition-colors font-medium px-4"
              >
                Contact
              </button>
              <button
                onClick={() => scrollToSection("analyzer")}
                className="mx-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-center"
              >
                Try Free
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
