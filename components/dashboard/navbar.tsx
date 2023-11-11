import { ChevronLeft, Crown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from 'next/link';

interface IconsProps {
    svg: JSX.Element;
    content: string;
}
const icons: IconsProps[] = [
    {
        svg: <svg width="18" height="19" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M3.545 1.25h10.91a2.795 2.795 0 0 1 2.795 2.795v10.91a2.796 2.796 0 0 1-2.796 2.795H3.545A2.795 2.795 0 0 1 .75 14.954V4.045A2.795 2.795 0 0 1 3.545 1.25Z"></path><path fill="currentColor" fill-rule="evenodd" d="M13.36 4.59H4.633v2.597l.865-.132v-.279c0-.797.89-1.219 2.674-1.266v5.614c0 .911-.022 1.51-.064 1.794-.038.203-.076.334-.113.393a.663.663 0 0 1-.197.175.571.571 0 0 1-.27.095 9.69 9.69 0 0 1-.637.016h-.296l-.14.812h5.11l-.14-.812h-.296c-.265 0-.471-.008-.618-.024a.799.799 0 0 1-.303-.095.388.388 0 0 1-.159-.14l-.003-.006-.003-.006c-.133-.233-.199-.967-.199-2.202V5.51c.895.024 1.57.144 2.026.36.435.206.653.508.653.906v.27l.837.153V4.59ZM5.33 6.123c.293-.461.942-.753 1.948-.877a9.45 9.45 0 0 1 1.01-.065c-1.591.028-2.577.342-2.958.942Zm4.514-.94c1.628.044 2.599.398 2.914 1.063a1.16 1.16 0 0 1-.095-.163c-.305-.438-.946-.717-1.924-.837a9.474 9.474 0 0 0-.895-.062Z" clip-rule="evenodd"></path></svg>,
        content: 'Text to Image'
    },
    {
        svg: <svg width="20" height="21" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.3 8.7a1.8 1.8 0 1 0-.001-3.599 1.8 1.8 0 0 0 0 3.6Z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.897 1.5H7.298C2.8 1.5 1 3.3 1 7.8v5.4c0 4.5 1.8 6.3 6.298 6.3h5.398c4.499 0 6.298-1.8 6.298-6.3V8.7"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="m16.42 2.032-3.267 3.267a1.056 1.056 0 0 0-.27.549l-.18 1.25c-.063.45.252.766.702.703l1.25-.18c.172-.027.424-.144.55-.27l3.266-3.267c.566-.567.827-1.215 0-2.043-.837-.846-1.485-.576-2.052-.01Z"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5" d="M15.953 2.498a2.955 2.955 0 0 0 2.043 2.043"></path><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m1.602 16.756 4.435-2.979c.711-.477 1.737-.423 2.375.126l.297.261c.702.603 1.836.603 2.538 0l3.742-3.213c.702-.603 1.836-.603 2.538 0l1.466 1.26"></path></svg>,
        content: 'Image Remix'
    },
    {
        svg: <svg width="20" height="21" fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.747 1.786a7.605 7.605 0 0 0-3.24 0M1.294 6.739a6.537 6.537 0 0 0 0 3.077m5.215 4.954a7.604 7.604 0 0 0 3.239 0m5.214-4.954a6.538 6.538 0 0 0 0-3.077m-9.887 7.652c.78 2.874 3.526 4.998 6.796 4.998 3.875 0 7.017-2.985 7.017-6.667 0-2.558-1.517-4.78-3.742-5.898M12.088 2.78a7.49 7.49 0 0 1 1.004.78c.304.297.58.619.826.96M4.165 2.78a7.493 7.493 0 0 0-1.004.78c-.287.28-.549.581-.783.901m0 7.633c.234.32.496.622.783.902.265.244.548.47.847.675m9.868-1.577a7.27 7.27 0 0 1-.783.902c-.288.266-.597.51-.926.728"></path></svg>,
        content: 'Coming Soon'
    },
    {
        svg: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.25471 8.26887C8.20224 8.26887 8.97036 7.50544 8.97036 6.56369C8.97036 5.62195 8.20224 4.85852 7.25471 4.85852C6.30718 4.85852 5.53906 5.62195 5.53906 6.56369C5.53906 7.50544 6.30718 8.26887 7.25471 8.26887Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.6861 1.44824H7.25477C2.96565 1.44824 1.25 3.15342 1.25 7.41635V12.5319C1.25 16.7948 2.96565 18.5 7.25477 18.5H12.4017C16.6908 18.5 18.4065 16.7948 18.4065 12.5319V8.26894" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13.8918 5.32291L17.5312 1.70569V4.11717" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5335 1.70574H15.1072" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1.82031 15.9L6.04939 13.078C6.72707 12.6261 7.70499 12.6772 8.31405 13.1973L8.59713 13.4446C9.26623 14.0158 10.3471 14.0158 11.0162 13.4446L14.5847 10.4008C15.2538 9.8296 16.3347 9.8296 17.0038 10.4008L18.4021 11.5945" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>,
        content: 'Coming Soon'
    },
    {
        svg: <svg width="20" height="21" viewBox="0 0 20 21" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.9967 8.63962C19.9967 7.2266 18.8516 6.08148 17.4386 6.08148H8.13626C6.72324 6.08148 5.57812 7.2266 5.57812 8.63962V17.9419C5.57812 19.355 6.72324 20.5001 8.13626 20.5001H17.4386C18.8516 20.5001 19.9967 19.355 19.9967 17.9419V8.63962ZM18.6014 8.63962V17.9419C18.6014 18.5838 18.0805 19.1047 17.4386 19.1047H8.13626C7.4944 19.1047 6.97347 18.5838 6.97347 17.9419V8.63962C6.97347 7.99776 7.4944 7.47683 8.13626 7.47683H17.4386C18.0805 7.47683 18.6014 7.99776 18.6014 8.63962Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M4.65116 12.1847L1.98233 14.8535C2.16744 14.8963 2.36 14.9186 2.55814 14.9186H4.65116V12.1847ZM4.94233 7.24233L0 12.1847V12.3605C0 13.0526 0.274419 13.6805 0.72093 14.1409L4.65116 10.2107V8.63953C4.65116 8.14279 4.75535 7.6693 4.94233 7.24233ZM9.7107 0.5L0 10.2107V7.53349L7.03349 0.5H9.7107ZM5.05954 0.5H2.55814C1.14512 0.5 0 1.64512 0 3.05814V5.55954L5.05954 0.5ZM6.74233 5.44233C7.1693 5.25535 7.64279 5.15116 8.13953 5.15116H9.7107L13.6409 1.22093C13.1805 0.774419 12.5526 0.5 11.8605 0.5H11.6847L6.74233 5.44233ZM11.6847 5.15116H14.4186V3.05814C14.4186 2.86 14.3963 2.66744 14.3535 2.48233L11.6847 5.15116Z" fill="currentColor"></path></svg>,
        content: 'Coming Soon'
    }
]

const Navbar = () => {
    return (
        <div className='w-full sticky top-0 bg-white max-h-[65px] z-50 flex items-center justify-between border-b-2 p-3'>
            <div>
                <Link href={'/'}>
                    <ChevronLeft
                        className='cursor-pointer hover:bg-slate-300 rounded-md'
                    />
                </Link>
            </div>
            <div className='flex items-center justify-between gap-4'>
                {
                    icons.map((icon, i) => (
                        <HoverCard key={i}>
                            <HoverCardTrigger asChild>
                                <Link href={''}>
                                    {icon.svg}
                                </Link>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-30 mt-5 bg-slate-900">
                                <div className="space-y-1 space-x-1">
                                    <h4 className="text-sm text-white  font-semibold">{icon.content}</h4>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    ))
                }

            </div>
            <div>
                <Button variant="sky" className='hover:shadow-md'>
                    <Crown
                        className='text-white mr-2 w-3/4 h-3/4'
                    />
                    Upgrade
                </Button>
            </div>
        </div>
    )
}

export default Navbar