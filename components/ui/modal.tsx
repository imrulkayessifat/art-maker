"use client";

import { useEffect, useState } from "react";
import { X } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { content, toggleCheck, countCheckedItems } from "@/lib/content";
import { Button } from "@/components/ui/button";

interface content {
  id: number;
  txt: string;
  isCheck: boolean;
}
interface ModalProps {
  titles: string[];
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  titles,
  isOpen,
  onClose
}) => {
  const [activeTitle, setActiveTitle] = useState<string>(titles[0]);
  const [contentData, setContentData] = useState<content[]>(content['Popular']);
  const [checkedCounts, setCheckedCounts] = useState<{ [key: string]: number }>({});

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const isChecked = (id: number) => {
    toggleCheck(activeTitle, id)
    countCheckedItems(activeTitle)
    const updatedContent = content[activeTitle as keyof typeof content];
    setContentData([...updatedContent]);

    const updatedCheckedCounts: { [key: string]: number } = {};
    titles.forEach((title) => {
      const count = countCheckedItems(title);
      updatedCheckedCounts[title] = count;
    });
    setCheckedCounts(updatedCheckedCounts);
  }

  useEffect(() => {
    setContentData(content[activeTitle as keyof typeof content]);
  }, [activeTitle])
  
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
                  {/* {activeTitle === title && checkedCounts[activeTitle] > 0 && (
                    )} */}
                  {
                    checkedCounts[title] > 0 && (
                      <span className="font-sans text-sm mx-1">{checkedCounts[title]}</span>
                    )
                  }
                </Button>
              ))
            }
          </div>
        </DialogHeader>
        <div className="flex flex-row h-[200px] flex-wrap overflow-y-auto gap-1 w-full">
          {
            contentData.map((content, i) => (
              <Button
                onClick={() => isChecked(content.id)}
                variant={"outline"}
                key={i}
                className={`${content.isCheck ? 'border-sky-500' : ''}`}
              >
                {content.txt}
                {
                  content.isCheck === true && (
                    <X />
                  )
                }
              </Button>
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  );
};