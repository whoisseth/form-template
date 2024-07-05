import Link from "next/link";
import InstallationCode from "./InstallationCode";
import CodeSnippet from "./code-snippet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const installationCommands = [
  {
    name: "form",
    command: "npx shadcn-ui@latest add form"
  },
  {
    name: "button",
    command: "npx shadcn-ui@latest add button"
  },
  {
    name: "input",
    command: "npx shadcn-ui@latest add input"
  },
  {
    name: "textarea",
    command: "npx shadcn-ui@latest add textarea"
  },
  {
    name: "radio-group",
    command: "npx shadcn-ui@latest add radio-group"
  },
  {
    name: "toast",
    command: "npx shadcn-ui@latest add toast"
  },
  {
    name: "lucide-react",
    command: "npm install lucide-react"
  }
];
const layoutSnippets = `import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}`;

export default function Instructions() {
  return (
    <ScrollArea className="lg:max-h-[calc(100dvh-100px)] overflow-x-auto   lg:px-10 pb-5  lg:w-auto  ">
      <div className="flex flex-col gap-2  rounded-md w-full  ">
        <h2 className="text-2xl font-semibold"> Installation</h2>
        <div className="pr-20">
          <code>shadcn</code>
          <InstallationCode code={"npx shadcn-ui@latest init"} />
        </div>
        <Accordion type="single" collapsible className=" w-full pr-20">
          <AccordionItem value="item-1">
            <AccordionTrigger>See all installations...</AccordionTrigger>
            <AccordionContent>
              {installationCommands.map((item, index) => (
                <div key={index} className="">
                  <code>{item.name}</code>
                  <InstallationCode code={item.command} />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Link
          target="_blank"
          href={"https://github.com/whoisseth/form-template"}
          className={cn(buttonVariants({ variant: "link" }), " lg:hidden")}
        >
          <Github className="size-4 mr-2" /> Code Files
        </Link>
        <div className=" lg:flex w-fit flex-col gap-3 divide-y hidden  ">
          <h2 className="text-2xl font-semibold"> Code Files</h2>
          <CodeSnippet
            title="form.tsx"
            language={"tsx"}
            fileSrc={"src/app/Form/form.tsx"}
          />
          <CodeSnippet
            title="layout.tsx - for toast"
            language={"tsx"}
            customFileSrc="src/app/layout.tsx"
            codeSnippet={layoutSnippets}
          />
        </div>
      </div>
    </ScrollArea>
  );
}
