import Image from "next/image";

const AboutUs = () => {
  return (
    <section className="px-5 md:px-10  py-[96px]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2">
        <div>
          <Image
            src="/shoe-section.jpg"
            alt="shoe image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="md:py-16 md:px-12">
          <p className="text-[#f6aa28] uppercase tracking-wider leading-7 mb-5 mt-5 md:mt-0">
            About Us
          </p>
          <h1 className="text-4xl font-semibold text-start mb-5">
            Selected materials designed for comfort and sustainability
          </h1>
          <p className="text-[#a0a5a7] mb-5">
            Nullam auctor faucibus ridiculus dignissim sed et auctor sed eget
            auctor nec sed elit nunc, magna non urna amet ac neque ut quam enim
            pretium risus gravida ullamcorper adipiscing at ut magna.
          </p>
          <button className="uppercase border-b-2 border-y-amber-500 hover:border-b-zinc-950 transform duration-200">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
