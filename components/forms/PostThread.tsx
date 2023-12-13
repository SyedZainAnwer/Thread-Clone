"use client";

import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { ThreadValidation } from "@/lib/validations/thread";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";

const PostThread = ({ userId }: { userId: string }) => {

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
    resolver: zodResolver(ThreadValidation),

    defaultValues: {
        thread: "",
        accountId: userId,
    },
});

const onSubmit = async(values: z.infer<typeof ThreadValidation>) => {
    await createThread({ 
        text: values.thread,
        author: userId,
        communityId: null,
        path: pathname
    });

    router.push("/");
}


    return (
    <>
        <h1>Hello</h1>
        <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 flex flex-col justify-start gap-10"
        >
            <FormField
            control={form.control}
            name="thread"
            render={({ field }) => (
                <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                    Content
                </FormLabel>
                <FormControl>
                    <Textarea 
                        rows={15}
                        className="no-focus border border-dark-4 bg-dark-3 text-light-1"
                        {...field}
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button className="bg-primary-500" type="submit">
                Post Thread
            </Button>
        </form>
        </Form>
    </>
);
};

export default PostThread;
