import { inngest } from "@/lib/inngest/client";

export const generateYearEndReport = inngest.createFunction(
  { id: "generate-year-end-report" },
  { event: "app/generate.year.end.report" },
  async ({ event, step }) => {
    // You can fetch user data or run analytics here
    const report = {
      generatedAt: new Date().toISOString(),
      summary: "📊 Your Year-End Financial Report has been generated!",
      transactions: [],
    };

    console.log("Year-End Report Generated:", report);

    return report;
  }
);
