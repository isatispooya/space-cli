export interface PrivilegesType {
    id: number;
    name: string;
    feild_of_activity: string;
    description: string;
    percent: number;
    count: number;
    status: boolean;
    telephone: string;
    address: string;
    website: string;
    location: string;
    start_date: string;
    end_date: string;
    created_at: string;
    field_of_activity: string;
    category: string;
  }
   export interface RewardItemType {
    id: number;
    name: string;
    category: string;
    feild_of_activity: string;
    description: string;
    percent: string;
    count: number;
    status: boolean;
    telephone: string;
    address: string;
    website: string;
    location: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface RewardsTablePropsType {
    rewards: RewardItemType[];
  }

  export interface CategoryIconsPropsType {
    onCategoryChange?: (category: string | null) => void;
    setSelected: (category: string | null) => void;
    selected: string | null;
  }