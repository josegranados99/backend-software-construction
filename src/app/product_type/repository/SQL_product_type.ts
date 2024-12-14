export const SQL_product_type = {
  PRODUCT_TYPE_CREATE:
    "INSERT INTO product_type(product_type_name) \
                  VALUES ($1) RETURNING product_type_code",
  AMOUNT_PRODUCT_TYPE:
    "SELECT COUNT(product_type_code) AS found \
                 FROM product_type WHERE product_type_name = $1",
  GET_ALL_PRODUCT_TYPE:
    "SELECT pt.product_type_code, pt.product_type_name, \
    (SELECT COUNT(product_type_code) FROM product \
    WHERE product_type_code = pt.product_type_code ) as amount_product \
    FROM product_type as pt \
    ORDER BY pt.product_type_code asc",
};
