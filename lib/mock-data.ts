// ============================================================
// The Sportz Hub — Comprehensive Mock Data
// ============================================================

export const academy = {
  name: "The Sportz Hub",
  tagline: "Premier Multi-Sport & Fitness Hub",
  subTagline: "International standard facilities, expert coaching, and accessible community programs.",
  city: "Kanpur, Uttar Pradesh",
  founded: 2015,
  totalCourts: 22,
  totalSports: 12,
  activeMembers: 5240,
  satisfactionRate: 97,
  tournamentsHosted: 150,
  address: "Kanpur, Uttar Pradesh",
  phone: "+91-512-4567890",
  whatsapp: "+91-98001-23456",
  email: "info@audistadia.com",
  mapLink: "https://maps.google.com/?q=The+Sportz+Hub+Kanpur",
};

// -------------------------------------------------------
// Sports
// -------------------------------------------------------
export const sports = [
  {
    id: "badminton",
    name: "Badminton",
    category: "Racquet",
    indoor: true,
    courts: 6,
    surface: "Wooden sprung",
    capacity: 12,
    peakHours: "6–9 AM, 5–9 PM",
    coaching: ["Beginner batch", "Intermediate", "Advanced 1-on-1"],
    color: "#c8e64c",
    emoji: "🏸",
    description: "Six professional-grade wooden courts with LED lighting, tournament nets, and shuttle vending.",
    members: 820,
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    category: "Racquet",
    indoor: true,
    courts: 8,
    surface: "Rubberised floor",
    capacity: 16,
    peakHours: "7–10 AM, 6–9 PM",
    coaching: ["Beginner", "District-level prep", "State-level prep"],
    color: "#a8d54a",
    emoji: "🏓",
    description: "Eight regulation ITTF-approved tables with anti-glare lighting and robot training aids.",
    members: 640,
  },
  {
    id: "boxing",
    name: "Boxing",
    category: "Combat",
    indoor: true,
    courts: 2,
    surface: "Sprung canvas",
    capacity: 20,
    peakHours: "6–8 AM, 5–7 PM",
    coaching: ["Fitness boxing", "Amateur competition"],
    color: "#e8c84c",
    emoji: "🥊",
    description: "Two full-size competition rings, bag work stations, speed ball rigs, and a strength conditioning zone.",
    members: 310,
  },
  {
    id: "gymnastics",
    name: "Gymnastics",
    category: "Artistic",
    indoor: true,
    courts: 1,
    surface: "Spring floor + foam pits",
    capacity: 24,
    peakHours: "8–11 AM, 4–7 PM",
    coaching: ["Foundation", "Artistic", "Rhythmic"],
    color: "#c84ca8",
    emoji: "🤸",
    description: "Purpose-built gymnastics hall with vault, bars, beam, spring floor, and foam landing pits.",
    members: 190,
  },
  {
    id: "wrestling",
    name: "Wrestling",
    category: "Combat",
    indoor: true,
    courts: 2,
    surface: "Competition mat",
    capacity: 16,
    peakHours: "6–8 AM, 4–6 PM",
    coaching: ["Freestyle", "Greco-Roman"],
    color: "#e87a4c",
    emoji: "🤼",
    description: "UWW-standard wrestling mats, weight management room, and video analysis station.",
    members: 145,
  },
  {
    id: "yoga",
    name: "Yoga & Wellness",
    category: "Mind-Body",
    indoor: true,
    courts: 2,
    surface: "Cork mat floor",
    capacity: 30,
    peakHours: "6–8 AM, 7–9 PM",
    coaching: ["Hatha", "Ashtanga", "Sports recovery yoga"],
    color: "#4cb8e8",
    emoji: "🧘",
    description: "Two serene studios with natural light, temperature control, and specialised recovery yoga for athletes.",
    members: 380,
  },
  {
    id: "athletics",
    name: "Athletics",
    category: "Track & Field",
    indoor: false,
    courts: 1,
    surface: "Synthetic 400m track",
    capacity: 40,
    peakHours: "5–8 AM, 4–7 PM",
    coaching: ["Sprints", "Long distance", "Field events"],
    color: "#e84c4c",
    emoji: "🏃",
    description: "400m synthetic track with 8 lanes, equipment for long jump, shot put, and high jump.",
    members: 260,
  },
  {
    id: "swimming",
    name: "Swimming",
    category: "Aquatic",
    indoor: true,
    courts: 1,
    surface: "25m Olympic pool",
    capacity: 32,
    peakHours: "6–9 AM, 4–7 PM",
    coaching: ["Learn-to-swim", "Competitive strokes", "Open water prep"],
    color: "#4c8ce8",
    emoji: "🏊",
    description: "25-metre, 8-lane temperature-controlled pool with illuminated lane markers and timing system.",
    members: 420,
  },
];

// -------------------------------------------------------
// Membership Plans
// -------------------------------------------------------
export const plans = [
  {
    id: "day-pass",
    name: "Day Pass",
    duration: "Single Day",
    price: 199,
    popular: false,
    features: [
      "Walk-in access to all open courts",
      "No commitment required",
      "1 booking slot",
      "Basic locker access",
    ],
    cta: "Buy Today",
    highlight: false,
  },
  {
    id: "monthly",
    name: "Monthly",
    duration: "30 Days",
    price: 1499,
    popular: true,
    features: [
      "2 court bookings per week",
      "Digital membership card",
      "Access to member portal",
      "WhatsApp notifications",
      "1 group coaching session/week",
    ],
    cta: "Start Monthly",
    highlight: true,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    duration: "90 Days",
    price: 3999,
    popular: false,
    features: [
      "4 court bookings per week",
      "Digital membership card",
      "Learning Hub access",
      "1 free coaching assessment",
      "Event registration priority",
    ],
    cta: "Get Quarterly",
    highlight: false,
  },
  {
    id: "annual",
    name: "Annual",
    duration: "365 Days",
    price: 11999,
    popular: false,
    features: [
      "Unlimited court bookings",
      "Priority slot booking (7 days ahead)",
      "Full Learning Hub access",
      "4 included coaching sessions",
      "Free sports kit bag",
      "Performance tracking",
    ],
    cta: "Join Annual",
    highlight: false,
  },
  {
    id: "student",
    name: "Student",
    duration: "180 Days",
    price: 2499,
    popular: false,
    features: [
      "Valid ID required",
      "2 court bookings per week",
      "Digital membership card",
      "Learning Hub access",
      "Special tournament eligibility",
    ],
    cta: "Student Plan",
    highlight: false,
  },
  {
    id: "family",
    name: "Family",
    duration: "365 Days",
    price: 29999,
    popular: false,
    features: [
      "Up to 4 members",
      "Individual digital cards",
      "Multi-sport access",
      "2 family coaching sessions/month",
      "Exclusive family lounge access",
    ],
    cta: "Family Pack",
    highlight: false,
  },
];

