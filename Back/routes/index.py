from routes.debtorRoutes import debtor_routes
from routes.expensesRoutes import expenses_routes
from routes.ordersRoutes import orders_routes
from routes.productRoutes import product_routes
from routes.stockRoutes import stock_routes
from routes.stockinRoutes import stockin_routes
from routes.stockoutRoutes import stockout_routes
from routes.userRoutes import user_routes
from routes.brandRoutes import brand_routes
from routes.positionRoutes import position_routes

def default_routes(app):
  debtor_routes(app)
  expenses_routes(app)
  orders_routes(app)
  product_routes(app)
  stock_routes(app)
  stockin_routes(app)
  stockout_routes(app)
  user_routes(app)
  brand_routes(app)
  position_routes(app)