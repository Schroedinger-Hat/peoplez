"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatefulButton } from "@/components/molecules/statefulButton";
import { useFormState } from "react-dom";
import {
  InitialServerActionState,
  ServerActionStatus,
} from "@/app/actions/types";
import { createMembershipTemplate } from "@/app/actions/createMembershipTemplate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CRUDFormIntent } from "@/modules/crudForm/types";
import { editMembershipTemplate } from "@/app/actions/editMembershipTemplate";
import { useEffect } from "react";

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(4, "Title should be at least 4 characters long"),
  description: z.string().optional(),
  features: z.string().optional(),
  priceAmount: z.coerce.number().positive(),
  priceUnit: z.string(),
  stripePriceId: z
    .string()
    .regex(
      new RegExp("^price_[0-9A-Za-z]+$"),
      "You need to provide a Stripe Product Price ID, format: price_xxxxx",
    ),
});

interface FormProps {
  intent: CRUDFormIntent;
  previousValues?: any;
  onSuccess?: any;
}

export function AdminMembershipCRUDForm({
  intent,
  previousValues,
  onSuccess,
}: FormProps) {
  const [membershipTemplateState, membershipTemplateAction] = useFormState(
    intent === CRUDFormIntent.Create
      ? createMembershipTemplate
      : editMembershipTemplate,
    InitialServerActionState,
  );
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues:
      intent === CRUDFormIntent.Create
        ? {}
        : {
            ...previousValues,
            features: previousValues?.features.join(","),
            priceAmount: previousValues.priceAmount / 100,
          },
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (
      membershipTemplateState.status === ServerActionStatus.Success &&
      onSuccess
    ) {
      onSuccess(membershipTemplateState);
    }
  }, [membershipTemplateState, onSuccess]);

  return (
    <form action={form.handleSubmit(membershipTemplateAction)}>
      <Form {...form}>
        {CRUDFormIntent.Edit && (
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => <Input type={"hidden"} {...field} />}
          />
        )}
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={"w-2/3"}>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} className={"h-20"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features (comma separated)</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <div className="w-1/5 shrink">
              <FormField
                control={form.control}
                name="priceAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type={"number"} placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="shrink">
              <FormField
                control={form.control}
                name="priceUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="stripePriceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stripe Price ID</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} className={"w-1/2"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={"flex justify-end"}>
            <StatefulButton>
              {intent === CRUDFormIntent.Create ? "Create" : "Update"}
            </StatefulButton>
          </div>
        </div>
      </Form>
    </form>
  );
}
