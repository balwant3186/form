import { CheckCircle, Sparkles } from "lucide-react";

const Thanks = () => {
  return (
    <section className="flex justify-center items-center pt-[20vh] md:pt-[10vh] min-h-screen bg-gray-900">
      <div className="text-white w-full md:max-w-4xl sm:max-w-5xl mx-auto p-8">
        <div className="flex justify-center mb-8 animate-bounce">
          <CheckCircle className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] lg:w-[12rem] lg:h-[12rem] text-green-400" />
        </div>

        <div className="text-center space-y-6">
          <h3 className="text-5xl sm:text-6xl md:text-5xl lg:text-7xl waitlist-heading mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            Congrats, Meme Master!
          </h3>
          <p className="text-3xl md:text-4xl text-gray-300 leading-tight">
            <span className="gradient-text text-4xl md:text-5xl">
              Your AI meme agent is gearing up
            </span>
          </p>
          <p className="text-sm text-gray-400 mt-4 leading-relaxed">
            Hang tight for exclusive updates and meme prophecies!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Thanks;
