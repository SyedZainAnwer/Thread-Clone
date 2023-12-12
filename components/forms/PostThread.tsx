import ProfileForm from "../shared/ProfileForm";

const PostThread = ({ userId }: { userId: string }) => {
    return(
        <>
            <ProfileForm 
                isThreadField={true}
                isAvatarField={false}
                fieldValue="thread"
                fieldName="Content"
                formItemClassName="flex-col gap-3 w-full"
                formLableClassName="text-base-semibold text-light-2"
            />
        </>
    )
}

export default PostThread;