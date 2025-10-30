export default function MeetupsPage() {
  return (
    <main className="main text-white p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6">Hitta Meetups</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Sök efter meetups..."
          className="w-full p-2 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <section className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3">
        <article className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          {/* <img
            src="https://images.unsplash.com/photo-1601924928353-3e3a7e8e34f3?auto=format&fit=crop&w=800&q=60"
            alt="Meetup"
            className="h-48 w-full object-cover"
          /> */}
          <div className="p-4">
            <h2 className="text-lg font-semibold">Kodkväll & Pizza</h2>
            <p className="text-gray-300 text-sm mt-1">En kväll med kod, pizza och gott sällskap!</p>
            <p className="text-sm text-gray-400 mt-2">Stockholm</p>
            <p className="text-sm text-gray-400"> 12 nov 2025 • 18:00</p>
            <p className="text-xs mt-3 text-purple-400 font-medium">Kategori: Tech</p>
          </div>
        </article>

        <article className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          {/* <img
            src="https://images.unsplash.com/photo-1601924928353-3e3a7e8e34f3?auto=format&fit=crop&w=800&q=60"
            alt="Meetup"
            className="h-48 w-full object-cover"
          /> */}
          <div className="p-4">
            <h2 className="text-lg font-semibold">Kodkväll & Pizza</h2>
            <p className="text-gray-300 text-sm mt-1">En kväll med kod, pizza och gott sällskap!</p>
            <p className="text-sm text-gray-400 mt-2">Stockholm</p>
            <p className="text-sm text-gray-400"> 12 nov 2025 • 18:00</p>
            <p className="text-xs mt-3 text-purple-400 font-medium">Kategori: Tech</p>
          </div>
        </article>

        <article className="bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          {/* <img
            src="https://images.unsplash.com/photo-1601924928353-3e3a7e8e34f3?auto=format&fit=crop&w=800&q=60"
            alt="Meetup"
            className="h-48 w-full object-cover"
          /> */}
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
