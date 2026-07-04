import { TimelineEvent, GalleryImage, ScheduleEvent, GuestBlessing } from './types';

export const COUPLE_NAMES = {
  groom: 'Sureth',
  bride: 'Durga',
  groomFull: 'Sureth Kumar',
  brideFull: 'Durga Devi'
};

export const WEDDING_DATE = '2026-08-23T07:30:00'; // August 23, 2026 at 7:30 AM

export const STORY_TIMELINE: TimelineEvent[] = [];

export const WEDDING_SCHEDULE: ScheduleEvent[] = [
  {
    time: '7:30 AM Onwards',
    title: 'The Muhurtham',
    venue: 'Arulmigu Subramanyaswamy Thirukovil, Thiruthani Hill, Thiruttani, Tamil Nadu 631209',
    description: 'Join us for the traditional South Indian wedding ceremony on the hills of Thiruttani. Witness our vows as we tie the holy Mangalsutra (Thali) amidst Vedic chanting and Nadaswaram tunes.',
    icon: 'Temple'
  },
  {
    time: '7:00 PM Onwards',
    title: 'The Grand Reception',
    venue: 'SRI VIDHUR HALL, No.211, 200 Feet Radial Rd, Zamin Pallavaram, Chennai, Tamil Nadu 600117',
    description: 'An evening of celebration, delicious South Indian dinner feast, and musical events to mark our first steps as husband and wife. Come bless us and share our happiness!',
    icon: 'Reception'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: '1',
    url: '/images/durga-sureth-2.JPG'
  },
  {
    id: '2',
    url: '/images/durga-sureth-3.jpg'
  },
  {
    id: '3',
    url: '/images/durga-sureth-4.JPG'
  }, 
  {
    id: '4',
    url: '/images/durga-sureth-5.JPG'
  },
  {
    id: '5',
    url: '/images/durga-sureth-7.JPG'
  },
  {
    id: '6',
    url: '/images/durga-sureth-6.JPG'
  },
];

export const INITIAL_BLESSINGS: GuestBlessing[] = [];
