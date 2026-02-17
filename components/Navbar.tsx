export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">
        Realrr Toolkit
      </h1>

      <div className="space-x-6 text-sm text-white/70">
        <button className="hover:text-white transition">
          Assets
        </button>
        <button className="hover:text-white transition">
          Dashboard
        </button>
        <button className="hover:text-white transition">
          Login
        </button>
      </div>
    </nav>
  )
}
