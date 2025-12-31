
export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  description?: string;
  completed: boolean;
}

export interface TrackingData {
  id: string;
  origin: string;
  destination: string;
  currentLocation: string;
  status: 'Pending' | 'In Transit' | 'Delivered' | 'Customs' | 'Cancelled';
  expectedDelivery: string;
  timeline: TrackingEvent[];
  route?: [number, number][]; // Array of [lat, lng]
}

// Kathmandu -> Pokhara Route (Hyper-Clean Coordinates to prevent branching)
// Points are selected to be clearly ON the Prithvi Highway, away from junction confusion.
const KtmToPokharaRoute: [number, number][] = [
    [27.7013, 85.1764], // Nagdhunga Checkpost (Start of Highway)
    [27.7225, 85.1450], // Khanikhola (Well past Naubise junction)
    [27.8093, 84.9722], // Galchhi (On the main highway strip)
    [27.8210, 84.8480], // Gajuri (Main road)
    [27.8420, 84.6450], // Kurintar (Near Cable Car)
    [27.8596, 84.5574], // Muglin (North of the bridge, firmly on Pokhara road)
    [27.9370, 84.4170], // Dumre
    [28.0870, 84.1500], // Damauli
    [28.2096, 83.9856], // Pokhara (End)
];

// Guangzhou -> Kathmandu (Cleaned up)
const ChinaToKtmRoute: [number, number][] = [
  [23.1291, 113.2644], // Guangzhou
  [22.8170, 108.3665], // Nanning
  [25.0376, 102.7103], // Kunming
  [29.6520, 91.1721],  // Lhasa
  [28.8500, 85.5500],  // Kyirong (Border)
  [28.1300, 85.2800],  // Dhunche
  [27.9200, 85.1500],  // Bidur
  [27.7172, 85.3240],  // Kathmandu
];

export const TRACKING_DB: Record<string, TrackingData> = {
  "MCN-882190": {
    id: "MCN-882190",
    origin: "Kathmandu",
    destination: "Pokhara",
    currentLocation: "Muglin",
    status: "In Transit",
    expectedDelivery: "Jan 05, 2026",
    route: KtmToPokharaRoute,
    timeline: [
      {
        status: "In Transit",
        location: "Muglin Highway",
        timestamp: "Just Now",
        description: "Driver is taking a break.",
        completed: false
      },
      {
        status: "Departed",
        location: "Kathmandu Sorting Center",
        timestamp: "Dec 30, 2025 - 08:00 AM",
        description: "Package has left the facility.",
        completed: true
      },
      {
        status: "Picked Up",
        location: "Seller Warehouse, Thamel",
        timestamp: "Dec 29, 2025 - 04:30 PM",
        description: "Courier has picked up the package.",
        completed: true
      },
      {
        status: "Order Placed",
        location: "Online",
        timestamp: "Dec 29, 2025 - 02:00 PM",
        description: "Order confirmed by seller.",
        completed: true
      }
    ]
  },
  "MCN-CHINA-01": {
    id: "MCN-CHINA-01",
    origin: "Guangzhou, China",
    destination: "Kathmandu, Nepal",
    currentLocation: "Tibetan Plateau",
    status: "In Transit",
    expectedDelivery: "Jan 15, 2026",
    route: ChinaToKtmRoute,
    timeline: [
        {
            status: "In Transit",
            location: "G318 Highway, Tibet",
            timestamp: "Just Now",
            description: "Truck en route to Kyirong Border.",
            completed: false
        },
        {
            status: "Departed",
            location: "Chengdu Logistics Hub",
            timestamp: "Dec 28, 2025 - 08:00 AM",
            description: "Consolidated on Truck #8892.",
            completed: true
        },
        {
            status: "Departed",
            location: "Guangzhou Warehouse",
            timestamp: "Dec 25, 2025 - 06:00 AM",
            description: "Line haul started.",
            completed: true
        },
        {
            status: "Order Processed",
            location: "Guangzhou",
            timestamp: "Dec 24, 2025 - 02:00 PM",
            description: "Ready for dispatch.",
            completed: true
        }
    ]
  },
  "DELIVERED-123": {
      id: "DELIVERED-123",
      origin: "Bhaktapur",
      destination: "Lalitpur",
      currentLocation: "Lalitpur (Delivered)",
      status: "Delivered",
      expectedDelivery: "Dec 28, 2025",
      timeline: [
          {
              status: "Delivered",
              location: "Customer Doorstep",
              timestamp: "Dec 28, 2025 - 01:00 PM",
              description: "Package handed to receptionist.",
              completed: true
          },
          {
              status: "Out for Delivery",
              location: "Lalitpur Hub",
              timestamp: "Dec 28, 2025 - 09:00 AM",
              description: "Rider assigned: Ram Bahadur.",
              completed: true
          }
      ]
  }
};
