"use client";
import React, { useState } from "react";
import { HiUpload } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";

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
  category: Yup.string().required("Category is required"),
  // price: Yup.number().when("category", {
  //   is: (val: string) => val === "paid-event",
  //   then: Yup.number()
  //     .required("Price is required")
  //     .min(0, "Price must be at least 0"),
  //   otherwise: Yup.number().notRequired(),
  // }),

  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be at least 0"),
});

const Form: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
      description: "",
      category: "",
      price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
                  <div className="text-red-600">{formik.errors.name}</div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label htmlFor="image" className="w-1/3 mb-0 flex items-center">
                Photo
                <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3 relative">
                <input
                  type="file"
                  id="image"
                  name="image"
                  // accept="image/png, image/gif, image/jpeg"
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
                  <div className="text-red-600">{formik.errors.image}</div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-start">
              <label htmlFor="description" className="w-1/3 mb-0">
                Description <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3">
                <textarea
                  id="description"
                  name="description"
                  className="w-full h-36 p-2 border border-gray-300 rounded resize-none"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  maxLength={500}
                />
                <p
                  className={`text-xs mt-1 ${
                    formik.values.description.length > 500
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}>
                  {500 - formik.values.description.length} characters remaining
                </p>
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-600">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label
                htmlFor="category"
                className="w-1/3 mb-0 flex items-center">
                Category
                <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3">
                <select
                  id="category"
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}>
                  <option hidden>Event Category</option>
                  <option value="free">free</option>
                  <option value="paid-event">paid event</option>
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <div className="text-red-600">{formik.errors.category}</div>
                ) : null}
              </div>
            </div>

            {/* <div className="mb-3 flex items-center">
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
                  <div className="text-red-600">{formik.errors.price}</div>
                ) : null}
              </div>
            </div> */}

            {formik.values.category === "paid-event" && (
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
                    <div className="text-red-600">{formik.errors.price}</div>
                  ) : null}
                </div>
              </div>
            )}
          </fieldset>
        </div>
        <div className="flex mt-4">
          <button
            type="submit"
            className="flex items-center mr-3 bg-gray-300 text-black py-2 px-4 rounded">
            Upload
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;

/*
const Form: React.FC = () => {
  const [text, setText] = useState("");

  const handleChange = (event: any) => {
    const newText = event.target.value;
    setText(newText);
  };

  const maxLength = 200;

  const remainingCharacters = maxLength - text.length;
  const exceededLimit = remainingCharacters < 0;

  return (
    <>
      <h1 className="text-center text-2xl">Create New Event</h1>
      <form>
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
                  placeholder="Input your event name..."
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label htmlFor="image" className="w-1/3 mb-0 flex items-center">
                Photo
                <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3 relative">
                <input
                  type="file"
                  id="image"
                  accept="image/png, image/gif, image/jpeg"
                  required
                  className="absolute cursor-pointer inset-0 w-full h-full opacity-0"
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer flex items-center justify-between w-full h-full p-2 border border-gray-300 rounded text-gray-400">
                  Upload image <HiUpload className="w-6 h-6 mr-2" />
                </label>
                <p className="mb-0 text-[#8A8A8A] text-[10px]">
                  File size max. 2MB
                </p>
              </div>
            </div>

            <div className="mb-3 flex items-start">
              <label htmlFor="description" className="w-1/3 mb-0">
                Description <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3">
                <textarea
                  id="description"
                  className="w-full h-36 p-2 border border-gray-300 rounded resize-none"
                  value={text}
                  onChange={handleChange}
                  maxLength={maxLength}
                />
                <p
                  className={`text-xs mt-1 ${
                    exceededLimit ? "text-red-500" : "text-gray-500"
                  }`}>
                  {remainingCharacters} characters remaining
                </p>
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label
                htmlFor="category"
                className="w-1/3 mb-0 flex items-center">
                Category
                <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3">
                <select
                  id="category"
                  className="w-full p-2 border border-gray-300 rounded">
                  <option hidden>Event Category</option>
                  <option value="free">free</option>
                  <option value="paid-event">paid event</option>
                </select>
              </div>
            </div>

            <div className="mb-3 flex items-center">
              <label htmlFor="price" className="w-1/3 mb-0 flex items-center">
                Price
                <span className="text-red-600">*</span>
              </label>
              <div className="w-2/3">
                <input
                  type="number"
                  id="price"
                  placeholder="Input price event"
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="flex mb-3">
                <div className="w-1/3">Created at</div>
                <div className="w-2/3">"edit"</div>
              </div>
              <div className="flex">
                <div className="w-1/3">Updated at</div>
                <div className="w-2/3">edit</div>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="flex mt-4">
          <button
            type="button"
            className="flex items-center mr-3 bg-gray-300 text-black py-2 px-4 rounded">
            Upload
          </button>
        </div>
      </form>
    </>
  );
};
*/