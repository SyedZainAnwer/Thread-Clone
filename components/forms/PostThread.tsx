"use client";

import { useForm } from "react-hook-form";
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

const PostThread = ({ userId }: { userId: string }) => {
    const form = useForm({
    resolver: zodResolver(ThreadValidation),

    defaultValues: {
        thread: "",
        accountId: userId,
    },
});

const onSubmit = async() => {

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
