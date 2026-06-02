// Customer Intelligence Database - Mock Data

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  memberSince: string;
  membershipTier: "VIP" | "Gold" | "Silver" | "Bronze" | "Non-member";
  pointsBalance: number;
  totalOrders: number;
  totalSpend: number;
  averageOrderValue: number;
  clv: number;
  lastPurchaseDate: string;
  rfmScore: {
    recency: number; // 1-5
    frequency: number; // 1-5
    monetary: number; // 1-5
    segment: string;
  };
  status: "Active" | "At Risk" | "Churned" | "New";
  birthday: string;
  preferredCategories: string[];
}

export interface CustomerOrder {
  orderId: string;
  customerId: string;
  date: string;
  items: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  discount: number;
  discountCode?: string;
  total: number;
  status: "Completed" | "Processing" | "Refunded";
}

export interface CustomerJourneyEvent {
  id: string;
  customerId: string;
  timestamp: string;
  type: "ad_click" | "page_view" | "cart_add" | "purchase" | "discount_used" | "tier_upgrade";
  details: {
    source?: string; // Meta, Google, TikTok, Direct
    page?: string;
    product?: string;
    campaign?: string;
    discountCode?: string;
    fromTier?: string;
    toTier?: string;
  };
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  issueType: "Order Issue" | "Product Question" | "Shipping Delay" | "Return Request" | "Technical Issue" | "General Inquiry";
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Waiting on Customer" | "Resolved" | "Closed";
  createdDate: string;
  resolvedDate?: string;
  assignedTo: string;
  description: string;
  resolution?: string;
  notes: string[];
  tags: string[];
}

export interface RFMSegment {
  name: string;
  description: string;
  logic: string;
  color: string;
  count: number;
}

// RFM Segment Definitions
export const rfmSegments: RFMSegment[] = [
  {
    name: "Champions",
    description: "Your best customers - recent, frequent, high-value purchasers",
    logic: "R: 4-5, F: 4-5, M: 4-5",
    color: "var(--green)",
    count: 3856
  },
  {
    name: "Loyal Customers",
    description: "Consistent shoppers with good spending habits",
    logic: "R: 3-5, F: 3-5, M: 3-4",
    color: "var(--green-mid)",
    count: 8942
  },
  {
    name: "Potential Loyalists",
    description: "Recent customers with potential to become loyal",
    logic: "R: 4-5, F: 1-3, M: 1-3",
    color: "var(--buff-dark)",
    count: 12458
  },
  {
    name: "New Customers",
    description: "First-time buyers in last 90 days",
    logic: "R: 4-5, F: 1, M: 1-2",
    color: "var(--pink)",
    count: 15624
  },
  {
    name: "At Risk",
    description: "Previously engaged customers who haven't purchased recently",
    logic: "R: 1-2, F: 3-4, M: 3-4",
    color: "var(--terra)",
    count: 9834
  },
  {
    name: "Can't Lose Them",
    description: "High-value customers at risk of churning",
    logic: "R: 1-2, F: 4-5, M: 4-5",
    color: "var(--terra)",
    count: 2156
  },
  {
    name: "Hibernating",
    description: "Long time since last purchase, low engagement",
    logic: "R: 1-2, F: 1-2, M: 1-3",
    color: "var(--text-tertiary)",
    count: 18945
  },
  {
    name: "Lost Customers",
    description: "Churned - no purchase in 180+ days",
    logic: "R: 1, F: 1-2, M: 1-2",
    color: "var(--text-tertiary)",
    count: 8052
  }
];

