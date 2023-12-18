"use client";

import { usePathname, useRouter } from "next/navigation";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrganization } from "@clerk/nextjs";

import { useForm } from "react-hook-form";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage } from "../ui/form";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const PostThread = ({ userId }: { userId: string }) => {

    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();

    const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
        thread: '',
        accountId: userId,
    },
});

const onSubmit = async(values: z.infer<typeof ThreadValidation>) => {
    console.log("ORG ID ", organization)
    await createThread({ 
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname
    });

    router.push("/");
}


    return (
    <>
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
                    <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
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

        <Button className="bg-primaty-500" type="submit">
            Post thread
        </Button>
        </form>
        </Form>
    </>
);
};

export default PostThread;