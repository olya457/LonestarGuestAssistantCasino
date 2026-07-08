import {images} from '../../../assets/guest-atlas';
import type {Venue} from '../types';

export const venues: Venue[] = [
  {
    id: 'signature-restaurant',
    name: 'Signature Restaurant',
    image: images.venueSignatureRestaurant,
    openingHours: '07:00 AM - 11:00 PM',
    phone: '+1 (555) 201-1001',
    shortDescription: 'Fine dining ocean views',
    fullDescriptionParagraph1:
      'Experience refined cuisine crafted with seasonal ingredients and international flavors. Elegant interiors and panoramic views create the perfect setting for breakfast, lunch, and dinner. Every dish is prepared with attention to detail and exceptional presentation.',
    fullDescriptionParagraph2:
      'Guests can enjoy an extensive wine selection alongside premium signature dishes. Whether celebrating a special occasion or enjoying a relaxed meal, the restaurant delivers a memorable dining experience. Reservations are recommended during peak hours.',
    pin: {top: '35%', left: '50%'},
  },
  {
    id: 'lobby-bar',
    name: 'Lobby Bar',
    image: images.venueLobbyBar,
    openingHours: '10:00 AM - 12:00 AM',
    phone: '+1 (555) 201-1002',
    shortDescription: 'Cocktails coffee social hub',
    fullDescriptionParagraph1:
      'The Lobby Bar serves handcrafted cocktails, premium spirits, and freshly brewed coffee throughout the day. Comfortable seating and modern design make it an ideal meeting place for guests and visitors. Soft music and elegant decor create a welcoming atmosphere.',
    fullDescriptionParagraph2:
      'Expert bartenders regularly introduce seasonal specialties and signature beverages. The venue transitions seamlessly from a daytime lounge into an upscale evening destination. Light snacks and desserts are available all day.',
    pin: {top: '42%', left: '39%'},
  },
  {
    id: 'rooftop-lounge',
    name: 'Rooftop Lounge',
    image: images.venueRooftopLounge,
    openingHours: '05:00 PM - 01:00 AM',
    phone: '+1 (555) 201-1003',
    shortDescription: 'Sunset cocktails skyline views',
    fullDescriptionParagraph1:
      'Located above the resort, the Rooftop Lounge offers breathtaking views of the coastline and surrounding landscape. Guests can relax with signature cocktails while enjoying a sophisticated open-air atmosphere. Elegant lighting enhances the experience after sunset.',
    fullDescriptionParagraph2:
      'The lounge regularly hosts live entertainment and exclusive social events. Comfortable seating areas provide the perfect setting for relaxation and conversation. Premium beverages and curated menu selections are available nightly.',
    pin: {top: '22%', left: '61%'},
  },
  {
    id: 'wellness-spa',
    name: 'Wellness Spa',
    image: images.venueWellnessSpa,
    openingHours: '08:00 AM - 08:00 PM',
    phone: '+1 (555) 201-1004',
    shortDescription: 'Relaxation treatments wellness experiences',
    fullDescriptionParagraph1:
      'Discover a peaceful sanctuary dedicated to relaxation, rejuvenation, and personal well-being. The spa offers a wide selection of treatments including massages, facials, and body therapies. Experienced professionals tailor each service to individual guest preferences.',
    fullDescriptionParagraph2:
      'Modern care rooms and calming interiors create a tranquil environment throughout the facility. Wellness rituals are designed to reduce stress and restore balance. Advanced reservations are recommended for premium treatments and packages.',
    pin: {top: '55%', left: '26%'},
  },
  {
    id: 'fitness-studio',
    name: 'Fitness Studio',
    image: images.venueFitnessStudio,
    openingHours: '06:00 AM - 10:00 PM',
    phone: '+1 (555) 201-1005',
    shortDescription: 'Modern gym personal training',
    fullDescriptionParagraph1:
      'Stay active with state-of-the-art fitness equipment and spacious workout areas suitable for every fitness level. The studio accommodates both casual exercise routines and professional training sessions. Guests can enjoy a comfortable and motivating environment.',
    fullDescriptionParagraph2:
      'Certified trainers are available to provide guidance and personalized fitness recommendations. Group classes and individual coaching sessions are offered throughout the day. The facility combines modern technology with premium comfort.',
    pin: {top: '62%', left: '36%'},
  },
  {
    id: 'outdoor-pool',
    name: 'Outdoor Pool',
    image: images.venueOutdoorPool,
    openingHours: '08:00 AM - 09:00 PM',
    phone: '+1 (555) 201-1006',
    shortDescription: 'Resort pool leisure zone',
    fullDescriptionParagraph1:
      'The Outdoor Pool provides a refreshing escape surrounded by landscaped gardens and elegant lounge areas. Guests can swim, relax, or enjoy poolside refreshments throughout the day. The spacious layout accommodates both families and couples.',
    fullDescriptionParagraph2:
      'Dedicated attendants ensure a comfortable experience for every visitor. Refreshments and light meals are available nearby. Evening lighting creates a beautiful atmosphere after sunset.',
    pin: {top: '49%', left: '55%'},
  },
  {
    id: 'private-beach',
    name: 'Private Beach',
    image: images.venuePrivateBeach,
    openingHours: '07:00 AM - 08:00 PM',
    phone: '+1 (555) 201-1007',
    shortDescription: 'Exclusive beach oceanfront escape',
    fullDescriptionParagraph1:
      'Enjoy direct access to a pristine private beach reserved exclusively for resort guests. Soft sand, crystal-clear water, and attentive service create a luxurious seaside experience. Comfortable loungers and shaded areas are available throughout the day.',
    fullDescriptionParagraph2:
      'Guests can participate in water activities or simply relax while enjoying spectacular ocean views. Beach attendants provide towels and assistance whenever needed. Sunset hours offer some of the most beautiful scenery on the property.',
    pin: {top: '76%', left: '68%'},
  },
  {
    id: 'kids-club',
    name: 'Kids Club',
    image: images.venueKidsClub,
    openingHours: '09:00 AM - 06:00 PM',
    phone: '+1 (555) 201-1008',
    shortDescription: 'Family activities supervised fun',
    fullDescriptionParagraph1:
      'The Kids Club offers a safe and engaging environment designed specifically for younger guests. Interactive games, creative workshops, and supervised activities keep children entertained throughout the day. Professional staff ensure a welcoming atmosphere.',
    fullDescriptionParagraph2:
      'Programs are tailored to different age groups and interests. Indoor and outdoor activities provide a variety of experiences for every child. Parents can enjoy resort amenities knowing their children are well cared for.',
    pin: {top: '70%', left: '44%'},
  },
  {
    id: 'conference-hall',
    name: 'Conference Hall',
    image: images.venueConferenceHall,
    openingHours: '08:00 AM - 08:00 PM',
    phone: '+1 (555) 201-1009',
    shortDescription: 'Meetings events business venue',
    fullDescriptionParagraph1:
      'The Conference Hall combines modern technology with flexible event spaces suitable for meetings, presentations, and private functions. Professional facilities support events of various sizes and formats. High-quality audiovisual equipment is available throughout the venue.',
    fullDescriptionParagraph2:
      'Dedicated event staff assist with planning and execution to ensure successful gatherings. Adaptable seating arrangements accommodate different event requirements. Catering services can also be arranged upon request.',
    pin: {top: '28%', left: '31%'},
  },
  {
    id: 'garden-terrace',
    name: 'Garden Terrace',
    image: images.venueGardenTerrace,
    openingHours: '10:00 AM - 10:00 PM',
    phone: '+1 (555) 201-1010',
    shortDescription: 'Outdoor dining garden atmosphere',
    fullDescriptionParagraph1:
      'Surrounded by lush greenery and elegant outdoor seating, the Garden Terrace provides a peaceful setting for relaxation and social gatherings. Guests can enjoy refreshments while taking in the natural surroundings. The atmosphere is especially inviting during evening hours.',
    fullDescriptionParagraph2:
      'Seasonal events and live entertainment are occasionally hosted in this picturesque location. Comfortable seating encourages guests to linger and unwind. The terrace offers a tranquil escape from the busier areas of the resort.',
    pin: {top: '58%', left: '67%'},
  },
  {
    id: 'wine-room',
    name: 'Wine Room',
    image: images.venueWineRoom,
    openingHours: '04:00 PM - 11:00 PM',
    phone: '+1 (555) 201-1011',
    shortDescription: 'Premium wines tasting experience',
    fullDescriptionParagraph1:
      'The Wine Room features an exceptional collection of regional and international wines carefully selected by experienced sommeliers. Guests can explore unique varieties and enjoy guided tasting experiences. Elegant decor creates a refined and intimate atmosphere.',
    fullDescriptionParagraph2:
      'Private tastings and educational events are available for guests interested in learning more about wine culture. The venue is designed to provide a memorable experience for both enthusiasts and casual visitors. Reservations are recommended for special events.',
    pin: {top: '38%', left: '72%'},
  },
  {
    id: 'boutique-shop',
    name: 'Boutique Shop',
    image: images.venueBoutiqueShop,
    openingHours: '09:00 AM - 09:00 PM',
    phone: '+1 (555) 201-1012',
    shortDescription: 'Gifts fashion resort essentials',
    fullDescriptionParagraph1:
      'The Boutique Shop offers a curated selection of resort essentials, gifts, fashion accessories, and locally inspired products. Guests can browse unique items while enjoying a personalized shopping experience. New collections and seasonal merchandise are regularly introduced.',
    fullDescriptionParagraph2:
      'The store provides convenient access to travel necessities and memorable souvenirs. Friendly staff are available to assist with recommendations and purchases. The carefully selected inventory reflects the style and character of the resort.',
    pin: {top: '46%', left: '23%'},
  },
];
