import { z } from "zod";

const schema = z.object({
  id: z.number(),
  name: z.string().min(3),
  price: z.number().min(1).max(100),
});

export default schema;
