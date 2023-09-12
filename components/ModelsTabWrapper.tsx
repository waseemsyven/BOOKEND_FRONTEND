"use client";

import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const ModelStatArray = ["All Models", "Training", "Deployed", "Uploading"];
  const headers = {
    Authorization: "bearer cmFqZW5kcmEubmF5YWxAc3l2ZW4uY29tOjY0TlU5UDVtdDJ3",
  };

  const getModels = async () => {
    const response = await fetch(
      "https://control-plane-qomhxh6ofa-uc.a.run.app/syven-pdp/models/list",
      {
        headers: {
          Authorization: `Basic cmFqZW5kcmEubmF5YWxAc3l2ZW4uY29tOjY0TlU5UDVtdDJ3`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getModels();
  }, []);

  return (
    <div className="w-full px-8 mt-4">
      <Tab.Group>
        <Tab.List className="flex gap-10">
          {ModelStatArray.map((stat, index) => (
            <Tab
              className={({ selected }) =>
                classNames(
                  "text-base font-medium focus:outline-none",
                  selected ? "text-[#2D2E34] font-semibold" : "text-[#808080]"
                )
              }
              key={index}
            >
              {stat}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white border",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            <ul></ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