// -------------------------------------------------------
// Coaches
// -------------------------------------------------------
export const coaches = [
  {
    id: "c1",
    name: "Arjun Mehta",
    sport: "Badminton",
    level: "National",
    experience: 14,
    rating: 4.9,
    sessions: 1240,
    bio: "Former national doubles champion, trained under SAI. Specialises in footwork and court geometry.",
    avatar: "/avatars/coach1.jpg",
    initials: "AM",
    color: "#c8e64c",
  },
  {
    id: "c2",
    name: "Priya Sharma",
    sport: "Table Tennis",
    level: "State",
    experience: 9,
    rating: 4.8,
    sessions: 890,
    bio: "3× UP State champion. Expert in penhold grip technique and serve mastery programmes.",
    avatar: "/avatars/coach2.jpg",
    initials: "PS",
    color: "#a8d54a",
  },
  {
    id: "c3",
    name: "Rajesh Kumar",
    sport: "Boxing",
    level: "National",
    experience: 18,
    rating: 4.9,
    sessions: 2100,
    bio: "Former Arjuna Award nominee. Runs both fitness boxing and competitive programme pathways.",
    avatar: "/avatars/coach3.jpg",
    initials: "RK",
    color: "#e8c84c",
  },
  {
    id: "c4",
    name: "Sunita Verma",
    sport: "Gymnastics",
    level: "International",
    experience: 12,
    rating: 4.95,
    sessions: 1050,
    bio: "SAI-certified Level 3 gymnastics coach. Produced 5 national-level gymnasts in the last 3 years.",
    avatar: "/avatars/coach4.jpg",
    initials: "SV",
    color: "#c84ca8",
  },
  {
    id: "c5",
    name: "Vikram Singh",
    sport: "Wrestling",
    level: "National",
    experience: 11,
    rating: 4.7,
    sessions: 740,
    bio: "Commonwealth Games participant. Coaches freestyle and Greco-Roman with emphasis on grip and leverage.",
    avatar: "/avatars/coach5.jpg",
    initials: "VS",
    color: "#e87a4c",
  },
  {
    id: "c6",
    name: "Neha Gupta",
    sport: "Yoga",
    level: "Certified",
    experience: 7,
    rating: 4.85,
    sessions: 610,
    bio: "RYT-500 and sports physiotherapy background. Specialises in injury recovery and athletic flexibility.",
    avatar: "/avatars/coach6.jpg",
    initials: "NG",
    color: "#4cb8e8",
  },
];

// -------------------------------------------------------
// Members (mock)
// -------------------------------------------------------
export const members = [
  { id: "M001", name: "Ravi Patel", plan: "Annual", sport: "Badminton", status: "active", daysLeft: 234, sessions: 87, joined: "2024-01-15", phone: "+91-9800000001", avatar: "RP" },
  { id: "M002", name: "Anjali Singh", plan: "Monthly", sport: "Table Tennis", status: "expiring", daysLeft: 6, sessions: 22, joined: "2025-02-10", phone: "+91-9800000002", avatar: "AS" },
  { id: "M003", name: "Suresh Yadav", plan: "Quarterly", sport: "Boxing", status: "active", daysLeft: 55, sessions: 44, joined: "2024-11-01", phone: "+91-9800000003", avatar: "SY" },
  { id: "M004", name: "Meena Tiwari", plan: "Student", sport: "Gymnastics", status: "active", daysLeft: 89, sessions: 31, joined: "2025-01-20", phone: "+91-9800000004", avatar: "MT" },
  { id: "M005", name: "Deepak Sharma", plan: "Monthly", sport: "Athletics", status: "expired", daysLeft: -3, sessions: 18, joined: "2025-02-01", phone: "+91-9800000005", avatar: "DS" },
  { id: "M006", name: "Pooja Gupta", plan: "Annual", sport: "Swimming", status: "active", daysLeft: 187, sessions: 62, joined: "2024-09-05", phone: "+91-9800000006", avatar: "PG" },
  { id: "M007", name: "Amit Kumar", plan: "Family", sport: "Badminton", status: "active", daysLeft: 310, sessions: 95, joined: "2024-05-12", phone: "+91-9800000007", avatar: "AK" },
  { id: "M008", name: "Ritika Joshi", plan: "Monthly", sport: "Yoga", status: "expiring", daysLeft: 4, sessions: 28, joined: "2025-02-28", phone: "+91-9800000008", avatar: "RJ" },
  { id: "M009", name: "Nikhil Ahuja", plan: "Quarterly", sport: "Table Tennis", status: "active", daysLeft: 71, sessions: 39, joined: "2025-01-05", phone: "+91-9800000009", avatar: "NA" },
  { id: "M010", name: "Swati Mishra", plan: "Annual", sport: "Wrestling", status: "active", daysLeft: 145, sessions: 78, joined: "2024-10-20", phone: "+91-9800000010", avatar: "SM" },
  { id: "M011", name: "Karan Dubey", plan: "Day Pass", sport: "Badminton", status: "active", daysLeft: 0, sessions: 3, joined: "2026-03-31", phone: "+91-9800000011", avatar: "KD" },
  { id: "M012", name: "Priyanka Rao", plan: "Student", sport: "Athletics", status: "active", daysLeft: 112, sessions: 56, joined: "2025-01-10", phone: "+91-9800000012", avatar: "PR" },
];

// -------------------------------------------------------
// Courts
// -------------------------------------------------------
export const courts = [
  { id: "B1", sport: "Badminton", name: "Court B1", status: "occupied", member: "Ravi Patel", until: "11:30 AM" },
  { id: "B2", sport: "Badminton", name: "Court B2", status: "available" },
  { id: "B3", sport: "Badminton", name: "Court B3", status: "occupied", member: "Amit Kumar", until: "12:00 PM" },
  { id: "B4", sport: "Badminton", name: "Court B4", status: "maintenance" },
  { id: "B5", sport: "Badminton", name: "Court B5", status: "available" },
  { id: "B6", sport: "Badminton", name: "Court B6", status: "available" },
  { id: "TT1", sport: "Table Tennis", name: "Table TT1", status: "occupied", member: "Anjali Singh", until: "11:00 AM" },
  { id: "TT2", sport: "Table Tennis", name: "Table TT2", status: "available" },
  { id: "TT3", sport: "Table Tennis", name: "Table TT3", status: "available" },
  { id: "TT4", sport: "Table Tennis", name: "Table TT4", status: "occupied", member: "Nikhil Ahuja", until: "12:30 PM" },
  { id: "BX1", sport: "Boxing", name: "Ring BX1", status: "occupied", member: "Suresh Yadav", until: "11:00 AM" },
  { id: "BX2", sport: "Boxing", name: "Ring BX2", status: "available" },
  { id: "GYM", sport: "Gymnastics", name: "Gymnastics Hall", status: "occupied", member: "Meena Tiwari", until: "12:00 PM" },
  { id: "WR1", sport: "Wrestling", name: "Mat WR1", status: "available" },
  { id: "WR2", sport: "Wrestling", name: "Mat WR2", status: "available" },
  { id: "YG1", sport: "Yoga", name: "Studio Y1", status: "occupied", member: "Ritika Joshi", until: "10:30 AM" },
  { id: "YG2", sport: "Yoga", name: "Studio Y2", status: "available" },
  { id: "ATH", sport: "Athletics", name: "Track", status: "available" },
  { id: "SWM", sport: "Swimming", name: "Pool", status: "occupied", member: "Pooja Gupta", until: "11:30 AM" },
];

// -------------------------------------------------------
// Court timetable (for booking page)
// -------------------------------------------------------
const SLOT_TIMES = ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

type SlotStatus = "available" | "booked" | "maintenance" | "mine";

export const timetable: Record<string, Record<string, SlotStatus>> = {
  B1: { "6:00": "booked", "7:00": "booked", "8:00": "mine", "9:00": "available", "10:00": "available", "11:00": "booked", "12:00": "available", "13:00": "available", "14:00": "available", "15:00": "booked", "16:00": "booked", "17:00": "available", "18:00": "booked", "19:00": "booked", "20:00": "available" },
  B2: { "6:00": "available", "7:00": "booked", "8:00": "booked", "9:00": "mine", "10:00": "available", "11:00": "available", "12:00": "booked", "13:00": "available", "14:00": "booked", "15:00": "available", "16:00": "available", "17:00": "booked", "18:00": "booked", "19:00": "available", "20:00": "booked" },
  B3: { "6:00": "booked", "7:00": "available", "8:00": "available", "9:00": "booked", "10:00": "booked", "11:00": "available", "12:00": "booked", "13:00": "available", "14:00": "available", "15:00": "booked", "16:00": "available", "17:00": "booked", "18:00": "available", "19:00": "booked", "20:00": "available" },
  B4: { "6:00": "maintenance", "7:00": "maintenance", "8:00": "maintenance", "9:00": "maintenance", "10:00": "maintenance", "11:00": "maintenance", "12:00": "maintenance", "13:00": "maintenance", "14:00": "maintenance", "15:00": "maintenance", "16:00": "maintenance", "17:00": "maintenance", "18:00": "maintenance", "19:00": "maintenance", "20:00": "maintenance" },
  B5: { "6:00": "available", "7:00": "available", "8:00": "booked", "9:00": "available", "10:00": "available", "11:00": "booked", "12:00": "available", "13:00": "booked", "14:00": "available", "15:00": "available", "16:00": "booked", "17:00": "available", "18:00": "available", "19:00": "booked", "20:00": "available" },
  B6: { "6:00": "booked", "7:00": "available", "8:00": "available", "9:00": "booked", "10:00": "available", "11:00": "available", "12:00": "booked", "13:00": "available", "14:00": "available", "15:00": "available", "16:00": "booked", "17:00": "booked", "18:00": "available", "19:00": "available", "20:00": "booked" },
};

