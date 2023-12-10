"use client"

import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import LogoutLogo from '@/public/assets/logout.svg'

const LeftSidebar = () => {

    const router = useRouter();
    const pathname = usePathname();

    return (
        <section className="custom-scrollbar leftsidebar">
        <div className="flex w-full flex-1 flex-col gap-6 px-6">
            {sidebarLinks.map((link) => {
                const isActive = 
                    (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route
            return (
                <div key={link.label}>
                    <Link
                        href={link.route}
                        className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}
                    >
                        <Image
                            src={link.imgURL}
                            alt={link.label}
                            width={24}
                            height={24}
                        />
                        <p className="text-light-1 max-lg:hidden">{link.label}</p>
                </Link>
            </div>
        );
        })}
        </div>

        <div className="mt-10 px-6">
            <SignedIn>
                <SignOutButton signOutCallback={() => router.push('/sign-in')}>
                    <div className="flex cursor-pointer gap-4 p-4">
                        <Image src={LogoutLogo} alt="logout" width={24} height={24}/>
                        <p className="text-light-2 max-lg:hidden">Logout</p>
                    </div>
                </SignOutButton>
            </SignedIn>
        </div>
    </section>
);
};

export default LeftSidebar;
