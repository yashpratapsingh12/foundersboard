"use client";

import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { error } from "console";
import React, { use, useActionState, useEffect } from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { notFound } from "next/navigation";
import { PageNotFoundError } from "next/dist/shared/lib/utils";
import { Startup } from "@/sanity/types";
import { title } from "process";
import { updatePitch } from "@/lib/Action";
import { formSchema } from "@/lib/validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";

const UpdateStartup = ({
  id,
  PostID,
}: {
  id: string | undefined;
  PostID: string;
}) => {
  // const post = client.fetch(STARTUP_BY_ID_QUERY, { id: PostID });
  const [post, setPost] = useState<Startup>();
  const [pitch, setPitch] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await client.fetch(STARTUP_BY_ID_QUERY, { id: PostID });

        setPost(res);
        setPitch(res?.pitch || "");
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [PostID]);

  const handleFucntion = async (state: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      console.log(formValues);
      await formSchema.parseAsync(formValues);
      const result = await updatePitch(state, formData, pitch, PostID);
      if (result.status === "SUCCESS") {
        toast.success("Your pitch has been finally Updated");
        router.push(`/startup/${result._id}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");
        return { ...state, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error has happened");

      return {
        ...state,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFucntion, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div>
      <form
        action={formAction}
        className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6"
      >
        <div>
          <label htmlFor="title" className="uppercase font-bold">
            Title
          </label>
          <Input
            id="title"
            name="title"
            value={post?.title ?? ""}
            onChange={(e) =>
              setPost((prev) => ({
                ...prev!,
                title: e.target.value,
              }))
            }
            className="rounded-full"
            required
            placeholder="Startup Title"
          />

          {errors.title && (
            <p className="text-red-500 mt-2 ml-5">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="uppercase font-bold">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={post?.description ?? ""}
            onChange={(e) =>
              setPost((prev) => ({
                ...prev!,
                description: e.target.value,
              }))
            }
            className="startup-form_textarea"
            required
            placeholder="Startup Description"
          />

          {errors.description && (
            <p className="text-red-500 mt-2 ml-5">{errors.description}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="uppercase font-bold">
            Category
          </label>
          <Input
            id="category"
            name="category"
            value={post?.category ?? ""}
            onChange={(e) =>
              setPost((prev) => ({
                ...prev!,
                category: e.target.value,
              }))
            }
            className="rounded-full"
            required
            placeholder="Startup Category (Tech, Health, Education...)"
          />

          {errors.category && (
            <p className="text-red-500 mt-2 ml-5">{errors.category}</p>
          )}
        </div>

        <div>
          <label htmlFor="link" className="uppercase font-bold">
            Image URL
          </label>
          <Input
            id="link"
            name="link"
            value={post?.image ?? ""}
            onChange={(e) =>
              setPost((prev) => ({
                ...prev!,
                image: e.target.value,
              }))
            }
            className="rounded-full"
            required
            placeholder="Startup Image URL"
          />

          {errors.link && (
            <p className="text-red-500 mt-2 ml-5">{errors.link}</p>
          )}
        </div>

        <div data-color-mode="light">
          <label htmlFor="pitch" className="uppercase font-bold">
            Pitch
          </label>

          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />

          {errors.pitch && (
            <p className="text-red-500 mt-2 ml-5">{errors.pitch}</p>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit Your Pitch"}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default UpdateStartup;