export const slotTimes = SLOT_TIMES;

// -------------------------------------------------------
// Events / Tournaments
// -------------------------------------------------------
export const events = [
  {
    id: "ev1",
    name: "Spring Badminton Open",
    sport: "Badminton",
    type: "Open",
    format: "Knockout",
    date: "2026-06-15",
    registrationDeadline: "2026-06-10",
    participants: 32,
    maxParticipants: 32,
    entryFee: 299,
    prize: "₹10,000 + Trophy",
    status: "open",
    poster: "#c8e64c",
  },
  {
    id: "ev2",
    name: "Table Tennis District Championship",
    sport: "Table Tennis",
    type: "Age-Group",
    format: "Round Robin + Knockout",
    date: "2026-06-28",
    registrationDeadline: "2026-06-22",
    participants: 18,
    maxParticipants: 48,
    entryFee: 199,
    prize: "Medals + Certificate",
    status: "open",
    poster: "#a8d54a",
  },
  {
    id: "ev3",
    name: "Boxing Fitness Tournament",
    sport: "Boxing",
    type: "Internal",
    format: "Knockout",
    date: "2026-07-10",
    registrationDeadline: "2026-07-05",
    participants: 8,
    maxParticipants: 16,
    entryFee: 0,
    prize: "Certificate",
    status: "open",
    poster: "#e8c84c",
  },
  {
    id: "ev4",
    name: "State Gymnastics Meet",
    sport: "Gymnastics",
    type: "State",
    format: "Points",
    date: "2026-03-20",
    registrationDeadline: "2026-03-15",
    participants: 24,
    maxParticipants: 24,
    entryFee: 499,
    prize: "₹25,000 + Medals",
    status: "completed",
    poster: "#c84ca8",
  },
  {
    id: "ev5",
    name: "Annual Swimming Gala",
    sport: "Swimming",
    type: "Internal",
    format: "Time Trial",
    date: "2026-07-25",
    registrationDeadline: "2026-07-18",
    participants: 5,
    maxParticipants: 40,
    entryFee: 99,
    prize: "Medals + Trophy",
    status: "upcoming",
    poster: "#4c8ce8",
  },
];

// -------------------------------------------------------
// Tournament Bracket (Badminton Open — 8 players demo)
// -------------------------------------------------------
export const bracket = {
  event: "Spring Badminton Open",
  rounds: [
    {
      name: "Quarter finals",
      matches: [
        { id: 1, player1: "Ravi Patel", player2: "Karan Dubey", score1: 21, score2: 14, winner: "Ravi Patel", status: "completed" },
        { id: 2, player1: "Amit Kumar", player2: "Nikhil Ahuja", score1: 19, score2: 21, winner: "Nikhil Ahuja", status: "completed" },
        { id: 3, player1: "Suresh Yadav", player2: "Deepak Sharma", score1: 21, score2: 8, winner: "Suresh Yadav", status: "completed" },
        { id: 4, player1: "Vikram Tiwari", player2: "Priyank Rao", score1: 15, score2: 21, winner: "Priyank Rao", status: "completed" },
      ],
    },
    {
      name: "Semi finals",
      matches: [
        { id: 5, player1: "Ravi Patel", player2: "Nikhil Ahuja", score1: null, score2: null, winner: null, status: "upcoming" },
        { id: 6, player1: "Suresh Yadav", player2: "Priyank Rao", score1: null, score2: null, winner: null, status: "upcoming" },
      ],
    },
    {
      name: "Final",
      matches: [
        { id: 7, player1: "TBD", player2: "TBD", score1: null, score2: null, winner: null, status: "upcoming" },
      ],
    },
  ],
};

// -------------------------------------------------------
// Revenue / Attendance Chart Data
// -------------------------------------------------------
export const revenueData = [
  { month: "Oct", revenue: 412000, collection: 390000 },
  { month: "Nov", revenue: 445000, collection: 440000 },
  { month: "Dec", revenue: 398000, collection: 380000 },
  { month: "Jan", revenue: 510000, collection: 498000 },
  { month: "Feb", revenue: 472000, collection: 460000 },
  { month: "Mar", revenue: 538000, collection: 521000 },
];

export const attendanceData = [
  { day: "Mon", count: 182 },
  { day: "Tue", count: 147 },
  { day: "Wed", count: 203 },
  { day: "Thu", count: 165 },
  { day: "Fri", count: 221 },
  { day: "Sat", count: 298 },
  { day: "Sun", count: 256 },
];

export const memberMixData = [
  { plan: "Monthly", value: 38, fill: "#c8e64c" },
  { plan: "Annual", value: 28, fill: "#a8d54a" },
  { plan: "Quarterly", value: 18, fill: "#7dc94a" },
  { plan: "Student", value: 10, fill: "#5cb84a" },
  { plan: "Family", value: 4, fill: "#3aaa4a" },
  { plan: "Day Pass", value: 2, fill: "#1a9a4a" },
];

// -------------------------------------------------------
// Admin Dashboard Summary
// -------------------------------------------------------
export const adminSummary = {
  todayCheckins: 142,
  activeBookings: 38,
  courtsInUse: 11,
  todayRevenue: 24800,
  pendingRenewals: 14,
  pendingActions: 3,
  newEnquiries: 7,
};

// -------------------------------------------------------
// Testimonials
// -------------------------------------------------------
export const testimonials = [
  {
    id: 1,
    name: "Ananya Srivastava",
    sport: "Badminton",
    plan: "Annual",
    quote: "I went from a complete beginner to winning the district under-19 championship in 18 months. The coaches here are exceptional.",
    rating: 5,
    initials: "AS",
    color: "#c8e64c",
  },
  {
    id: 2,
    name: "Mohit Chauhan",
    sport: "Table Tennis",
    plan: "Quarterly",
    quote: "The booking app makes it so easy — I reserve my table the night before and the court is always ready. Zero hassle.",
    rating: 5,
    initials: "MC",
    color: "#a8d54a",
  },
  {
    id: 3,
    name: "Sonali Rawat",
    sport: "Gymnastics",
    plan: "Annual",
    quote: "Sunita ma'am's attention to technique is unmatched. My daughter was selected for the state team after just one year here.",
    rating: 5,
    initials: "SR",
    color: "#c84ca8",
  },
  {
    id: 4,
    name: "Vikas Pandey",
    sport: "Boxing",
    plan: "Monthly",
    quote: "Rajesh sir pushes you exactly as hard as you need. Lost 8 kg and won my first amateur bout in 4 months.",
    rating: 5,
    initials: "VP",
    color: "#e8c84c",
  },
  {
    id: 5,
    name: "Ritika Agarwal",
    sport: "Yoga",
    plan: "Quarterly",
    quote: "The sports recovery yoga classes have completely eliminated the knee pain I've had for years. This place is a game changer.",
    rating: 5,
    initials: "RA",
    color: "#4cb8e8",
  },
];

