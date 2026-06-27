import z from "zod";
import { createCompletion, createParsedCompletion } from "@anvia/core";
import { getModel } from "./utils";

const userInput =
  "Why was I charged twice? Please fix it now.";

const ActionDecisionSchema = z.object({
  action: z.enum([
    "answer_directly",
    "ask_clarifying_question",
    "handoff",
  ]),
  reason: z.string(),
  question: z
    .string()
    .describe("Only fill this when action is ask_clarifying_question"),
});

const decision = await createParsedCompletion(getModel(), {
  instructions: `
    Decide the next action before answering the customer.

    Use answer_directly when the request can be answered without account access.

    Use ask_clarifying_question when important billing information is missing.

    Use handoff when the request needs billing verification, account access,
    refunds, or other account-specific actions.

    Ask one short question only when ask_clarifying_question is needed.
  `,
  input: `Customer request: ${userInput}`,
  schema: ActionDecisionSchema,
});

console.log(decision.data);

if (decision.data.action === "ask_clarifying_question") {
  console.log(decision.data.question);
} else if (decision.data.action === "handoff") {
  console.log(
    "I'm sorry for the inconvenience. This request requires billing verification or account access. I'm handing off to a human support agent to ensure you get the best experience :)."
  );
} else {
  const answer = await createCompletion(getModel(), {
    instructions:
      "Answer the customer briefly. Do not promise a refund or account action.",
    input: userInput,
  });

  console.log(answer.text);
}