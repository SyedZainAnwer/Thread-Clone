"use client"
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form'
import { UserValidation } from '@/lib/validations/user';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import ProfileForm from '../shared/ProfileForm';

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

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || '',
            name: user?.name || "",
            username: user.username || "",
            bio: user?.bio || ''
        }
    });

    const onSubmit = (values: z.infer<typeof UserValidation>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col justify-start gap-10"
            >

                <ProfileForm 
                    isAvatarField={true}
                    fieldValue='profile_photo'
                    formItemClassName='gap-4 items-center'
                    formLableClassName='account-form_image-label'
                />

                <ProfileForm 
                    isAvatarField={false}
                    fieldValue='name'
                    fieldName='Name'
                    formItemClassName='flex-col gap-3 w-full'
                    formLableClassName='text-base-semibold text-light-2'
                />

                <ProfileForm 
                    isAvatarField={false}
                    fieldValue='username'
                    fieldName='Username'
                    formItemClassName='flex-col gap-3 w-full'
                    formLableClassName='text-base-semibold text-light-2'
                />

                <ProfileForm 
                    isAvatarField={false}
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