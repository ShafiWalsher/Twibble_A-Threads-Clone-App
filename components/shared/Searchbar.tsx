"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Input } from "../ui/input";
import SearchModalCard from "../cards/SearchModalCard";
import { IUser } from "@/lib/database/models/user.model";

interface Props {
  routeType: string;
  searchedResult: IUser[] | null | undefined;
}

function Searchbar({ routeType, searchedResult }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // setfocus for the input
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // query after 0.3s of no input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  // Handle focus state
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <div
        className={` ${
          isFocused && search
            ? "focus-within:rounded-t-2xl rounded-t-2xl searchbar group"
            : "searchbar group rounded-2xl"
        }`}
      >
        <Image
          src="/assets/icons/search-gray.svg"
          alt="search"
          width={20}
          height={20}
          className="object-contain p-0 m-0 aspect-square"
        />
        <Input
          id="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="no-focus searchbar_input"
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {search && (
          <div className="p-2 flex items-center" onClick={() => setSearch("")}>
            <Image
              src="/assets/icons/close.svg"
              alt="search"
              width={20}
              height={20}
              className="object-contain p-0 opacity-0 group-focus-within:opacity-100 transition-all duration-75 cursor-pointer"
            />
          </div>
        )}
      </div>
      <div className="absolute z-10 -bottom-30 w-full">
        {isFocused && search && (
          <SearchModalCard value={search} searchedResult={searchedResult} />
        )}
      </div>
    </div>
  );
}

export default Searchbar;
