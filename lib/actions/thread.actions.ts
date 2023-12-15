"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mangoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";

interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string
}

export const createThread = async({ text, author, communityId, path }: Params) => {
    try {
        connectToDB();
    
        const createdThread = await Thread.create({
            text,
            author,
            community: null
        });
    
        // Update User model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        });
    
        revalidatePath(path);
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
};

export const fetchPosts = async(pageNumber = 1, pageSize = 20) => {
    connectToDB();

    // Calculate the number of posts to skip
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch the posts that have no parents(top-level threads...)
    const postQuery = Thread.find({parentId: {$in: [null, undefined]}})
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({
            path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "id_name parentId image"
            }
        });
    
    const totalPostsCount = await Thread.countDocuments({parentId: {$in: [null, undefined]}});
    
    const posts = await postQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;
    
    return { posts, isNext };
};

export const fetchThreadById = async(id: string) => {
    connectToDB();

    try{
        // TODO: Populate Community
        const thread = await Thread.findById(id)
        .populate({ // fetching main thread
            path: 'author',
            model: User,
            select: '_id id name image'
        })
        .populate({ // fetching the comment of the main thread
            path: 'children',
            populate: ([
                {
                    path: 'author',
                    model: User,
                    select: '_id id name parentId image'
                }, 
                { // fetching the comment of the comment
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    }
                }
            ])
        }).exec();

        return thread;
    } catch(error: any) {
        throw new Error(`Error fetching thread: ${error.message}`)
    }
};

export const addCommentToThread = async(
    threadId: string,
    commentText: string,
    userId: string,
    path: string,
) => {
    connectToDB();

    try{
        // Find the original thread by it's ID
        const OriginalThread = await Thread.findById(threadId);

        if(!OriginalThread) {
            throw new Error("Thread not found");
        }

        // Create a new thread with the comment text
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId
        });

        // Save the new thread
        const saveCommentThread = await commentThread.save();

        // Update the original thread to include the new thread
        OriginalThread.children.push(saveCommentThread._id);

        // Save the original thread
        await OriginalThread.save();

        revalidatePath(path);

    } catch(error: any) {
        throw new Error(`Error adding comment to thread: ${error.message}`)
    }
}