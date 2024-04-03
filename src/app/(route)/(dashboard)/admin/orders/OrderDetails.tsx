import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const OrderDetails = ({ order }: any) => {
  const subtotal = order?.products?.reduce(
    (acc: number, currentProduct: any) =>
      acc +
      (currentProduct.price_data.unit_amount / 100) * currentProduct.quantity,
    0
  );

  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center dark:text-white pb-5">
          Order Details
        </h2>
        <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full dark:bg-navy-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
            <div className="data">
              <p className="font-semibold text-base leading-7 text-black dark:text-white">
                Order Id:
                <span className="text-indigo-600 font-medium dark:text-fuchsia-400 pl-2">
                  #{order.orderID}
                </span>
              </p>
              <p className="font-semibold text-base leading-7 text-black mt-4 dark:text-white">
                Order Payment :
                <span className="text-gray-400 font-medium dark:text-fuchsia-400 pl-2">
                  {moment(order?.createdAt).format("LL")}
                </span>
              </p>
            </div>
            <Link
              href="/admin/orders"
              className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400"
            >
              Back
            </Link>
          </div>
          <div className="w-full px-3 min-[400px]:px-6">
            {order.products.map((product: any, index: number) => (
              <div
                className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                key={index}
              >
                <div className="img-box max-lg:w-full">
                  <Image
                    src={product?.price_data?.product_data?.images[0]}
                    alt="product image"
                    width={140}
                    height={140}
                    className="aspect-square w-full lg:max-w-[140px]"
                  />
                </div>
                <div className="flex flex-row items-center w-full ">
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                    <div className="flex items-center">
                      <div className="">
                        <h2 className="font-semibold text-xl leading-8 text-black mb-3 dark:text-white">
                          {product?.price_data?.product_data?.name}
                        </h2>
                        <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                          {order.category[index]
                            ? order.category[index].charAt(0).toUpperCase() +
                              order.category[index].slice(1)
                            : ""}
                        </p>
                        <div className="flex items-center ">
                          <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200 dark:text-white">
                            Price:
                            <span className="text-gray-500 pl-2">
                              $
                              {(product?.price_data?.unit_amount / 100).toFixed(
                                2
                              )}
                            </span>
                          </p>
                          <p className="font-medium text-base leading-7 text-black dark:text-white">
                            Qty:
                            <span className="text-gray-500 pl-2">
                              {product?.quantity}
                            </span>
                          </p>
                          <p className="font-medium text-base leading-7 text-black pl-4 ml-4 border-l border-gray-200 dark:text-white">
                            Status:
                            <span className="text-gray-500 pl-2 uppercase">
                              {order?.paid === "paid" ? "Paid" : "Unpaid"}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Other product details */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
              <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center dark:text-white">
                Paid using Stripe
              </p>
            </div>
            <p className="font-semibold text-lg text-black py-6 dark:text-white">
              Total Price:
              <span className="text-indigo-600">${subtotal?.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
