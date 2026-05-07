export const CATS = [
  { id:'Music',   color:'#e8192c', emoji:'🎵', bg:'rgba(232,25,44,.1)'   },
  { id:'Comedy',  color:'#f5a623', emoji:'😂', bg:'rgba(245,166,35,.1)'  },
  { id:'Sports',  color:'#00c853', emoji:'⚽', bg:'rgba(0,200,83,.1)'    },
  { id:'Dance',   color:'#e040fb', emoji:'💃', bg:'rgba(224,64,251,.1)'  },
  { id:'Theatre', color:'#2979ff', emoji:'🎭', bg:'rgba(41,121,255,.1)'  },
  { id:'Tech',    color:'#00bcd4', emoji:'💻', bg:'rgba(0,188,212,.1)'   },
];

export const DUMMY = [
  { _id:'d1', title:'Coldplay World Tour 2025',  category:'Music',   venueName:'DY Patil Stadium',     venueAddress:'Navi Mumbai, Maharashtra', startTime:'2025-08-15T18:00:00Z', tiers:[{name:'General',price:2999,remainingQuantity:120},{name:'VIP',price:8999,remainingQuantity:20}], status:'published' },
  { _id:'d2', title:'IPL Final 2025',            category:'Sports',  venueName:'Wankhede Stadium',     venueAddress:'Mumbai, Maharashtra',      startTime:'2025-05-25T19:30:00Z', tiers:[{name:'Stand',price:1500,remainingQuantity:200},{name:'Box',price:5000,remainingQuantity:10}],  status:'published' },
  { _id:'d3', title:'Zakir Khan — Haq Se Single',category:'Comedy',  venueName:'Siri Fort Auditorium', venueAddress:'New Delhi',                startTime:'2025-06-10T20:00:00Z', tiers:[{name:'General',price:999,remainingQuantity:80}],                                               status:'published' },
  { _id:'d4', title:'Nucleya Bass Yatra 2025',   category:'Music',   venueName:'Palace Grounds',       venueAddress:'Bengaluru, Karnataka',     startTime:'2025-07-05T17:00:00Z', tiers:[{name:'GA',price:799,remainingQuantity:300},{name:'VIP',price:2499,remainingQuantity:30}],     status:'published' },
  { _id:'d5', title:'Hamlet — National Theatre', category:'Theatre', venueName:'NCPA',                 venueAddress:'Mumbai, Maharashtra',      startTime:'2025-06-20T19:00:00Z', tiers:[{name:'Circle',price:500,remainingQuantity:60},{name:'Stalls',price:1200,remainingQuantity:40}],status:'published' },
  { _id:'d6', title:'React India Conference',    category:'Tech',    venueName:'HICC',                 venueAddress:'Hyderabad, Telangana',     startTime:'2025-09-12T09:00:00Z', tiers:[{name:'Standard',price:3500,remainingQuantity:150},{name:'Premium',price:6000,remainingQuantity:25}],status:'published'},
];

export const ic = {
  ticket:  'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
  close:   'M6 18L18 6M6 6l12 12',
  check:   'M5 13l4 4L19 7',
  search:  'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  logout:  'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  cal:     'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  map:     'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  user:    'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z',
  plus:    'M12 5v14M5 12h14',
  trash:   'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
  image:   'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  shield:  'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  seat:    'M5 10a7 7 0 0114 0v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4z M3 19h18M9 22v-3M15 22v-3',
  venue:   'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  tag:     'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z',
  layout:  'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
  filter:  'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
  heart:   'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  star:    'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  arrow:   'M17 8l4 4m0 0l-4 4m4-4H3',
  home:    'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  menu:    'M4 6h16M4 12h16M4 18h16',
};