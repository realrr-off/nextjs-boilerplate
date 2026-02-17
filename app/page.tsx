export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-24">
      <h1 className="text-5xl font-bold leading-tight max-w-3xl">
        Build Roblox Games Faster
      </h1>

      <p className="mt-6 text-lg text-white/70 max-w-2xl">
        A centralized toolkit for scripts, assets, systems, and development workflows —
        built for serious Roblox developers.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
          Explore Assets
        </button>

        <button className="border border-white/20 px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition">
          Open Dashboard
        </button>
      </div>
    </section>
  )
}
