"use client";

import { useAction } from "@/hooks/use-action";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { Button } from "../ui/button";
import { Ghost, XIcon } from "lucide-react";
import { toast } from "sonner";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "top" | "right" | "bottom";
    sideOffset?: number;
    align?: "start" | "center" | "end";
}

const FormPopover = ({ children, side = "bottom", sideOffset = 0, align }: FormPopoverProps) => {
    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: (data) => {
            console.log({ data });
            toast.success("Board created")
        }, onError: (error) => {
            console.log({ error });
            toast.error(error);
        }
    })
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        execute({ title });

    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent align={align} className="w-80 pt-3" side={side} sideOffset={sideOffset} >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost" >
                        <XIcon className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput id="title" label="Board title" type="text" errors={fieldErrors} />
                    </div>
                    <FormSubmit className="w-full">
                        Create
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
}

export default FormPopover;