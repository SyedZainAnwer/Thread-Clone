import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

const Page = async() => {

    let isLoading = true;
    let userInfo: any = null;
    const user = await currentUser();

    if(!user) return null;

    try {
        userInfo = await fetchUser(user.id);

        if(!userInfo?.onboarded) redirect('/onboarding');

        isLoading = false;
    } catch(error: any){
        isLoading = false;
        throw new Error(`Error: ${error.message}`)
    }

    const userStringId = userInfo._id.toString();

    return (
        <>
            <h1 className="head-text">Create Thread</h1>

            <PostThread userId={userStringId} />
        </>
    )
}

export default Page;