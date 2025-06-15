import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 voice analyses per day",
        "Basic feedback reports",
        "Standard support",
        "Mobile & web access",
      ],
      buttonText: "Get Started",
      buttonStyle: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      popular: false,
    },
    {
      name: "Pro",
      price: "19",
      period: "month",
      description: "For serious speakers",
      features: [
        "Unlimited voice analyses",
        "Advanced AI coaching",
        "Detailed progress tracking",
        "Priority support",
        "Export reports",
        "Custom training programs",
      ],
      buttonText: "Start Free Trial",
      buttonStyle:
        "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "99",
      period: "month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Custom branding",
        "API access",
        "Advanced analytics",
        "Dedicated support",
        "Custom integrations",
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-gray-800 text-white hover:bg-gray-900",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Simple Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your voice improvement journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/60 backdrop-blur-sm border rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl transform hover:scale-105 ${
                plan.popular
                  ? "border-purple-300 shadow-xl scale-105"
                  : "border-purple-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-800">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
