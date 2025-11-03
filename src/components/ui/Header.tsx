import React from 'react';
import headerImg from '../../assets/Frame_1.svg';

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-slate-800 w-full flex text-2xl lg:text-4xl items-center font-bold mb-8 text-center px-4 py-2 gap-3 lg:gap-4 rounded-md shadow-sm">
      <img className="w-[clamp(6rem,8vw,8rem)]" src={headerImg} alt="Meetverse logo" />
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-center leading-tight">{title}</h1>
    </header>
  );
};

export default Header;

/* Exempelanvänding:
   <Header title='Betygsätt & Recensera' />
*/
