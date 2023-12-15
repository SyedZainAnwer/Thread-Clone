"use client";

import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";
import ThreadForm from "../shared/ThreadForm";

const PostThread = ({ userId }: { userId: string }) => {

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
        thread: '',
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
        <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-10 flex flex-col justify-start gap-10"
        >
            <ThreadForm
                formControl={form.control}
                isCommentThread={false}
                buttonValue="Post thread"
                buttonClassName="bg-primary-500"
                formControlClassName="no-focus border border-dark-4 bg-dark-3 text-light-1"
                formItemClassName="flex-col"
                formLabelClassName="text-base-semibold text-light-2"
            />
        </form>
        </Form>
    </>
);
};

export default PostThread;