import React from 'react';
import headerImg from '../../assets/Frame_1.svg';
import HamburgerMenu from './Menu.tsx';

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-gray-800 w-full flex items-center justify-between px-4 py-2 rounded-md shadow-sm mb-8 gap-4">
      <div className="shrink-0">
        <img className="w-[clamp(6rem,8vw,8rem)]" src={headerImg} alt="Meetverse logo" />
      </div>

      <div className="min-w-0 flex-1">
        <h1 className="text-[clamp(0.5rem,4vw,2.25rem)] text-white font-bold leading-tight text-center">
          {title}
        </h1>
      </div>

      <div className="shrink-0">
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
