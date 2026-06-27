import z from "zod";
import { createParsedCompletion } from "@anvia/core";
import { getModel, tavilyClient } from "./utils";

const userInput = "OpenAI";

const CompanyProfileSchema = z.object({
  companyName: z.string(),
  website: z.string(),
  industry: z.string(),
  profile: z.string(),
});

const searchResults = await tavilyClient.search(
  `${userInput} official website industry company`
);

const company = await createParsedCompletion(getModel(), {
  instructions: `
You are an information extractor.

Using only the search results, extract:

- company name
- official website
- industry
- short company profile

Return structured data only.
`,
  input: JSON.stringify(searchResults),
  schema: CompanyProfileSchema,
});

console.log(company.data);