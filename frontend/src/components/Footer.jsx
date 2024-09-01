import '../styles/Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <div className="bg">
      <div className="mw footer">
        <div className="descript">
          <h3>
            organic Kitcheen
            <br />
            recipes.
          </h3>
          <p>
            We provide easy-to-follow guides and tips for preparing nutritious
            meals using organic ingredients, helping you make better choices for
            yourself and the planet.
          </p>
        </div>
        <button className="btn-secondary"><Link to="/login">Sign in</Link></button>
      </div>
    </div>
    <p className='copyright'>Copyright© organic kitcheen recipes. All Rights Reserved.</p>
    </>
  );
};

export default Footer;
