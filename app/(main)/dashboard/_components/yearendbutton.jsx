"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function YearEndReportButton() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      // Trigger Inngest event
      await fetch("/api/inngest", {
        method: "POST",
        body: JSON.stringify({
          name: "app/generate.year.end.report",
        }),
      });

      // Fetch generated report
      const res = await fetch("/api/yearend/report");
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error("Error generating report:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Year-End Report"}
      </Button>

      {report ? (
        <div className="text-sm text-green-700 space-y-1 mt-2">
          <p>
            ✅ Generated at:{" "}
            {report?.generatedAt
              ? new Date(report.generatedAt).toLocaleString()
              : "Just now"}
          </p>
          <p><strong>Income:</strong> Rs.{report.income}</p>
          <p><strong>Expense:</strong> Rs.{report.expense}</p>
          <p><strong>Net:</strong> Rs.{report.net}</p>
          <p>{report.message}</p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground pt-2">
          No report generated yet.
        </p>
      )}
    </div>
  );
}
