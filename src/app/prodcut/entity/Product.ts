import ProductType from "../../product_type/entity/ProductType";

ProductType
class Product {
  public productCode: number;
  public productTypeCode: ProductType;
  public productName: string;
  public productPrice: number;

  constructor(productCode: number, productTypeCode:ProductType, productName: string, productPrice:number){
    this.productCode = productCode;
    this.productTypeCode = productTypeCode;
    this.productName = productName;
    this.productPrice = productPrice;
  }
}

export default Product;
