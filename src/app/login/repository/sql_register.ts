export const SQL_User = {
  USER_CREATE:
    "INSERT INTO users(user_name, user_lastname) \
                  VALUES ($1, $2) RETURNING user_code",
  ACCESS_CREATE:
    "INSERT INTO access(user_code, access_email, access_password, access_uuid) \
                    VALUES ($1, $2, $3, gen_random_uuid())",
  AMOUNT_EMAIL: "SELECT COUNT(user_code) AS found \
                 FROM access WHERE access_email = $1" 
};
