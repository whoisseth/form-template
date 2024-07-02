import { ExpenseForm } from "@/Form/form";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* <main className="grid grid-cols-1 lg:grid-cols-2"> */}
      <main className="flex flex-wrap gap-2">
        <div className="max-w-sm  w-full">
          <ExpenseForm />
        </div>
      </main>
    </div>
  );
}
