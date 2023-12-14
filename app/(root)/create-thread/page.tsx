import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

const Page = async() => {

    const user = await currentUser();

    if(!user) return null;

    const userInfo = await fetchUser(user.id);

    if(!userInfo?.onboarded) redirect('/onboarding')

    const userStringId = userInfo._id.toString();

    return (
        <>
            <h1 className="head-text">Create Thread</h1>

            <PostThread userId={userStringId} />
        </>
    )
}

export default Page;