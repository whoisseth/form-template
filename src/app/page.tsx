import Link from "next/link";
import { ExpenseForm } from "./Form/form";
import Instructions from "./code-components/instructions";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div className="p-4 lg:p-8 pt-2 lg:pt-4 max-w-7xl mx-auto max-h-screen flex flex-col gap-3">
      <header className="flex justify-between gap-2  items-center">
        <h2 className="text-2xl font-semibold">Form</h2>
        <Link
          target="_blank"
          href={"https://github.com/whoisseth/form-template"}
          className={cn(buttonVariants({ variant: "link" }), "")}
        >
          <Github className="size-4 mr-2" /> Code
        </Link>
      </header>
      {/* <main className="grid grid-cols-1 lg:grid-cols-2"> */}
      <main className="flex flex-wrap lg:flex-nowrap  w-fit gap-10 lg:divide-x-2">
        <div className=" min-w-80 max-w-sm  w-full ">
          <ExpenseForm />
        </div>
        <Instructions />
      </main>
    </div>
  );
}
