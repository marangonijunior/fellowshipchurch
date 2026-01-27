import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <p className="text-primary uppercase tracking-wide mb-4">About us</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold">
            Serving the world around us
          </h1>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <p className="text-dark/60 uppercase tracking-wide mb-4 text-center">
            Welcome to our church
          </p>
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-8">
            Love and compassion
          </h2>
          <p className="text-center text-dark/70 max-w-3xl mx-auto mb-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="rounded-2xl overflow-hidden h-80 bg-gray-200">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80')] bg-cover bg-center"></div>
            </div>
            <div className="rounded-2xl overflow-hidden h-80 bg-gray-200 md:-mt-12">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80')] bg-cover bg-center"></div>
            </div>
            <div className="rounded-2xl overflow-hidden h-80 bg-gray-200">
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-dark/60 uppercase tracking-wide mb-4">Our mission & vision</p>
              <h2 className="text-4xl md:text-5xl font-heading mb-6">
                Striving for a better tomorrow
              </h2>
              <p className="text-dark/70 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-dark/70">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477281765962-ef34e8bb0967?q=80')] bg-cover bg-center"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-full min-h-[400px] rounded-2xl overflow-hidden order-2 lg:order-1">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80')] bg-cover bg-center"></div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-dark/60 uppercase tracking-wide mb-4">What we do</p>
              <h2 className="text-4xl md:text-5xl font-heading mb-6">
                Bringing peace and joy to the world
              </h2>
              <p className="text-dark/70 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-dark/70">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <p className="text-dark/60 uppercase tracking-wide mb-4 text-center">Benefits</p>
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">
            The benefits of joining our church
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cream-dark p-8 rounded-lg">
              <h3 className="text-2xl font-heading font-bold mb-4">Find fulfillment and joy</h3>
              <p className="text-dark/70 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="bg-cream-dark p-8 rounded-lg">
              <h3 className="text-2xl font-heading font-bold mb-4">Shared values</h3>
              <p className="text-dark/70 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="bg-cream-dark p-8 rounded-lg">
              <h3 className="text-2xl font-heading font-bold mb-4">Charity events</h3>
              <p className="text-dark/70 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="bg-cream-dark p-8 rounded-lg">
              <h3 className="text-2xl font-heading font-bold mb-4">All are welcome</h3>
              <p className="text-dark/70 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <p className="text-dark/60 uppercase tracking-wide mb-4 text-center">Church members</p>
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">
            Meet our inspirational team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Kim Brown", role: "Pastor, Church" },
              { name: "Danielle Watkins", role: "Pastor, Church" },
              { name: "Naomi Craig", role: "Pastor, Church" },
              { name: "Santos Payne", role: "Pastor, Church" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(https://i.pravatar.cc/150?img=${index + 10})` }}
                  ></div>
                </div>
                <h3 className="text-xl font-heading font-bold mb-1">{member.name}</h3>
                <p className="text-dark/60 text-sm mb-4">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-dark hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-dark hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-dark hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
