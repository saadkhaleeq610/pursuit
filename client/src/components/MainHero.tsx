import React from "react";
import HeroImg from "../assets/heroimg.jpg";

export const MainHero: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 sm:px-12 md:p-12">
      <div className="px-4 py-6 flex-col space-y-6 lg:max-w-3xl lg:space-y-8">
        <h1 className="text-3xl md:text-5xl font-bold text-pursuit-black">
          AI-first service. Catered to humans.
        </h1>
        <p className="text-lg md:text-xl text-pursuit-black">
          Customers and employees are more than interactions—they're human.
          Give them faster, more personalized experiences using AI trained in
          the art of customer service.
        </p>
        <div className="flex flex-col sm:flex-col md:flex-row items-center space-y-4 md:space-y-0 sm:space-x-2 md:space-x-4">
          <input
            type="email"
            placeholder="Enter work email"
            className="flex flex-col w-full px-4 min-h-[42px] rounded-md border border-pursuit-black focus:outline-none focus:ring-2 focus:ring-pursuit-black focus:border-transparent sm:min-w-14 md:min-w-20 lg:min-w-24"
          />
          <button className="w-full px-6 py-3 rounded-full bg-pursuit-black text-white font-semibold text-sm hover:bg-black sm:min-w-10 md:min-w-12 lg:min-w-14">
            Get Started
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img src={HeroImg} alt="Hero Image" className="max-w-[300px] " />
      </div>
    </div>
  );
};