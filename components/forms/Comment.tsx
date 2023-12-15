"use client";

import { usePathname, useRouter } from "next/navigation";

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Form } from "../ui/form";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread, createThread } from "@/lib/actions/thread.actions";

import ThreadForm from "../shared/ThreadForm";

interface propTypes {
    threadId: string;
    currentUserImage: string;
    currentUserId: string
}

const Comment = ({ threadId, currentUserImage, currentUserId }: propTypes) => {

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
        threadComment: '',
    },
});

const onSubmit = async(values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(threadId, values.threadComment, JSON.parse(currentUserId), pathname);

    form.reset();
}

    return(
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)}
                className="comment-form"
            >
                <ThreadForm
                    formControl={form.control}
                    isCommentThread={true}
                    commentThreadImage={currentUserImage}
                    formControlClassName="border-none bg-transparent"
                    formItemClassName="items-center"
                    buttonClassName="comment-form_btn"
                    buttonValue="Reply"
                />
            </form>
        </Form>
    )
}

export default Comment;