"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const SearchForm = ({ initialSearch }: { initialSearch: string }) => {
  const [tagName, setTagName] = useState(initialSearch ?? "");
  const router = useRouter();

  useEffect(() => {
    setTagName(initialSearch);
  }, [initialSearch]);

  return (
    <form
      className="mb-4"
      onSubmit={(e) => {
        e.preventDefault();
        router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
        router.refresh();
      }}
    >
      <Label htmlFor="tag-name" className="text-right">
        Search by tag
      </Label>

      <div className="flex gap-2">
        <Input
          onChange={(e) => {
            setTagName(e.currentTarget.value);
          }}
          id="tag-name"
          value={tagName}
          placeholder="tag name ..."
          className="col-span-3 text-black"
        />
        <Button variant="default" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
