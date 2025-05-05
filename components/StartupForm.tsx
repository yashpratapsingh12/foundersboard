"use client";
import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("pitch");

  const [isPending, setispe] = useState(false);

  return (
    <>
      <form>
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
