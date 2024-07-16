export interface TicketType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  eventId: number;
}

export interface EventCategory {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Promo {
  name: string;
  promoType: string;
  promoTypeDisplayName: string;
  discount: number;
  quantity: number;
  promoCode: string;
  startValid: string;
  endValid: string;
}

export interface Event {
  id: number;
  name: string;
  start: string;
  end: string;
  pic: string;
  organization: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  eventCategory: EventCategory;
  user: User;
  ticketTypes: TicketType[];
  promos: Promo[];
}

export interface SearchEventsParams {
  keyword?: string;
  categoryName?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  size?: number;
  sort?: string;
}

export interface FetchEventsParams {
  page?: number;
  size?: number;
}