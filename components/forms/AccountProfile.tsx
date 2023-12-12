"use client"
import { useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form'

import { UserValidation } from '@/lib/validations/user';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing'
import { updateUser } from '@/lib/actions/user.actions';
import { CombinedValidation } from '@/lib/validations/combined';
import { CommentValidation, ThreadValidation } from '@/lib/validations/thread';

import { Button } from '../ui/button';
import ProfileForm from '../shared/ProfileForm';
import { usePathname, useRouter } from 'next/navigation';

interface propTypes {
    user: {
        id: string;
        name: string;
        objectId: string;
        username: string;
        bio: string;
        image: string;
    }
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }:propTypes) => {

    const [ files, setFiles ] = useState<File[]>([]);
    const { startUpload } = useUploadThing("media");

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm<CombinedValidation> ({
        resolver: 
            zodResolver(UserValidation) 
        || zodResolver(ThreadValidation) 
        || zodResolver(CommentValidation),

        defaultValues: {
            profile_photo: user?.image ? user.image : "",
            name: user?.name ? user.name : "",
            username: user?.username ? user.username : "",
            bio: user?.bio ? user.bio : "",
            thread: '',
            // accountId: userId,
            threadComment: ''
        },
    });

    const control = form?.control;

    const onSubmit = async(values: CombinedValidation) => {
        if('profile_photo' && 'username' && 'bio' && 'name' in values) {

            const blob = values.profile_photo;
    
            const hasImageChanged = isBase64Image(blob);
    
            if(hasImageChanged) {
                const imageRes = await startUpload(files);
    
                if(imageRes && imageRes[0].url) {
                    values.profile_photo = imageRes[0].url;
                }
            }

            await updateUser({
                userId: user.id,
                username: values.username,
                name: values.name,
                bio: values.bio,
                image: values.profile_photo,
                path: pathname
            })
        }

        if(pathname === '/profile/edit') {
            router.back()
        } else {
            router.push('/')
        }
    }

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();
    
        const fileReader = new FileReader();
    
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));
    
            if (!file.type.includes("image")) return;
    
            fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
        };
    
            fileReader.readAsDataURL(file);
        }
    };

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col justify-start gap-10"
            >

                <ProfileForm 
                    setFiles={setFiles}
                    handleImage={handleImage}
                    formControl={control}
                    isAvatarField={true}
                    fieldValue='profile_photo'
                    formItemClassName='gap-4 items-center'
                    formLableClassName='account-form_image-label'
                />

                <ProfileForm 
                    isAvatarField={false}
                    formControl={control}
                    fieldValue='name'
                    fieldName='Name'
                    formItemClassName='flex-col gap-3 w-full'
                    formLableClassName='text-base-semibold text-light-2'
                />

                <ProfileForm 
                    isAvatarField={false}
                    formControl={control}
                    fieldValue='username'
                    fieldName='Username'
                    formItemClassName='flex-col gap-3 w-full'
                    formLableClassName='text-base-semibold text-light-2'
                />

                <ProfileForm 
                    isAvatarField={false}
                    formControl={control}
                    isBioField={true}
                    fieldValue='bio'
                    fieldName='Bio'
                    formItemClassName='flex-col gap-3 w-full'
                    formLableClassName='text-base-semibold text-light-2'
                />

                <Button type="submit" className='bg-primary-500'>Submit</Button>
            </form>
    </Form>
    )
}

export default AccountProfile;