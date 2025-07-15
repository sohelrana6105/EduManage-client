import React from "react";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Volkswagen",
    logo: "https://i.ibb.co/NgSRRRbd/Volkswagen.png",
    description: "Driving innovation in technical education worldwide.",
  },
  {
    name: "Samsung",
    logo: "https://i.ibb.co/5WdW3Wst/Samsung.png",
    description: "Empowering learners through technology and devices.",
  },
  {
    name: "Cisco",
    logo: "https://i.ibb.co/Y4D425NW/Cisco.png",
    description: "Helping students build careers in networking and security.",
  },
  {
    name: "AT&T",
    logo: "https://i.ibb.co/FqNFdpRv/AT-T.png",
    description: "Expanding remote learning through connectivity.",
  },
  {
    name: "P&G",
    logo: "https://i.ibb.co/6Rtsc0rV/P-G.png",
    description: "Supporting youth education initiatives globally.",
  },
  {
    name: "Thomson Reuters",
    logo: "https://i.ibb.co/G3dV7dZX/Thomson-Reuters.png",
    description: "Providing knowledge access for legal and business education.",
  },
  {
    name: "Citi",
    logo: "https://i.ibb.co/Zz2PpJ68/Citi.png",
    description: "Funding scholarship and digital banking literacy.",
  },
  {
    name: "Ericsson",
    logo: "https://i.ibb.co/Txw29GZN/Ericsson.png",
    description: "Contributing to ICT and mobile tech education.",
  },
];

const PartnerLogos = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Partners</h2>
        <p className="text-gray-500 text-sm mb-12">
          Trusted by over <strong>8,000</strong> companies and millions of
          learners around the world
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow-sm rounded-lg flex flex-col items-center hover:shadow-md transition"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain mb-4 grayscale hover:grayscale-0 transition"
                loading="lazy"
              />
              <h4 className="font-semibold text-gray-800">{partner.name}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PartnerLogos;
