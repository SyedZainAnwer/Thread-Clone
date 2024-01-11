"use client"

import Thread from "@/lib/models/thread.model";
import { connectToDB } from "@/lib/mongoose";
import { useContext, createContext, useState } from "react"

interface ContextProps {
    likeThread: (threadId: string, userId: string) => Promise<void>;
    likeStatus: {
        likedCount: number;
        isLiked: boolean;
    };
}

const GlobalContext = createContext<ContextProps | null>(null)

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [likeStatus, setLikeStatus] = useState({
        likedCount: 0,
        isLiked: false,
    });

    const likeThread = async (threadId: string, userId: string) => {
        connectToDB();

        try {
            const thread = await Thread.findById(threadId);

            if (!thread) {
                throw new Error("Thread not found");
            }

            const isLiked = thread.likes.includes(userId);

            const likeCount = isLiked ? thread.likes.length - 1 : thread.likes.length + 1;

            setLikeStatus({
                likedCount: likeCount,
                isLiked: !isLiked,
            })

            await Thread.findByIdAndUpdate(threadId, { likes: thread.likes });

            return Promise.resolve();
        } catch (error: any) {
            throw new Error(`Failed to like the thread: ${error.message}`);
        }
    };

    const contextValue: ContextProps = {
        likeThread,
        likeStatus,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
};
