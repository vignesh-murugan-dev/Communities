import React from "react";

const Hero = () => {
  return (
    <div className="min-w-[1120px]  bg-[#fafafa] font-inter">
      <header className="text-center py-32 px-4">
        <h1 className="text-[82px] md:text-[82px] font-semibold text-black">
          Don’t miss your <br></br> next <span className="text-[#03B051]">community</span> meetup
        </h1>
        <p className="mt-4 text-[24px] text-[#667085]">
          find events, register & meet <br></br>  fellow minds.
        </p>
        <button className="mt-6 px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-opacity-80">
          Add your events to the list
        </button>
      </header>

    </div>
  );
};

export default Hero;
