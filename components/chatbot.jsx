"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageSquare, Send, X } from "lucide-react";

const financeTips = [
  "Start an emergency fund with at least 3-6 months of expenses.",
  "Pay off high-interest debt as soon as possible.",
  "Invest early and consistently for long-term growth.",
  "Diversify your investments across different asset classes.",
  "Track your expenses to identify areas where you can save.",
  "Set up automatic savings transfers to build wealth effortlessly.",
  "Review and adjust your budget regularly.",
  "Consider tax-efficient investment strategies.",
  "Plan for retirement early in your career.",
  "Keep your investment costs low by choosing low-fee options."
];

const commonQuestions = {
  "how to save money": "Start by creating a budget, tracking your expenses, and setting up automatic savings. Consider cutting unnecessary expenses and look for ways to increase your income.",
  "what is compound interest": "Compound interest is when you earn interest on both your initial investment and the accumulated interest. It's a powerful way to grow your wealth over time.",
  "how to invest": "Start by understanding your risk tolerance, setting clear goals, and diversifying your investments across different asset classes. Consider low-cost index funds for beginners.",
  "what is a good emergency fund": "A good emergency fund should cover 3-6 months of your essential expenses. This helps you handle unexpected situations without going into debt.",
  "how to reduce debt": "Focus on paying off high-interest debt first, consider debt consolidation, and avoid taking on new debt while paying off existing ones.",
  "what is diversification": "Diversification means spreading your investments across different assets to reduce risk. Don't put all your eggs in one basket.",
  "how to start investing": "Begin with a clear investment goal, understand your risk tolerance, and start with low-cost index funds or ETFs. Consider using a robo-advisor if you're new to investing.",
  "what is a budget": "A budget is a plan for your money that helps you track income and expenses. It's essential for managing your finances effectively.",
  "how to improve credit score": "Pay bills on time, keep credit utilization low, maintain a mix of credit types, and avoid opening too many new accounts at once.",
  "what is passive income": "Passive income is money earned with minimal effort, such as rental income, dividends, or interest from investments."
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your finance assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: input }]);

    // Generate response
    const response = generateResponse(input.toLowerCase());
    setMessages(prev => [...prev, { role: "assistant", content: response }]);

    setInput("");
  };

  const generateResponse = (query) => {
    // Check for common questions
    for (const [key, value] of Object.entries(commonQuestions)) {
      if (query.includes(key)) {
        return value;
      }
    }

    // Check for specific keywords
    if (query.includes("tip") || query.includes("advice")) {
      return financeTips[Math.floor(Math.random() * financeTips.length)];
    }

    // Default response
    return "I'm here to help with your financial questions. You can ask me about saving money, investing, budgeting, or request a financial tip.";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-[350px] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Finance Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-y-auto mb-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 