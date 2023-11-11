"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { content } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ModalProps {
  titles: string[];
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  titles,
  isOpen,
  onClose,
  children
}) => {
  const [activeTitle, setActiveTitle] = useState<string>(titles[0]);
  const [contentData,setContentData] = useState<string[]>(content['Popular'])

  useEffect(()=>{
    setContentData(content[activeTitle as keyof typeof content])
  },[activeTitle])
  
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="max-w-[700px]">
        <DialogHeader>
          <div className="flex gap-1 py-1 sticky top-0 border-b-2">
            {
              titles.map((title, i) => (
                <Button
                  variant="ghost"
                  key={i}
                  onClick={() => {
                    setActiveTitle(title);
                    
                  }}
                  className={activeTitle === title ? 'bg-slate-200 rounded-lg' : ''}
                >
                  {title}
                </Button>
              ))
            }
          </div>
        </DialogHeader>
        <div className="flex flex-row h-[200px] flex-wrap overflow-y-auto gap-1 w-full">
          {
            contentData.map((content,i)=>(
              <Button variant={"outline"} key={i}>{content}</Button>
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  );
};