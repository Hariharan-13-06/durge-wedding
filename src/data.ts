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
    title: 'The Sacred Muhurtham',
    venue: 'Arulmigu Subramanyaswamy Thirukovil, Thiruthani Hill, Thiruttani, Tamil Nadu 631209',
    description: 'Join us for the traditional South Indian wedding ceremony on the sacred hills of Thiruttani. Witness our vows as we tie the holy Mangalsutra (Thali) amidst Vedic chanting and Nadaswaram tunes.',
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
    url: '/src/assets/images/wedding_couple_portrait_1783162470809.jpg',
    caption: 'Sureth Kumar & Durga Devi in traditional wedding attire',
    category: 'engagement'
  },
  {
    id: '2',
    url: '/src/assets/images/engagement_gold_hour_1783162485688.jpg',
    caption: 'Beautiful shared smiles and warm evening light',
    category: 'candid'
  },
  {
    id: '3',
    url: '/src/assets/images/engagement_beach_sunset_1783162499498.jpg',
    caption: 'Strolling hand-in-hand along the quiet shores',
    category: 'travel'
  }
];

export const INITIAL_BLESSINGS: GuestBlessing[] = [];
