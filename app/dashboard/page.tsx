"use client";

import { CarauselCard, HeroCard, Navbar } from "@/components";
import AddDomainCard from "@/components/AddDomainCard";
import { useEffect } from "react";

const page = () => {
  return (
    <div className="h-full w-full bg-white rounded-bl-2xl">
      <Navbar />
      <HeroCard />
      <div className="flex items-stretch">
        <AddDomainCard />
        <CarauselCard />
      </div>
    </div>
  );
};

export default page;
