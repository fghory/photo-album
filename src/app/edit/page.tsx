"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CldImage } from "next-cloudinary";
import React, { useState } from "react";

const EditPage = ({
  searchParams: { publicId },
}: {
  searchParams: { publicId: string };
}) => {
  const [transformation, setTransformation] = useState<
    | undefined
    | "generative-fill"
    | "zoompan"
    | "grayscale"
    | "pixelate"
    | "opacity"
    | "removeBackground"
  >();

  const [prompt, setPrompt] = useState("");

  return (
    <section>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">Edit</h1>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <Button
          onClick={() => {
            setTransformation(undefined);
          }}
        >
          Clear All
        </Button>
        <div className="flex flex-col gap-4">
          <Button
            variant="secondary"
            onClick={() => {
              setTransformation("generative-fill");
            }}
          >
            Apply Generative Fill
          </Button>
          <Input
            className="text-black"
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            setTransformation("zoompan");
          }}
        >
          Apply Zoom Pan
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setTransformation("grayscale");
          }}
        >
          Convert to Gray Scale
        </Button>

        <Button
          variant="secondary"
          onClick={() => {
            setTransformation("opacity");
          }}
        >
          Apply Opacity
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            setTransformation("removeBackground");
          }}
        >
          Remove Background
        </Button>
      </div>
      <div className="flex gap-4">
        <CldImage src={publicId} width="300" height="200" alt="some image" />
        {transformation === "generative-fill" && (
          <CldImage
            src={publicId}
            width="300"
            height="200"
            alt="AI image"
            crop="pad"
            fillBackground={{ prompt }}
          />
        )}
        {transformation === "zoompan" && (
          <CldImage
            src={publicId}
            width="300"
            height="200"
            zoompan="loop"
            alt="Zoom&Pan"
          />
        )}
        {transformation === "grayscale" && (
          <CldImage
            src={publicId}
            width="300"
            height="200"
            className="grayscale"
            alt="B&W"
          />
        )}

        {transformation === "opacity" && (
          <CldImage
            src={publicId}
            width="300"
            height="200"
            className="opacity-50"
            alt="Opacity"
          />
        )}
        {transformation === "removeBackground" && (
          <CldImage
            src={publicId}
            width="300"
            height="200"
            removeBackground
            alt="Background Removal"
          />
        )}
      </div>
    </section>
  );
};

export default EditPage;