// -------------------------------------------------------
// Achievements / News
// -------------------------------------------------------
export const achievements = [
  {
    id: 1,
    title: "Arjun Mehta wins National Doubles Gold",
    sport: "Badminton",
    date: "2025-12-15",
    category: "National Achievement",
    description: "Our head badminton coach represented UP and won gold at the National Masters Championships in Delhi.",
  },
  {
    id: 2,
    title: "Academy gymnasts sweep State Meet medals",
    sport: "Gymnastics",
    date: "2026-03-20",
    category: "Competition",
    description: "Five of our athletes placed in the top 3 at the UP State Gymnastics Meet. A historic haul for the academy.",
  },
  {
    id: 3,
    title: "New 25m swimming pool inaugurated",
    sport: "Swimming",
    date: "2025-11-01",
    category: "Infrastructure",
    description: "Our brand-new 8-lane, temperature-controlled pool is now open. Book your first slot on the portal.",
  },
  {
    id: 4,
    title: "Table Tennis team qualifies for Nationals",
    sport: "Table Tennis",
    date: "2026-02-10",
    category: "National Achievement",
    description: "Three of our senior members qualified for the National Table Tennis Championship to be held in Bengaluru.",
  },
];

// -------------------------------------------------------
// Learning Hub Content
// -------------------------------------------------------
export const learningContent = [
  {
    id: "lc1",
    title: "Badminton Footwork Fundamentals",
    sport: "Badminton",
    coach: "Arjun Mehta",
    level: "Beginner",
    type: "video",
    duration: "6:42",
    thumbnail: "#c8e64c",
    views: 842,
    progress: 100,
    description: "Master the 6-point movement pattern that forms the foundation of all court coverage.",
  },
  {
    id: "lc2",
    title: "Overhead Smash Mechanics",
    sport: "Badminton",
    coach: "Arjun Mehta",
    level: "Intermediate",
    type: "video",
    duration: "8:15",
    thumbnail: "#a8d54a",
    views: 621,
    progress: 60,
    description: "Body rotation, arm swing, and wrist snap — all deconstructed frame by frame.",
  },
  {
    id: "lc3",
    title: "Table Tennis Serve Masterclass",
    sport: "Table Tennis",
    coach: "Priya Sharma",
    level: "Intermediate",
    type: "video",
    duration: "7:30",
    thumbnail: "#7dc94a",
    views: 530,
    progress: 0,
    description: "Learn the ghost serve, reverse pendulum, and no-spin variation that will confuse any opponent.",
  },
  {
    id: "lc4",
    title: "Boxing Defence & Head Movement",
    sport: "Boxing",
    coach: "Rajesh Kumar",
    level: "Beginner",
    type: "video",
    duration: "5:50",
    thumbnail: "#e8c84c",
    views: 390,
    progress: 0,
    description: "Slip, bob and weave, and the Philly shell — essential defensive foundations.",
  },
  {
    id: "lc5",
    title: "Athletic Sprint Start Technique",
    sport: "Athletics",
    coach: "Deepak Nair",
    level: "Advanced",
    type: "video",
    duration: "4:20",
    thumbnail: "#e84c4c",
    views: 275,
    progress: 0,
    description: "Block clearance, drive phase, and transition to upright sprinting for 60–100m events.",
  },
  {
    id: "lc6",
    title: "Gymnastics Handstand Progression",
    sport: "Gymnastics",
    coach: "Sunita Verma",
    level: "Beginner",
    type: "video",
    duration: "9:05",
    thumbnail: "#c84ca8",
    views: 448,
    progress: 30,
    description: "Wall kick-up to freestanding handstand — a step-by-step approach for all ages.",
  },
  {
    id: "lc7",
    title: "Sports Recovery Yoga Flow",
    sport: "Yoga",
    coach: "Neha Gupta",
    level: "Beginner",
    type: "video",
    duration: "22:10",
    thumbnail: "#4cb8e8",
    views: 697,
    progress: 80,
    description: "A full-body 20-minute routine specifically designed for athletes to reduce DOMS and prevent injury.",
  },
  {
    id: "lc8",
    title: "Swimming Freestyle Breathing Pattern",
    sport: "Swimming",
    coach: "Arjit Das",
    level: "Intermediate",
    type: "video",
    duration: "6:00",
    thumbnail: "#4c8ce8",
    views: 312,
    progress: 0,
    description: "Bilateral breathing and head-rotation timing for sustained freestyle distance swimming.",
  },
];

// -------------------------------------------------------
// Member Portal — Demo Logged-in Member
// -------------------------------------------------------
export const currentMember = {
  id: "M001",
  name: "Ravi Patel",
  plan: "Annual",
  sport: "Badminton",
  memberSince: "Jan 2024",
  validUntil: "31 Dec 2026",
  daysLeft: 275,
  membershipId: "SSA-2024-0001",
  sessionsThisWeek: 3,
  sessionsThisMonth: 12,
  streak: 7,
  totalSessions: 87,
  referralCode: "RAVI2024",
  referrals: 3,
  badges: [
    { name: "Early Bird", description: "Attended 5 sessions before 7 AM", icon: "🌅" },
    { name: "Iron Will", description: "30-day attendance streak", icon: "💪" },
    { name: "Champion", description: "Won an internal tournament", icon: "🏆" },
    { name: "Referrer", description: "Referred 3 members", icon: "🤝" },
  ],
  upcomingBookings: [
    { id: "b1", court: "Court B1", sport: "Badminton", date: "Today", time: "8:00 – 9:00 AM", coach: null },
    { id: "b2", court: "Court B2", sport: "Badminton", date: "Tomorrow", time: "7:00 – 8:00 AM", coach: null },
    { id: "b3", court: "Coaching", sport: "Badminton", date: "02 Apr", time: "10:00 – 11:00 AM", coach: "Arjun Mehta" },
  ],
  notifications: [
    { id: "n1", type: "info", message: "Court B4 is under maintenance until 5 Apr", time: "1h ago" },
    { id: "n2", type: "event", message: "Spring Badminton Open registration closes in 10 days", time: "3h ago" },
    { id: "n3", type: "coach", message: "Arjun Mehta posted a new technique video", time: "Yesterday" },
    { id: "n4", type: "renewal", message: "Your membership renews on 31 Dec 2026 — 275 days remaining", time: "2d ago" },
  ],
  performanceNotes: [
    { date: "Mar 25", coach: "Arjun Mehta", note: "Footwork has improved significantly. Work on backhand cross-court next.", score: 8 },
    { date: "Mar 18", coach: "Arjun Mehta", note: "Good smash power. Need to improve net kill accuracy — 60% to 80% target.", score: 7 },
    { date: "Mar 11", coach: "Arjun Mehta", note: "Service variety is much better. Keep practising the flick serve deception.", score: 7 },
    { date: "Mar 04", coach: "Arjun Mehta", note: "Good recovery speed. Focus on anticipation — you're reacting instead of reading.", score: 6 },
  ],
};

// -------------------------------------------------------
// Live Activity Ticker
// -------------------------------------------------------
export const liveActivity = [
  "🏸 Court B1 — Active Session",
  "🏓 Table TT4 — Active Session",
  "🥊 Ring BX1 — Coaching in progress",
  "🤸 Gymnastics Hall — Group class",
  "🧘 Studio Y1 — 8 AM Yoga (16 attending)",
  "🏊 Pool — Morning lap swim (12 lanes open)",
  "🏃 Track — Distance training",
  "🏸 Court B2 — Available",
  "🏸 Court B5 — Available",
  "🏓 Table TT2 — Available",
  "📅 Spring Badminton Open — Registration Open",
];

