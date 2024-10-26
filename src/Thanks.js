import { CheckCircle, Sparkles } from "lucide-react";

const Thanks = () => {
  return (
    <section className="flex justify-center items-center pt-[20vh] md:pt-[10vh] min-h-screen">
      <div className="text-white w-full lg:max-w-3xl md:max-w-4xl sm:max-w-5xl mx-auto p-8">
        <div className="flex justify-center mb-6 animate-bounce">
          <CheckCircle className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] text-green-400" />
        </div>

        <div className="text-center">
          <h3 className="text-5xl sm:text-6xl md:text-5xl lg:text-7xl waitlist-heading mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400" />
            Configuration Successful!
          </h3>
          <p className="text-3xl md:text-4xl text-gray-300 mt-2">
            Thanks for configuring your token with Fraction AI! <br />
            <span className="gradient-text text-4xl md:text-5xl">
              You’re in the loop!
            </span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Stay tuned for updates and exclusive offers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Thanks;
