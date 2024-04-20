import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

interface MeetingModelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    buttonText?: string;
    buttonIcon?: string;
    handleClick?: () => void;
    className?: string;
    children?: ReactNode;
    image?: string;
}

function MeetingModal({
    isOpen,
    onClose,
    title,
    className,
    buttonText,
    buttonIcon,
    handleClick,
    children,
    image
}: MeetingModelProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                <div className="flex flex-col gap-6">
                    {image ? (
                        <div className="flex justify-center">
                            <Image
                                src={image}
                                alt="model image"
                                width={72}
                                height={72}
                            />
                        </div>
                    ) : null}

                    <h1
                        className={cn(
                            "text-3xl font-bold leading-[42px]",
                            className
                        )}
                    >
                        {title}
                    </h1>

                    {children}

                    <Button
                        className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                        onClick={handleClick}
                    >
                        {buttonIcon ? (
                            <Image
                                src={buttonIcon}
                                alt="button icon"
                                width={13}
                                height={13}
                            />
                        ) : null} &nbsp;
                        {buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MeetingModal;
