import React from "react";
import { formatdate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Startup, Author } from "@/sanity/types";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";

export type startupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StarupCard = ({ Posts }: { Posts: startupTypeCard }) => {
  return (
    <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px]  hover:border-[#EE2B69] transition-all duration-500 hover:shadow-xl hover:bg-pink-100">
      <div className="flex flex-row justify-between">
        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100">
          {formatdate(Posts._createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-black" />
          <span>{Posts.views}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <Link href={`/user/${Posts.author?._id}`}>
            <p className=" font-semibold ml-4 text-lg line-clamp-1">
              {Posts.author?.name}
            </p>
          </Link>
          <Link href={`/startup/${Posts._id}`}>
            <h3 className="font-bold ml-4 mt-1 text-xl">{Posts.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${Posts.author?._id}`}>
          <Image
            src="https://placehold.co/600x400"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full "
          />
        </Link>
      </div>
      <Link href={`/startup/${Posts._id}`}>
        <p className="ml-4 mt-2 mb-1">{Posts.description}</p>
        <img src={`${Posts.image}`} alt="place" className="rounded-lg " />
      </Link>
      <div>
        <Link href={""}>
          <p className="ml-4 mt-2">{Posts.category}</p>
        </Link>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);
export default StarupCard;
