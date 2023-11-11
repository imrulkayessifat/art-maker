"use client";

import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useTextBoxModal } from "@/hooks/useTextBoxModal";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(4),
});

const titles = ['Popular','Quality','Styles','Color','Artist','Mood']

export const TextBoxModal = () => {
  const textBoxModal = useTextBoxModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    
  };

  return (
    <Modal
      titles={titles}
      isOpen={textBoxModal.isOpen}
      onClose={() => {
        form.reset();
        textBoxModal.onClose();
      }}
    >
      <div>
        data
      </div>
    </Modal>
  );
};