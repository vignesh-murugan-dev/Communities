"use client"
import Image from "next/image";
import React from "react";
import rocket from "../../public/rocket.png";

const Hero = () => {


  return (
    <>
      <div className={`absolute inset-0 z-0 w-[406px] h-[406px] bg-[#7eff5f]/75 rounded-full blur-[200px] md:translate-x-[440px] md:translate-y-[120px]`} />

      <div className="bg-[#fafafa] px-4 md:px-8 lg:px-16 mb-48 flex my-16 items-start z-10">
      <div className="container mx-auto text-center md:text-left px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-2xl z-10">
        <h1 className="text-4xl text-black md:text-6xl lg:text-7xl font-semibold leading-tight">
          Dont miss your
          next community
          <br />
          <span className="text-[#03b051] italic">meetup</span>
        </h1>
        <p className="mt-4 text-gray-600 text-[20px]">
          meet. network. share
        </p>
        </div>
        <div className="">
        <Image
          src={rocket}
          alt="Rocket illustration"
          width={288}
          height={365}
        />
        </div>
      </div>
      </div>
    </>
  );
};

export default Hero;