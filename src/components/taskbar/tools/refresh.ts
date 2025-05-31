import { useCallback, useState } from "react";

interface RefreshOptionsType {
  onRefresh?: () => Promise<void> | void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

interface UseRefreshReturnType {
  isRefreshing: boolean;
  refresh: () => Promise<void>;
  setRefreshing: (value: boolean) => void;
}

/**
 * Hook to manage refresh state and behavior
 */
export const useRefresh = ({
  onRefresh,
  onSuccess,
  onError,
}: RefreshOptionsType = {}): UseRefreshReturnType => {
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

/**
 * Hook to create a refresh handler with loading state
 */
export const useRefreshHandler = (
  options: RefreshOptionsType
): UseRefreshReturnType => {
  return useRefresh(options);
};

// Example usage:
/*
import { useRefresh } from '../utils/refresh';

const YourComponent = () => {
  const { isRefreshing, refresh } = useRefresh({
    onRefresh: async () => {
      // Your refresh logic here
      await fetchData();
    },
    onSuccess: () => {
      // Handle success
      console.log('Refresh successful');
    },
    onError: (error) => {
      // Handle error
      console.error('Refresh failed:', error);
    }
  });

  return (
    <Taskbar 
      onRefresh={refresh}
      isRefreshing={isRefreshing}
      // ... other props
    />
  );
};

// Or using the useRefreshHandler hook:
const YourOtherComponent = () => {
  const { isRefreshing, refresh } = useRefreshHandler({
    onRefresh: async () => {
      // Your refresh logic here
    }
  });
  
  return (
    <Taskbar 
      onRefresh={refresh}
      isRefreshing={isRefreshing}
      // ... other props
    />
  );
};
*/
