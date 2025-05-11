import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootStateType, AppDispatchType } from "@/store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;