"use client";

import { useEffect, useState } from "react";

import { TextBoxModal } from "@/components/modals/textbox-modal";


export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <TextBoxModal />
        </>
    );
}