// -------------------------------------------------------
// Payment History
// -------------------------------------------------------
export const paymentHistory = [
  { id: "pay1", date: "2026-01-02", description: "Annual Membership — Renewal", amount: 11999, gst: 2159.82, total: 14158.82, status: "paid", method: "UPI (GPay)", receipt: "INV-2026-001", plan: "Annual" },
  { id: "pay2", date: "2025-12-10", description: "Spring Badminton Open — Entry Fee", amount: 299, gst: 53.82, total: 352.82, status: "paid", method: "Card ****4242", receipt: "INV-2025-088", plan: null },
  { id: "pay3", date: "2025-11-15", description: "1-on-1 Coaching Add-on (4 sessions)", amount: 2000, gst: 360, total: 2360, status: "paid", method: "UPI (PhonePe)", receipt: "INV-2025-071", plan: null },
  { id: "pay4", date: "2025-10-01", description: "State Gymnastics Meet — Entry Fee", amount: 499, gst: 89.82, total: 588.82, status: "paid", method: "Net Banking", receipt: "INV-2025-058", plan: null },
  { id: "pay5", date: "2025-07-18", description: "Annual Swimming Gala — Early Bird", amount: 99, gst: 17.82, total: 116.82, status: "paid", method: "UPI (GPay)", receipt: "INV-2025-042", plan: null },
  { id: "pay6", date: "2026-04-15", description: "Spring Badminton Open — Entry Fee", amount: 299, gst: 53.82, total: 352.82, status: "pending", method: "—", receipt: null, plan: null },
  { id: "pay7", date: "2025-06-01", description: "Premium Locker Rental (3 months)", amount: 750, gst: 135, total: 885, status: "paid", method: "Card ****4242", receipt: "INV-2025-031", plan: null },
];

// -------------------------------------------------------
// Competition History
// -------------------------------------------------------
export const competitionHistory = [
  { id: "comp1", name: "Winter Badminton League", sport: "Badminton", type: "Internal", date: "2026-01-20", result: "Won", position: 1, category: "Men's Singles", prize: "₹2,000 + Trophy", score: "21-14, 21-18", opponent: "Karan Dubey", status: "completed", color: "#c8e64c" },
  { id: "comp2", name: "District Badminton Championship", sport: "Badminton", type: "District", date: "2025-11-05", result: "Lost", position: 3, category: "Men's Singles", prize: "Bronze Medal", score: "15-21, 21-18, 14-21", opponent: "Suresh Yadav", status: "completed", color: "#c8e64c" },
  { id: "comp3", name: "TSH Monthly Open — Oct", sport: "Badminton", type: "Internal", date: "2025-10-12", result: "Won", position: 1, category: "Men's Doubles", prize: "₹1,000", score: "21-11, 21-15", opponent: "Amit Kumar / Nikhil Ahuja", status: "completed", color: "#c8e64c" },
  { id: "comp4", name: "State Masters Badminton", sport: "Badminton", type: "State", date: "2025-08-22", result: "Lost", position: 8, category: "Men's Singles (U30)", prize: "—", score: "14-21, 10-21", opponent: "Vikram Tiwari", status: "completed", color: "#c8e64c" },
  { id: "comp5", name: "Spring Badminton Open", sport: "Badminton", type: "Open", date: "2026-04-15", result: "Upcoming", position: null, category: "Men's Singles", prize: "₹10,000 + Trophy", score: null, opponent: null, status: "upcoming", color: "#c8e64c" },
  { id: "comp6", name: "TSH Summer Slam", sport: "Badminton", type: "Internal", date: "2025-06-07", result: "Won", position: 2, category: "Mixed Doubles", prize: "₹1,500", score: "21-18, 18-21, 21-19", opponent: "Deepak Sharma / Pooja Gupta", status: "completed", color: "#c8e64c" },
];

// -------------------------------------------------------
// Skill Ratings
// -------------------------------------------------------
export const skillRatings: Record<string, number> = {
  Footwork: 8,
  "Smash Power": 7,
  "Net Play": 7,
  "Serve Variety": 8,
  "Backhand Drive": 6,
  Endurance: 9,
  Agility: 8,
  "Court Vision": 7,
};

// -------------------------------------------------------
// Training Load
// -------------------------------------------------------
export const trainingLoad = [
  { week: "W1 Feb", hours: 5, recommended: 8 },
  { week: "W2 Feb", hours: 7, recommended: 8 },
  { week: "W3 Feb", hours: 8, recommended: 8 },
  { week: "W4 Feb", hours: 10, recommended: 8 },
  { week: "W1 Mar", hours: 9, recommended: 8 },
  { week: "W2 Mar", hours: 11, recommended: 8 },
  { week: "W3 Mar", hours: 10, recommended: 8 },
  { week: "W4 Mar", hours: 9, recommended: 8 },
];

// -------------------------------------------------------
// Personal Bests
// -------------------------------------------------------
export const personalBests = [
  { label: "Fastest Smash", value: "342 km/h", date: "Mar 2026", icon: "⚡" },
  { label: "Longest Rally", value: "47 shots", date: "Feb 2026", icon: "🏸" },
  { label: "Sessions / Month", value: "20", date: "Mar 2026", icon: "📅" },
  { label: "Longest Streak", value: "30 days", date: "Dec 2025", icon: "🔥" },
];

// -------------------------------------------------------
// Training Programs
// -------------------------------------------------------
export const trainingPrograms = [
  {
    id: "prog1", name: "Badminton Foundation", sport: "Badminton", coach: "Arjun Mehta", coachInitials: "AM",
    level: "Beginner", category: "Foundation", duration: 8, sessionsPerWeek: 3,
    schedule: "Mon / Wed / Fri · 7:00–8:00 AM", price: 3999, enrolled: 18, maxEnrolled: 20, color: "#c8e64c",
    description: "Master the fundamentals — grip, stance, footwork, and basic strokes. Perfect for absolute beginners who want to learn badminton the right way.",
    curriculum: ["Week 1–2: Grip, stance & basic court movement", "Week 3–4: Clears, drops & footwork patterns", "Week 5–6: Net shots & service techniques", "Week 7–8: Match play & game strategy"],
    tags: ["Beginner", "8 Weeks"],
  },
  {
    id: "prog2", name: "Competition Prep — Badminton", sport: "Badminton", coach: "Arjun Mehta", coachInitials: "AM",
    level: "Advanced", category: "Competition", duration: 12, sessionsPerWeek: 5,
    schedule: "Mon–Fri · 6:00–7:30 AM", price: 8999, enrolled: 8, maxEnrolled: 10, color: "#c8e64c",
    description: "Intensive competition-focused training for athletes targeting district and state-level tournaments. Includes match analysis, video review, and tactical sessions.",
    curriculum: ["Week 1–3: Physical conditioning & agility ladders", "Week 4–6: Advanced shot mechanics & deception", "Week 7–9: Tactical play & opponent analysis", "Week 10–12: Match simulation & mental preparation"],
    tags: ["Advanced", "12 Weeks", "Tournament"],
  },
  {
    id: "prog3", name: "Boxing Fitness Camp", sport: "Boxing", coach: "Rajesh Kumar", coachInitials: "RK",
    level: "Beginner", category: "Fitness", duration: 6, sessionsPerWeek: 4,
    schedule: "Tue / Thu / Sat / Sun · 6:00–7:00 AM", price: 2999, enrolled: 14, maxEnrolled: 20, color: "#e8c84c",
    description: "Get fit through boxing! Designed for non-competitive fitness enthusiasts. Includes pad work, bag training, and conditioning circuits.",
    curriculum: ["Week 1–2: Stance, guard & basic punches", "Week 3–4: Combinations & footwork", "Week 5–6: Pad work, bag drills & fitness circuits"],
    tags: ["Beginner", "Fitness", "6 Weeks"],
  },
  {
    id: "prog4", name: "Summer Gymnastics Camp", sport: "Gymnastics", coach: "Sunita Verma", coachInitials: "SV",
    level: "Beginner", category: "Camp", duration: 4, sessionsPerWeek: 5,
    schedule: "Mon–Fri · 8:00–10:00 AM", price: 4999, enrolled: 22, maxEnrolled: 24, color: "#c84ca8",
    description: "A 4-week intensive summer camp for young athletes (ages 6–16) to discover gymnastics. Covers floor, vault, and basic bar work.",
    curriculum: ["Week 1: Body shapes, rolls & cartwheels", "Week 2: Handstands, bridges & round-offs", "Week 3: Vault run-up & forward handspring", "Week 4: Short routine performance & showcase"],
    tags: ["Beginner", "Camp", "Youth"],
  },
  {
    id: "prog5", name: "Sports Recovery Yoga", sport: "Yoga", coach: "Neha Gupta", coachInitials: "NG",
    level: "All Levels", category: "Wellness", duration: 6, sessionsPerWeek: 3,
    schedule: "Mon / Wed / Fri · 7:30–8:30 PM", price: 1999, enrolled: 16, maxEnrolled: 30, color: "#4cb8e8",
    description: "Designed for active athletes — reduces injury risk, improves flexibility, and accelerates muscle recovery through targeted yoga flows.",
    curriculum: ["Week 1–2: Hip flexors, hamstrings & lower back", "Week 3–4: Shoulder, chest & spinal mobility", "Week 5–6: Full-body flow & breathwork"],
    tags: ["All Levels", "Wellness", "Recovery"],
  },
  {
    id: "prog6", name: "Table Tennis — Club Level", sport: "Table Tennis", coach: "Priya Sharma", coachInitials: "PS",
    level: "Intermediate", category: "Competition", duration: 8, sessionsPerWeek: 4,
    schedule: "Tue / Thu / Sat / Sun · 7:00–8:00 AM", price: 5499, enrolled: 10, maxEnrolled: 16, color: "#a8d54a",
    description: "Elevate from casual play to club-level competition. Covers advanced serve mechanics, loop drives, and match strategy.",
    curriculum: ["Week 1–2: Advanced serves (ghost, reverse pendulum)", "Week 3–4: Loop drive & topspin techniques", "Week 5–6: Penhold vs shakehand tactics", "Week 7–8: Match play & tournament simulation"],
    tags: ["Intermediate", "8 Weeks"],
  },
];

