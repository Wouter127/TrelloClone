import { create } from "zustand";

type mobileSidebarStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useMobileSidebar = create<mobileSidebarStore>((set) => {
    return {
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    }
})