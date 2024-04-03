import Link from "next/link";

export default function Loading() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 text-center sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-24">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 bg-gray-300 animate-pulse w-40 h-6 max-w-6xl mx-auto"></h1>
          <p className="mt-4 max-w-3xl mx-auto text-base text-gray-500 bg-gray-300 animate-pulse w-100 h-6"></p>
        </div>

        <section className="border-t border-gray-200 py-6">
          <div className="flex items-center justify-between">
            <div className="relative inline-block text-left flex-1">
              <div className="flex items-center">
                <form className="flex-1 mr-4 ">
                  <div className="flex">
                    <button className="w-100 animate-pulse bg-gray-300 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-gray-900 border rounded-l-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"></button>
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="block bg-gray-300 animate-pulse p-2.5 w-full z-20 text-sm rounded-r-lg border-l-2 border dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </form>
                <button className="group justify-center text-sm font-medium text-gray-700 hidden"></button>
              </div>
              <div className="origin-top-left absolute left-0 z-10 mt-2 w-50 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none hidden"></div>
            </div>
            <div className="w-20 h-6 relative inline-block text-left flex-2 bg-gray-300 animate-pulse">
              <div className="flex items-center"></div>
            </div>
            <div className="h-6 w-20 relative inline-block text-left flex-2 bg-gray-300 animate-pulse ml-3">
              <div className="flex items-center"></div>
            </div>
          </div>
        </section>
      </div>
      <section className="py-[96px] px-4 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="ml-8 lg:px-8 px-4 bg-gray-300 animate-pulse w-40 h-6"></div>
          <div className="max-w-[86rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-9  mt-10 mb-5 gap-x-9">
            {new Array(6).fill(0).map((_, idx) => {
              return (
                <div
                  className="relative w-full bg-white dark:bg-navy-700 animate-pulse shadow-md rounded-xl"
                  key={idx}
                >
                  <div className="relative group">
                    <div>
                      <p className="h-80 w-full object-cover rounded-t-xl"></p>
                      <div className="w-full absolute bottom-0 text-center bg-[rgba(0,0,0,.7)] dark:bg-navy-200"></div>
                    </div>
                  </div>
                  <div className="px-4 py-3 w-full border-t-[1px] border-gray-300">
                    <span className="text-gray-400 dark:text-white mr-3 uppercase text-xs"></span>
                    <p className="text-lg font-bold text-black dark:text-white truncate block capitalize"></p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold text-black dark:text-white cursor-auto my-3"></p>
                      <div>
                        <p className="text-sm text-gray-600 cursor-auto ml-2 line-through"></p>
                      </div>
                      <div className="ml-auto"></div>
                    </div>
                  </div>
                  <div className="absolute -right-3 -top-3"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
