import CloudinaryImage from "@/components/CloudinaryImage";
import ForceRefresh from "@/components/forceRefresh";
import ImageGrid from "@/components/image-grid";

import cloudinary from "cloudinary";
import React from "react";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

const GalleryPage = async ({
  // params destructuring for dynamic routing
  params: { albumName },
}: {
  params: { albumName: string };
}) => {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder=${albumName}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(33)
    .execute()) as { resources: SearchResult[] };
  console.log("results", results);

  //Masonary Grid function

  return (
    <section>
      <ForceRefresh />
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">
          Album:{"  "}
          <span className="text-blue-400 font-semibold">{albumName}</span>
        </h1>
      </div>
      <ImageGrid
        images={results.resources}
        getImage={(imageData: SearchResult) => (
          <CloudinaryImage
            key={imageData.public_id}
            src={imageData.public_id}
            imagedata={imageData}
            width="400"
            height="300"
            alt="image of something"
          />
        )}
      />
    </section>
  );
};

export default GalleryPage;
