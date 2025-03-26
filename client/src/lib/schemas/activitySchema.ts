import { z } from "zod";

const requiredString = (filedName: string) =>
  z.string().min(1, { message: `${filedName} is required` });

export const activitySchema = z.object({
  title: requiredString("Title"),
  description: requiredString("Description"),
  category: requiredString("Category"),
  date: requiredString("Date"),
  city: requiredString("City"),
  venue: requiredString("Venue"),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
