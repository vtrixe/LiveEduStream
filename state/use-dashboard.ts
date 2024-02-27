import { create } from "zustand";

interface LecturerSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
};

export const useCreatorSidebar = create<LecturerSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set(() => ({ collapsed: false })),
  onCollapse: () => set(() => ({ collapsed: true })),
}));