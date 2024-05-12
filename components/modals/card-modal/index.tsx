"use client"

import { useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "../../ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import Header from "./header";

const CardModal = () => {
    const id = useCardModal((state) => state.id);
    const isOpen = useCardModal((state) => state.isOpen);
    const onClose = useCardModal((state) => state.onClose);

    const { data: cardData } = useQuery<CardWithList>({
        queryKey: ["card", id],
        queryFn: () => fetcher(`/api/cards/${id}`)
    })

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                {!cardData
                    ? <Header.Skeleton/> 
                    : <Header data={cardData} />
                }
            </DialogContent>
        </Dialog>
    );
}

export default CardModal;