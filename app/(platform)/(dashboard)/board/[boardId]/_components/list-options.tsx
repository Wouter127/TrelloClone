"use client"

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { PopoverClose } from "@radix-ui/react-popover";
import { MoreHorizontal, XIcon } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListItemsProps {
    data: List,
    onAddCard: () => void;
}

const Listoptions = ({ data, onAddCard }: ListItemsProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`${data.title} deleted`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error)
        }
    });

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast.success(`${data.title} copied`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error)
        }
    });

    const onDelete = (formData: FormData) => {
        const boardId = formData.get("boardId") as string;
        const id = formData.get("id") as string;

        executeDelete({ id, boardId });
    }

    const onCopy = (formData: FormData) => {
        const boardId = formData.get("boardId") as string;
        const id = formData.get("id") as string;

        executeCopy({ id, boardId });
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost" >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List actions
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2" variant="ghost">
                        <XIcon className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <Button onClick={onAddCard} className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm" variant="ghost">
                    Add card
                </Button>
                <form action={onCopy}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit variant="ghost" className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm" >
                        Copy list
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input hidden name="id" id="id" value={data.id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <FormSubmit variant="ghost" className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm" >
                        Delete list
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
}

export default Listoptions;