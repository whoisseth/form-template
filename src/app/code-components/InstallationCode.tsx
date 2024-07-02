"use client";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface InstallationCodeProps {
  code: string;
}

const InstallationCode: React.FC<InstallationCodeProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex w-full max-w-[800px] items-center rounded-lg border bg-secondary p-4 py-3">
      <pre className="whitespace-pre-wrap font-mono text-sm">{code}</pre>
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="absolute right-2 flex h-8 gap-1 opacity-70"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </Button>
      </CopyToClipboard>
    </div>
  );
};

export default InstallationCode;
