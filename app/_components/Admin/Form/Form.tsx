"use client";

import React, { useState } from "react";
import { HiUpload } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Event name is required"),
  image: Yup.mixed()
    .required("An image is required")
    .test("fileSize", "File size too large", (value) => {
      if (!value) return false;
      const file = value as File;
      return file.size <= 2000000;
    })
    .test("fileFormat", "Unsupported file format", (value) => {
      if (!value) return false;
      const file = value as File;
      const supportedFormats = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
        "image/heic",
        "image/webp",
      ];
      return supportedFormats.includes(file.type);
    }),
  description: Yup.string()
    .required("Description is required")
    .max(250, "Maximum 250 characters allowed"),
  ticketCategory: Yup.string().required("Ticket category is required"),
  price: Yup.number()
    .when("ticketCategory", {
      is: "paid-event",
      then: (schema) =>
        schema.required("Price is required").min(1, "Price must be at least 1"),
      otherwise: (schema) => schema.notRequired(),
    })
    .nullable(),
  // price: Yup.number().when("category", {
  //   is: (val: string) => val === "paid-event",
  //   then: Yup.number()
  //     .required("Price is required")
  //     .min(1, "Price must be at least 1"),
  //   otherwise: Yup.number().notRequired(),
  // }),

  // price: Yup.number()
  // .when("ticketCategory", {
  //   is: "paid-event",
  //   then: Yup.number().required("Price is required").min(0, "Price must be at least 0"),
  //   otherwise: Yup.number().notRequired(),
  // })
  // .nullable(),
  eventCategory: Yup.string().required("Event category is required"),
  location: Yup.string().required("Location is required"),
  organization: Yup.string().required("Organization is required"),
});

