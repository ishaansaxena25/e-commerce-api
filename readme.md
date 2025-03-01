APIs to make

Admin route: (done)
1./admin/login -

2./admin/dashboard/products -

3./admin/dashboard/categories -

4./admin/sales[query] -

User route: (done)
1./user/(login,signup)

2./user/order

General:
"/"-> product listing;

(fix "/" listing)

add jwt
connect db
handle authorization(admin,user)
implement error handling T-T

# DB configure: (done)

user table (details:id,name,add,user,pass)

admin table(details:id,name,add,user,pass)

product table(details:id,name,category,sales,owner(admin-id))

order table(detiails:id,product array, buyer(user-id))

manage product sync when placing order. (done)
