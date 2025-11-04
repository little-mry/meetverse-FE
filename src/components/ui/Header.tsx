import React from 'react';
import headerImg from '../../assets/Frame_1.svg';
import HamburgerMenu from '../ui/Menu.tsx'

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-gray-800 w-full flex items-center justify-between px-4 py-2 rounded-md shadow-sm mb-8">
      <div className="flex items-center gap-3">
        <img
          className="w-[clamp(6rem,8vw,8rem)]"
          src={headerImg}
          alt="Meetverse logo"
        />
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight">
          {title}
        </h1>
      </div>
      <HamburgerMenu />
    </header>
  );
};

export default Header;

/* Exempelanvänding:
   <Header title='Betygsätt & Recensera' />
*/
