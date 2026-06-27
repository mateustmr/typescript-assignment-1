import z from "zod";
import { createParsedCompletion } from "@anvia/core";
import { getModel } from "./utils";

const transcript = `

Meeting: Weekly Product Team Sync
Date: April 15, 2026
Duration: 30 minutes

Sarah (Product Manager): Good morning, everyone. Thanks for joining. The goal today is to review progress from last week, discuss the open issues affecting the mobile release, and align on priorities for the next sprint. Overall, we're making steady progress, but there are still a few blockers we need to address before we can confidently commit to the release date.

Alex (Engineering Lead): From the engineering side, we've completed around 85% of the planned development work. The authentication improvements are now merged into the main branch, and performance testing shows page load times have improved by roughly 20%. However, we're still seeing intermittent crashes on older Android devices. The issue appears related to memory usage, but we're still investigating.

Maya (QA Lead): QA has completed regression testing on the latest build. We've logged twelve issues since Monday. Nine are minor UI inconsistencies, two are medium-priority bugs involving push notifications, and one is the Android crash Alex mentioned. The good news is that we haven't identified any data integrity problems, which was one of our biggest concerns earlier in the project.

Sarah: That's encouraging. Do we think the Android issue can be resolved this week?

Alex: Assuming we can reproduce it consistently, yes. Right now, it only happens under certain conditions, which makes debugging slower. I've assigned two engineers to focus exclusively on reproducing the issue. Once we understand the root cause, I expect the fix itself won't take long.

David (UX Designer): On the design side, we've finalized the updated onboarding flow. User testing with fifteen participants showed that new users completed account setup about 30% faster than with the previous version. Most participants also found the navigation more intuitive. We did receive feedback that some buttons appear too similar, so we're making slight adjustments to improve visual hierarchy.

Sarah: Great. Let's include those design refinements if they don't introduce additional development work.

Alex: They should be straightforward. Most of the changes involve colors and spacing rather than structural updates.

Maya: I'd also recommend giving QA at least two full days after those design changes are merged. Even cosmetic changes occasionally create unexpected layout issues across different screen sizes.

Sarah: That's reasonable. We'll adjust the schedule accordingly.

David: One more thing. Marketing requested updated screenshots by Friday for the launch campaign. I'll need a reasonably stable build by Thursday afternoon.

Alex: That should be possible unless the Android issue turns out to be more complicated than expected. We'll know more by tomorrow.

Sarah: Perfect. Looking ahead, I'd also like us to begin planning for post-launch improvements. Customer feedback from the beta program highlighted requests for better search functionality, offline access, and customizable notifications. We don't need detailed estimates yet, but it would be useful to gather some initial technical input before our next planning session.

Alex: I'll prepare a high-level engineering assessment covering complexity, dependencies, and potential risks.

Maya: I'll summarize the most common support tickets and beta feedback so we can prioritize features based on actual customer pain points.

David: I'll draft a few design concepts for offline mode and improved search to help guide the discussion.

Sarah: Excellent. If there are no other updates, let's keep our focus on stabilizing the current release. Please post daily progress updates in the project channel so everyone stays informed. Thanks, everyone, for the hard work. We'll reconvene next Tuesday with an updated status and hopefully a release candidate ready for final validation.
`;

const MeetingSummarySchema = z.object({
  decisions: z.array(z.string()),
  risks: z.array(z.string()),
  actionItems: z.array(z.string()),
});

const chunkSummary = await createParsedCompletion(getModel(), {
  instructions: `
Summarize this meeting transcript.

Extract only:
- decisions
- risks
- action items

Return structured data.
`,
  input: transcript,
  schema: MeetingSummarySchema,
});

console.log(chunkSummary.data);