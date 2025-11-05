import React from 'react';

const base =
  'inline-flex items-center justify-center px-5 py-3 rounded-sm bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-md hover:shadow-lg hover:opacity-95 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 w-full ';

export default function Button({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${base} ${className}`}>
      {children}
    </button>
  );
}

/* Exempelanvändning: 
Enkel:
<Button type="submit">Skicka in</Button>

Med props:
<Button
  type="submit"
  onClick={() => console.log("Skickar…")}
  disabled
  title="Skicka in din recension"
>
  Skicka in
</Button>

Med anpassad klass:
<Button className="bg-green-500 hover:bg-green-600">
  Skicka in
</Button>
*/