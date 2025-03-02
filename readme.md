APIs to make

<<<<<<< HEAD
Admin route:
1./admin/login - (done)

2./admin/dashboard/products - (done)

3./admin/dashboard/categories -

4./admin/sales[query] -

User route: (done)
1./user/(login,signup)

2./user/order

General:
"/"-> product listing;

(fix "/" listing)

add jwt (done)
connect db (done)
handle authorization(admin,user) (done)
implement error handling T-T (done)

# DB configure: (done)

user table (details:id,name,add,user,pass)

admin table(details:id,name,add,user,pass)

product table(details:id,name,category,sales,owner(admin-id))

order table(detiails:id,product array, buyer(user-id))

manage product sync when placing order. (done)