// -------------------------------------------------------
// Enrolled Programs
// -------------------------------------------------------
export const enrolledPrograms = [
  {
    programId: "prog1", enrolledDate: "2026-02-01", progress: 75, nextSession: "Tomorrow · 7:00 AM",
    completedWeeks: 6, totalWeeks: 8, checkIns: 16,
    curriculumStatus: [
      { week: "Week 1–2: Grip, stance & basic court movement", done: true },
      { week: "Week 3–4: Clears, drops & footwork patterns", done: true },
      { week: "Week 5–6: Net shots & service techniques", done: true },
      { week: "Week 7–8: Match play & game strategy", done: false },
    ],
  },
  {
    programId: "prog5", enrolledDate: "2026-03-15", progress: 33, nextSession: "Today · 7:30 PM",
    completedWeeks: 2, totalWeeks: 6, checkIns: 6,
    curriculumStatus: [
      { week: "Week 1–2: Hip flexors, hamstrings & lower back", done: true },
      { week: "Week 3–4: Shoulder, chest & spinal mobility", done: false },
      { week: "Week 5–6: Full-body flow & breathwork", done: false },
    ],
  },
];

// -------------------------------------------------------
// Learning Paths
// -------------------------------------------------------
export const learningPaths = [
  {
    id: "lp1", title: "Badminton: Zero to Club Player", sport: "Badminton",
    description: "A structured 5-video journey from complete beginner to competitive club-level player.",
    totalVideos: 5, completedVideos: 2, videoIds: ["lc1", "lc2", "lc3", "lc4", "lc5"],
    color: "#c8e64c", emoji: "🏸", estimatedHours: "4.5 hrs",
  },
  {
    id: "lp2", title: "Athlete Recovery Essentials", sport: "Mixed",
    description: "Combine yoga, breathing, and mental conditioning for peak recovery.",
    totalVideos: 3, completedVideos: 1, videoIds: ["lc7", "lc5", "lc6"],
    color: "#4cb8e8", emoji: "🧘", estimatedHours: "2.0 hrs",
  },
  {
    id: "lp3", title: "Combat Sports Fundamentals", sport: "Boxing",
    description: "Master the mental and physical foundations of combat sports.",
    totalVideos: 4, completedVideos: 0, videoIds: ["lc4", "lc1", "lc3", "lc8"],
    color: "#e8c84c", emoji: "🥊", estimatedHours: "3.2 hrs",
  },
];

// -------------------------------------------------------
// Booking Slot Times
// -------------------------------------------------------
export const BOOKING_SLOT_TIMES = ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "17:00", "18:00", "19:00"];


// -------------------------------------------------------
// Admin: Billing Transactions
// -------------------------------------------------------
export const adminTransactions = [
  { id: "txn001", memberId: "SSA-2024-0001", memberName: "Ravi Patel", type: "Membership", plan: "Annual", amount: 11999, gst: 2159.82, total: 14158.82, status: "paid", date: "2026-01-02", method: "UPI (GPay)" },
  { id: "txn002", memberId: "SSA-2024-0002", memberName: "Anjali Singh", type: "Membership", plan: "Quarterly", amount: 3499, gst: 629.82, total: 4128.82, status: "paid", date: "2026-01-05", method: "Card" },
  { id: "txn003", memberId: "SSA-2024-0003", memberName: "Vikram Sharma", type: "Competition", plan: null, amount: 300, gst: 54, total: 354, status: "paid", date: "2026-01-10", method: "UPI (PhonePe)" },
  { id: "txn004", memberId: "SSA-2024-0004", memberName: "Priya Nair", type: "Coaching", plan: null, amount: 2000, gst: 360, total: 2360, status: "paid", date: "2026-01-15", method: "Net Banking" },
  { id: "txn005", memberId: "SSA-2024-0005", memberName: "Arjun Mehta", type: "Membership", plan: "Monthly", amount: 1299, gst: 233.82, total: 1532.82, status: "pending", date: "2026-02-01", method: "—" },
  { id: "txn006", memberId: "SSA-2024-0006", memberName: "Sunita Verma", type: "Membership", plan: "Annual", amount: 11999, gst: 2159.82, total: 14158.82, status: "paid", date: "2026-02-03", method: "UPI (Paytm)" },
  { id: "txn007", memberId: "SSA-2024-0007", memberName: "Rohit Gupta", type: "Competition", plan: null, amount: 500, gst: 90, total: 590, status: "failed", date: "2026-02-10", method: "Card" },
  { id: "txn008", memberId: "SSA-2024-0008", memberName: "Neha Kapoor", type: "Membership", plan: "Quarterly", amount: 3499, gst: 629.82, total: 4128.82, status: "paid", date: "2026-02-15", method: "Net Banking" },
  { id: "txn009", memberId: "SSA-2024-0001", memberName: "Ravi Patel", type: "Coaching", plan: null, amount: 2000, gst: 360, total: 2360, status: "paid", date: "2026-03-01", method: "UPI (GPay)" },
  { id: "txn010", memberId: "SSA-2024-0009", memberName: "Deepak Joshi", type: "Membership", plan: "Annual", amount: 11999, gst: 2159.82, total: 14158.82, status: "paid", date: "2026-03-05", method: "UPI (BHIM)" },
  { id: "txn011", memberId: "SSA-2024-0010", memberName: "Kavya Reddy", type: "Competition", plan: null, amount: 300, gst: 54, total: 354, status: "pending", date: "2026-03-12", method: "—" },
  { id: "txn012", memberId: "SSA-2024-0011", memberName: "Aditya Rao", type: "Membership", plan: "Monthly", amount: 1299, gst: 233.82, total: 1532.82, status: "paid", date: "2026-03-18", method: "Card" },
];

export const adminRevenueByType = [
  { type: "Membership Fees", amount: 187450, color: "#c8e64c" },
  { type: "Coaching Add-ons", amount: 43200, color: "#4cb8e8" },
  { type: "Competition Fees", amount: 28750, color: "#e8c84c" },
  { type: "Training Programs", amount: 61800, color: "#a8d54a" },
  { type: "Other", amount: 8200, color: "#e87a4c" },
];

