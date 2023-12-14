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
}

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
}