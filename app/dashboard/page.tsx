import { CarauselCard, HeroCard } from "@/components";
import AddDomainCard from "@/components/AddDomainCard";
import React from "react";

const page = () => {
  return (
    <div className="h-full w-full bg-white rounded-bl-2xl">
      <HeroCard />
      <div className="flex items-stretch">
        <AddDomainCard />
        <CarauselCard />
      </div>
    </div>
  );
};

export default page;
