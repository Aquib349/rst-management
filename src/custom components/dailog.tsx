import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

interface CustomDailogComponentProps {
  open: any;
  onOpenChange: React.Dispatch<React.SetStateAction<any>>;
  title: string;
  description: string;
  content: React.ReactNode;
  className?: string;
}

const CustomDailogComponent = ({
  open,
  onOpenChange,
  title,
  description,
  content,
  className,
}: CustomDailogComponentProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={className}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-xs">
              {description}
            </DialogDescription>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomDailogComponent;
