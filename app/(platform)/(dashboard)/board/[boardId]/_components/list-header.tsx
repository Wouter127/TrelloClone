"use client"

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

interface ListHeaderProps {
    data: List;
}

const ListHeader = ({ data }: ListHeaderProps) => {
    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const disableEditing = () => {
        setIsEditing(false)
    }

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const { execute } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`Renamed to ${data.title}`);
            setTitle(data.title);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error)
            console.log(error);
        }
    });

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const id = formData.get("id") as string;
        const boardId = formData.get("boardId") as string;

        if (title === data.title) {
            return disableEditing();
        }

        execute({ title, id, boardId });

    }

    const onBlur = () => {
        formRef.current?.requestSubmit();
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            formRef.current?.requestSubmit();
        }
    }

    useEventListener("keydown", onKeyDown);

    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form ref={formRef} action={handleSubmit} className="flex-1 px-[2px]">
                    <input hidden id="id" value={data.id} name="id" readOnly />
                    <input hidden id="boardId" value={data.boardId} name="boardId" readOnly />
                    <FormInput ref={inputRef} onBlur={onBlur} id="title" placeholder="Enter list title" defaultValue={title} className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white" />
                    <button type="submit" hidden />
                </form>
            ) : (
                <div onClick={enableEditing} className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
                    {data.title}
                </div>
            )}
        </div>
    );
}

export default ListHeader;