// Sample Customers (50 representative samples across all tiers)
export const sampleCustomers: Customer[] = [
  // VIP Tier (8 samples)
  {
    id: "CUST-00001",
    name: "Emma Richardson",
    email: "emma.richardson@email.com",
    phone: "+61 412 345 678",
    location: "Sydney, NSW",
    memberSince: "2024-03-15",
    membershipTier: "VIP",
    pointsBalance: 8420,
    totalOrders: 47,
    totalSpend: 18650,
    averageOrderValue: 397,
    clv: 24800,
    lastPurchaseDate: "2026-04-22",
    rfmScore: { recency: 5, frequency: 5, monetary: 5, segment: "Champions" },
    status: "Active",
    birthday: "1988-06-12",
    preferredCategories: ["Dresses", "Knitwear", "Accessories"]
  },
  {
    id: "CUST-00002",
    name: "Sophia Chen",
    email: "sophia.chen@email.com",
    phone: "+61 423 456 789",
    location: "Melbourne, VIC",
    memberSince: "2024-01-08",
    membershipTier: "VIP",
    pointsBalance: 12840,
    totalOrders: 62,
    totalSpend: 24280,
    averageOrderValue: 391,
    clv: 31200,
    lastPurchaseDate: "2026-04-25",
    rfmScore: { recency: 5, frequency: 5, monetary: 5, segment: "Champions" },
    status: "Active",
    birthday: "1992-11-28",
    preferredCategories: ["Outerwear", "Dresses", "Footwear"]
  },
  {
    id: "CUST-00003",
    name: "Isabella Martinez",
    email: "isabella.m@email.com",
    phone: "+61 434 567 890",
    location: "Brisbane, QLD",
    memberSince: "2024-05-20",
    membershipTier: "VIP",
    pointsBalance: 6280,
    totalOrders: 38,
    totalSpend: 15640,
    averageOrderValue: 412,
    clv: 19800,
    lastPurchaseDate: "2026-04-18",
    rfmScore: { recency: 5, frequency: 5, monetary: 5, segment: "Champions" },
    status: "Active",
    birthday: "1985-03-07",
    preferredCategories: ["Knitwear", "Bottoms", "Accessories"]
  },
  {
    id: "CUST-00004",
    name: "Olivia Thompson",
    email: "olivia.thompson@email.com",
    phone: "+61 445 678 901",
    location: "Perth, WA",
    memberSince: "2023-11-12",
    membershipTier: "VIP",
    pointsBalance: 9640,
    totalOrders: 53,
    totalSpend: 21240,
    averageOrderValue: 401,
    clv: 27600,
    lastPurchaseDate: "2026-04-26",
    rfmScore: { recency: 5, frequency: 5, monetary: 5, segment: "Champions" },
    status: "Active",
    birthday: "1990-09-15",
    preferredCategories: ["Dresses", "Outerwear", "Knitwear"]
  },
  {
    id: "CUST-00005",
    name: "Charlotte Williams",
    email: "charlotte.w@email.com",
    phone: "+61 456 789 012",
    location: "Adelaide, SA",
    memberSince: "2024-02-18",
    membershipTier: "VIP",
    pointsBalance: 7120,
    totalOrders: 44,
    totalSpend: 17820,
    averageOrderValue: 405,
    clv: 22400,
    lastPurchaseDate: "2026-04-20",
    rfmScore: { recency: 5, frequency: 5, monetary: 5, segment: "Champions" },
    status: "Active",
    birthday: "1987-12-03",
    preferredCategories: ["Accessories", "Dresses", "Tops"]
  },
  {
    id: "CUST-00006",
    name: "Amelia Brown",
    email: "amelia.brown@email.com",
    phone: "+61 467 890 123",
    location: "Canberra, ACT",
    memberSince: "2024-06-05",
    membershipTier: "VIP",
    pointsBalance: 5840,
    totalOrders: 35,
    totalSpend: 14280,
    averageOrderValue: 408,
    clv: 18200,
    lastPurchaseDate: "2026-04-15",
    rfmScore: { recency: 5, frequency: 5, monetary: 5, segment: "Champions" },
    status: "Active",
    birthday: "1991-07-22",
    preferredCategories: ["Knitwear", "Dresses", "Bottoms"]
  },
  {
    id: "CUST-00007",
    name: "Mia Johnson",
    email: "mia.johnson@email.com",
    phone: "+61 478 901 234",
    location: "Gold Coast, QLD",
    memberSince: "2023-09-28",
    membershipTier: "VIP",
    pointsBalance: 10280,
    totalOrders: 58,
    totalSpend: 22640,
    averageOrderValue: 390,
    clv: 28800,
    lastPurchaseDate: "2026-03-18",
    rfmScore: { recency: 4, frequency: 5, monetary: 5, segment: "Champions" },
    status: "Active",
    birthday: "1989-04-10",
    preferredCategories: ["Dresses", "Outerwear", "Accessories"]
  },
  {
    id: "CUST-00008",
    name: "Ava Davis",
    email: "ava.davis@email.com",
    phone: "+61 489 012 345",
    location: "Newcastle, NSW",
    memberSince: "2024-04-12",
    membershipTier: "VIP",
    pointsBalance: 6920,
    totalOrders: 41,
    totalSpend: 16480,
    averageOrderValue: 402,
    clv: 20800,
    lastPurchaseDate: "2026-02-28",
    rfmScore: { recency: 3, frequency: 5, monetary: 5, segment: "Loyal Customers" },
    status: "At Risk",
    birthday: "1993-10-19",
    preferredCategories: ["Knitwear", "Tops", "Accessories"]
  },

  // Gold Tier (12 samples)
  {
    id: "CUST-00009",
    name: "Emily Wilson",
    email: "emily.wilson@email.com",
    phone: "+61 490 123 456",
    location: "Sydney, NSW",
    memberSince: "2024-08-15",
    membershipTier: "Gold",
    pointsBalance: 3840,
    totalOrders: 24,
    totalSpend: 9240,
    averageOrderValue: 385,
    clv: 12600,
    lastPurchaseDate: "2026-04-24",
    rfmScore: { recency: 5, frequency: 4, monetary: 4, segment: "Champions" },
    status: "Active",
    birthday: "1994-05-14",
    preferredCategories: ["Dresses", "Knitwear"]
  },
  {
    id: "CUST-00010",
    name: "Grace Taylor",
    email: "grace.taylor@email.com",
    phone: "+61 401 234 567",
    location: "Melbourne, VIC",
    memberSince: "2024-07-22",
    membershipTier: "Gold",
    pointsBalance: 4280,
    totalOrders: 28,
    totalSpend: 10640,
    averageOrderValue: 380,
    clv: 14200,
    lastPurchaseDate: "2026-04-21",
    rfmScore: { recency: 5, frequency: 4, monetary: 4, segment: "Champions" },
    status: "Active",
    birthday: "1991-08-25",
    preferredCategories: ["Outerwear", "Bottoms", "Accessories"]
  },
  {
    id: "CUST-00011",
    name: "Chloe Anderson",
    email: "chloe.anderson@email.com",
    phone: "+61 412 345 678",
    location: "Brisbane, QLD",
    memberSince: "2024-09-10",
    membershipTier: "Gold",
    pointsBalance: 3120,
    totalOrders: 20,
    totalSpend: 7680,
    averageOrderValue: 384,
    clv: 10400,
    lastPurchaseDate: "2026-04-19",
    rfmScore: { recency: 5, frequency: 4, monetary: 4, segment: "Champions" },
    status: "Active",
    birthday: "1995-01-30",
    preferredCategories: ["Dresses", "Tops"]
  },
  {
    id: "CUST-00012",
    name: "Ella Thomas",
    email: "ella.thomas@email.com",
    phone: "+61 423 456 789",
    location: "Perth, WA",
    memberSince: "2024-10-05",
    membershipTier: "Gold",
    pointsBalance: 2840,
    totalOrders: 18,
    totalSpend: 6920,
    averageOrderValue: 384,
    clv: 9200,
    lastPurchaseDate: "2026-04-17",
    rfmScore: { recency: 5, frequency: 3, monetary: 4, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1992-11-12",
    preferredCategories: ["Knitwear", "Accessories"]
  },
  {
    id: "CUST-00013",
    name: "Lily Jackson",
    email: "lily.jackson@email.com",
    phone: "+61 434 567 890",
    location: "Adelaide, SA",
    memberSince: "2025-01-18",
    membershipTier: "Gold",
    pointsBalance: 2240,
    totalOrders: 15,
    totalSpend: 5680,
    averageOrderValue: 379,
    clv: 7800,
    lastPurchaseDate: "2026-04-23",
    rfmScore: { recency: 5, frequency: 3, monetary: 3, segment: "Loyal Customers" },
    status: "Active",
    birthday: "1996-03-08",
    preferredCategories: ["Dresses", "Bottoms"]
  },
  {
    id: "CUST-00014",
    name: "Zoe White",
    email: "zoe.white@email.com",
    phone: "+61 445 678 901",
    location: "Hobart, TAS",
    memberSince: "2025-02-20",
    membershipTier: "Gold",
    pointsBalance: 1920,
    totalOrders: 13,
    totalSpend: 4840,
    averageOrderValue: 372,
    clv: 6600,
    lastPurchaseDate: "2026-04-16",
    rfmScore: { recency: 5, frequency: 3, monetary: 3, segment: "Loyal Customers" },
    status: "Active",
    birthday: "1993-07-15",
    preferredCategories: ["Outerwear", "Knitwear"]
  },
  {
    id: "CUST-00015",
    name: "Hannah Harris",
    email: "hannah.harris@email.com",
    phone: "+61 456 789 012",
    location: "Darwin, NT",
    memberSince: "2025-03-12",
    membershipTier: "Gold",
    pointsBalance: 1640,
    totalOrders: 11,
    totalSpend: 4120,
    averageOrderValue: 375,
    clv: 5800,
    lastPurchaseDate: "2026-04-12",
    rfmScore: { recency: 5, frequency: 3, monetary: 3, segment: "Loyal Customers" },
    status: "Active",
    birthday: "1997-09-22",
    preferredCategories: ["Tops", "Accessories"]
  },
  {
    id: "CUST-00016",
    name: "Scarlett Martin",
    email: "scarlett.martin@email.com",
    phone: "+61 467 890 123",
    location: "Sydney, NSW",
    memberSince: "2024-11-08",
    membershipTier: "Gold",
    pointsBalance: 2480,
    totalOrders: 16,
    totalSpend: 6080,
    averageOrderValue: 380,
    clv: 8400,
    lastPurchaseDate: "2026-03-25",
    rfmScore: { recency: 4, frequency: 3, monetary: 3, segment: "Loyal Customers" },
    status: "Active",
    birthday: "1990-12-05",
    preferredCategories: ["Dresses", "Outerwear"]
  },
  {
    id: "CUST-00017",
    name: "Aria Lee",
    email: "aria.lee@email.com",
    phone: "+61 478 901 234",
    location: "Melbourne, VIC",
    memberSince: "2025-04-15",
    membershipTier: "Gold",
    pointsBalance: 1280,
    totalOrders: 9,
    totalSpend: 3380,
    averageOrderValue: 376,
    clv: 4800,
    lastPurchaseDate: "2026-04-10",
    rfmScore: { recency: 5, frequency: 2, monetary: 3, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1998-02-18",
    preferredCategories: ["Knitwear", "Tops"]
  },
  {
    id: "CUST-00018",
    name: "Ruby Walker",
    email: "ruby.walker@email.com",
    phone: "+61 489 012 345",
    location: "Brisbane, QLD",
    memberSince: "2024-12-20",
    membershipTier: "Gold",
    pointsBalance: 2120,
    totalOrders: 14,
    totalSpend: 5280,
    averageOrderValue: 377,
    clv: 7200,
    lastPurchaseDate: "2026-02-14",
    rfmScore: { recency: 3, frequency: 3, monetary: 3, segment: "Loyal Customers" },
    status: "At Risk",
    birthday: "1994-06-28",
    preferredCategories: ["Dresses", "Accessories"]
  },
  {
    id: "CUST-00019",
    name: "Victoria Hall",
    email: "victoria.hall@email.com",
    phone: "+61 490 123 456",
    location: "Perth, WA",
    memberSince: "2025-05-08",
    membershipTier: "Gold",
    pointsBalance: 960,
    totalOrders: 7,
    totalSpend: 2640,
    averageOrderValue: 377,
    clv: 3800,
    lastPurchaseDate: "2026-04-08",
    rfmScore: { recency: 5, frequency: 2, monetary: 2, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1999-10-11",
    preferredCategories: ["Bottoms", "Tops"]
  },
  {
    id: "CUST-00020",
    name: "Penelope Allen",
    email: "penelope.allen@email.com",
    phone: "+61 401 234 567",
    location: "Adelaide, SA",
    memberSince: "2025-06-12",
    membershipTier: "Gold",
    pointsBalance: 720,
    totalOrders: 6,
    totalSpend: 2240,
    averageOrderValue: 373,
    clv: 3200,
    lastPurchaseDate: "2026-04-05",
    rfmScore: { recency: 5, frequency: 2, monetary: 2, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1995-04-16",
    preferredCategories: ["Dresses", "Knitwear"]
  },

  // Silver Tier (15 samples)
  {
    id: "CUST-00021",
    name: "Madison Young",
    email: "madison.young@email.com",
    phone: "+61 412 345 678",
    location: "Sydney, NSW",
    memberSince: "2025-07-20",
    membershipTier: "Silver",
    pointsBalance: 840,
    totalOrders: 8,
    totalSpend: 2680,
    averageOrderValue: 335,
    clv: 3800,
    lastPurchaseDate: "2026-04-20",
    rfmScore: { recency: 5, frequency: 2, monetary: 2, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1996-08-09",
    preferredCategories: ["Tops", "Bottoms"]
  },
  {
    id: "CUST-00022",
    name: "Layla King",
    email: "layla.king@email.com",
    phone: "+61 423 456 789",
    location: "Melbourne, VIC",
    memberSince: "2025-08-15",
    membershipTier: "Silver",
    pointsBalance: 620,
    totalOrders: 6,
    totalSpend: 1980,
    averageOrderValue: 330,
    clv: 2800,
    lastPurchaseDate: "2026-04-18",
    rfmScore: { recency: 5, frequency: 2, monetary: 2, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1997-11-23",
    preferredCategories: ["Dresses", "Accessories"]
  },
  {
    id: "CUST-00023",
    name: "Aurora Wright",
    email: "aurora.wright@email.com",
    phone: "+61 434 567 890",
    location: "Brisbane, QLD",
    memberSince: "2025-09-08",
    membershipTier: "Silver",
    pointsBalance: 520,
    totalOrders: 5,
    totalSpend: 1640,
    averageOrderValue: 328,
    clv: 2400,
    lastPurchaseDate: "2026-04-15",
    rfmScore: { recency: 5, frequency: 2, monetary: 2, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1998-05-17",
    preferredCategories: ["Knitwear", "Tops"]
  },
  {
    id: "CUST-00024",
    name: "Stella Scott",
    email: "stella.scott@email.com",
    phone: "+61 445 678 901",
    location: "Perth, WA",
    memberSince: "2025-10-12",
    membershipTier: "Silver",
    pointsBalance: 480,
    totalOrders: 5,
    totalSpend: 1580,
    averageOrderValue: 316,
    clv: 2200,
    lastPurchaseDate: "2026-04-12",
    rfmScore: { recency: 5, frequency: 2, monetary: 2, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1999-01-04",
    preferredCategories: ["Dresses", "Outerwear"]
  },
  {
    id: "CUST-00025",
    name: "Nova Green",
    email: "nova.green@email.com",
    phone: "+61 456 789 012",
    location: "Adelaide, SA",
    memberSince: "2025-11-18",
    membershipTier: "Silver",
    pointsBalance: 380,
    totalOrders: 4,
    totalSpend: 1240,
    averageOrderValue: 310,
    clv: 1800,
    lastPurchaseDate: "2026-04-08",
    rfmScore: { recency: 5, frequency: 1, monetary: 2, segment: "New Customers" },
    status: "Active",
    birthday: "2000-07-12",
    preferredCategories: ["Tops", "Accessories"]
  },
  {
    id: "CUST-00026",
    name: "Hazel Baker",
    email: "hazel.baker@email.com",
    phone: "+61 467 890 123",
    location: "Canberra, ACT",
    memberSince: "2025-12-05",
    membershipTier: "Silver",
    pointsBalance: 320,
    totalOrders: 4,
    totalSpend: 1120,
    averageOrderValue: 280,
    clv: 1600,
    lastPurchaseDate: "2026-04-05",
    rfmScore: { recency: 5, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "1997-09-28",
    preferredCategories: ["Bottoms", "Tops"]
  },
  {
    id: "CUST-00027",
    name: "Violet Adams",
    email: "violet.adams@email.com",
    phone: "+61 478 901 234",
    location: "Hobart, TAS",
    memberSince: "2026-01-10",
    membershipTier: "Silver",
    pointsBalance: 280,
    totalOrders: 3,
    totalSpend: 920,
    averageOrderValue: 307,
    clv: 1400,
    lastPurchaseDate: "2026-04-02",
    rfmScore: { recency: 5, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "1998-12-19",
    preferredCategories: ["Knitwear", "Dresses"]
  },
  {
    id: "CUST-00028",
    name: "Savannah Nelson",
    email: "savannah.nelson@email.com",
    phone: "+61 489 012 345",
    location: "Gold Coast, QLD",
    memberSince: "2026-02-14",
    membershipTier: "Silver",
    pointsBalance: 240,
    totalOrders: 3,
    totalSpend: 840,
    averageOrderValue: 280,
    clv: 1200,
    lastPurchaseDate: "2026-03-30",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "1999-06-05",
    preferredCategories: ["Dresses", "Accessories"]
  },
  {
    id: "CUST-00029",
    name: "Brooklyn Carter",
    email: "brooklyn.carter@email.com",
    phone: "+61 490 123 456",
    location: "Newcastle, NSW",
    memberSince: "2025-07-28",
    membershipTier: "Silver",
    pointsBalance: 640,
    totalOrders: 6,
    totalSpend: 1960,
    averageOrderValue: 327,
    clv: 2800,
    lastPurchaseDate: "2026-02-18",
    rfmScore: { recency: 3, frequency: 2, monetary: 2, segment: "Potential Loyalists" },
    status: "At Risk",
    birthday: "1995-03-14",
    preferredCategories: ["Outerwear", "Knitwear"]
  },
  {
    id: "CUST-00030",
    name: "Autumn Mitchell",
    email: "autumn.mitchell@email.com",
    phone: "+61 401 234 567",
    location: "Wollongong, NSW",
    memberSince: "2026-03-05",
    membershipTier: "Silver",
    pointsBalance: 180,
    totalOrders: 2,
    totalSpend: 620,
    averageOrderValue: 310,
    clv: 900,
    lastPurchaseDate: "2026-03-28",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "2000-11-08",
    preferredCategories: ["Tops", "Bottoms"]
  },
  {
    id: "CUST-00031",
    name: "Willow Perez",
    email: "willow.perez@email.com",
    phone: "+61 412 345 678",
    location: "Geelong, VIC",
    memberSince: "2025-08-22",
    membershipTier: "Silver",
    pointsBalance: 560,
    totalOrders: 5,
    totalSpend: 1720,
    averageOrderValue: 344,
    clv: 2400,
    lastPurchaseDate: "2026-03-15",
    rfmScore: { recency: 4, frequency: 2, monetary: 2, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1996-05-22",
    preferredCategories: ["Dresses", "Knitwear"]
  },
  {
    id: "CUST-00032",
    name: "Luna Roberts",
    email: "luna.roberts@email.com",
    phone: "+61 423 456 789",
    location: "Townsville, QLD",
    memberSince: "2025-09-15",
    membershipTier: "Silver",
    pointsBalance: 420,
    totalOrders: 4,
    totalSpend: 1320,
    averageOrderValue: 330,
    clv: 1900,
    lastPurchaseDate: "2026-03-10",
    rfmScore: { recency: 4, frequency: 1, monetary: 2, segment: "Potential Loyalists" },
    status: "Active",
    birthday: "1997-08-30",
    preferredCategories: ["Accessories", "Tops"]
  },
  {
    id: "CUST-00033",
    name: "Bella Turner",
    email: "bella.turner@email.com",
    phone: "+61 434 567 890",
    location: "Cairns, QLD",
    memberSince: "2025-10-28",
    membershipTier: "Silver",
    pointsBalance: 340,
    totalOrders: 3,
    totalSpend: 1020,
    averageOrderValue: 340,
    clv: 1500,
    lastPurchaseDate: "2026-03-05",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "1998-02-14",
    preferredCategories: ["Dresses", "Outerwear"]
  },
  {
    id: "CUST-00034",
    name: "Ivy Phillips",
    email: "ivy.phillips@email.com",
    phone: "+61 445 678 901",
    location: "Toowoomba, QLD",
    memberSince: "2026-01-20",
    membershipTier: "Silver",
    pointsBalance: 260,
    totalOrders: 3,
    totalSpend: 880,
    averageOrderValue: 293,
    clv: 1300,
    lastPurchaseDate: "2026-02-28",
    rfmScore: { recency: 3, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "At Risk",
    birthday: "1999-10-07",
    preferredCategories: ["Knitwear", "Tops"]
  },
  {
    id: "CUST-00035",
    name: "Evelyn Campbell",
    email: "evelyn.campbell@email.com",
    phone: "+61 456 789 012",
    location: "Ballarat, VIC",
    memberSince: "2025-11-30",
    membershipTier: "Silver",
    pointsBalance: 380,
    totalOrders: 4,
    totalSpend: 1180,
    averageOrderValue: 295,
    clv: 1700,
    lastPurchaseDate: "2026-01-25",
    rfmScore: { recency: 2, frequency: 1, monetary: 2, segment: "At Risk" },
    status: "At Risk",
    birthday: "1996-12-16",
    preferredCategories: ["Bottoms", "Accessories"]
  },

  // Bronze Tier (10 samples)
  {
    id: "CUST-00036",
    name: "Harper Parker",
    email: "harper.parker@email.com",
    phone: "+61 467 890 123",
    location: "Sydney, NSW",
    memberSince: "2026-02-18",
    membershipTier: "Bronze",
    pointsBalance: 240,
    totalOrders: 3,
    totalSpend: 780,
    averageOrderValue: 260,
    clv: 1200,
    lastPurchaseDate: "2026-04-14",
    rfmScore: { recency: 5, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "2000-04-20",
    preferredCategories: ["Tops", "Bottoms"]
  },
  {
    id: "CUST-00037",
    name: "Abigail Evans",
    email: "abigail.evans@email.com",
    phone: "+61 478 901 234",
    location: "Melbourne, VIC",
    memberSince: "2026-03-10",
    membershipTier: "Bronze",
    pointsBalance: 180,
    totalOrders: 2,
    totalSpend: 520,
    averageOrderValue: 260,
    clv: 800,
    lastPurchaseDate: "2026-04-10",
    rfmScore: { recency: 5, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "2001-07-15",
    preferredCategories: ["Dresses", "Accessories"]
  },
  {
    id: "CUST-00038",
    name: "Eleanor Edwards",
    email: "eleanor.edwards@email.com",
    phone: "+61 489 012 345",
    location: "Brisbane, QLD",
    memberSince: "2026-01-25",
    membershipTier: "Bronze",
    pointsBalance: 280,
    totalOrders: 3,
    totalSpend: 860,
    averageOrderValue: 287,
    clv: 1300,
    lastPurchaseDate: "2026-04-06",
    rfmScore: { recency: 5, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "1999-09-11",
    preferredCategories: ["Knitwear", "Tops"]
  },
  {
    id: "CUST-00039",
    name: "Elizabeth Collins",
    email: "elizabeth.collins@email.com",
    phone: "+61 490 123 456",
    location: "Perth, WA",
    memberSince: "2026-02-08",
    membershipTier: "Bronze",
    pointsBalance: 220,
    totalOrders: 2,
    totalSpend: 640,
    averageOrderValue: 320,
    clv: 1000,
    lastPurchaseDate: "2026-03-28",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "2000-11-25",
    preferredCategories: ["Outerwear", "Dresses"]
  },
  {
    id: "CUST-00040",
    name: "Avery Stewart",
    email: "avery.stewart@email.com",
    phone: "+61 401 234 567",
    location: "Adelaide, SA",
    memberSince: "2026-03-15",
    membershipTier: "Bronze",
    pointsBalance: 160,
    totalOrders: 2,
    totalSpend: 480,
    averageOrderValue: 240,
    clv: 700,
    lastPurchaseDate: "2026-03-22",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "2001-03-30",
    preferredCategories: ["Tops", "Accessories"]
  },
  {
    id: "CUST-00041",
    name: "Sofia Sanchez",
    email: "sofia.sanchez@email.com",
    phone: "+61 412 345 678",
    location: "Canberra, ACT",
    memberSince: "2026-01-30",
    membershipTier: "Bronze",
    pointsBalance: 260,
    totalOrders: 3,
    totalSpend: 740,
    averageOrderValue: 247,
    clv: 1100,
    lastPurchaseDate: "2026-02-20",
    rfmScore: { recency: 3, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "At Risk",
    birthday: "1998-06-18",
    preferredCategories: ["Dresses", "Bottoms"]
  },
  {
    id: "CUST-00042",
    name: "Camila Morris",
    email: "camila.morris@email.com",
    phone: "+61 423 456 789",
    location: "Hobart, TAS",
    memberSince: "2026-02-22",
    membershipTier: "Bronze",
    pointsBalance: 200,
    totalOrders: 2,
    totalSpend: 560,
    averageOrderValue: 280,
    clv: 900,
    lastPurchaseDate: "2026-03-12",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "2000-08-07",
    preferredCategories: ["Knitwear", "Accessories"]
  },
  {
    id: "CUST-00043",
    name: "Scarlet Rogers",
    email: "scarlet.rogers@email.com",
    phone: "+61 434 567 890",
    location: "Darwin, NT",
    memberSince: "2026-03-20",
    membershipTier: "Bronze",
    pointsBalance: 140,
    totalOrders: 2,
    totalSpend: 420,
    averageOrderValue: 210,
    clv: 600,
    lastPurchaseDate: "2026-03-25",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "2001-12-02",
    preferredCategories: ["Tops", "Bottoms"]
  },
  {
    id: "CUST-00044",
    name: "Genesis Reed",
    email: "genesis.reed@email.com",
    phone: "+61 445 678 901",
    location: "Gold Coast, QLD",
    memberSince: "2026-01-12",
    membershipTier: "Bronze",
    pointsBalance: 280,
    totalOrders: 3,
    totalSpend: 820,
    averageOrderValue: 273,
    clv: 1200,
    lastPurchaseDate: "2026-02-08",
    rfmScore: { recency: 3, frequency: 1, monetary: 1, segment: "At Risk" },
    status: "At Risk",
    birthday: "1999-05-14",
    preferredCategories: ["Dresses", "Outerwear"]
  },
  {
    id: "CUST-00045",
    name: "Serenity Cook",
    email: "serenity.cook@email.com",
    phone: "+61 456 789 012",
    location: "Newcastle, NSW",
    memberSince: "2026-02-28",
    membershipTier: "Bronze",
    pointsBalance: 180,
    totalOrders: 2,
    totalSpend: 540,
    averageOrderValue: 270,
    clv: 800,
    lastPurchaseDate: "2026-03-18",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "2000-10-28",
    preferredCategories: ["Knitwear", "Tops"]
  },

  // Non-members (5 samples - one-time or infrequent buyers)
  {
    id: "CUST-00046",
    name: "Natalie Morgan",
    email: "natalie.morgan@email.com",
    phone: "+61 467 890 123",
    location: "Sydney, NSW",
    memberSince: "2025-11-15",
    membershipTier: "Non-member",
    pointsBalance: 0,
    totalOrders: 2,
    totalSpend: 380,
    averageOrderValue: 190,
    clv: 600,
    lastPurchaseDate: "2026-04-02",
    rfmScore: { recency: 5, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "Active",
    birthday: "1994-07-08",
    preferredCategories: ["Dresses"]
  },
  {
    id: "CUST-00047",
    name: "Aaliyah Bell",
    email: "aaliyah.bell@email.com",
    phone: "+61 478 901 234",
    location: "Melbourne, VIC",
    memberSince: "2025-09-20",
    membershipTier: "Non-member",
    pointsBalance: 0,
    totalOrders: 1,
    totalSpend: 165,
    averageOrderValue: 165,
    clv: 250,
    lastPurchaseDate: "2025-09-20",
    rfmScore: { recency: 1, frequency: 1, monetary: 1, segment: "Hibernating" },
    status: "Churned",
    birthday: "1992-04-12",
    preferredCategories: ["Tops"]
  },
  {
    id: "CUST-00048",
    name: "Kinsley Murphy",
    email: "kinsley.murphy@email.com",
    phone: "+61 489 012 345",
    location: "Brisbane, QLD",
    memberSince: "2026-03-28",
    membershipTier: "Non-member",
    pointsBalance: 0,
    totalOrders: 1,
    totalSpend: 145,
    averageOrderValue: 145,
    clv: 200,
    lastPurchaseDate: "2026-03-28",
    rfmScore: { recency: 4, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "New",
    birthday: "1996-11-19",
    preferredCategories: ["Accessories"]
  },
  {
    id: "CUST-00049",
    name: "Delilah Bailey",
    email: "delilah.bailey@email.com",
    phone: "+61 490 123 456",
    location: "Perth, WA",
    memberSince: "2025-12-10",
    membershipTier: "Non-member",
    pointsBalance: 0,
    totalOrders: 2,
    totalSpend: 320,
    averageOrderValue: 160,
    clv: 500,
    lastPurchaseDate: "2026-01-15",
    rfmScore: { recency: 2, frequency: 1, monetary: 1, segment: "At Risk" },
    status: "At Risk",
    birthday: "1993-08-24",
    preferredCategories: ["Knitwear", "Tops"]
  },
  {
    id: "CUST-00050",
    name: "Nova Rivera",
    email: "nova.rivera@email.com",
    phone: "+61 401 234 567",
    location: "Adelaide, SA",
    memberSince: "2026-04-15",
    membershipTier: "Non-member",
    pointsBalance: 0,
    totalOrders: 1,
    totalSpend: 125,
    averageOrderValue: 125,
    clv: 180,
    lastPurchaseDate: "2026-04-15",
    rfmScore: { recency: 5, frequency: 1, monetary: 1, segment: "New Customers" },
    status: "New",
    birthday: "1997-02-06",
    preferredCategories: ["Dresses"]
  }
];

// Macro Statistics
export const customerStats = {
  totalCustomers: 79867,
  totalMembers: 5926,
  membershipBreakdown: {
    vip: 248,
    gold: 1124,
    silver: 2186,
    bronze: 2368,
    nonMember: 73941
  },
  averageCLV: 1840,
  totalLifetimeValue: 146935480,
  activeCustomers30d: 12456,
  atRiskCustomers: 9834,
  churnedCustomers: 8052
};

// Sample Support Tickets
export const sampleSupportTickets: SupportTicket[] = [
  {
    id: "TICKET-10234",
    customerId: "CUST-00001",
    customerName: "Emma Richardson",
    customerEmail: "emma.richardson@email.com",
    subject: "Silk Midi Dress - Size Exchange Request",
    issueType: "Order Issue",
    priority: "Medium",
    status: "Resolved",
    createdDate: "2026-04-18",
    resolvedDate: "2026-04-19",
    assignedTo: "Sarah Mitchell",
    description: "Customer purchased Silk Midi Dress in size 10 but needs size 12. Requesting exchange.",
    resolution: "Processed size exchange. Sent prepaid return label via email. New size 12 dispatched from warehouse. ETA: April 22.",
    notes: [
      "Customer is VIP tier - expedited processing",
      "Waived exchange shipping fee as courtesy",
      "Added bonus 500 loyalty points for inconvenience"
    ],
    tags: ["Size Exchange", "VIP Customer", "Resolved Quickly"]
  },
  {
    id: "TICKET-10235",
    customerId: "CUST-00009",
    customerName: "Emily Wilson",
    customerEmail: "emily.wilson@email.com",
    subject: "Order #ORD-48291 - Shipping Delay Inquiry",
    issueType: "Shipping Delay",
    priority: "High",
    status: "In Progress",
    createdDate: "2026-04-25",
    assignedTo: "Marcus Chen",
    description: "Customer ordered Cashmere Cardigan on April 20. Expected delivery April 24 but hasn't arrived yet. Tracking shows 'In Transit' since April 22.",
    notes: [
      "Contacted AusPost - package currently in Melbourne distribution center",
      "Expected delivery tomorrow (April 26)",
      "Offered 15% discount code for next purchase as apology"
    ],
    tags: ["Shipping Delay", "Gold Member", "AusPost Issue"]
  },
  {
    id: "TICKET-10236",
    customerId: "CUST-00003",
    customerName: "Isabella Martinez",
    customerEmail: "isabella.m@email.com",
    subject: "Product Question - Linen Wide-Leg Trousers Care Instructions",
    issueType: "Product Question",
    priority: "Low",
    status: "Resolved",
    createdDate: "2026-04-20",
    resolvedDate: "2026-04-20",
    assignedTo: "Jessica Park",
    description: "Customer asking about proper care for linen trousers - can they be machine washed or dry clean only?",
    resolution: "Provided detailed care instructions: Machine wash cold on gentle cycle, hang dry, iron while slightly damp if needed. Sent link to full care guide on website.",
    notes: [
      "Customer very satisfied with quick response",
      "Mentioned considering purchasing second pair in different colour"
    ],
    tags: ["Product Care", "Quick Resolution", "VIP Customer"]
  },
  {
    id: "TICKET-10237",
    customerId: "CUST-00015",
    customerName: "Hannah Harris",
    customerEmail: "hannah.harris@email.com",
    subject: "Return Request - Wool Coat (Wrong Colour)",
    issueType: "Return Request",
    priority: "Medium",
    status: "Resolved",
    createdDate: "2026-04-12",
    resolvedDate: "2026-04-15",
    assignedTo: "Sarah Mitchell",
    description: "Customer ordered Wool Coat in 'Warm Taupe' but received 'Camel' colour. Wants to return and reorder correct colour.",
    resolution: "Confirmed warehouse error. Sent prepaid return label. Correct colour (Warm Taupe) dispatched immediately. Refund processed once return received. Added 1000 points as apology.",
    notes: [
      "Warehouse picking error confirmed",
      "Customer very understanding",
      "Warm Taupe size 10 in stock and shipped April 13"
    ],
    tags: ["Return", "Warehouse Error", "Gold Member", "Resolved"]
  },
  {
    id: "TICKET-10238",
    customerId: "CUST-00022",
    customerName: "Layla King",
    customerEmail: "layla.king@email.com",
    subject: "Discount Code Not Working - WELCOME15",
    issueType: "Technical Issue",
    priority: "High",
    status: "Resolved",
    createdDate: "2026-04-19",
    resolvedDate: "2026-04-19",
    assignedTo: "Tech Support - David Kim",
    description: "Customer trying to use WELCOME15 discount code at checkout but getting 'Invalid code' error. Cart value $245.",
    resolution: "Code had expired on April 15. Created new personalized code LAYLA15 (15% off, valid 7 days). Sent via email. Customer successfully completed purchase.",
    notes: [
      "WELCOME15 campaign ended April 15 but email still went out in error",
      "Honoured discount with new code as our error",
      "Flagged email campaign issue to marketing team"
    ],
    tags: ["Discount Code", "Technical Issue", "Quick Resolution", "Silver Member"]
  },
  {
    id: "TICKET-10239",
    customerId: "CUST-00028",
    customerName: "Savannah Nelson",
    customerEmail: "savannah.nelson@email.com",
    subject: "General Inquiry - Membership Tier Requirements",
    issueType: "General Inquiry",
    priority: "Low",
    status: "Resolved",
    createdDate: "2026-04-16",
    resolvedDate: "2026-04-16",
    assignedTo: "Jessica Park",
    description: "Customer asking how to reach Gold tier. Currently Silver with $840 total spend.",
    resolution: "Explained tier thresholds: Gold requires $1,500 spend. Customer currently at $840 - needs $660 more. Sent overview of Gold tier benefits and current points balance (240 points).",
    notes: [
      "Customer interested in upcoming Mother's Day sale",
      "Mentioned considering Linen Wide-Leg Trousers purchase which would help toward Gold tier"
    ],
    tags: ["Membership Query", "Silver Member", "Tier Progression"]
  },
  {
    id: "TICKET-10240",
    customerId: "CUST-00007",
    customerName: "Mia Johnson",
    customerEmail: "mia.johnson@email.com",
    subject: "Loyalty Points Missing from Recent Order",
    issueType: "Order Issue",
    priority: "Medium",
    status: "Resolved",
    createdDate: "2026-04-10",
    resolvedDate: "2026-04-11",
    assignedTo: "Sarah Mitchell",
    description: "VIP customer purchased $420 worth of items (Order #ORD-47856) on April 8 but points haven't appeared in account yet.",
    resolution: "Points sync delay from Shopify to Yotpo. Manually credited 420 points to account. Also added bonus 100 points for inconvenience. Total: 520 points added.",
    notes: [
      "Technical sync issue between Shopify and Yotpo - escalated to tech team",
      "Customer very gracious about the delay",
      "VIP tier - ensured quick resolution"
    ],
    tags: ["Loyalty Points", "VIP Customer", "Technical Issue", "Resolved"]
  },
  {
    id: "TICKET-10241",
    customerId: "CUST-00036",
    customerName: "Harper Parker",
    customerEmail: "harper.parker@email.com",
    subject: "Product Recommendation - Event Dressing",
    issueType: "Product Question",
    priority: "Low",
    status: "Resolved",
    createdDate: "2026-04-14",
    resolvedDate: "2026-04-14",
    assignedTo: "Jessica Park",
    description: "Customer attending wedding in May. Looking for dress recommendations for outdoor daytime event. Budget ~$250.",
    resolution: "Sent curated selection of 5 midi dresses suitable for outdoor wedding: Floral Wrap Dress ($218), Sage Linen Midi ($245), Cream Silk Slip Dress ($235), Dusty Blue A-Line ($228), Terracotta Midi with Puff Sleeves ($242). Also suggested complementary accessories.",
    notes: [
      "Customer appreciated personalized recommendations",
      "Purchased Floral Wrap Dress + accessories ($268 total)",
      "Great conversion from inquiry to purchase"
    ],
    tags: ["Product Recommendation", "Bronze Member", "Successful Conversion"]
  }
];
