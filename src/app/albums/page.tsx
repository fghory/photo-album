import { AlbumCard } from "@/components/AlbumCard";
import CloudinaryImage from "@/components/CloudinaryImage";
import ImageGrid from "@/components/image-grid";
import UploadButton from "@/components/UploadButton";
import cloudinary from "cloudinary";
import React from "react";

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export type Folder = { name: string; path: string };

const AlbumsPage = async () => {
  //destructuring
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };

  console.log(folders);

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-4xl font-bold">Albums</h1>
        </div>

        <div className="flex justify-between gap-4 w-fit">
          {folders.map((folder) => {
            return <AlbumCard key={folder.path} folder={folder} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default AlbumsPage;
