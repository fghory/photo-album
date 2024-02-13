"use server";
import React from "react";
import cloudinary from "cloudinary";

const setAsFavouriteAction = async (publicId: string, isFavorite: boolean) => {
  {
    isFavorite
      ? await cloudinary.v2.uploader.add_tag("favorite", [publicId])
      : await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
  }
};

export default setAsFavouriteAction;
