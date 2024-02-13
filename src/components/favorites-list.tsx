"use client";
import { SearchResult } from "@/app/gallery/page";
import CloudinaryImage from "@/components/CloudinaryImage";
import cloudinary from "cloudinary";
import React, { useEffect, useState } from "react";
import ForceRefresh from "./forceRefresh";
import ImageGrid from "./image-grid";

const FavoritesList = ({
  initialResources,
}: {
  initialResources: SearchResult[];
}) => {
  const [resources, setResources] = useState(initialResources);
  useEffect(() => {
    setResources(initialResources);
  }, [initialResources]);

  return (
    <>
      <ForceRefresh />
      <ImageGrid
        images={resources}
        getImage={(imageData: SearchResult) => (
          <CloudinaryImage
            key={imageData.public_id}
            src={imageData.public_id}
            imagedata={imageData}
            width="400"
            height="300"
            alt="image of something"
            onUnheart={(unheartedResource) => {
              setResources((currentResources) =>
                currentResources.filter(
                  (resource) =>
                    resource.public_id !== unheartedResource.public_id
                )
              );
            }}
          />
        )}
      />
    </>
  );
};

export default FavoritesList;
