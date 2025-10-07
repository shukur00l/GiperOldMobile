import { create } from "zustand";

type DeliveryTime = {
  id: number;
  lastTime: string;
  startTime: string;
  endTime: string;
  sortOrder: number;
  code?: string;
};

type PaymentType = "MONEYORDER" | "CREDITCARD";

type DeliveryState = {
  deliveryTimesToday: DeliveryTime[];
  deliveryTimesTomorrow: DeliveryTime[];
  setDeliveryTimesToday: (times: DeliveryTime[]) => void;
  setDeliveryTimesTomorrow: (times: DeliveryTime[]) => void;
  paymentType: PaymentType;
  setPaymentType: (type: PaymentType) => void;
  code: string;
  setCode: (code: string) => void;  
};

export const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveryTimesToday: [],
  deliveryTimesTomorrow: [],
  setDeliveryTimesToday: (times: DeliveryTime[]) =>
    set(() => ({ deliveryTimesToday: times })),
  setDeliveryTimesTomorrow: (times: DeliveryTime[]) =>
    set(() => ({ deliveryTimesTomorrow: times })),
  paymentType: "MONEYORDER",
  setPaymentType: (type: PaymentType) => set(() => ({ paymentType: type })),
  code: "",
  setCode: (code: string) => set(() => ({ code: code })),  
}));