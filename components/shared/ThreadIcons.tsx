import Image from 'next/image';
import commentIcon from '@/public/assets/reply.svg'
import Link from 'next/link';

interface propTypes {
    src: string;
    onIconClick?: () => void;
    isCommentIcon?: boolean;
    commentLink?: string;
}

const ThreadIcons = ({ src, onIconClick, isCommentIcon, commentLink }: propTypes) => {
    return(
        <div>
            {!isCommentIcon ? (
            <Image 
                src={src}
                onClick={onIconClick}
                alt='icon'
                width={24}
                height={24}
                className='cursor-pointer object-contain'
            />
            ) : (
                <Link href={commentLink || ""}>
                    <Image 
                        src={src}
                        onClick={onIconClick}
                        alt='icon'
                        width={24}
                        height={24}
                        className='cursor-pointer object-contain'
                    />
                </Link>
            )}
        </div>
    )
}

export default ThreadIcons;