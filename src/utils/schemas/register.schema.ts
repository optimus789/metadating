import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(1, "Age is required"),
  sex: z.enum(["male", "female"]),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  description: z.string().min(1, "Description is required"),
  "favNFT1-tokenID": z.string().min(1, "Token ID is required"),
  "favNFT1-contractAddress": z.string().min(1, "Contract Address is required"),
  "favNFT2-tokenID": z.string().min(1, "Token ID is required"),
  "favNFT2-contractAddress": z.string().min(1, "Contract Address is required"),
  "favNFT3-tokenID": z.string().min(1, "Token ID is required"),
  "favNFT3-contractAddress": z.string().min(1, "Contract Address is required"),
  profilePic: z.any(),
});

export type registerInput = z.TypeOf<typeof registerSchema>;
