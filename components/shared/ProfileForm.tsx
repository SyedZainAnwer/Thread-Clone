"use client"
import { useForm } from 'react-hook-form';
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
} from '@/components/ui/form'
import { UserValidation } from '@/lib/validations/user';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Textarea } from '../ui/textarea';

interface propTypes {
    fieldValue: "name" | "username" | "profile_photo" | "bio";
    fieldName?: string;
    isAvatarField: boolean;
    isBioField?: boolean;
    formLableClassName: string;
    formItemClassName: string;
}

const ProfileForm = ({ 
    fieldValue, 
    isAvatarField,
    isBioField,
    fieldName, 
    formLableClassName, 
    formItemClassName
}:propTypes) => {

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: '',
            name: '',
            username: '',
            bio: ''
        }
    });

    const handleImage = (e: ChangeEvent, fieldChange: (value: string) => void) => {
        e.preventDefault();
    }

    return (
        <FormField
            control={form.control}
            name={fieldValue}
            render={({ field }) => (
            <FormItem className={`flex items-center ${formItemClassName}`}>
            <FormLabel className={formLableClassName}>
                { isAvatarField ? (
                    field.value ? (
                        <Image 
                            src={field.value}
                            alt="profile photo"
                            width={96}
                            height={96}
                            priority
                            className='rounded-full object-contain'
                        />
                    ) : (
                        <Image 
                            src='/assets/profile.svg'
                            alt="profile photo"
                            width={24}
                            height={24}
                            className='object-conatain'
                        />
                    )
                ) : ( !isAvatarField && fieldName) }
                
            </FormLabel>
            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                { isAvatarField ? (
                    <Input 
                        type='file'
                        accept='image/*'
                        placeholder='Upload a photo'
                        className='account-form_image-input'
                        onChange={(e) => handleImage(e, field.onChange)}
                    />
                ) : (
                    !isBioField ? (
                        <Input 
                            type='text'
                            className='account-form_input no-focus'
                            {...field}
                        />
                    ) : (
                        <Textarea 
                            rows={10}
                            className='account-form_input no-focus'
                        />
                    )
                ) }
            </FormControl>
        </FormItem>
    )}
    />
    )
}

export default ProfileForm;