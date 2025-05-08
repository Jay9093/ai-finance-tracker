// app/api/inngest/route.js
import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest/client";

import {
  checkBudgetAlerts,
  generateMonthlyReports,
  processRecurringTransaction,
  triggerRecurringTransactions,
} from "@/lib/inngest/function";

const generateYearEndReport = inngest.createFunction(
  { id: "generate-year-end-report" },
  { event: "generate.year.end.report.manual" },
  async () => {
    const report = {
      income: 50000,
      expense: 25000,
      net: 25000,
      message: "✅ Year-End Report generated!",
      generatedAt: new Date().toISOString(),
    };

    global.generatedReport = report;

    return { body: report };
  }
);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    processRecurringTransaction,
    triggerRecurringTransactions,
    generateMonthlyReports,
    checkBudgetAlerts,
    generateYearEndReport,
  ],
});
