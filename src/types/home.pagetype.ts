type id = number;
type categoryCode = string | null;
type filterParams = string;
type withImage = boolean;
type productRelationshipId = number;
type lang = 'tk' | 'ru';
type imageUrl = string;

interface description {
    name: string;
    description: string | null;
    lang: lang;
}
   
interface image{
    imageUrl: imageUrl;
}

export interface banners{
    productRelationshipId: productRelationshipId;
    description: description;
    image: image;
    categoryCode: categoryCode;
    filterParams: filterParams;
}

export interface prodcuts {
    id: id;
    promoExist : boolean;
    simplePromo: boolean;
    defaultAvailability : defaultAvailability;
    name : string;
    imageUrl : imageUrl;
    d : string;
}

interface defaultAvailability{
    id : id;
    price : string;
    specialPrice : string | null;
    productShipeable : boolean;
    discountPercent : number;

}

export interface Categorytype {
    id: id;
    categoryCode: categoryCode;
    filterParams: filterParams;
    withImage: withImage;
    description: description;
}

interface ImageInfo {
    imageUrl: string;
    siteImageUrl: string;
}

interface DescriptionInfo {
    name: string;
    description: string | null;
    lang: lang;
}


export interface ProductRelationship {
    productRelationshipId: number;
    description: DescriptionInfo;
    image: ImageInfo;
    categoryCode: string | null;
    filterParams: string;
}

export interface CategoryItem {
  id: number;
  withImage: boolean;
description: description;
filterParams : filterParams
}

export interface DashboardItemType{
    type : 'banner' | 'product';
    id : id;
    categoryCode: categoryCode;
    filterParams: filterParams;
    withImage: withImage;
    description: description;
    products: prodcuts[];
    banners: banners[];

}