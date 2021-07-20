import "./footer.css";
import { FaTelegram, FaCodepen } from "react-icons/fa";
import { GrLinkedin } from "react-icons/gr";
import { GoMarkGithub } from "react-icons/go";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <div className="footer">
      <div className="about">
        <h2>About</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          voluptates non ipsam ea incidunt vel hic mollitia cum commodi harum
        </p>
      </div>
      <section class="social">
        <div class="social-container">
          <a href="#">
            <GrLinkedin />
          </a>
          <a href="#">
            <GoMarkGithub />
          </a>
          <a href="#">
            <FaCodepen />
          </a>
          <a href="#">
            <MdEmail />
          </a>
          <a href="#">
            <FaTelegram />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Footer;
