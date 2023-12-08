"use client";

import Image from "next/image"
import Link from "next/link"
import { useRef, useEffect } from "react";

import useIsInViewport from "@/hooks/useIsInViewport";
import { useViewportStore } from "@/hooks/store";
const Footer = () => {
    const ref = useRef(null);

    const isInViewport = useIsInViewport({ ref });
    const setInViewport = useViewportStore((state) => state.setInViewport);

    useEffect(() => {
        setInViewport(isInViewport);
    }, [isInViewport]);

    return (
        <div className="" ref={ref}>
            <div className="hidden lg:flex py-4 justify-between items-center w-full border-t-2">
                <div className="flex ml-8 items-center justify-between gap-2">
                    <Image
                        src={"https://cdn1.imagine.art/imagine-frontend/assets/images/footerLogo.webp"}
                        alt={""}
                        width={50}
                        height={50}
                    />
                    <h1>Imagine</h1>
                </div>
                <div className="flex items-center justify-between gap-8">
                    <Link href={""}>
                        <p>Privacy Policy</p>
                    </Link>
                    <Link href={""}>
                        <p>Terms of Service</p>
                    </Link>
                    <Link href={""}>
                        <p>Sign Up</p>
                    </Link>
                    <Link href={""}>
                        <p>Contact Us</p>
                    </Link>
                    <span>© 2023 Imagine,Inc</span>
                </div>
                <div className="flex mr-8 justify-between gap-2 items-center">
                    <Link href={""}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer text-sky-300 opacity-100 transition-all duration-500 lg:text-sky-400 lg:hover:text-sky-500"><path d="M11.9916 1.0106C7.48955 1.0106 3.21443 0.610121 1.58151 4.80093C0.907011 6.53181 1.00496 8.77972 1.00496 11.9985C1.00496 14.8229 0.91445 17.4775 1.58151 19.1947C3.21071 23.388 7.52055 22.9863 11.9891 22.9863C16.3002 22.9863 20.7451 23.4351 22.3979 19.1947C23.0736 17.4465 22.9745 15.2321 22.9745 11.9985C22.9745 7.70598 23.2113 4.93483 21.1295 2.85431C19.0217 0.746508 16.1712 1.0106 11.9866 1.0106H11.9916ZM11.0071 2.9907C20.398 2.97582 21.5932 1.93184 20.9336 16.4348C20.6993 21.5642 16.7936 21.0012 11.9928 21.0012C3.23923 21.0012 2.98754 20.7508 2.98754 11.9935C2.98754 3.13452 3.68187 2.99566 11.0071 2.98822V2.9907ZM17.8562 4.81457C17.1284 4.81457 16.5382 5.40475 16.5382 6.13256C16.5382 6.86037 17.1284 7.45056 17.8562 7.45056C18.584 7.45056 19.1742 6.86037 19.1742 6.13256C19.1742 5.40475 18.584 4.81457 17.8562 4.81457ZM11.9916 6.35574C8.87574 6.35574 6.3501 8.88263 6.3501 11.9985C6.3501 15.1143 8.87574 17.6399 11.9916 17.6399C15.1074 17.6399 17.6318 15.1143 17.6318 11.9985C17.6318 8.88263 15.1074 6.35574 11.9916 6.35574ZM11.9916 8.33584C16.8333 8.33584 16.8395 15.6611 11.9916 15.6611C7.15106 15.6611 7.14362 8.33584 11.9916 8.33584Z" fill="currentColor"></path></svg>
                    </Link>
                    <Link href={""}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-7 w-7 cursor-pointer text-sky-300 transition-all duration-500 lg:text-sky-400 lg:hover:text-sky-500"><path d="M20.317 4.372a19.793 19.793 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.647 12.647 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.028C.533 9.048-.32 13.582.099 18.06a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292.044.032.04.1-.006.127-.598.35-1.22.645-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.837 19.837 0 0 0 6.002-3.029.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.03-.03ZM8.02 15.333c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" fill="currentColor"></path></svg>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col py-4 w-full border-t-2 justify-between gap-2 items-center lg:hidden">
                <div className="flex justify-between gap-2 items-center">
                    <Link href={""}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer text-sky-300 opacity-100 transition-all duration-500 lg:text-sky-400 lg:hover:text-sky-500"><path d="M11.9916 1.0106C7.48955 1.0106 3.21443 0.610121 1.58151 4.80093C0.907011 6.53181 1.00496 8.77972 1.00496 11.9985C1.00496 14.8229 0.91445 17.4775 1.58151 19.1947C3.21071 23.388 7.52055 22.9863 11.9891 22.9863C16.3002 22.9863 20.7451 23.4351 22.3979 19.1947C23.0736 17.4465 22.9745 15.2321 22.9745 11.9985C22.9745 7.70598 23.2113 4.93483 21.1295 2.85431C19.0217 0.746508 16.1712 1.0106 11.9866 1.0106H11.9916ZM11.0071 2.9907C20.398 2.97582 21.5932 1.93184 20.9336 16.4348C20.6993 21.5642 16.7936 21.0012 11.9928 21.0012C3.23923 21.0012 2.98754 20.7508 2.98754 11.9935C2.98754 3.13452 3.68187 2.99566 11.0071 2.98822V2.9907ZM17.8562 4.81457C17.1284 4.81457 16.5382 5.40475 16.5382 6.13256C16.5382 6.86037 17.1284 7.45056 17.8562 7.45056C18.584 7.45056 19.1742 6.86037 19.1742 6.13256C19.1742 5.40475 18.584 4.81457 17.8562 4.81457ZM11.9916 6.35574C8.87574 6.35574 6.3501 8.88263 6.3501 11.9985C6.3501 15.1143 8.87574 17.6399 11.9916 17.6399C15.1074 17.6399 17.6318 15.1143 17.6318 11.9985C17.6318 8.88263 15.1074 6.35574 11.9916 6.35574ZM11.9916 8.33584C16.8333 8.33584 16.8395 15.6611 11.9916 15.6611C7.15106 15.6611 7.14362 8.33584 11.9916 8.33584Z" fill="currentColor"></path></svg>
                    </Link>
                    <Link href={""}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-7 w-7 cursor-pointer text-sky-300 transition-all duration-500 lg:text-sky-400 lg:hover:text-sky-500"><path d="M20.317 4.372a19.793 19.793 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.647 12.647 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.028C.533 9.048-.32 13.582.099 18.06a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292.044.032.04.1-.006.127-.598.35-1.22.645-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.837 19.837 0 0 0 6.002-3.029.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.03-.03ZM8.02 15.333c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" fill="currentColor"></path></svg>
                    </Link>
                </div>
                <div className="flex items-center justify-between gap-2">
                    <Image
                        src={"https://s3.us-east-1.wasabisys.com/imagine-frontend/gif/imagine-logo.gif"}
                        alt={""}
                        width={50}
                        height={50}
                        className="rounded-md h-10 w-10"
                    />
                    <h1>Imagine</h1>
                </div>
                <span className="flex items-center justify-between">© 2023 Imagine, Inc. All rights reserved.</span>
            </div>
        </div>
    )
}

export default Footer