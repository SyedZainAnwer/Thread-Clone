// "use client"

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/shared/ThreadsTab";
import Loader from "@/components/shared/Loader";

const Page = async({ params }: { params: { id: string } }) => {

    let isLoading = true;
    let userInfo: any = null;
    const user = await currentUser();

    if(!user) return null;

    try {
        userInfo = await fetchUser(params.id);

        if(!userInfo?.onboarded) redirect('/onboarding');

        isLoading = false;
    } catch(error: any){
        isLoading = false;
        throw new Error(`Error: ${error.message}`)
    }
    
    // const userInfo = await fetchUser(params.id);

    // if(!userInfo?.onboarded) redirect('/onboarding');

    return(
        <section>
            {!isLoading && (
                <div className="flex justify-center xs:left-20 left-0 top-0 items-center fixed w-full h-screen bg-black bg-opacity-25">
                    <Loader />
                </div>
            )}

            {isLoading && (
                <>
                <ProfileHeader 
                accountId={userInfo?.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div className="mt-9">
                <Tabs defaultValue="threads" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.label} className="tab">
                                <Image 
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />

                                <p className="max-sm:hidden">{tab.label}</p>

                                {tab.label === 'Threads' && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                                        {userInfo?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value}>
                            <ThreadsTab 
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
                </>
            )} 
        </section>
    )
}

export default Page;