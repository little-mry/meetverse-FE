export default function MeetupsPage() {
  return (
    <main className="main text-white p-5 flex flex-col">
      <header className="w-full flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-8 text-center pt-9 ">Hitta Meetups</h1>
        
        <input
          type="text"
          placeholder="Sök efter meetups..."
          className="w-11/12 sm:w-96 p-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-center mb-4"
        />

        <div className="flex flex-col sm:flex-row gap-3 w-11/12 sm:w-auto justify-center">
          <input
            type="date"
            className="p-2 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-44"
          />

          <select className="p-2 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-44">
            <option value="">Plats</option>
            <option>Stockholm</option>
            <option>Göteborg</option>
            <option>Malmö</option>
            <option>Uppsala</option>
          </select>

          <select className="p-2 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-44">
            <option value="">Kategori</option>
            <option>Tech</option>
            <option>Matlagning</option>
            <option>Kreativt</option>
            <option>Hälsa</option>
            <option>Gaming</option>
          </select>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
        <article className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Kodkväll & Pizza</h2>
            <p className="text-gray-300 text-sm mt-1">En kväll med kod, pizza och gott sällskap!</p>
            <p className="text-sm text-gray-400 mt-2">Stockholm</p>
            <p className="text-sm text-gray-400"> 12 nov 2025 • 18:00</p>
            <p className="text-xs mt-3 text-purple-400 font-medium">Kategori: Tech</p>
          </div>
        </article>

        <article className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Kodkväll & Pizza</h2>
            <p className="text-gray-300 text-sm mt-1">En kväll med kod, pizza och gott sällskap!</p>
            <p className="text-sm text-gray-400 mt-2">Stockholm</p>
            <p className="text-sm text-gray-400"> 12 nov 2025 • 18:00</p>
            <p className="text-xs mt-3 text-purple-400 font-medium">Kategori: Tech</p>
          </div>
        </article>

        <article className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Kodkväll & Pizza</h2>
            <p className="text-gray-300 text-sm mt-1">En kväll med kod, pizza och gott sällskap!</p>
            <p className="text-sm text-gray-400 mt-2">Stockholm</p>
            <p className="text-sm text-gray-400"> 12 nov 2025 • 18:00</p>
            <p className="text-xs mt-3 text-purple-400 font-medium">Kategori: Tech</p>
          </div>
        </article>
      </section>
    </main>
  );
}
