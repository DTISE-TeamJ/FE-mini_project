// "use client";

// import { useCategoryContext } from "@/app/_context/CategoryContext";
// import { useState } from "react";
// import EventCard from "./EventCard";

// const EventShowcase: React.FC = () => {
//   const { activeCategory } = useCategoryContext();

//   const filterEventsByCategory = (category: string): Event[] => {
//     return category === "All"
//       ? events
//       : events.filter((event) => event.category === category);
//   };

//   const handleEventClick = (event: Event) => {
//     setSelectedEvent(event);
//   };

//   return (
//     <>
//       <div className="grid grid-cols-2 gap-4 p-4">
//         {filterEventsByCategory(activeCategory).map((event) => (
//           <div key={event.id} onClick={() => handleEventClick(event)}>
//             <EventCard />
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default EventShowcase;
