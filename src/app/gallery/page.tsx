import CloudinaryImage from "@/components/CloudinaryImage";
import ImageGrid from "@/components/image-grid";
import SearchForm from "@/components/SearchForm";
import UploadButton from "@/components/UploadButton";
import cloudinary from "cloudinary";
import React from "react";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

const GalleryPage = async ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image${search ? ` AND tags=${search}` : ""}`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(33)
    .execute()) as { resources: SearchResult[] };
  //console.log("results", results);

  //Masonary Grid function

  return (
    <section>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <SearchForm initialSearch={search} />
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
