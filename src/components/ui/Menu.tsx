import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import hamburgerIcon from '../../assets/bars-solid-full.svg';

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <div className="relative ml-auto">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 focus:outline-none"
      >
        <img
          src={hamburgerIcon}
          className="w-8 h-8 lg:w-10 lg:h-10"
          alt="Hamburger menu"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-35 bg-gray-800 text-white rounded-lg shadow-lg flex flex-col transition-all duration-200 p-2 lg:w-50 border-solid border-gray-900 border-1">
          <Link
            to="/profile"
            className="px-4 py-2 hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Profil
          </Link>
          <Link
            to="/meetups"
            className="px-4 py-2 hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            Meetups
          </Link>
          <button
            onClick={handleLogout}
            className="text-left px-4 py-2 hover:bg-gray-700"
          >
            Logga ut
          </button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
