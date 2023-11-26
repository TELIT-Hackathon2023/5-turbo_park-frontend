import { EmployeeTicket } from "./EmployeeTicket";

export type SheetParams = {
  map: undefined;
  signIn: undefined;
  signUp: undefined;
  landing: { token: number };
  date: { token: number };
  slot: {
    token: number;
    id: number;
    status?: string;
    color?: string;
    fromHour?: number;
    toHour?: number;
  };
  editBooking: { token: number; employeeTicket: EmployeeTicket };
  profile: { token: number };
  report: { slotId: number };
  availableSlots: { token: number; startDate: Date; endDate: Date };
};
