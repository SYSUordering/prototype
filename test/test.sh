ROOT_URL="http://:3000"
COOKIE_FILE="cookie.txt"

echo "Test API on $ROOT_URL"

# curl -X POST --header 'Content-Type: application/x-www-form-urlencoded' --header 'Accept: application/json' -d 'number=111&password=1111' 'http://127.0.0.1:3000/session'
# curl -X POST  -d 'number=13128809301&password=123456' 'http://127.0.0.1:3000/session' -D cookie.txt
# curl -b cookie.txt http://:3000/restaurant/desk -d desk_number=10 -X PUT

echo "----- Session API -----"
SES="$ROOT_URL/session"

# POST /session
echo "POST $SES"
curl $SES -X POST  -d 'manager_number=13128809301&password=123456' -D $COOKIE_FILE
echo $'\n'

# GET /session
echo "POST $SES"
curl $SES -X GET -b $COOKIE_FILE
echo $'\n'

# DELETE /session
# echo "DELETE $SES"
# curl $SES -
# echo $'\n\n'


echo "----- Restaurant API -----"
RES="$ROOT_URL/restaurant"
RES_DES="$ROOT_URL/restaurant/desk"

# POST /restaurant
echo "POST $RES"
curl $RES -X POST -d 'manager_number=13128809303&password=123456&restaurant_name=hahaha'
echo $'\n'

# GET /restaurant
echo "GET $RES"
curl $RES -X GET -b $COOKIE_FILE
echo $'\n'

# PUT /restaurant/desk
echo "PUT $RES_DES"
curl $RES_DES -X PUT -d 'desk_number=10' -b $COOKIE_FILE
echo $'\n\n'


echo "----- Menu API -----"
MEN="$ROOT_URL/menu"
CAT="$ROOT_URL/menu/category"
DIS="$ROOT_URL/menu/dish"

# POST /menu/dish
echo "POST $CAT"
curl $CAT -X POST -d 'category_name=主食' -b $COOKIE_FILE
echo $'\n'

# GET /menu
echo "GET $DIS"
curl $DIS -X POST -d 'dish_name=东坡肉&price=10.3&flavor=辣&description=主厨推荐&category_id=1' -b $COOKIE_FILE
echo $'\n'

# POST /menu/category
echo "POST $MEN"
curl $MEN -X GET -b $COOKIE_FILE
echo $'\n\n'


echo "----- Order API -----"
ORD="$ROOT_URL/order"

# POST /order
echo "POST $ORD"
curl $ORD -X POST -H "Content-Type: application/json" -d '{"restaurant_id":1, "total_price": 334, "dish_number":1, "desk_id": 1, "tableware":"是", "dish_list":[{"dish_id":1}]}'
echo $'\n'

# GET /order
echo "GET $ORD"
curl "$ORD?date=2018-06-14" -X GET -b $COOKIE_FILE
echo $'\n'

# PUT /order
echo "PUT $ORD" 
curl $ORD -X PUT -H "Content-Type: application/json" -b $COOKIE_FILE -d '{"order_list": [{"order_id": 1}, {"order_id": 2}, {"order_id": 3}, {"order_id": 4}, {"order_id": 4}]}'
echo $'\n\n'