export const monthlyForecast = [
  { month: "Jan", actual: 148000, forecast: 140000 },
  { month: "Feb", actual: 162000, forecast: 155000 },
  { month: "Mar", actual: 189000, forecast: 175000 },
  { month: "Apr", actual: null, forecast: 195000 },
  { month: "May", actual: null, forecast: 210000 },
  { month: "Jun", actual: null, forecast: 220000 },
];

// -------------------------------------------------------
// Admin: Sport-wise Stats
// -------------------------------------------------------
export const sportStats = [
  { sport: "Badminton", emoji: "🏸", members: 1240, activeThisMonth: 890, revenue: 68400, courtUtilization: 87, coach: "Arjun Mehta", sessions: 342, color: "#c8e64c" },
  { sport: "Table Tennis", emoji: "🏓", members: 820, activeThisMonth: 610, revenue: 42800, courtUtilization: 74, coach: "Priya Sharma", sessions: 228, color: "#4cb8e8" },
  { sport: "Boxing", emoji: "🥊", members: 540, activeThisMonth: 390, revenue: 38200, courtUtilization: 66, coach: "Vikram Singh", sessions: 185, color: "#e8c84c" },
  { sport: "Gymnastics", emoji: "🤸", members: 380, activeThisMonth: 260, revenue: 29600, courtUtilization: 58, coach: "Sunita Rao", sessions: 142, color: "#e87a4c" },
  { sport: "Wrestling", emoji: "🤼", members: 290, activeThisMonth: 200, revenue: 22100, courtUtilization: 52, coach: "Rohit Gupta", sessions: 108, color: "#a87ae8" },
  { sport: "Yoga", emoji: "🧘", members: 670, activeThisMonth: 520, revenue: 31400, courtUtilization: 81, coach: "Kavya Nair", sessions: 264, color: "#4ce8b8" },
  { sport: "Athletics", emoji: "🏃", members: 450, activeThisMonth: 320, revenue: 26700, courtUtilization: 61, coach: "Deepak Joshi", sessions: 167, color: "#4cb8e8" },
  { sport: "Swimming", emoji: "🏊", members: 620, activeThisMonth: 480, revenue: 44200, courtUtilization: 78, coach: "Aditya Kumar", sessions: 218, color: "#7ae8e8" },
];

// -------------------------------------------------------
// Admin: Competitions & Events (Admin view)
// -------------------------------------------------------
export const adminEvents = [
  { id: "ev001", name: "Spring Badminton Open 2026", sport: "Badminton", type: "Tournament", date: "2026-04-20", status: "open", participants: 48, maxParticipants: 64, entryFee: 300, prizePool: 25000, totalCollected: 14400, format: "Knockout", color: "#c8e64c" },
  { id: "ev002", name: "State Gymnastics Camp", sport: "Gymnastics", type: "Camp", date: "2026-04-28", status: "open", participants: 22, maxParticipants: 30, entryFee: 0, prizePool: 0, totalCollected: 0, format: "Camp", color: "#e87a4c" },
  { id: "ev003", name: "District Table Tennis Cup", sport: "Table Tennis", type: "Tournament", date: "2026-05-10", status: "draft", participants: 0, maxParticipants: 32, entryFee: 400, prizePool: 15000, totalCollected: 0, format: "Round Robin + Knockout", color: "#4cb8e8" },
  { id: "ev004", name: "Annual Swimming Gala 2025", sport: "Swimming", type: "Gala", date: "2025-12-14", status: "completed", participants: 85, maxParticipants: 100, entryFee: 100, prizePool: 10000, totalCollected: 8500, format: "Time Trial", color: "#7ae8e8" },
  { id: "ev005", name: "Boxing Invitational", sport: "Boxing", type: "Invitational", date: "2025-11-08", status: "completed", participants: 24, maxParticipants: 24, entryFee: 500, prizePool: 20000, totalCollected: 12000, format: "Bracket", color: "#e8c84c" },
];

// -------------------------------------------------------
// Admin: Marketing / CRM
// -------------------------------------------------------
export const campaigns = [
  { id: "c001", name: "March Renewal Drive", type: "WhatsApp", audience: "Expiring Members", sent: 38, opened: 31, converted: 18, date: "2026-03-01", status: "sent" },
  { id: "c002", name: "Summer Camp Promo", type: "Email", audience: "All Active Members", sent: 1240, opened: 892, converted: 145, date: "2026-03-10", status: "sent" },
  { id: "c003", name: "Badminton Open Registration", type: "WhatsApp", audience: "Badminton Members", sent: 890, opened: 720, converted: 48, date: "2026-03-18", status: "sent" },
  { id: "c004", name: "New Member Welcome", type: "Email", audience: "New Members (30 days)", sent: 52, opened: 49, converted: 52, date: "2026-04-01", status: "sent" },
  { id: "c005", name: "April Activation Push", type: "WhatsApp", audience: "Inactive 30+ days", sent: 0, opened: 0, converted: 0, date: "2026-04-15", status: "scheduled" },
];

export const referralLeaderboard = [
  { name: "Ravi Patel", referrals: 7, rewarded: 5, pending: 2, avatar: "RP" },
  { name: "Anjali Singh", referrals: 5, rewarded: 4, pending: 1, avatar: "AS" },
  { name: "Vikram Sharma", referrals: 4, rewarded: 4, pending: 0, avatar: "VS" },
  { name: "Priya Nair", referrals: 3, rewarded: 2, pending: 1, avatar: "PN" },
  { name: "Kavya Reddy", referrals: 3, rewarded: 3, pending: 0, avatar: "KR" },
];

export const conversionFunnel = [
  { stage: "Enquiries", count: 340 },
  { stage: "Free Trial", count: 186 },
  { stage: "Paid (Monthly)", count: 94 },
  { stage: "Upgraded (Annual)", count: 61 },
];

export const discountCodes = [
  { code: "SUMMER25", discount: 25, type: "percent", sport: "All", used: 34, cap: 100, expiry: "2026-05-31", active: true },
  { code: "BOXING500", discount: 500, type: "flat", sport: "Boxing", used: 12, cap: 20, expiry: "2026-04-30", active: true },
  { code: "EARLYBIRD", discount: 15, type: "percent", sport: "All", used: 100, cap: 100, expiry: "2026-03-31", active: false },
  { code: "YOGA200", discount: 200, type: "flat", sport: "Yoga", used: 8, cap: 50, expiry: "2026-06-30", active: true },
  { code: "REFER10", discount: 10, type: "percent", sport: "All", used: 67, cap: 200, expiry: "2026-12-31", active: true },
];

// -------------------------------------------------------
// Admin: Pricing Engine
// -------------------------------------------------------
export const pricingEngine = {
  membershipPlans: [
    { id: "monthly", name: "Monthly", price: 1299, duration: 30, gst: 18, features: ["Unlimited session booking", "Locker access", "Basic coach guidance"], active: true },
    { id: "quarterly", name: "Quarterly", price: 3499, duration: 90, gst: 18, features: ["Unlimited session booking", "Locker access", "2 coaching sessions"], active: true },
    { id: "annual", name: "Annual", price: 11999, duration: 365, gst: 18, features: ["Unlimited session booking", "Premium locker", "Monthly 1-on-1 coaching", "Priority booking", "Free competition entry x2"], active: true },
  ],
  sessionFees: [
    { sport: "Badminton", perSession: 80, bulkPack5: 350, bulkPack10: 650 },
    { sport: "Table Tennis", perSession: 60, bulkPack5: 270, bulkPack10: 500 },
    { sport: "Boxing", perSession: 120, bulkPack5: 550, bulkPack10: 1000 },
    { sport: "Gymnastics", perSession: 150, bulkPack5: 680, bulkPack10: 1250 },
    { sport: "Wrestling", perSession: 100, bulkPack5: 450, bulkPack10: 850 },
    { sport: "Yoga", perSession: 80, bulkPack5: 350, bulkPack10: 650 },
    { sport: "Athletics", perSession: 90, bulkPack5: 400, bulkPack10: 750 },
    { sport: "Swimming", perSession: 100, bulkPack5: 450, bulkPack10: 850 },
  ],
  coachingPackages: [
    { name: "Starter Pack", sessions: 4, price: 1800, perSession: 450 },
    { name: "Performance Pack", sessions: 8, price: 3200, perSession: 400 },
    { name: "Elite Pack", sessions: 16, price: 5600, perSession: 350 },
  ],
};

