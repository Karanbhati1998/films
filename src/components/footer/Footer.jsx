import "./style.scss";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import ContentWrapper from '../conntentWrapper/ContentWrapper'
const Footer = () => {
  return (
    <div className="footer">
      <ContentWrapper>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="textContent">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur ea minima enim impedit vel rerum deleniti id natus! Fugiat ut voluptatum aperiam quam voluptate a quo, iure eius explicabo nesciunt temporibus qui! Illo aperiam numquam dolores impedit. Dolores vero autem ab modi quos fugit, distinctio, voluptate possimus fuga nisi cum!
        </div>
        <div className="socialIcons">
          <span className="icon"><FaFacebookF/></span>
          <span className="icon"><FaInstagram/></span>
          <span className="icon"><FaTwitter/></span>
          <span className="icon"><FaLinkedin/></span>
          </div>
      </ContentWrapper>
    </div>
  )
}

export default Footer