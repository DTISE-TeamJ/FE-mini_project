import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MapPin from "@/assets/icons/mapPin.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface LocationMenuProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const LocationMenu: React.FC<LocationMenuProps> = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: metadata } = useSelector((state: RootState) => state.metadata);
  const locations = ["All locations", ...(metadata?.locations || [])];

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

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location === "All locations" ? "" : location);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={menuRef}>
      <div
        className="flex items-center justify-between border border-gray-400 p-2 rounded-xl cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <Image src={MapPin} alt="Map Pin Icon" width={25} height={25} />
          <span className="ml-2">{selectedLocation || "All locations"}</span>
        </div>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="absolute bg-white mt-1 w-full z-10 rounded-xl overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-b p-2 w-full"
            ref={searchInputRef}
          />
          <ul className="max-h-60 overflow-y-auto">
            {filteredLocations.map((location, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-cyan-300"
                onClick={() => handleLocationSelect(location)}
              >
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