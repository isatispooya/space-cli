import { useCallback, useState } from "react";
import TaskBarType from "../types/taskbar.type";

export const useRefresh = ({
  onRefresh,
  onSuccess,
  onError,
}: TaskBarType["refreshProps"] = {}): TaskBarType["refreshReturn"] => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    if (!onRefresh || isRefreshing) return;

    setIsRefreshing(true);
    try {
      await onRefresh();
      onSuccess?.();
    } catch (error) {
      onError?.(error);
    } finally {
      setIsRefreshing(false);
    }
  }, [onRefresh, onSuccess, onError, isRefreshing]);

  return {
    isRefreshing,
    refresh,
    setRefreshing: setIsRefreshing,
  };
};

export const useRefreshHandler = (
  options: TaskBarType["refreshProps"]
): TaskBarType["refreshReturn"] => {
  return useRefresh(options);
};
