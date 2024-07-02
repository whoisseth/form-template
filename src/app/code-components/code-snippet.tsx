"use client";

import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Check, Copy, FileCode, Loader } from "lucide-react";

interface CodeSnippetProps {
  language: string;
  fileSrc?: string;
  customFileSrc?: string;
  codeSnippet?: string;
  title?: string;
  step?: string | number;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({
  language,
  fileSrc,
  customFileSrc,
  codeSnippet,
  title,
  step,
}) => {
  const [code, setCode] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (fileSrc) {
      const loadCode = async () => {
        setLoading(true);
        try {
          const res = await fetch(
            `/code-snippets/${fileSrc.replace(/[\\\/]/g, "_")}.json`,
          );
          if (res.ok) {
            const data = await res.json();
            setCode(data.content);
          } else {
            console.error("Failed to load code file");
          }
        } catch (error) {
          console.error("Error loading code:", error);
        } finally {
          setLoading(false);
        }
      };

      loadCode();
    } else {
      setCode(codeSnippet || "");
    }
  }, [fileSrc, codeSnippet]);

  return (
    <div>
      <p className="flex gap-1 text-lg">
        {step && <span>Step {step}.</span>}
        <span>{title}</span>
      </p>
      <p className="flex items-center gap-1">
        <FileCode size={16} />
        <code className=""> {customFileSrc ?? fileSrc}</code>
      </p>
      <div className="relative flex flex-col gap-1 rounded-lg">
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <Button
            variant={"outline"}
            size={"icon"}
            className="absolute right-2 top-4 flex h-8 gap-1 opacity-70"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </Button>
        </CopyToClipboard>

        {loading ? (
          <div className="mx-auto flex h-48 items-center justify-center">
            <Loader className="animate-spin" size={32} />
          </div>
        ) : (
          <SyntaxHighlighter
            customStyle={{
              borderRadius: "0.5rem",
              width: "100%",
              paddingTop: "20px",
              paddingRight: "80px",
              maxWidth: "800px",
              maxHeight: "500px",
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
              padding: "1rem",
            }}
            style={resolvedTheme === "dark" ? dracula : prism}
            language={language}
          >
            {code}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
};

export default CodeSnippet;
