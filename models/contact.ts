export type ContactStatus = "Pending" | "Viewed";
export type ContactType = "BuyUnit" | "SellUnit" | "Other" | "Investment";
export type ContactHearFrom =
  | "SocialMedia"
  | "Advertisement"
  | "SEO"
  | "Other"
  | "Friend";

export interface ContactItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: ContactType;
  hearFrom: ContactHearFrom;
  status: ContactStatus;
  notes: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateContactRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: ContactType;
  hearFrom: ContactHearFrom;
  notes: string;
}

export interface UpdateContactStatusDto {
  status: ContactStatus;
}

