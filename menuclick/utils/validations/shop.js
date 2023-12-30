import * as z from "zod";

const Shop = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(1, { message: "Name is required." })
    .max(50, {
      message: "Name can only be up to 50 characters long..",
    }),
  about: z
    .string({
      required_error: "about is required.",
      invalid_type_error: "about must be a string.",
    })
    .min(10, { message: "about must be at least 10 characters long." })
    .max(500, {
      message: "about can only be up to 70 characters long.",
    }),
  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be a string.",
    })
    .email({ message: "Invalid email address." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email can be at most 100 characters long." }),
  phoneNumber: z
    .string({
      required_error: "Phone number is required.",
      invalid_type_error: "Phone number must be a string.",
    })
    .min(1, { message: "Phone number is required." }),
  location: z
    .string({
      required_error: "location is required.",
      invalid_type_error: "location must be a string.",
    })
    .min(1, { message: "location is required." }),
});

export const ShopValidation = {
  addShop: Shop.required({
    name: true,
    about: true,
    email: true,
    phoneNumber: true,
    location: true,
  }),
};
