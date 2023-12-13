"use client"
import { Control } from 'react-hook-form';
import {
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage, 
} from '@/components/ui/form'
import { Input } from '../ui/input';
import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Textarea } from '../ui/textarea';

interface propTypes {
    fieldValue: "name" | "username" | "profile_photo" | "bio";
    fieldName?: string;
    isAvatarField: boolean;
    isBioField?: boolean;
    formLableClassName: string;
    formItemClassName: string;
    setFiles?: Dispatch<SetStateAction<File[]>>;
    handleImage?: (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => void;
    formControl?: Control<{ profile_photo: string; name: string; username: string; bio: string;}, any>;
    isThreadField?: boolean;
}

const ProfileForm = ({ 
    fieldValue, 
    isAvatarField,
    isBioField,
    fieldName, 
    formLableClassName, 
    formItemClassName,
    setFiles,
    formControl,
    handleImage,
    isThreadField
}:propTypes) => {
    return (
        <FormField
            control={formControl}
            name={fieldValue}
            render={({ field }) => (
            <FormItem className={`flex ${formItemClassName}`}>
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
                { !isThreadField && isAvatarField ? (
                    <Input 
                        type='file'
                        accept='image/*'
                        placeholder='Upload a photo'
                        className='account-form_image-input'
                        onChange={(e) => handleImage && handleImage(e, field.onChange)}
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
                            {...field}
                        />
                    )
                ) }
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
    />
    )
}

export default ProfileForm;