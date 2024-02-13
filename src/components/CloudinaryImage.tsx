"use client";
import React, { useState, useTransition } from "react";
import { CldImage, CldImageProps } from "next-cloudinary";
import Heart from "./Heart";
import cloudinary from "cloudinary";
import setAsFavouriteAction from "./actions";
import { SearchResult } from "@/app/gallery/page";
import FullHeart from "./FullHeart";
import { ImageMenu } from "./ImageMenu";

const CloudinaryImage = (
  props: {
    imagedata: SearchResult;
    onUnheart?: (unheartedReource: SearchResult) => void;
    [key: string]: any;
  } & CldImageProps
) => {
  const [transition, startTransition] = useTransition();
  const { imagedata, onUnheart } = props;
  const [isFavorited, setIsFavorited] = useState(
    imagedata.tags.includes("favorite")
  );

  return (
    <div className="relative">
      <CldImage {...props} />
      {isFavorited ? (
        <FullHeart
          onClick={() => {
            onUnheart?.(imagedata);
            setIsFavorited(false);
            startTransition(() => {
              setAsFavouriteAction(imagedata.public_id, false);
            });
          }}
          className="absolute top-2 left-2 hover:text-white text-red-400 cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() => {
            setIsFavorited(true);
            startTransition(() => {
              setAsFavouriteAction(imagedata.public_id, true);
            });
          }}
          className="absolute top-2 left-2 hover:text-red-400 cursor-pointer"
        />
      )}
      <ImageMenu image={imagedata} />
    </div>
  );
};

export default CloudinaryImage;
