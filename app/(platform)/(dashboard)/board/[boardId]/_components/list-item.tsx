"use client"

import { ListWithCards } from "@/types";
import ListHeader from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { useAction } from "@/hooks/use-action";
import CardForm from "./card-form";
import { cn } from "@/lib/utils";
import CardItem from "./card-item";

interface ListItemProps {
    data: ListWithCards;
    index: number;
}


const ListItem = ({data, index}:ListItemProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const textAreaRef = useRef<ElementRef<"textarea">>(null);

    const disableEditing = () => {
        setIsEditing(false)
    }

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef.current?.focus();
        })
    }

    // const { execute } = useAction(updateList, {
    //     onSuccess: (data) => {
    //         toast.success(`Renamed to ${data.title}`);
    //         setTitle(data.title);
    //         disableEditing();
    //     },
    //     onError: (error) => {
    //         toast.error(error)
    //     }
    // });

    // const handleSubmit = (formData: FormData) => {
    //     const title = formData.get("title") as string;
    //     const id = formData.get("id") as string;
    //     const boardId = formData.get("boardId") as string;

    //     if (title === data.title) {
    //         return disableEditing();
    //     }

    //     execute({ title, id, boardId });

    // }

    // const onBlur = () => {
    //     formRef.current?.requestSubmit();
    // }

    // const onKeyDown = (e: KeyboardEvent) => {
    //     if (e.key === "Escape") {
    //         formRef.current?.requestSubmit();
    //     }
    // }

    // useEventListener("keydown", onKeyDown);

    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
                <ListHeader onAddCard={enableEditing} data={data} />
                <ol className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", data.cards.length > 0 ? "mt-2" : "mt-0")}>
                    {data.cards.map((card, index) => (
                        <CardItem index={index} key={card.id} data={card} />
                    ))}
                </ol>
                <CardForm ref={textAreaRef} isEditing={isEditing} enableEditing={enableEditing} disableEditing={disableEditing} listId={data.id} />
            </div>
        </li>
    );
}

export default ListItem;