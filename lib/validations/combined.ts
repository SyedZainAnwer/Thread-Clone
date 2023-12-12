import { z } from "zod";
import { UserValidation } from "./user";
import { ThreadValidation, CommentValidation } from "./thread";

export type CombinedValidation = 
| z.infer<typeof UserValidation>
| z.infer<typeof ThreadValidation>
| z.infer<typeof CommentValidation>