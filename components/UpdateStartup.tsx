"use client";

import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { error } from "console";
import React, { useActionState } from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

const UpdateStartup = ({
  id,
  PostID,
}: {
  id: string | undefined;
  PostID: string;
}) => {
  const post = client.fetch(STARTUP_BY_ID_QUERY, { id: PostID });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const handleFucntion = (state: any, formData: FormData) => {};

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
