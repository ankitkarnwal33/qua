import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/FAQs";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <Header />
      <section className="gradient-4 rounded-3xl mt-4 px-10 py-16 flex flex-col-reverse lg:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F2F2F] mb-6">
            Turn Your Network into a Healthier, Happier Community - and Get
            Rewarded!
          </h2>
          <p className="text-[#2F2F2F] mb-8">
            Join QUA Nutrition’s Referral & Partner Program to share
            personalized nutrition plans backed by science. Whether you&#39;re
            an individual who believes in healthy living or a business looking
            to empower your audience - you can earn incentives while helping
            others achieve their wellness goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href={"/auth/signup"}
              className="gradient text-[15px] text-white px-6 py-3 rounded-md font-semibold shadow-md hover:opacity-90 transition"
            >
              Register as Individual
            </Link>
            <Link
              href={"/auth/signpart"}
              className="border border-orange-400 text-[15px] text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-orange-50 transition"
            >
              Register as Partner
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 mb-10 lg:mb-0 flex justify-center">
          <Image
            src={"/images/main.png"}
            width={600}
            height={400}
            alt="Main Image"
          />
        </div>
      </section>
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#020817] mb-12">
          Why Join?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#2F2F2F] text-white rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="gradient-5 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="currentColor"
                  // viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M320 96L192 96 144.6 24.9C137.5 14.2 145.1 0 157.9 0L354.1 0c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128l128 0c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96L96 512c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4c0 0 0 0 0 0s0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c0 0 0 0 0 0s0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15c0 0 0 0 0 0l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7l0-13.9z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#F5EAD7]">
              Cash Incentives
            </h3>
            <p className="text-sm  text-[#F5EAD7]">
              Earn ₹500 for every successful referral - no limits!
            </p>
          </div>

          <div className="bg-[#2F2F2F] text-white rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="gradient-5 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1a11 11 0 110 22 11 11 0 010-22zm1 11V6h-2v8h6v-2h-4z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#F5EAD7]">
              Flexible Participation
            </h3>
            <p className="text-sm  text-[#F5EAD7]">
              Refer one friend or a hundred ,it&#39;s up to you.
            </p>
          </div>

          <div className="bg-[#2F2F2F] text-white rounded-lg p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="gradient-5 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2 text-[#F5EAD7]">
              Dedicated Support
            </h3>
            <p className="text-sm  text-[#F5EAD7]">
              Get 24/7 chat support plus ready-to-use marketing materials.
            </p>
          </div>
        </div>
      </section>
      <div className="w-full gradient-4" id="section-3">
        <section className="py-16 px-6 max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-center   text-[#2F2F2F] mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full gradient text-white font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#020817]">
                Sign Up as Individual or Partner
              </h3>
              <p className="text-sm text-[#4B5563]">
                Create your account and access your personal referral dashboard.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full gradient text-white font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#020817]">
                Share Your Unique Referral Link
              </h3>
              <p className="text-sm text-[#4B5563]">
                Distribute your personalized link to friends and network.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full gradient text-white font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-bold text-lg mb-2 text-[#020817]">
                Track Status & Earn Rewards
              </h3>
              <p className="text-sm text-[#4B5563]">
                Watch your referrals grow and receive ₹500 for each conversion.
              </p>
            </div>
          </div>
        </section>
      </div>
      <TestimonialCarousel />
      <FaqSection />
      <Footer />
    </>
  );
}
