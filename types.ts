
export type MembershipStatus = 'NONE' | 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'REJECTED';
export type MembershipType = 'INDIVIDUAL' | 'CORPORATEBODY';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  hasMembership: boolean;
  membershipInfo?: {
    status: MembershipStatus;
    type: MembershipType;
    memberSince?: string;
  };
}

export type LotStatus = 'Draft' | 'Scheduled' | 'Active' | 'Ended' | 'Sold' | 'Unsold' | 'Cancelled';

export interface Lot {
  id: string;
  lotNumber: string;
  title: string;
  description: string;
  status: LotStatus;
  startingPrice: number;
  reservePrice?: number;
  buyItNowPrice?: number;
  currentBid: number;
  totalBids: number;
  auctionStartDate: string;
  auctionEndDate: string;
  primaryImageUrl: string;
  imageUrls: string[];
  specifications?: Record<string, string>;
  isFeatured?: boolean;
  isMixedLot?: boolean;
  sellerId: string;
  sellerName: string;
}

export interface Bid {
  id: string;
  lotId: string;
  amount: number;
  bidderName: string;
  timestamp: string;
  status: 'Active' | 'Outbid' | 'Won' | 'Cancelled';
}

export interface DashboardStats {
  selling: {
    activeLots: number;
    totalLots: number;
    bidsReceived: number;
    lotsSold: number;
    highestBidOnActive: number;
  };
  buying: {
    bidsPlaced: number;
    activeBids: number;
    outbidCount: number;
    lotsWon: number;
    subscribedLots: number;
  };
}
