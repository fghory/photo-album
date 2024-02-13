import CloudinaryImage from "@/components/CloudinaryImage";
import FavoritesList from "@/components/favorites-list";
import cloudinary from "cloudinary";
import React from "react";
import { SearchResult } from "../gallery/page";
import ForceRefresh from "@/components/forceRefresh";

const FavoritesPage = async () => {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(10)
    .execute()) as { resources: SearchResult[] };
  console.log("results", results);

  return (
    <section>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">Favorites</h1>=
      </div>

      <FavoritesList initialResources={results.resources} />
    </section>
  );
};

export default FavoritesPage;