const Form: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const today = new Date();

  const isToday = (date: Date | null) =>
    date?.toDateString() === today.toDateString();

  const getMinTime = (date: Date | null) => {
    if (isToday(date)) {
      return new Date();
    }
    return new Date(today.setHours(0, 0, 0, 0));
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (endDate && date && date > endDate) {
      setEndDate(null);
    }
  };

  const { data: session } = useSession();
  // console.log(session?.user, "<== session");

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
      ticketCategory: "",
      eventCategory: "",
      location: "",
      organization: "",
      price: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Called");

      //
      const formData = new FormData();
      // console.log(formData, "<===");
      formData.append("image", values.image);
      formData.append(
        "eventData",
        JSON.stringify({
          name: values.name,
          description: values.description,
          free: values.ticketCategory === "free",
          eventCategoryId: values.eventCategory,
          location: values.location,
          organization: values.organization,
          price: values.ticketCategory === "paid-event" ? values.price : 0,
          start: startDate,
          end: endDate,
          userId: session?.user.id,

          // name: values.name,
          // description: values.description,
          // ticketCategory: values.ticketCategory,
          // eventCategory: values.eventCategory,
          // location: values.location,
          // organization: values.organization,
          // price: values.ticketCategory === "paid-event" ? values.price : 0, // if category is paid-event, then price is required
          // startTime: startDate,
          // endTime: endDate,
          // userId: session?.user.id,
        })
      );

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/create-event`,
          {
            headers: {},
            method: "POST",
            credentials: "include", // This ensures cookies are sent with the request
            body: formData,
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Event created successfully:", result);
        } else {
          console.error("Failed to create event:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating event:", error);
      }
    },
  });

  console.log(JSON.stringify(formik.errors));

  return (
    <>
      <h1 className="text-center text-2xl">Create New Event</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full bg-white p-4">
          <fieldset className="w-full">
            <div className="mb-3 flex items-center">
              <label htmlFor="name" className="w-1/3 mb-0 flex items-center">
                Event name
                <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Input your event name..."
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label
                htmlFor="location"
                className="w-1/3 mb-0 flex items-center">
                Location <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3">
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Input your event location..."
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                />
                {formik.touched.location && formik.errors.location ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.location}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label
                htmlFor="organization"
                className="w-1/3 mb-0 flex items-center">
                Organization <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3">
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  placeholder="Input your event organization..."
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.organization}
                />
                {formik.touched.organization && formik.errors.organization ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.organization}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label htmlFor="image" className="w-1/3 mb-0 flex items-center">
                Photo
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="w-2/3 relative">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                  className="absolute cursor-pointer inset-0 w-full h-full opacity-0"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      formik.setFieldValue("image", file);
                      setSelectedImage(file.name);
                    }
                  }}
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer flex items-center justify-between w-full h-full p-2 border border-gray-300 rounded text-gray-400">
                  {selectedImage || "Upload image"}
                  <HiUpload className="w-6 h-6 mr-2" />
                </label>
                <p className="mb-0 text-[#8A8A8A] text-[10px]">
                  File size max. 2MB
                </p>
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.image}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-start">
              <label htmlFor="description" className="w-1/3 mb-0">
                Description <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="w-2/3">
                <textarea
                  id="description"
                  name="description"
                  className="w-full h-36 p-2 border border-gray-300 rounded resize-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  maxLength={250}
                />
                <p
                  className={`text-xs mt-1 ${
                    formik.values.description.length > 250
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}>
                  {250 - formik.values.description.length} characters remaining
                </p>
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label
                htmlFor="ticketCategory"
                className="w-1/3 mb-0 flex items-center">
                Ticket Category
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="w-2/3">
                <select
                  id="ticketCategory"
                  name="ticketCategory"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.ticketCategory}>
                  <option hidden>Ticket Category</option>
                  <option value="free">free</option>
                  <option value="paid-event">paid event</option>
                </select>
                {formik.touched.ticketCategory &&
                formik.errors.ticketCategory ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.ticketCategory}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label
                htmlFor="eventCategory"
                className="w-1/3 mb-0 flex items-center">
                Category Event
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="w-2/3">
                <select
                  id="eventCategory"
                  name="eventCategory"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.eventCategory}>
                  <option hidden>Event Category</option>
                  <option value="1">Music</option>
                  <option value="2">Sport</option>
                  <option value="3">Education</option>
                  <option value="4">Health</option>
                </select>
                {formik.touched.eventCategory && formik.errors.eventCategory ? (
                  <div className="text-red-600 text-sm">
                    {formik.errors.eventCategory}
                  </div>
                ) : null}
              </div>
            </div>

            {formik.values.ticketCategory === "paid-event" && (
              <div className="mb-3 flex items-center">
                <label htmlFor="price" className="w-1/3 mb-0 flex items-center">
                  Price
                  <span className="text-red-600">*</span>
                </label>
                <div className="w-2/3">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Input price event"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                  {formik.touched.price && formik.errors.price ? (
                    <div className="text-red-600 text-sm">
                      {formik.errors.price}
                    </div>
                  ) : null}
                </div>
              </div>
            )}

            <div className="mb-3 flex items-center">
              <label
                htmlFor="startTime"
                className="w-1/3 mb-0 flex items-center">
                Start time
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="w-2/3">
                <DatePicker
                  selected={startDate}
                  onChange={handleStartDateChange}
                  showTimeSelect
                  minDate={today}
                  minTime={getMinTime(startDate)}
                  maxTime={new Date(today.setHours(23, 59))}
                  dateFormat="Pp"
                  className="form-control border p-2"
                />
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label htmlFor="endTime" className="w-1/3 mb-0 flex items-center">
                End time
                <span className="text-red-600 text-sm">*</span>
              </label>
              <div className="w-2/3">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  minDate={startDate || today}
                  minTime={
                    startDate &&
                    endDate &&
                    endDate.toDateString() === startDate.toDateString()
                      ? startDate
                      : getMinTime(endDate)
                  }
                  maxTime={new Date(today.setHours(23, 59))}
                  filterTime={(time) => {
                    if (
                      startDate &&
                      endDate &&
                      endDate.toDateString() === startDate.toDateString()
                    ) {
                      return time > startDate;
                    }
                    return true;
                  }}
                  dateFormat="Pp"
                  className="form-control border p-2"
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex mt-4">
          <button
            type="submit"
            className="flex items-center mr-3 bg-gray-300 text-black py-2 px-4 rounded pointer-events-auto">
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
