import InstallationCode from "./InstallationCode";
import CodeSnippet from "./code-snippet";

const codeSnippets = [
  {
    language: "json",
    step: 2,
    fileSrc: "src/app/data-table-components/data.json",
  },
  {
    language: "tsx",
    step: 3,
    fileSrc: "src/app/data-table-components/columns.tsx",
  },
  {
    language: "tsx",
    step: 4,
    fileSrc: "src/app/data-table-components/data-table-column-header.tsx",
  },
  {
    language: "tsx",
    step: 5,
    fileSrc: "src/app/data-table-components/data-table-faceted-filter.tsx",
  },
  {
    language: "tsx",
    step: 6,
    fileSrc: "src/app/data-table-components/data-table-pagination.tsx",
  },
  {
    language: "tsx",
    step: 7,
    fileSrc: "src/app/data-table-components/data-table-row-actions.tsx",
  },
  {
    language: "tsx",
    step: 8,
    fileSrc: "src/app/data-table-components/data-table-toolbar.tsx",
  },
  {
    language: "tsx",
    step: 9,
    fileSrc: "src/app/data-table-components/data-table-view-options.tsx",
  },
  {
    language: "tsx",
    step: 10,
    fileSrc: "src/app/data-table-components/user-nav.tsx",
  },
  {
    language: "tsx",
    step: 11,
    fileSrc: "src/app/data-table-components/data-table.tsx",
  },
  {
    language: "tsx",
    step: 12,
    fileSrc: "src/app/data-table-components/data.tsx",
  },
  {
    language: "tsx",
    step: 13,
    fileSrc: "src/components/calendar-date-picker.tsx",
  },
  { language: "tsx", step: 14, fileSrc: "src/components/ui/calendar.tsx" },
  {
    language: "ts",
    step: 15,
    fileSrc: "src/app/data-table-components/schema.ts",
  },
];
const utilsCode = `
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

`;

const mainPageCode = `
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import { DataTable } from "./data-table-components/data-table";
import { columns } from "./data-table-components/columns";

export const metadata: Metadata = {
  title: "Expenses",
  description: "A Expense tracker build using Tanstack Table."
};

async function getData() {
  const filePath = path.join(
    process.cwd(),
    "src/app/data-table-components",
    "data.json"
  );
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

export default async function Page() {
  const data = await getData();
  console.log("data", data);

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your expenses for this month!
        </p>
      </div>
      <DataTable data={data} columns={columns} />
    </div>
  );
}

`;

export default function MainPage() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-semibold"> Prerequisite Installation</h2>
      <InstallationCode code={"npx shadcn-ui@latest init"} />
      <InstallationCode code={"npm i @radix-ui/react-icons"} />
      <InstallationCode code={"npm i @tanstack/react-table"} />
      <InstallationCode code={"npm i lucide-react"} />
      <InstallationCode code={"npx shadcn-ui@latest add dropdown-menu"} />
      <InstallationCode code={"npx shadcn-ui@latest add button"} />
      <InstallationCode code={"npx shadcn-ui@latest add badge"} />
      <InstallationCode code={"npx shadcn-ui@latest add command"} />
      <InstallationCode code={"npx shadcn-ui@latest add popover"} />
      <InstallationCode code={"npx shadcn-ui@latest add separator"} />
      <InstallationCode code={"npx shadcn-ui@latest add select"} />
      <InstallationCode code={"npx shadcn-ui@latest add input"} />
      <InstallationCode code={"npx shadcn-ui@latest add table"} />
      <InstallationCode code={"npx shadcn-ui@latest add avatar"} />
      <InstallationCode code={"npm i date-fns date-fns-tz react-day-picker"} />
      <InstallationCode code={"npm i zod"} />

      <div className="flex w-fit flex-col gap-5 divide-y">
        <h2 className="text-2xl font-semibold"> Code Files</h2>
        <CodeSnippet
          language={"ts"}
          codeSnippet={utilsCode}
          customFileSrc="src/lib/utils.ts"
        />
        <CodeSnippet
          step={1}
          language={"ts"}
          codeSnippet={mainPageCode}
          customFileSrc="src/app/page.tsx"
        />
        {codeSnippets.map((snippet, index) => (
          <CodeSnippet
            key={index}
            language={snippet.language}
            step={snippet.step}
            fileSrc={snippet.fileSrc}
          />
        ))}
      </div>
    </div>
  );
}
