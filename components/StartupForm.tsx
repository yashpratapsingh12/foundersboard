"use client";
import React, { useActionState } from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("pitch");
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
      console.log(formValues);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.flatten().fieldErrors;
        setErrors(fieldError as unknown as Record<string, string>);
        return {
          ...prevState,
          error: "validation failed",
          status: "Error",
        };
      }
      return {
        ...prevState,
        error: "An unexpected error has happend",
        status: "Error",
      };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "Error",
  });
  // console.log("ppp");

  return (
    <>
      <form action={formAction}>
        <div>
          <label htmlFor="title">Title</label>
          <Input id="title" name="title" required placeholder="Stratup Title" />
          {errors.title && <p>{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="Stratup description"
          />
          {errors.description && <p>{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <Input
            id="category"
            name="category"
            required
            placeholder="Stratup category"
          />
          {errors.category && <p>{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="link">Image Url</label>
          <Input
            id="link"
            name="Link"
            required
            placeholder="Stratup ImageUrl"
          />
          {errors.link && <p>{errors.link}</p>}
        </div>

        <div>
          <label htmlFor="pitch">Pitch</label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={300}
            textareaProps={{
              placeholder: "Briefly describe about your Startup",
            }}
          />
          {errors.pitch && <p>{errors.pitch}</p>}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "submitting...." : "Submit Your Startup "}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </>
  );
};

export default StartupForm;
