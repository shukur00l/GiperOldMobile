// type code = number
// type msg = string
// type status = number

// export interface DataSpuList{
//     code : code,
//     msg : msg,
//     data : data
//     status: status
// }

//  interface data {
//     total : number,
//     spuList : spuList[]
// }

// export interface spuList {
//     id : number,
//     createTime: number,
//     modifyTime: number,
//     dwSpuId: number,
//     distSpuId: string,
//     distStatus: "PRODUCT_ON" | "PRODUCT_OFF",
//     distSpuTitle : string,
//     dwDesignerId : string,
//     distBrandName : string,
//     distCategoryl1Name : string,
//     distCategoryl2Name : string,
//     distCategoryl3Name : string,
//     distFitPeopleName : string,
//     image : string,
//     baseImage : [string],
//     authPrice : number,
//     sellDate : number,
//     season : string,
//     material : any,
//     style : any,
//     sizeChart : string,
//     productDesc : string,
//     soldNum : number

// }

export interface DataSpuList {
  code: number;
  msg: string;
  data: Data;
  status: number;
}

export interface Data {
  total: number;
  spuList: SpuList[];
}

export interface SpuList {
  id: number;
  createTime: number;
  modifyTime: number;
  dwSpuId: number;
  distSpuId: string;
  distStatus: "PRODUCT_ON" | "PRODUCT_OFF";
  dwSpuTitle: string;
  distSpuTitle: string;
  dwDesignerId: string;
  distBrandName: string;
  distCategoryl1Name: string;
  distCategoryl2Name: string;
  distCategoryl3Name: string;
  distFitPeopleName: string;
  image: string;
  baseImage: string[];
  authPrice: number;
  sellDate: number;
  season: string;
  material: string;
  style: string;
  sizeChart: string;
  productDesc: string;
  soldNum: number;
}