export type Customer = {
  email: string;
  name: string;
  phone: string;
}
export type Address = {
  zip: string;
  country: string;
  city: string;
  street: string;
}
export type Order = {
  id: string;
  title: string;
  bookingDate: number;
  address: Address;
  customer: Customer;
}
