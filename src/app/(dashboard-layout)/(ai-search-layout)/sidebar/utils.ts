'use client';

import { create } from 'zustand';

type Props = {
  isSelectable: boolean;
  setIsSelectable: (value: boolean) => void;
  selectedIds: (string | number)[];
  addOrRemove: (id: string | number) => void;
  selectMultiple: (ids: (string | number)[]) => void;
  clearSelection: () => void;
};

export const useConversationSidebarSelectionState = create<Props>((set, get) => ({
  isSelectable: false,
  setIsSelectable: (value: boolean) => set({ isSelectable: value }),
  selectedIds: [],

  // Add or remove an ID from the selectedIds array
  addOrRemove(id) {
    const { selectedIds } = get();
    if (selectedIds.includes(id)) {
      set({ selectedIds: selectedIds.filter((selectedId) => selectedId !== id) });
    } else {
      set({ selectedIds: [...selectedIds, id] });
    }
  },

  // Select multiple IDs at once (avoids duplicates)
  selectMultiple(ids) {
    const { selectedIds } = get();
    const newSelection = Array.from(new Set([...selectedIds, ...ids])); // Ensures uniqueness
    set({ selectedIds: newSelection });
  },

  // Clear all selections
  clearSelection() {
    set({ selectedIds: [] });
  },
}));
