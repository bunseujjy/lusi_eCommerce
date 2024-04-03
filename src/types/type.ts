import { z } from "zod";

export const signInForm = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
})

export type TSignInForm = z.infer<typeof signInForm>;

export const signUpForm = z
  .object({
    name: z.string().min(3, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
      image: z.any(),
      terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept Terms and Conditions" }),
      }),
      ipAddress: z.any()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export type TSignUpForm = z.infer<typeof signUpForm>;

export const updateUser = z
  .object({
    name: z.string(),
    email: z.string().email("This is not a valid email."),
    password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
});

export type TUpdateUser = z.infer<typeof updateUser>;

export const updateUsername = z
  .object({
    name: z.string().min(3),
  })

  export type TUpdateUsername = z.infer<typeof updateUsername>;

  export const deleteForm = z.object({
    id: z.string()
})

export type TDeleteForm= z.infer<typeof deleteForm>;

export const uploadProfile = z.object({
  email: z.string().email("This is not a valid email."),
  image: z.any(),
  public_id: z.any()
})

export type TUploadProfile= z.infer<typeof uploadProfile>;

export const updateUserPassword = z.object({
  email: z.string().email("This is not a valid email."),
  password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Invalid Password or Password don't match",
})

export type TUpadateUserPassword= z.infer<typeof updateUserPassword>;


export const forgotPassword = z.object({
  email: z.string().email("This is not a valid email."),
})

export type TForgotPassword= z.infer<typeof forgotPassword>;


export const resetPassword = z.object({
  token: z.any(),
  password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
    confirmPassword: z
    .string()
    .min(1, { message: "Confirm Password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password don't match",
})

export type TResetPassword= z.infer<typeof resetPassword>;

export const createProducts = z.object({
  title: z.string().min(3, {message: "Product name is required"}),
  price: z.any(),
  discount: z.any(),
  category: z.string().array(),
  inStock: z.any(),
  images: z.any(),
  description: z.string().min(3, {message: "description name is required"}),
})

export type TCreateProducts = z.infer<typeof createProducts>;

export const createUser = z.object({
  name: z.string().min(3, {message: "Product name is required"}),
  email: z.string().email("This is not a valid email."),
  password: z
      .string()
      .min(6, { message: "Password must be atleast 6 characters" }),
  confirmPassword: z
  .string()
  .min(1, { message: "Confirm Password is required" }),
  image: z.any(),
  role: z.any(),
  public_id: z.any(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password don't match",
})

export type TCreateUser = z.infer<typeof createUser>;

export const createReview = z.object({
  rating: z.number(),
  comment: z.string().min(3, {message: "Product name is required"}),
  name: z.string().min(3, {message: "Product name is required"}),
  email: z.string().min(3, {message: "Product name is required"}),
})

export type TCreateReview = z.infer<typeof createReview>;

export const updateReview = z.object({
  rating: z.number(),
  comment: z.string().min(3, {message: "Comment is required"}),
})

export type TUpdateReview = z.infer<typeof updateReview>;

export const createContact = z.object({
  email: z.string().email("This is not a valid email."),
  name: z.string().min(3, {message: "Product name is required"}),
  subject: z.string(),
  message: z.string(),
  rating: z.number(),
})

export type TCreateContact = z.infer<typeof createContact>;

export const updateContact = z.object({
  message: z.string().min(3, {message: "Message is required"}),
  rating: z.number(),
})

export type TUpdateContact = z.infer<typeof updateContact>;

export const likeReview = z.object({
  like: z.number(),
  likedBy: z.string().array()
})

export type TLikeReview = z.infer<typeof likeReview>;

export const dislikeReview = z.object({
  dislike: z.number()
})

export type TDislikeReview = z.infer<typeof dislikeReview>;

// Phone Validation
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const createPayment = z.object({
  orderID: z.any(),
  name: z.string().min(3, {message: "Product name is required"}),
  email: z.string().email("This is not a valid email."),
  address: z.string(),
  postcode: z.string(),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
  createdAt: z.any()
})

export type TCreatePayment = z.infer<typeof createPayment>;