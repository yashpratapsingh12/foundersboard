import React from "react";
import { formatdate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Startup, Author } from "@/sanity/types";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/utils";
import UpdateStartup from "./UpdateStartup";
import UpdateButtonComp from "./UpdateButtonComp";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import DeletePost from "./DeletePost";
import { Button } from "./ui/button";

export type startupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StarupCard = ({ Posts, id }: { Posts: startupTypeCard; id?: string }) => {
  return (
    <li className="bg-white border-[5px] border-black py-6 px-5 rounded-[22px]  hover:border-[#EE2B69] transition-all duration-500 hover:shadow-xl hover:bg-pink-100">
      <div className="flex flex-row justify-between">
        <p className="font-medium text-[16px] bg-primary-100 px-4 py-2 rounded-full hover:bg-white-100">
          {formatdate(Posts._createdAt)}
        </p>
        {id === Posts.author?._id && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={`/startup/update/${Posts._id}`}>
                  <Button>Update</Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DeletePost postid={Posts._id} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
            src={`${Posts.author?.image}`}
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
          <p className="ml-4 mt-2 uppercase font-bold">{Posts.category}</p>
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
