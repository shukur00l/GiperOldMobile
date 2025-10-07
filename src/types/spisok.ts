export type Category = {
  id: number;
  categoryCode: string | null;
  filterParams: string | null;
  withImage: boolean;
  description: {
    name: string;
    nameTm: string;
    nameRu: string;
  };
};

export type Banner = {
  productRelationshipId: number;
  description: {
    name: string;
    description: string | null;
    lang: string;
  };
  image: {
    imageUrl: string;
    siteImageUrl: string;
  };
  categoryCode: string | null;
  filterParams: string;
};

export type Product = {
  id: number;
  promoExist: boolean;
  simplePromo: boolean;
  defaultAvailability: {
    id: number;
    price: string;
    specialPrice: string | null;
    productShipeable: boolean;
    discountPercent?: number;
  };
  name: string;
  imageUrl: string;
  d: string;
};

export type CategoryWithItems = Category & {
  type: "banner" | "product";
  items: Banner[] | Product[];
};