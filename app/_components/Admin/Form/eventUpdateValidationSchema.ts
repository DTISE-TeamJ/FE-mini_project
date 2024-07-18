import * as Yup from "yup";

const fileSize = (max: number) =>
  Yup.mixed().test(
    "fileSize",
    `File size must be less than ${max} bytes`,
    (value: any) => {
      if (!value) return true;
      if (!(value instanceof File)) return false;
      return value.size <= max;
    }
  );

const fileFormat = (formats: string[]) =>
  Yup.mixed().test(
    "fileFormat",
    `File must be one of: ${formats.join(", ")}`,
    (value: any) => {
      if (!value) return true;
      if (!(value instanceof File)) return false;
      return formats.includes(value.type);
    }
  );

export const eventUpdateValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Event name is required")
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name must not exceed 100 characters"),

  image: Yup.mixed()
    .nullable()
    .concat(fileSize(2000000))
    .concat(
      fileFormat([
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/heic",
        "image/webp",
      ])
    ),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  eventCategory: Yup.string().required("Event category is required"),

  location: Yup.string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must not exceed 100 characters"),

  organization: Yup.string()
    .required("Organization is required")
    .min(2, "Organization must be at least 2 characters")
    .max(100, "Organization must not exceed 100 characters"),
});
