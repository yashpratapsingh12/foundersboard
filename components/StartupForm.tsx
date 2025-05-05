"use client";
import React from "react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("pitch");

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
            name="link"
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
          />
          {errors.link && <p>{errors.link}</p>}
        </div>
      </form>
    </>
  );
};

export default StartupForm;
