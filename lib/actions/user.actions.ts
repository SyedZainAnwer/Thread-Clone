"use server"

import { connectToDB } from "../mangoose"

export const updateUser = async(): Promise<void> => {
    connectToDB();
}