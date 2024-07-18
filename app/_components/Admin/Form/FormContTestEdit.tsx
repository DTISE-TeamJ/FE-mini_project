"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { useSession } from "next-auth/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchEventCategories,
  updateEvent,
  fetchEventsByUserId,
  fetchEventDetails,
} from "@/store/action/eventSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { eventUpdateValidationSchema } from "./eventUpdateValidationSchema";
import { Event } from "@/types/event";
import {
  setHours,
  setMinutes,
  addMinutes,
  isSameDay,
  parseISO,
} from "date-fns";

const FormContTestEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const eventCategories = useAppSelector(
    (state: RootState) => state.events.eventCategories
  );
  const userEvents = useAppSelector(
    (state: RootState) => state.events.userEvents
  );
  const currentEvent = useAppSelector(
    (state: RootState) => state.events.currentEvent
  );
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const userEventsLoading = useAppSelector(
    (state: RootState) => state.events.userEventsLoading
  );
  const [isLoading, setIsLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const loading = useAppSelector((state: RootState) => state.events.loading);
  const error = useAppSelector((state: RootState) => state.events.error);

  useEffect(() => {
    dispatch(fetchEventCategories());
    if (session?.user?.id) {
      const userId = parseInt(session.user.id, 10);
      if (!isNaN(userId)) {
        dispatch(fetchEventsByUserId(userId));
      } else {
        console.error("Invalid user ID");
      }
    }
  }, [dispatch, session]);

  useEffect(() => {
    const fetchEventData = async () => {
      if (selectedEventId) {
        setIsLoading(true);
        await dispatch(fetchEventDetails(selectedEventId));
        setIsLoading(false);
      }
    };
    fetchEventData();
  }, [dispatch, selectedEventId]);

  useEffect(() => {
    if (currentEvent) {
      setStartDate(parseISO(currentEvent.start));
      setEndDate(parseISO(currentEvent.end));
    }
  }, [currentEvent]);

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(Number(eventId));
  };

  useEffect(() => {
    dispatch(fetchEventCategories());
    if (session?.user?.id) {
      const userId = parseInt(session.user.id, 10);
      if (!isNaN(userId)) {
        dispatch(fetchEventsByUserId(userId))
          .unwrap()
          .catch((error) => {
            console.error("Failed to fetch user events:", error);
          });
      } else {
        console.error("Invalid user ID");
      }
    }
  }, [dispatch, session]);

  useEffect(() => {
    if (selectedEventId) {
      dispatch(fetchEventDetails(selectedEventId));
    }
  }, [dispatch, selectedEventId]);

  useEffect(() => {
    if (currentEvent) {
      setStartDate(parseISO(currentEvent.start));
      setEndDate(parseISO(currentEvent.end));
    }
  }, [currentEvent]);

  const formatDate = (date: Date | null) => {
    return date ? date.toISOString().slice(0, -1) : null;
  };

  if (!session) {
    return <div>Please log in to edit your events.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Your Event
      </h1>

      <div className="mb-6">
        <label
          htmlFor="eventSelect"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select Event to Edit
        </label>
        <select
          id="eventSelect"
          value={selectedEventId || ""}
          onChange={(e) => setSelectedEventId(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an event</option>
          {userEvents && userEvents.length > 0 ? (
            userEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))
          ) : (
            <option disabled>No events available</option>
          )}
        </select>
      </div>

      {userEventsLoading === "pending" && (
        <div className="mt-4 text-center text-green">
          Loading user events...
        </div>
      )}
      {error && (
        <div className="mt-4 text-center text-red-500">Error: {error}</div>
      )}

      {isLoading ? (
        <div className="mt-4 text-center">Loading event details...</div>
      ) : (
        selectedEventId &&
        currentEvent &&
        currentEvent.id === selectedEventId && (
          <Formik
            key={selectedEventId}
            initialValues={{
              name: currentEvent.name,
              image: null as File | null,
              description: currentEvent.description,
              eventCategory: currentEvent.eventCategory.id.toString(),
              location: currentEvent.location,
              organization: currentEvent.organization,
            }}
            validationSchema={eventUpdateValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log("Formik onSubmit called");

              const eventData = {
                name: values.name,
                description: values.description,
                eventCategoryId: values.eventCategory,
                location: values.location,
                organization: values.organization,
                start: formatDate(startDate),
                end: formatDate(endDate),
                userId: session?.user.id,
              };
              console.log("Event data to be sent:", eventData);

              try {
                const formData = new FormData();
                formData.append("eventData", JSON.stringify(eventData));
                if (values.image) {
                  formData.append("image", values.image);
                }

                const result = await dispatch(
                  updateEvent({ id: selectedEventId, formData })
                ).unwrap();
                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 3000);
                console.log("Event updated successfully:", result);
              } catch (error) {
                console.error("Failed to update event:", error);
              }

              setSubmitting(false);
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="Enter event name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Image
                  </label>
                  <input
                    id="image"
                    type="file"
                    onChange={(event) => {
                      const files = event.currentTarget.files;
                      if (files && files.length > 0) {
                        setFieldValue("image", files[0]);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder="Enter event description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="eventCategory"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Category
                  </label>
                  <Field
                    id="eventCategory"
                    name="eventCategory"
                    as="select"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Event Category</option>
                    {eventCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Field>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <Field
                    id="location"
                    name="location"
                    placeholder="Enter event location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Organization
                  </label>
                  <Field
                    id="organization"
                    name="organization"
                    placeholder="Enter organization name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Start Date and Time
                    </label>
                    <DatePicker
                      id="startDate"
                      selected={startDate}
                      onChange={(date: Date | null) => {
                        setStartDate(date);
                        setFieldValue("startDate", date);
                        if (date && endDate && endDate <= date) {
                          setEndDate(null);
                          setFieldValue("endDate", null);
                        }
                      }}
                      showTimeSelect
                      dateFormat="Pp"
                      minDate={new Date()}
                      minTime={setHours(setMinutes(new Date(), 0), 0)}
                      maxTime={setHours(setMinutes(new Date(), 59), 23)}
                      placeholderText="Select start date and time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      End Date and Time
                    </label>
                    <DatePicker
                      id="endDate"
                      selected={endDate}
                      onChange={(date: Date | null) => {
                        setEndDate(date);
                        setFieldValue("endDate", date);
                      }}
                      showTimeSelect
                      dateFormat="Pp"
                      minDate={startDate || new Date()}
                      minTime={
                        startDate && endDate && isSameDay(startDate, endDate)
                          ? addMinutes(startDate, 1)
                          : setHours(setMinutes(new Date(), 0), 0)
                      }
                      maxTime={setHours(setMinutes(new Date(), 59), 23)}
                      placeholderText="Select end date and time"
                      disabled={!startDate}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* <FieldArray name="ticketTypes">
               {({ push, remove }) => (
                 <div className="space-y-4">
                   <h2 className="text-xl font-semibold">Ticket Types</h2>
                   {values.ticketTypes.map((_, index) => (
                     <div
                       key={index}
                       className="space-y-3 p-4 border border-gray-300 rounded-md"
                     >
                       <div>
                         <label
                           htmlFor={`ticketTypes.${index}.name`}
                           className="block text-sm font-medium text-gray-700 mb-1"
                         >
                           Ticket Name
                         </label>
                         <Field
                           id={`ticketTypes.${index}.name`}
                           name={`ticketTypes.${index}.name`}
                           placeholder="Enter ticket name"
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                       </div>
                       <div className="grid grid-cols-2 gap-2">
                         <div>
                           <label
                             htmlFor={`ticketTypes.${index}.price`}
                             className="block text-sm font-medium text-gray-700 mb-1"
                           >
                             Price
                           </label>
                           <Field
                             id={`ticketTypes.${index}.price`}
                             name={`ticketTypes.${index}.price`}
                             type="number"
                             placeholder="Enter price"
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                         </div>
                         <div>
                           <label
                             htmlFor={`ticketTypes.${index}.quantity`}
                             className="block text-sm font-medium text-gray-700 mb-1"
                           >
                             Quantity
                           </label>
                           <Field
                             id={`ticketTypes.${index}.quantity`}
                             name={`ticketTypes.${index}.quantity`}
                             type="number"
                             placeholder="Enter quantity"
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                         </div>
                       </div>
                       <button
                         type="button"
                         onClick={() => remove(index)}
                         className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                       >
                         Remove Ticket Type
                       </button>
                     </div>
                   ))}
                   <button
                     type="button"
                     onClick={() =>
                       push({ name: "", price: "", quantity: "" })
                     }
                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                   >
                     Add Ticket Type
                   </button>
                 </div>
               )}
             </FieldArray>

             <FieldArray name="promos">
               {({ push, remove }) => (
                 <div className="space-y-4">
                   <h2 className="text-xl font-semibold">Promotions</h2>
                   {values.promos.map((promo: Promo, index: number) => (
                     <div
                       key={index}
                       className="space-y-3 p-4 border border-gray-300 rounded-md"
                     >
                       <div>
                         <label
                           htmlFor={`promos.${index}.name`}
                           className="block text-sm font-medium text-gray-700 mb-1"
                         >
                           Promo Name
                         </label>
                         <Field
                           id={`promos.${index}.name`}
                           name={`promos.${index}.name`}
                           placeholder="Enter promo name"
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                       </div>

                       <div>
                         <label
                           htmlFor={`promos.${index}.promoType`}
                           className="block text-sm font-medium text-gray-700 mb-1"
                         >
                           Promo Type
                         </label>
                         <Field
                           id={`promos.${index}.promoType`}
                           name={`promos.${index}.promoType`}
                           as="select"
                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         >
                           <option value="REFERRAL">Referral</option>
                           <option value="EVENT_CREATOR_DISCOUNT">
                             Event Creator Discount
                           </option>
                         </Field>
                       </div>

                       <div className="grid grid-cols-2 gap-2">
                         <div>
                           <label
                             htmlFor={`promos.${index}.discount`}
                             className="block text-sm font-medium text-gray-700 mb-1"
                           >
                             Discount (%)
                           </label>
                           <Field
                             id={`promos.${index}.discount`}
                             name={`promos.${index}.discount`}
                             type="number"
                             placeholder="Enter discount"
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                         </div>
                         <div>
                           <label
                             htmlFor={`promos.${index}.quantity`}
                             className="block text-sm font-medium text-gray-700 mb-1"
                           >
                             Quantity
                           </label>
                           <Field
                             id={`promos.${index}.quantity`}
                             name={`promos.${index}.quantity`}
                             type="number"
                             placeholder="Enter quantity"
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                         </div>
                       </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                         <div>
                           <label
                             htmlFor={`promos.${index}.startValid`}
                             className="block text-sm font-medium text-gray-700 mb-1"
                           >
                             Start Date
                           </label>
                           <DatePicker
                             id={`promos.${index}.startValid`}
                             selected={
                               promo.startValid
                                 ? parseISO(promo.startValid)
                                 : null
                             }
                             onChange={(date: Date | null) => {
                               setFieldValue(
                                 `promos.${index}.startValid`,
                                 date ? date.toISOString() : null
                               );
                               if (
                                 date &&
                                 promo.endValid &&
                                 isBefore(parseISO(promo.endValid), date)
                               ) {
                                 setFieldValue(
                                   `promos.${index}.endValid`,
                                   null
                                 );
                               }
                             }}
                             showTimeSelect
                             dateFormat="Pp"
                             placeholderText="Select start date"
                             minDate={new Date()}
                             minTime={setHours(setMinutes(new Date(), 0), 0)}
                             maxTime={setHours(setMinutes(new Date(), 59), 23)}
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                         </div>
                         <div>
                           <label
                             htmlFor={`promos.${index}.endValid`}
                             className="block text-sm font-medium text-gray-700 mb-1"
                           >
                             End Date
                           </label>
                           <DatePicker
                             id={`promos.${index}.endValid`}
                             selected={
                               promo.endValid ? parseISO(promo.endValid) : null
                             }
                             onChange={(date: Date | null) =>
                               setFieldValue(
                                 `promos.${index}.endValid`,
                                 date ? date.toISOString() : null
                               )
                             }
                             showTimeSelect
                             dateFormat="Pp"
                             placeholderText="Select end date"
                             minDate={
                               promo.startValid
                                 ? parseISO(promo.startValid)
                                 : new Date()
                             }
                             minTime={
                               promo.startValid &&
                               promo.endValid &&
                               isSameDay(
                                 parseISO(promo.startValid),
                                 parseISO(promo.endValid)
                               )
                                 ? addMinutes(parseISO(promo.startValid), 1)
                                 : setHours(setMinutes(new Date(), 0), 0)
                             }
                             maxTime={setHours(setMinutes(new Date(), 59), 23)}
                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           />
                         </div>
                       </div>

                       <button
                         type="button"
                         onClick={() => remove(index)}
                         className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                       >
                         Remove Promo
                       </button>
                     </div>
                   ))}
                   <button
                     type="button"
                     onClick={() =>
                       push({
                         name: "",
                         promoType: "REFERRAL",
                         discount: 0,
                         quantity: 0,
                         startValid: "",
                         endValid: "",
                       } as Promo)
                     }
                     className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                   >
                     Add Promo
                   </button>
                 </div>
               )}
             </FieldArray> */}

                <button
                  type="submit"
                  onClick={() => console.log("Button clicked")}
                  className="w-full px-4 py-2 bg-white border border-black rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Update Event
                </button>
                {updateSuccess && (
                  <div className="mt-4 text-center text-green-500">
                    Event updated successfully!
                  </div>
                )}
                {loading === "pending" && (
                  <div className="mt-4 text-center text-green">Loading...</div>
                )}
                {error && (
                  <div className="mt-4 text-center text-red-500">
                    Error: {error}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        )
      )}
    </div>
  );
};

export default FormContTestEdit;
