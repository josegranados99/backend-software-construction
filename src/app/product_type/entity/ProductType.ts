class ProductType {
    public productTypeCode: number;
    public productTypeName: string;

    constructor (code: number, name: string) {
        this.productTypeCode = code;
        this.productTypeName = name;
    }
}

export default ProductType;