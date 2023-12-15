"use client";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Control, FieldValues } from "react-hook-form";
import Image from "next/image";

interface propTypes {
    formControl?: Control<{ thread: string; accountId: string; threadComment: string }>;
    isCommentThread: boolean;
    commentThreadImage?: string;
    formControlClassName: string;
    formItemClassName: string;
    formLabelClassName?: string;
    buttonClassName: string;
    buttonValue: string;
}

const ThreadForm = ({
    formControl,
    isCommentThread,
    commentThreadImage,
    formControlClassName,
    formItemClassName,
    formLabelClassName,
    buttonClassName,
    buttonValue
}: propTypes) => {

return (
    <>
        <FormField
            control={formControl}
            name="thread"
            render={({ field }) => (
                <FormItem className={`${formItemClassName} flex w-full gap-3`}>
                    <FormLabel className={formLabelClassName && formLabelClassName}>
                        {!isCommentThread ? 
                            "Content" : 
                            (
                                <Image 
                                    src={commentThreadImage && commentThreadImage || ''}
                                    alt="image"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            )
                        }
                        
                    </FormLabel>
                    <FormControl className={formControlClassName}>
                        {!isCommentThread ? (
                            <Textarea 
                                rows={15}
                                className="no-focus border border-dark-4 bg-dark-3 text-light-1"
                                {...field}
                            />
                        ): (
                            <Input 
                                type="text"
                                placeholder="Comment..."
                                className="no-focus text-light-1 outline-none"
                                {...field}
                            />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />

        <Button className={buttonClassName} type="submit">
            {buttonValue}
        </Button>
    </>
);
};

export default ThreadForm;
