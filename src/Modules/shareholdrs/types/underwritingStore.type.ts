export interface underwritingStoreTypes {
    id: number;
    setId: (id: number) => void;
    isDescriptionOpen: boolean;
    setIsDescriptionOpen: (isDescriptionOpen: boolean) => void;
    showPopup: boolean;
    setShowPopup: (showPopup: boolean) => void;
    selectedDescription: string;
    setSelectedDescription: (selectedDescription: string) => void;
  }