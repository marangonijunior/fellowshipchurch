"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-dark/80 to-dark/60">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative container-custom h-full flex flex-col justify-center text-white">
          <p className="text-primary uppercase tracking-wide mb-4">Contact us</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold">
            We&apos;d love to hear from you
          </h1>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <p className="text-dark/60 uppercase tracking-wide mb-4 text-center">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-5xl font-heading text-center mb-16">
            Contact information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-dark" size={28} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Address</h3>
              <p className="text-dark/70">
                4517 Washington Ave.<br />
                Manchester, Kentucky 39495
              </p>
            </div>

            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-dark" size={28} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Phone</h3>
              <p className="text-dark/70">
                (480) 555-0103<br />
                (219) 555-0114
              </p>
            </div>

            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-dark" size={28} />
              </div>
              <h3 className="text-xl font-heading font-bold mb-2">Email</h3>
              <p className="text-dark/70">
                info@fellowshipchurch.com<br />
                contact@fellowshipchurch.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-heading font-bold mb-2 text-center">
              Send us a message
            </h2>
            <p className="text-dark/70 text-center mb-8">
              Fill out the form below and we&apos;ll get back to you as soon as possible.
            </p>

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                Thank you for your message! We&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                />
                <label htmlFor="consent" className="ml-2 block text-sm text-dark/70">
                  I agree to the terms and conditions and privacy policy. *
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section (Optional - using placeholder) */}
      <section className="py-0">
        <div className="w-full h-96 bg-gray-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2175981537827!2d-73.98784668459396!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <Footer />
    </>
  );
}
