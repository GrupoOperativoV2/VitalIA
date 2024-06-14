import React from "react";
import { footerVariants, staggerChildren } from "../../utils/motion";
import css from "./Footer.module.scss";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login");
  };

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`paddings ${css.wrapper}`}
    >
      <motion.div
        variants={footerVariants}
        className={`innerWidth yPaddings flexCenter ${css.container}`}
      >
        <div className={css.left}>
          <span className="primaryText">
            Hagamos algo <br />
            increíble juntos.
          </span>
          <span className="primaryText">
            Regístrate <a onClick={handleNavigate}>VitalIA</a>
          </span>
        </div>

        <div className={css.right}>
          <div className={css.info}>
            <span className="secondaryText">Información</span>
            <p>
              Mar Mediterráneo no. 227, Col. Popotla, c. p. 11400, Alcaldía
              Miguel Hidalgo, Ciudad de México, CDMX Ciudad de México, Ciudad de
              México, México
            </p>
          </div>
          <div className={css.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.119768745916!2d-99.1814507846836!3d19.45284698688398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f92fdb7b8fd3%3A0x756d8dff4c260e3e!2sMar%20Mediterr%C3%A1neo%20227%2C%20Popotla%2C%20Miguel%20Hidalgo%2C%2011400%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX%2C%20Mexico!5e0!3m2!1sen!2sus!4v1626208158171!5m2!1sen!2sus"
              width="300"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Footer;
