"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { createPitch } from "@/lib/Action";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const route = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast.success("Your startup pitch has been created successfully");
      }
      route.push(`/startup/${result._id}`);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("An unexpected error has happened");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
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

        {errors.link && <p className="text-red-500 mt-2 ml-5">{errors.link}</p>}
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
  );
};

export default StartupForm;