// -------------------------------------------------------
// Admin: Procurement & Inventory
// -------------------------------------------------------
export const inventoryItems = [
  { id: "inv001", name: "Yonex Shuttlecocks (Tube)", category: "Consumable", sport: "Badminton", quantity: 24, threshold: 20, condition: "New", lastRestocked: "2026-02-15", unitCost: 350, vendor: "Sports World India" },
  { id: "inv002", name: "Badminton Rackets", category: "Equipment", sport: "Badminton", quantity: 18, threshold: 10, condition: "Good", lastRestocked: "2025-12-01", unitCost: 1200, vendor: "Sports World India" },
  { id: "inv003", name: "Table Tennis Balls (Box)", category: "Consumable", sport: "Table Tennis", quantity: 8, threshold: 10, condition: "Good", lastRestocked: "2026-01-20", unitCost: 280, vendor: "Li-Ning Distributors" },
  { id: "inv004", name: "TT Rackets", category: "Equipment", sport: "Table Tennis", quantity: 14, threshold: 8, condition: "Good", lastRestocked: "2025-11-15", unitCost: 800, vendor: "Li-Ning Distributors" },
  { id: "inv005", name: "Boxing Gloves (Pairs)", category: "Equipment", sport: "Boxing", quantity: 16, threshold: 12, condition: "Fair", lastRestocked: "2025-09-01", unitCost: 1800, vendor: "Everlast India" },
  { id: "inv006", name: "Boxing Hand Wraps", category: "Consumable", sport: "Boxing", quantity: 5, threshold: 20, condition: "Fair", lastRestocked: "2025-10-10", unitCost: 200, vendor: "Everlast India" },
  { id: "inv007", name: "Gymnastics Mats (Large)", category: "Equipment", sport: "Gymnastics", quantity: 6, threshold: 4, condition: "Good", lastRestocked: "2025-08-20", unitCost: 12000, vendor: "Nissen Sports" },
  { id: "inv008", name: "Yoga Mats", category: "Equipment", sport: "Yoga", quantity: 32, threshold: 25, condition: "Good", lastRestocked: "2025-12-15", unitCost: 600, vendor: "Decathlon India" },
  { id: "inv009", name: "Swimming Goggles", category: "Equipment", sport: "Swimming", quantity: 18, threshold: 15, condition: "Good", lastRestocked: "2026-01-05", unitCost: 450, vendor: "Arena Sports" },
  { id: "inv010", name: "Kickboards", category: "Equipment", sport: "Swimming", quantity: 12, threshold: 10, condition: "Fair", lastRestocked: "2025-07-10", unitCost: 350, vendor: "Arena Sports" },
];

export const purchaseOrders = [
  { id: "po001", item: "Yonex Shuttlecocks ×48", vendor: "Sports World India", amount: 16800, status: "delivered", date: "2026-02-15", urgency: "Normal" },
  { id: "po002", item: "Boxing Gloves ×10 pairs", vendor: "Everlast India", amount: 18000, status: "pending", date: "2026-03-25", urgency: "High" },
  { id: "po003", item: "Swimming Kickboards ×10", vendor: "Arena Sports", amount: 3500, status: "delivered", date: "2026-01-10", urgency: "Normal" },
  { id: "po004", item: "Yoga Mats ×20", vendor: "Decathlon India", amount: 12000, status: "delivered", date: "2025-12-12", urgency: "Normal" },
  { id: "po005", item: "Boxing Hand Wraps ×30", vendor: "Everlast India", amount: 6000, status: "ordered", date: "2026-04-08", urgency: "High" },
];

// -------------------------------------------------------
// Admin: Staff Management
// -------------------------------------------------------
export const staffMembers = [
  { id: "s001", name: "Arjun Mehta", role: "Head Coach", sport: "Badminton", avatar: "AM", phone: "+91-98001-11001", email: "arjun@tsh.com", salary: 55000, status: "active", joined: "2020-06-01", sessionsThisMonth: 48, rating: 4.9, leaveBalance: 12, attendance: [true, true, false, true, true, true, false, true, true, true, true, true] },
  { id: "s002", name: "Priya Sharma", role: "Sports Coach", sport: "Table Tennis", avatar: "PS", phone: "+91-98001-11002", email: "priya@tsh.com", salary: 42000, status: "active", joined: "2021-03-15", sessionsThisMonth: 36, rating: 4.7, leaveBalance: 8, attendance: [true, true, true, true, false, true, true, true, false, true, true, true] },
  { id: "s003", name: "Vikram Singh", role: "Sports Coach", sport: "Boxing", avatar: "VS", phone: "+91-98001-11003", email: "vikram@tsh.com", salary: 48000, status: "active", joined: "2019-09-01", sessionsThisMonth: 42, rating: 4.8, leaveBalance: 6, attendance: [true, false, true, true, true, true, true, true, true, true, false, true] },
  { id: "s004", name: "Sunita Rao", role: "Sports Coach", sport: "Gymnastics", avatar: "SR", phone: "+91-98001-11004", email: "sunita@tsh.com", salary: 45000, status: "active", joined: "2022-01-10", sessionsThisMonth: 30, rating: 4.6, leaveBalance: 14, attendance: [true, true, true, false, true, true, true, true, true, false, true, true] },
  { id: "s005", name: "Kavya Nair", role: "Wellness Coach", sport: "Yoga", avatar: "KN", phone: "+91-98001-11005", email: "kavya@tsh.com", salary: 38000, status: "active", joined: "2022-07-01", sessionsThisMonth: 52, rating: 4.9, leaveBalance: 10, attendance: [true, true, true, true, true, false, true, true, true, true, true, false] },
  { id: "s006", name: "Deepak Joshi", role: "Athletics Coach", sport: "Athletics", avatar: "DJ", phone: "+91-98001-11006", email: "deepak@tsh.com", salary: 40000, status: "on-leave", joined: "2021-11-20", sessionsThisMonth: 18, rating: 4.5, leaveBalance: 3, attendance: [true, true, false, false, false, false, true, true, false, false, false, false] },
  { id: "s007", name: "Radhika Iyer", role: "Front Desk Manager", sport: "Admin", avatar: "RI", phone: "+91-98001-11007", email: "radhika@tsh.com", salary: 32000, status: "active", joined: "2023-02-01", sessionsThisMonth: 0, rating: 4.8, leaveBalance: 9, attendance: [true, true, true, true, true, true, false, true, true, true, true, true] },
  { id: "s008", name: "Arun Kumar", role: "Facility Manager", sport: "Admin", avatar: "AK", phone: "+91-98001-11008", email: "arun@tsh.com", salary: 35000, status: "active", joined: "2020-03-01", sessionsThisMonth: 0, rating: 4.4, leaveBalance: 7, attendance: [true, true, true, true, false, true, true, false, true, true, true, true] },
];

export const leaveRequests = [
  { id: "lr001", staffName: "Arjun Mehta", avatar: "AM", type: "Sick Leave", from: "2026-04-15", to: "2026-04-16", days: 2, status: "pending", reason: "Fever" },
  { id: "lr002", staffName: "Priya Sharma", avatar: "PS", type: "Casual Leave", from: "2026-04-22", to: "2026-04-22", days: 1, status: "approved", reason: "Personal work" },
  { id: "lr003", staffName: "Deepak Joshi", avatar: "DJ", type: "Medical Leave", from: "2026-04-05", to: "2026-04-14", days: 10, status: "approved", reason: "Knee surgery recovery" },
  { id: "lr004", staffName: "Radhika Iyer", avatar: "RI", type: "Casual Leave", from: "2026-04-28", to: "2026-04-28", days: 1, status: "pending", reason: "Family function" },
];
