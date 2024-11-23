export const SQL_Access = {
  ENTRY_REGISTER:
    "INSERT INTO entry(user_code, entry_date, entry_hour) \
    VALUES ($1, CURRENT_DATE, CURRENT_TIME)",
  DATA_TOKEN:
    "SELECT a.user_code, a.access_email, a.access_password, a.access_uuid, u.user_name, u.user_lastname \
    FROM access a INNER JOIN users u ON \
    a.user_code = u.user_code \
    WHERE a.access_email = $1",
  GET_UUID:
    "SELECT a.access_uuid \
    FROM access a\
    WHERE a.user_code = $1",
  UPDATE_UUID:
    "UPDATE access SET access_uuid = gen_random_uuid() \
    WHERE user_code = $1",
};
