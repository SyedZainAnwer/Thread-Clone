"use client";

import { usePathname, useRouter } from "next/navigation";

import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel } from "../ui/form";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";

import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
            <FormField
            control={form.control}
            name="threadComment"
            render={({ field }) => (
                <FormItem className="flex w-full items-center gap-3">
                    <FormLabel>
                                <Image 
                                    src={currentUserImage}
                                    alt="image"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                        
                    </FormLabel>
                    <FormControl className="border-none bg-transparent">
                            <Input 
                                type="text"
                                placeholder="Comment..."
                                className="no-focus text-light-1 outline-none"
                                {...field}
                            />
                    </FormControl>
                </FormItem>
            )}
            />

        <Button className="comment-form_btn" type="submit">
            Reply
        </Button>
            </form>
        </Form>
    )
}

export default Comment;
{/* <ThreadForm
    formControl={form.control}
    isCommentThread={true}
    commentThreadImage={currentUserImage}
    formControlClassName="border-none bg-transparent"
    formItemClassName="items-center"
    buttonClassName="comment-form_btn"
    buttonValue="Reply"
/> */}