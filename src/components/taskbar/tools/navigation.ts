import { NavigateFunction } from "react-router-dom";

interface NavigationOptionsType {
  navigate: NavigateFunction;
  path?: string;
  params?: Record<string, string | number>;
  state?: Record<string, unknown>;
  replace?: boolean;
}

export const navigation = {
  /**
   * Navigate to a specific path
   */
  goTo: ({
    navigate,
    path,
    params,
    state,
    replace = false,
  }: NavigationOptionsType) => {
    if (!path) return;

    let finalPath = path;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        finalPath = finalPath.replace(`:${key}`, String(value));
      });
    }

    navigate(finalPath, { state, replace });
  },

  /**
   * Go back to the previous page
   */
  goBack: (navigate: NavigateFunction) => {
    navigate(-1);
  },

  /**
   * Go forward in history
   */
  goForward: (navigate: NavigateFunction) => {
    navigate(1);
  },

  /**
   * Refresh current page
   */
  refresh: (navigate: NavigateFunction) => {
    navigate(0);
  },

  /**
   * Navigate to home page
   */
  goHome: (navigate: NavigateFunction) => {
    navigate("/");
  },
};

// Example usage:
/*
import { useNavigate } from 'react-router-dom';
import { navigation } from '../utils/navigation';

const YourComponent = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate to a specific path
    navigation.goTo({
      navigate,
      path: '/users/:id',
      params: { id: 123 },
      state: { from: 'dashboard' }
    });

    // Or use other navigation methods
    navigation.goBack(navigate);
    navigation.goForward(navigate);
    navigation.refresh(navigate);
    navigation.goHome(navigate);
  };

  return (
    <Taskbar 
      onBack={() => navigation.goBack(navigate)}
      // ... other props
    />
  );
};
*/
