import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer
      className=" py-10  md:py-20 px-4"
      style={{
        backgroundColor: "#5d3754",
        color: "rgba(255, 255, 255, 0.75)",
      }}
    >
      <div className="max-w-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="py-4 -mt-10">
              <img
                src="/richony-logo.png"
                alt="Richony Logo"
                className="max-w-[140px] h-auto -ml-5"
                loading="lazy"
                width="353"
                height="707"
              />
            </div>

            <div className="mb-5">
              <address className="not-italic">
                <p className="mb-0 text-white text-center md:text-start">
                  Richony was founded on the belief that wellness is more than
                  just a necessity—it's a powerful expression of self-care and
                  vitality.
                </p>
              </address>
            </div>
            <div className="flex gap-2 flex-wrap">
              {/* Social Media Icons */}
              {/* <Link
                to="#"
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-80"
                aria-label="Twitter"
              >
                <svg
                  viewBox="0 0 1226.37 1226.37"
                  className="w-3 h-3"
                  style={{ color: "#5d3754" }}
                >
                  <path
                    fill="currentColor"
                    d="m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z"
                  />
                </svg>
              </Link> */}
              <Link
                to="https://www.instagram.com/richonyoudcandles.perfume?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center ml-2 mb-2 transition-all duration-300 hover:opacity-80"
                aria-label="Instagram"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 18 18"
                  style={{ color: "#5d3754" }}
                >
                  <path
                    fill="currentColor"
                    d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"
                  />
                  <path
                    fill="currentColor"
                    d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"
                  />
                </svg>
              </Link>
              <Link
                to="https://www.facebook.com/people/Richony-Oud-Candles/pfbid0369xHEwaTTVpxKubCUnWRMkESRa2kFfRXgG84fdCr8YwjtBQN3A1sA2F5TgA4oe6gl/#"
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center ml-2 mb-2 transition-all duration-300 hover:opacity-80"
                aria-label="Facebook"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 32 32"
                  style={{ color: "#5d3754" }}
                >
                  <path
                    fill="currentColor"
                    d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z"
                  />
                </svg>
              </Link>
              {/* <Link
                to="#"
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center ml-2 mb-2 transition-all duration-300 hover:opacity-80"
                aria-label="Pinterest"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 17 18"
                  style={{ color: "#5d3754" }}
                >
                  <path
                    fill="currentColor"
                    d="M8.48.58a8.42 8.42 0 015.9 2.45 8.42 8.42 0 011.33 10.08 8.28 8.28 0 01-7.23 4.16 8.5 8.5 0 01-2.37-.32c.42-.68.7-1.29.85-1.8l.59-2.29c.14.28.41.52.8.73.4.2.8.31 1.24.31.87 0 1.65-.25 2.34-.75a4.87 4.87 0 001.6-2.05 7.3 7.3 0 00.56-2.93c0-1.3-.5-2.41-1.49-3.36a5.27 5.27 0 00-3.8-1.43c-.93 0-1.8.16-2.58.48A5.23 5.23 0 002.85 8.6c0 .75.14 1.41.43 1.98.28.56.7.96 1.27 1.2.1.04.19.04.26 0 .07-.03.12-.1.15-.2l.18-.68c.05-.15.02-.3-.11-.45a2.35 2.35 0 01-.57-1.63A3.96 3.96 0 018.6 4.8c1.09 0 1.94.3 2.54.89.61.6.92 1.37.92 2.32 0 .8-.11 1.54-.33 2.21a3.97 3.97 0 01-.93 1.62c-.4.4-.87.6-1.4.6-.43 0-.78-.15-1.06-.47-.27-.32-.36-.7-.26-1.13a111.14 111.14 0 01.47-1.6l.18-.73c.06-.26.09-.47.09-.65 0-.36-.1-.66-.28-.89-.2-.23-.47-.35-.83-.35-.45 0-.83.2-1.13.62-.3.41-.46.93-.46 1.56a4.1 4.1 0 00.18 1.15l.06.15c-.6 2.58-.95 4.1-1.08 4.54-.12.55-.16 1.2-.13 1.94a8.4 8.4 0 01-5-7.65c0-2.3.81-4.28 2.44-5.9A8.04 8.04 0 018.48.57z"
                  />
                </svg>
              </Link>
              <Link
                to="#"
                className="w-9 h-9 bg-white rounded-full flex items-center justify-center ml-2 mb-2 transition-all duration-300 hover:opacity-80"
                aria-label="Snapchat"
              >
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 392 386"
                  style={{ color: "#5d3754" }}
                >
                  <path
                    d="M390.3 282.3a27.2 27.2 0 00-13.8-14.7l-3-1.6-5.4-2.7a117 117 0 01-42.7-36.6 83 83 0 01-7.3-13c-.8-2.4-.8-3.8-.2-5 .6-1 1.4-1.9 2.4-2.5a1073.6 1073.6 0 0117.7-11.7 49.5 49.5 0 0016-17.1 33.6 33.6 0 00-30.8-49.7 44.8 44.8 0 00-11.8 1.6c.1-9 0-18.6-.9-27.9A105 105 0 00257.4 16 122 122 0 00196 .3c-22.5 0-43 5.3-61.3 15.7a104.6 104.6 0 00-53.2 85.4c-.8 9.4-1 19-.8 27.9a44.8 44.8 0 00-12-1.6 33.7 33.7 0 00-30.8 49.7A49.6 49.6 0 0054 194.6l9.1 6 8.3 5.4c1 .7 2 1.6 2.6 2.7.7 1.3.7 2.7-.2 5.3-2 4.5-4.5 8.7-7.3 12.8a116.5 116.5 0 01-41.4 36c-9.5 5-19.3 8.3-23.4 19.5-3.1 8.5-1 18.2 6.9 26.3 2.9 3 6.2 5.6 10 7.6 7.7 4.2 15.9 7.5 24.4 9.8a16 16 0 015 2.2c2.9 2.5 2.4 6.3 6.3 12 2 2.8 4.4 5.3 7.2 7.3 8.1 5.6 17.2 6 26.8 6.3 8.7.3 18.5.7 29.8 4.4 4.7 1.5 9.5 4.5 15.1 8a110 110 0 0062.8 19.6c30.8 0 49.4-11.4 63-19.7a77.9 77.9 0 0114.9-7.9c11.2-3.7 21-4 29.8-4.4 9.6-.4 18.7-.7 26.8-6.3 3.3-2.3 6.2-5.4 8.2-9 2.8-4.7 2.7-8 5.3-10.3 1.4-1 3-1.7 4.6-2.1 8.7-2.3 17-5.6 24.8-9.9A39 39 0 00384 308l.1-.1c7.5-8 9.4-17.4 6.3-25.6zM362.9 297c-16.8 9.2-27.9 8.3-36.5 13.8-7.4 4.8-3 15-8.4 18.6-6.5 4.6-26-.3-51 8-20.6 6.8-33.8 26.5-71 26.5-37.1 0-50-19.6-71-26.6-25-8.2-44.4-3.4-51-8-5.3-3.6-1-13.8-8.3-18.5-8.7-5.6-19.8-4.6-36.5-13.8-10.7-5.9-4.6-9.5-1.1-11.2 60.6-29.4 70.3-74.7 70.7-78 .5-4.1 1.1-7.3-3.4-11.5-4.3-4-23.5-15.8-28.9-19.6-8.8-6.1-12.6-12.3-9.8-19.8 2-5.3 6.9-7.2 12-7.2 1.6 0 3.2.2 4.8.5 9.7 2.1 19.1 7 24.5 8.3l2 .2c3 0 4-1.4 3.8-4.7-.7-10.6-2.2-31.3-.5-50.6a80 80 0 0121-51.3A93.7 93.7 0 01196 22.3c43.8 0 66.8 24.1 71.7 29.7a80 80 0 0121 51.3c1.7 19.3.2 40-.5 50.5-.2 3.5.9 4.8 3.8 4.8.6 0 1.3 0 2-.3 5.4-1.3 14.8-6.1 24.5-8.2a19 19 0 014.8-.5c5.1 0 10 2 12 7.2 2.8 7.5-1 13.7-9.9 19.8-5.3 3.7-24.5 15.6-28.8 19.6-4.5 4.2-4 7.4-3.4 11.4.4 3.5 10 48.8 70.7 78 3.6 1.8 9.6 5.5-1 11.4z"
                    fill="currentColor"
                  />
                </svg>
              </Link> */}
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-center gap-10 md:gap-20">
            {/* Useful Links */}
            <div className="flex flex-col w-fit">
              <h2
                className="text-xl font-medium capitalize relative overflow-hidden mb-8 pr-5 text-white"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  lineHeight: "26px",
                }}
              >
                Useful Links
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/account"
                    className="text-white hover:opacity-80 transition-all duration-300 block"
                    style={{ lineHeight: "28.19px" }}
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-white hover:opacity-80 transition-all duration-300 block"
                    style={{ lineHeight: "28.19px" }}
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="text-white hover:opacity-80 transition-all duration-300 block"
                    style={{ lineHeight: "28.19px" }}
                  >
                    My Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-white hover:opacity-80 transition-all duration-300 block"
                    style={{ lineHeight: "28.19px" }}
                  >
                    Our Store Info
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div className="flex flex-col w-fit">
              <h2
                className="text-xl font-medium capitalize relative overflow-hidden mb-8 pr-5 text-white"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  lineHeight: "26px",
                }}
              >
                Information
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/account?tab=orders"
                    className="text-white hover:opacity-80 transition-all duration-300 block"
                    style={{ lineHeight: "28.19px" }}
                  >
                    Order tracking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="text-white hover:opacity-80 transition-all duration-300 block"
                    style={{ lineHeight: "28.19px" }}
                  >
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-white hover:opacity-80 transition-all duration-300 block"
                    style={{ lineHeight: "28.19px" }}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-white hover:opacity-80 transition-all duration-300 block"
                    style={{ lineHeight: "28.19px" }}
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col self-start gap-4 md:ml-4">
            <h2
              className="text-xl text-center md:text-start font-medium capitalize relative overflow-hidden pr-5 text-white"
              style={{
                fontFamily: '"Playfair Display", serif',
                lineHeight: "26px",
              }}
            >
              Newsletter
            </h2>
            <div>
              <p className="mb-4 text-white">
                Subscribe to our newsletter to receive news on update.
              </p>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full h-11 px-4  text-white rounded-xl border border-white/70 text-sm"
                  style={{
                    backgroundColor: "#5d3754",
                    fontSize: "15px",
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/75 hover:text-white transition-colors duration-300"
                  aria-label="Subscribe"
                >
                  <svg viewBox="0 0 14 10" fill="none" className="w-4 h-4">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
