import Footer from "@/app/components/Homepage/Footer";
import Navbar from "@/app/components/Homepage/Navbar";
import { contactItems } from "@/app/helper/items-list-icon";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import ContactForm from "./ContactForm";
import { getAllProduct } from "@/app/actions/getAllProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us if you need any help or question.",
};

const ContactPage = async () => {
  const products = await getAllProduct();
  return (
    <>
      <Navbar products={products} />
      <div className="max-w-3xl mx-auto text-center lg:max-w-7xl lg:px-8 px-4">
        <div className="max-w-[720px] mx-auto py-4 md:py-10 text-center">
          <h1 className="text-6xl tracking-tight text-[#262b2c] dark:text-white">
            Contact
          </h1>
        </div>
      </div>

      <section className="border border-[#ffff] border-x-0 md:border-x-[40px] px-4 py-6 md:py-24 md:px-10 bg-[#f1f1ef] dark:border-navy-900 dark:bg-navy-800">
        <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
          <div className="flex items-center md:items-start flex-col md:pr-20 w-full md:w-[33.333%]">
            {contactItems.map((item, idx) => (
              <div
                className="flex items-center md:items-start flex-col md:flex-row border-b-2 border-[#e4e6e7] pt-4"
                key={idx}
              >
                <p className="text-[#6e7051] text-xl pb-3 md:pb-0">
                  {item.icon}
                </p>
                <div className="pl-4 pb-4">
                  <h1 className="text-xl mb-3">{item.title}</h1>
                  <p className="text-[#979a9b] text-center md:text-start">
                    {item.info} <br />
                    {item.br}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-col mt-6">
              <h1 className="uppercase tracking-widest">Stay in Touch</h1>
              <div className="flex items-center justify-between text-[#6e7051] text-2xl py-4">
                <FaFacebook />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Ferquently Asked Question */}
      <section className="px-10 py-24">
        <div
          className="max-w-2xl mx-auto flex items-center justify-center flex-col"
          id="faqs"
        >
          <div className="w-full">
            <h1 className="text-4xl text-center mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#979a9b] text-center mb-10">
              Purus amet scelerisque nisl nibh felis massa a enim gravida
            </p>
          </div>
          <ul className="w-full">
            <li>
              <details className="group">
                <summary className="flex items-center justify-between gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer border border-[#e4e6e7]">
                  <span>What am I getting as a Premium Member?</span>
                  <IoIosArrowForward className="w-5 h-5 text-gray-500 transition group-open:rotate-90" />
                </summary>

                <article className="px-4 pb-4 border border-[#e4e6e7]">
                  <p className="text-[#979a9b] text-lg p-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center justify-between gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer border border-[#e4e6e7]">
                  <span>What am I getting as a Premium Member?</span>
                  <IoIosArrowForward className="w-5 h-5 text-gray-500 transition group-open:rotate-90" />
                </summary>

                <article className="px-4 pb-4 border border-[#e4e6e7]">
                  <p className="text-[#979a9b] text-lg p-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center justify-between gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer border border-[#e4e6e7]">
                  <span>What am I getting as a Premium Member?</span>
                  <IoIosArrowForward className="w-5 h-5 text-gray-500 transition group-open:rotate-90" />
                </summary>

                <article className="px-4 pb-4 border border-[#e4e6e7]">
                  <p className="text-[#979a9b] text-lg p-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.
                  </p>
                </article>
              </details>
            </li>
            <li>
              <details className="group">
                <summary className="flex items-center justify-between gap-3 px-4 py-3 font-medium marker:content-none hover:cursor-pointer border border-[#e4e6e7]">
                  <span>What am I getting as a Premium Member?</span>
                  <IoIosArrowForward className="w-5 h-5 text-gray-500 transition group-open:rotate-90" />
                </summary>

                <article className="px-4 pb-4 border border-[#e4e6e7]">
                  <p className="text-[#979a9b] text-lg p-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    et ipsum sapien. Vestibulum molestie porttitor augue vitae
                    vulputate. Aliquam nec ex maximus, suscipit diam vel,
                    tristique tellus.
                  </p>
                </article>
              </details>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
