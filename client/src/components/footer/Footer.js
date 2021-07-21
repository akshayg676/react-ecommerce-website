import "./footer.css";
import { FaTelegram, FaCodepen, FaGlobe } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { GoMarkGithub } from "react-icons/go";
import { MdEmail } from "react-icons/md";

const iconStyle = {
  color: "black",
  margin: " 0 15px",
};

function Footer() {
  return (
    <div className="footer">
      <section class="social">
        <div class="social-container">
          <a href="#">
            <FaGlobe style={iconStyle} />
          </a>
          <a href="#">
            <GrLinkedin style={iconStyle} />
          </a>

          <a href="#">
            <GoMarkGithub style={iconStyle} />
          </a>
          <a href="#">
            <FaCodepen style={iconStyle} />
          </a>
          <a href="#">
            <MdEmail style={iconStyle} />
          </a>
        </div>
      </section>
      <div className="copyright">© 2021 | All rights reserved</div>
    </div>
  );
}

export default Footer;
