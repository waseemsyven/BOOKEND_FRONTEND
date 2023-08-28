"use client";

import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [models, setmodels] = useState<Array<any>>([]);
  const axios = require("axios");

  useEffect(() => {
    const endpoint = "https://huggingface.co/api/models";
    axios
      .get(endpoint)
      .then((response: any) => {
        const models = response.data;

        const first7Models = models.slice(0, 8);
        setmodels(first7Models);
      })
      .catch((error: Error) => {
        console.error("Error fetching models:", error);
      });
  }, []);

  useEffect(() => {
    setCategories({
      "All Models(8)": models,
      "Training(5)": [
        {
          id: 1,
          title: "Is tech making coffee better or worse?",
          date: "Jan 7",
          commentCount: 29,
          shareCount: 16,
        },
        {
          id: 2,
          title: "The most innovative things happening in coffee",
          date: "Mar 19",
          commentCount: 24,
          shareCount: 12,
        },
      ],
      "Deployed(3)": [
        {
          id: 1,
          title: "Ask Me Anything: 10 answers to your questions about coffee",
          date: "2d ago",
          commentCount: 9,
          shareCount: 5,
        },
        {
          id: 2,
          title: "The worst advice we've ever heard about coffee",
          date: "4d ago",
          commentCount: 1,
          shareCount: 2,
        },
      ],
      "Uploading(1)": [
        {
          id: 1,
          title: "Ask Me Anything: 10 answers to your questions about coffee",
          date: "2d ago",
          commentCount: 9,
          shareCount: 5,
        },
        {
          id: 2,
          title: "The worst advice we've ever heard about coffee",
          date: "4d ago",
          commentCount: 1,
          shareCount: 2,
        },
      ],
    });
  }, [models]);

  console.log(models);

  let [categories, setCategories] = useState<any>();

  return (
    <div className="w-full px-8 mt-4">
      <Tab.Group>
        <Tab.List className="flex gap-10">
          {categories &&
            Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "text-base font-medium focus:outline-none",
                    selected ? "text-[#2D2E34] font-semibold" : "text-[#808080]"
                  )
                }
              >
                {category}
              </Tab>
            ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories &&
            Object.values(categories).map((posts: any, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-white border",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                )}
              >
                <ul>
                  {posts.map((post: any) => (
                    <Link href={`models/${post.id}`}>
                      <li
                        key={post.id}
                        className="relative rounded-md p-3 hover:bg-gray-100 border"
                      >
                        <h3 className="text-sm font-medium leading-5">
                          {post.id}
                        </h3>

                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                          <li>{post.date}</li>
                          <li>&middot;</li>
                          <li>Model Type - {post.commentCount} </li>
                          <li>&middot;</li>
                          <li>{post.shareCount} shares</li>
                        </ul>

                        <a
                          href="#"
                          className={classNames(
                            "absolute inset-0 rounded-md",
                            "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                          )}
                        />
                      </li>
                    </Link>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
