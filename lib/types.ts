export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
}
export type ServiceStatus = "AVAILABLE" | "UNAVAILABLE";

export type UserStatus = "ACTIVE" | "BANNED";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "TECHNICIAN";
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}


export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  status: string;

  category: Category;
  technician: Technician;
}

export interface ServiceMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ServicesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta: ServiceMeta;
    data: Service[];
  };
}

export interface TechnicianDashboardProps {
  profile: {
    user: {
      name: string;
      email: string;
      phone: string;
      services: Service[];
    };
    bio: string;
    experience: number;
    address: string;
    rating: number;
    totalReviews: number;
  };
}

export interface Booking {
  id: string;
  bookingDate: string;
  address: string;
  note?: string;
  totalPrice: number;
  status: string;

  service: {
    id: string;
    title: string;
    category: {
      name: string;
    };
  };

  customer: {
    id: string;
    name: string;
  };

  technician: {
    id: string;
    name: string;
  };
}