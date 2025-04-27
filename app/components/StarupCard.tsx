import React from "react";
import { formatdate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const StarupCard = ({ Posts }: { Posts: startupTypeCard }) => {
  return (
    <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px] shadow-200 hover:border-primary transition-all duration-500 hover:shadow-300 hover:bg-primary-100">
      <div className="flex-between">
        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full group-hover:bg-white-100">
          {formatdate(Posts._createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-black" />
          <span>{Posts.views}</span>
        </div>
      </div>
      <div>
        <div>
          <Link href={`/user/${Posts.author?._id}`}>
            <p className="text-lg line-clamp-1">{Posts.author.name}</p>
          </Link>
          <Link href={`/startup/${Posts._id}`}>
            <h3>{Posts.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${Posts.author?._id}`}>
          <Image
            src="https://placehold.co/600x400"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${Posts._id}`}>
        <p>{Posts.description}</p>
        <img src={`${Posts.image}`} alt="place" />
      </Link>
    </li>
  );
};

export default StarupCard;
