import React, { useState } from "react";
import {
  Sparkles,
  Brain,
  Shield,
  Target,
  Zap,
  Flame,
  Rocket,
  Pencil,
  DollarSign,
  Plus,
  CheckCircle2,
  MessageCircle,
  Twitter,
  ImagePlus,
  FileText,
  Send,
  Camera,
  Upload,
  User,
} from "lucide-react";
import Thanks from "./Thanks";
import { apiPostRequest } from "./utils/api";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AIAgentForm = () => {
  const [formData, setFormData] = useState({
    telegramId: "",
    twitterId: "",
    name: "",
    ticker: "",
    description: "",
    image: null,
    imagePreview: null,
    selectedPersonalities: [],
    tradeScore: 50,
    aiTypeScore: 50,
    additionalTraits: "",
    customPersonality: "",
  });

  const [showForm, setShowForm] = useState(true);

  const AI_PERSONALITIES = [
    {
      id: 1,
      name: "Morgan Freeman",
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      role: "The Calming Voice",
      description: "Soothing, wise, and trustworthy. Brings peace to chaos.",
      color: "border-blue-500 bg-blue-50",
      tags: ["Calm", "Wise", "Trustworthy"],
    },
    {
      id: 2,
      name: "Steve Jobs",
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      role: "The Visionary",
      description:
        "Innovative, passionate, and sometimes ruthlessly perfectionist.",
      color: "border-yellow-500 bg-yellow-50",
      tags: ["Visionary", "Demanding", "Innovative"],
    },
    {
      id: 3,
      name: "Gordon Ramsay",
      icon: <Flame className="w-8 h-8 text-red-500" />,
      role: "The Blunt Force",
      description: "Raw, unfiltered truth with explosive energy.",
      color: "border-red-500 bg-red-50",
      tags: ["Aggressive", "Direct", "Savage"],
    },
    {
      id: 4,
      name: "Joker",
      icon: <Zap className="w-8 h-8 text-purple-500" />,
      role: "The Chaos Agent",
      description: "Unpredictable, wild, and thrives on market volatility.",
      color: "border-purple-500 bg-purple-50",
      tags: ["Chaotic", "Unpredictable", "Wild"],
    },
    {
      id: 5,
      name: "Yoda",
      icon: <Shield className="w-8 h-8 text-green-500" />,
      role: "The Cryptic Sage",
      description: "Speaks in riddles, mysterious but profound wisdom.",
      color: "border-green-500 bg-green-50",
      tags: ["Cryptic", "Mysterious", "Wise"],
    },
    {
      id: 6,
      name: "Tony Stark",
      icon: <Rocket className="w-8 h-8 text-pink-500" />,
      role: "The Arrogant Genius",
      description: "Brilliant, cocky, and always ahead of the game.",
      color: "border-pink-500 bg-pink-50",
      tags: ["Arrogant", "Genius", "Witty"],
    },
  ];

  const getAIType = (value) => {
    if (value < 20)
      return {
        name: "Zen Oracle",
        icon: "🌿",
        description:
          "A peaceful and contemplative presence, fostering mindfulness.",
        color: "bg-blue-500",
      };
    if (value < 40)
      return {
        name: "Guardian Sage",
        icon: "🛡️",
        description:
          "Protective and stable, focused on security and reliability.",
        color: "bg-green-500",
      };
    if (value < 60)
      return {
        name: "Strategic Mentor",
        icon: "🧠",
        description:
          "Analytical and thoughtful, focused on strategy and planning.",
        color: "bg-purple-500",
      };
    if (value < 80)
      return {
        name: "Risk Taker",
        icon: "⚡",
        description:
          "Bold and daring, thrives on calculated risks and excitement.",
        color: "bg-yellow-500",
      };
    if (value < 90)
      return {
        name: "Wild Spirit",
        icon: "🚀",
        description:
          "Unconventional and spontaneous, pushes boundaries creatively.",
        color: "bg-orange-500",
      };
    return {
      name: "Chaos Bringer",
      icon: "🔥",
      description: "Unrestrained and dynamic, perfect for volatile markets.",
      color: "bg-red-500",
    };
  };

  const getTradeStyle = (value) => {
    if (value < 33)
      return {
        name: "Conservative",
        icon: <Shield className="w-6 h-6 text-blue-500" />,
        color: "bg-blue-500",
        description: "Minimal risk, steady growth",
      };
    if (value < 66)
      return {
        name: "Balanced",
        icon: <Target className="w-6 h-6 text-green-500" />,
        color: "bg-green-500",
        description: "Moderate risk, stable returns",
      };
    return {
      name: "Aggressive",
      icon: <Flame className="w-6 h-6 text-red-500" />,
      color: "bg-red-500",
      description: "High risk, high reward",
    };
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isDisabled) {
        toast.error("Please fill all required fields!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        return;
      }

      const registerData = {
        userName: formData.telegramId,
        twitterId: formData.twitterId,
        tokenName: formData.name,
        tokenSymbol: formData.ticker,
        tokenDescription: formData.description,
        aiType: formData.aiTypeScore,
        aiPersonalities: formData.selectedPersonalities
          .map((p) => p.id)
          .join(","),
        tradingStyle: formData.tradeScore,
        additionalTraits: formData.additionalTraits,
        customPersonality: formData.customPersonality,
      };

      const formDataLocal = new FormData();

      Object.keys(registerData).forEach((key) => {
        formDataLocal.append(key, registerData[key]);
      });

      // Check if `formData.image` is a valid File object
      if (formData.image && formData.image instanceof File) {
        formDataLocal.append("file", formData.image);
      } else {
        console.warn("formData.image is not a valid File object");
      }

      await apiPostRequest("aiMemecoin/memecoin/register", formDataLocal);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const togglePersonality = (personality) => {
    setFormData((prev) => {
      const isSelected = prev.selectedPersonalities.some(
        (p) => p.id === personality.id
      );
      if (isSelected) {
        return {
          ...prev,
          selectedPersonalities: prev.selectedPersonalities.filter(
            (p) => p.id !== personality.id
          ),
        };
      } else {
        return {
          ...prev,
          selectedPersonalities: [...prev.selectedPersonalities, personality],
        };
      }
    });
  };

  const PersonalityCard = ({ personality, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all border-2 hover:shadow-lg ${
        isSelected
          ? `${personality.color} border-opacity-100`
          : "border-transparent hover:border-gray-600"
      } !bg-gray-900 transform hover:scale-105`}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
            isSelected ? personality.color : "bg-gray-800"
          }`}
        >
          {personality.icon}
        </div>
        <div className="space-y-2">
          <h3 className={`font-bold text-lg text-white `}>
            {personality.name}
          </h3>
          <p className="text-sm text-gray-400">{personality.role}</p>
          <p className="text-sm text-gray-300">{personality.description}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {personality.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-green-400 w-5 h-5">
          {isSelected && <CheckCircle2 className="w-full h-full" />}
        </div>
      </div>
    </div>
  );

  const ImageUploadSection = () => (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
        <ImagePlus className="w-4 h-4 text-blue-500" />
        Token Hologram <span className="text-red-500">*</span>
      </label>

      <div
        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-gray-800 relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {formData.imagePreview ? (
          <div>
            <img
              src={formData.imagePreview}
              alt="Token preview"
              className="max-h-[11.5rem] mx-auto rounded-lg"
            />
            <button
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  image: null,
                  imagePreview: null,
                }))
              }
              className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full hover:bg-red-700 transition-all duration-200 ease-in-out shadow-lg flex items-center justify-center"
              style={{ lineHeight: "0.875rem" }} // adjust line-height
            >
              <span className="text-xl font-bold">×</span>
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex justify-center">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-lg text-gray-300">
                Upload your token's visual manifestation
              </p>
              <p className="text-sm text-gray-500">
                Drag and drop or click to upload
              </p>
            </div>
            <label className="inline-flex items-center px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-600 cursor-pointer">
              <Upload className="w-4 h-4 mr-2 text-gray-400" />
              Choose File
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );

  const currentTradeStyle = getTradeStyle(formData.tradeScore);
  const currentAIType = getAIType(formData.aiTypeScore);

  const isDisabled =
    !formData.telegramId?.trim() ||
    !formData.twitterId?.trim() ||
    !formData.name?.trim() ||
    !formData.ticker?.trim() ||
    !formData.description?.trim() ||
    formData.selectedPersonalities.length === 0 ||
    formData.tradeScore === null ||
    formData.aiTypeScore === null ||
    !formData.image;

  return (
    <div className="bg-[#1a1a2e]">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {showForm && (
        <div className="max-w-6xl mx-auto p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-700 to-pink-600 p-4">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                Agentic Meme Token
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-6">
              {/* Social IDs */}
              <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 space-y-6 p-4 md:p-6">
                <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" /> Creator Info
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Telegram ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      Telegram ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-purple-500"
                      value={formData.telegramId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          telegramId: e.target.value,
                        }))
                      }
                      placeholder="@username"
                    />
                  </div>
                  {/* Twitter ID */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                      <Twitter className="w-4 h-4 text-blue-400" />
                      Twitter ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-blue-500"
                      value={formData.twitterId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          twitterId: e.target.value,
                        }))
                      }
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md space-y-6">
                <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-yellow-400" /> Token Details
                </h2>

                {/* Token Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                      <Pencil className="w-4 h-4 text-yellow-400" />
                      Token Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-yellow-400"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter token name..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      Token Symbol <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:border-green-400"
                      value={formData.ticker}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          ticker: e.target.value,
                        }))
                      }
                      placeholder="$SYMBOL"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Token Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      Token Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 resize-none"
                      rows="10"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe your token..."
                    />
                  </div>

                  {/* Image Upload Section */}
                  <ImageUploadSection />
                </div>
              </div>

              <div className="space-y-6 p-4 md:p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-md ">
                {/* AI Type */}
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-gray-300">
                    AI Type <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`p-4 rounded-lg ${currentAIType.color} bg-opacity-20`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{currentAIType.icon}</span>
                      <h3 className="font-bold text-white">
                        {currentAIType.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {currentAIType.description}
                      </p>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.aiTypeScore}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aiTypeScore: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                      <span>Calm & Strategic</span>
                      <span>Chaotic & Dynamic</span>
                    </div>
                  </div>
                </div>

                {/* AI Personalities */}
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-gray-300">
                    Select AI Personalities (Multiple){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {AI_PERSONALITIES.map((personality) => (
                      <PersonalityCard
                        key={personality.id}
                        personality={personality}
                        isSelected={formData.selectedPersonalities.some(
                          (p) => p.id === personality.id
                        )}
                        onClick={() => togglePersonality(personality)}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom Personality */}
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-gray-300 mb-2">
                    Add Custom Personality
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Donald Trump"
                      value={formData.customPersonality}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          customPersonality: e.target.value,
                        }))
                      }
                      className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                {/* Trading Style */}
                <div className="space-y-3">
                  <label className="block text-lg font-semibold text-gray-300">
                    Trading Style <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`p-4 rounded-lg ${currentTradeStyle.color} bg-opacity-20`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {currentTradeStyle.icon}
                      <h3 className="font-bold text-white">
                        {currentTradeStyle.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {currentTradeStyle.description}
                      </p>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.tradeScore}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tradeScore: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                      <span>Conservative</span>
                      <span>Aggressive</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional Traits */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-pink-500" />
                  Additional Traits
                </label>
                <textarea
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500"
                  rows="3"
                  value={formData.additionalTraits}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      additionalTraits: e.target.value,
                    }))
                  }
                  placeholder="Add any additional traits..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                // disabled={isDisabled}
                className={`w-full bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 text-white py-2 px-4 rounded-md hover:opacity-90 transition-all duration-300 font-medium flex items-center justify-center gap-2 ${
                  isDisabled ? "opacity-50" : ""
                }`}
              >
                <Send className="w-5 h-5 text-yellow-300" />
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {!showForm && <Thanks />}
    </div>
  );
};

export default AIAgentForm;
