"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MapPin from "@/assets/icons/mapPin.svg";

interface LocationMenuProps {
  locations: string[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const LocationMenu: React.FC<LocationMenuProps> = ({
  locations,
  selectedLocation,
  setSelectedLocation,
  setSearchTerm,
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(search.toLowerCase())
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    } else {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSearchTerm(search.trim());
  }, [search, setSearchTerm]);

  return (
    <div className="relative py-4 w-60 sm:w-96" ref={menuRef}>
      <div
        className="flex gap-2 border border-gray-400 p-2 rounded-xl cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}>
        <Image src={MapPin} alt="Map Pin Icon" width={25} height={25} />
        <span>{selectedLocation}</span>
      </div>
      {isOpen && (
        <div className="absolute border bg-white mt-1 w-full max-h-64 overflow-y-auto z-10">
          <input
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-b p-2 w-full"
            ref={searchInputRef}
          />
          <ul>
            {filteredLocations.map((location, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-cyan-300"
                onClick={() => {
                  setSelectedLocation(location);
                  setIsOpen(false);
                }}>
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationMenu;

/*
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MapPin from "@/assets/icons/mapPin.svg";

interface LocationMenuProps {
  locations: string[];
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const LocationMenu: React.FC<LocationMenuProps> = ({
  locations,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(search.toLowerCase())
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    } else {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="relative py-4 w-60 sm:w-96" ref={menuRef}>
      <div
        className="flex gap-2 border border-gray-400 p-2 rounded-xl cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}>
        <Image src={MapPin} alt="Map Pin Icon" width={25} height={25} />
        <span>{selectedLocation}</span>
      </div>
      {isOpen && (
        <div className="absolute border bg-white mt-1 w-full max-h-64 overflow-y-auto z-10">
          <input
            type="text"
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-b p-2 w-full"
            ref={searchInputRef}
          />
          <ul>
            {filteredLocations.map((location, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-cyan-300"
                onClick={() => {
                  setSelectedLocation(location);
                  setIsOpen(false);
                }}>
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationMenu;
*/
