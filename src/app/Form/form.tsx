"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { IndianRupee, Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ****** //
// Get the current date and time in the required format
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
const day = String(currentDate.getDate()).padStart(2, "0");
const hours = String(currentDate.getHours()).padStart(2, "0");
const minutes = String(currentDate.getMinutes()).padStart(2, "0");
const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
// ****** //

const currentDateTime = formattedDateTime;

const profileFormSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Amount should be greater than 0" })
    .refine((value) => !isNaN(value), { message: "Amount is required" }),
  label: z.string().max(30, {
    message: "Label must not be longer than 30 characters."
  }),
  type: z.enum(["expense", "income"]),
  category: z.string().optional(),
  note: z.string().max(160).optional(),
  dateTime: z.string().optional().default(currentDateTime)
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  type: "expense"
};

export function ExpenseForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange"
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("data", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  const sampleCategories = [
    "Groceries",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Healthcare"
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div>
          <h2 className="text-xl font-semibold">Add Transactions</h2>
          <p className="text-sm text-muted-foreground">
            Quickly add your income or expense details.
          </p>
        </div>
        {/* Amount */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount *</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <IndianRupee className=" size-4 left-2 absolute " />
                  <Input
                    type="number"
                    placeholder="00"
                    className="pl-6"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* Label */}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label *</FormLabel>

              <FormControl>
                <Input placeholder="Food" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/*Type  */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex gap-5"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="expense" />
                    </FormControl>
                    <FormLabel className="font-normal">Expense</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="income" />
                    </FormControl>
                    <FormLabel className="font-normal">Income</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Category*/}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="capitalize"
                      placeholder="Select Category"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {sampleCategories.map((value, i) => (
                    <SelectItem className="capitalize" key={i} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* Note */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add More details in it"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Date & Time */}
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date & Time </FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  className="resize-none"
                  defaultValue={currentDateTime}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <Plus className="mr-2 size-4" /> Add Transaction
        </Button>
      </form>
    </Form>
  );
}
