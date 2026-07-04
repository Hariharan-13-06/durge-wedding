export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: 'engagement' | 'candid' | 'travel';
}

export interface RSVPData {
  id?: string;
  name: string;
  email: string;
  attending: 'yes' | 'no';
  guestsCount: number;
  dietaryRestrictions?: string;
  message?: string;
  timestamp: string;
}

export interface GuestBlessing {
  id: string;
  name: string;
  relation: string;
  blessing: string;
  timestamp: string;
  likes: number;
}

export interface ScheduleEvent {
  time: string;
  title: string;
  venue: string;
  description: string;
  icon: string;
}
