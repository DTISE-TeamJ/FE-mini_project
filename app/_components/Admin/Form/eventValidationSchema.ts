import * as Yup from 'yup';

const fileSize = (max: number) => 
    Yup.mixed().test('fileSize', `File size must be less than ${max} bytes`, (value: any) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= max;
    });
  
  const fileFormat = (formats: string[]) => 
    Yup.mixed().test('fileFormat', `File must be one of: ${formats.join(', ')}`, (value: any) => {
      if (!value || !(value instanceof File)) return false;
      return formats.includes(value.type);
    });

export const eventValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Event name is required")
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name must not exceed 100 characters"),

    image: Yup.mixed()
    .required("An image is required")
    .concat(fileSize(2000000))
    .concat(fileFormat(["image/jpeg", "image/png", "image/jpg", "image/heic", "image/webp"])),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),

  eventCategory: Yup.string()
    .required("Event category is required"),

  location: Yup.string()
    .required("Location is required")
    .min(3, "Location must be at least 3 characters")
    .max(100, "Location must not exceed 100 characters"),

  organization: Yup.string()
    .required("Organization is required")
    .min(2, "Organization must be at least 2 characters")
    .max(100, "Organization must not exceed 100 characters"),

  ticketTypes: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Ticket name is required")
        .min(2, "Ticket name must be at least 2 characters")
        .max(50, "Ticket name must not exceed 50 characters"),
      price: Yup.number()
        .required("Price is required")
        .min(0, "Price cannot be negative")
        .max(1000000, "Price cannot exceed 1,000,000"),
      quantity: Yup.number()
        .required("Quantity is required")
        .integer("Quantity must be a whole number")
        .min(1, "Quantity must be at least 1")
        .max(10000, "Quantity cannot exceed 10,000"),
    })
  ).min(1, "At least one ticket type is required"),

  promos: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Promo name is required")
        .min(2, "Promo name must be at least 2 characters")
        .max(50, "Promo name must not exceed 50 characters"),
      promoType: Yup.string()
        .required("Promo type is required")
        .oneOf(["REFERRAL", "EVENT_CREATOR_DISCOUNT"], "Invalid promo type"),
      discount: Yup.number()
        .required("Discount is required")
        .min(1, "Discount must be at least 1%")
        .max(100, "Discount cannot exceed 100%"),
      quantity: Yup.number()
        .required("Quantity is required")
        .integer("Quantity must be a whole number")
        .min(1, "Quantity must be at least 1")
        .max(10000, "Quantity cannot exceed 10,000"),
      startValid: Yup.date()
        .required("Start date is required")
        .min(new Date(), "Start date cannot be in the past"),
      endValid: Yup.date()
        .required("End date is required")
        .min(
          Yup.ref('startValid'),
          "End date must be after the start date"
        ),
    })
  ),
});