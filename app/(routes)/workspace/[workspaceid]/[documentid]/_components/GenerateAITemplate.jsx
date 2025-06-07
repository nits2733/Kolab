"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, Loader2Icon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/config/GoogleAIModel";

function GenerateAITemplate({ setGenerateAIOutput }) {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const GenerateFromAI = async () => {
    setLoading(true);
    const PROMPT = "Generate template for editor.js in JSON for " + userInput;
    const result = await chatSession.sendMessage(PROMPT);
    console.log(result.response.text());
    try {
      const output = JSON.parse(result.response.text());
      setGenerateAIOutput(output);
      setOpen(false);
    } catch (e) {
      console.error("Error:", e);
    }
    setLoading(false);
  };

  return (
    <div>
      <Button
        variant="outline"
        className="flex gap-2"
        onClick={() => setOpen(true)}
      >
        <LayoutGrid className="h-4 w-4" /> Generate AI Template
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate AI Template</DialogTitle>
            <DialogDescription>
              Enter what you want to write and we'll generate a template for
              you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="template-input"
                className="text-sm font-medium block mb-2"
              >
                What you want to write in document?
              </label>
              <Input
                id="template-input"
                placeholder="Ex. Project Idea"
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button disabled={!userInput || loading} onClick={GenerateFromAI}>
                {loading ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default GenerateAITemplate;
