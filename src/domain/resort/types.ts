import type {ImageSourcePropType} from 'react-native';

export type MenuCategory =
  | 'Breakfast'
  | 'Starters'
  | 'Main Courses'
  | 'Desserts'
  | 'Drinks';

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  ingredients: string;
  price: number;
  image: ImageSourcePropType;
};

export type CartItem = {
  menuItemId: string;
  quantity: number;
};

export type Venue = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  openingHours: string;
  phone: string;
  shortDescription: string;
  fullDescriptionParagraph1: string;
  fullDescriptionParagraph2: string;
  pin: {
    top: `${number}%`;
    left: `${number}%`;
  };
};

export type TaxiCategoryId = 'economy' | 'standard' | 'family' | 'premium';

export type TaxiBookingType = 'ASAP' | 'Scheduled';

export type TaxiDraft = {
  selectedCategory: TaxiCategoryId;
  bookingType: TaxiBookingType;
  scheduledDate: string;
  scheduledTime: string;
};

export type LightingColor =
  | 'Emerald'
  | 'Warm White'
  | 'Soft Gold'
  | 'Ocean Blue'
  | 'Rose'
  | 'Violet';

export type LightingPreset =
  | 'Relax'
  | 'Reading'
  | 'Night'
  | 'Romantic'
  | 'Work'
  | 'Custom';

export type LightingSettings = {
  brightness: number;
  color: LightingColor;
  preset: LightingPreset;
  timerEnabled: boolean;
  turnOnTime: string;
  turnOffTime: string;
};

export type ExpandedVenueState = Record<string, boolean>;
