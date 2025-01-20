/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GridState {
  filterModel: any;
  sortModel: any;
  columnVisibilityModel: any;
}

interface GridStateStore {
  states: Record<string, GridState>;
  handleStateChange: (
    gridId: string,
    stateType: "filter" | "sort" | "visibility",
    newState: any
  ) => void;
  clearState: (gridId: string) => void;
  clearAllStates: () => void;
}

export const useGridStateStore = create<GridStateStore>()(
  persist(
    (set) => ({
      states: {},
      handleStateChange: (gridId, stateType, newState) =>
        set((state) => ({
          states: {
            ...state.states,
            [gridId]: {
              ...state.states[gridId],
              filterModel:
                stateType === "filter"
                  ? newState
                  : state.states[gridId]?.filterModel || { items: [] },
              sortModel:
                stateType === "sort"
                  ? newState
                  : state.states[gridId]?.sortModel || [],
              columnVisibilityModel:
                stateType === "visibility"
                  ? newState
                  : state.states[gridId]?.columnVisibilityModel || {},
            },
          },
        })),
      clearState: (gridId) =>
        set((state) => ({
          states: {
            ...state.states,
            [gridId]: {
              filterModel: { items: [] },
              sortModel: [],
              columnVisibilityModel: {},
            },
          },
        })),
      clearAllStates: () =>
        set({
          states: {},
        }),
    }),
    {
      name: "grid-states", // localStorage key
    }
  )
);
