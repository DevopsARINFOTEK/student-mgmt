export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center relative w-full px-8 py-6">

        <div className="absolute left-8">
          <img
            src="/logo.png"
            alt="AR INFOTEK"
            className="h-14 w-auto"
          />
        </div>

        <h1 className="text-5xl font-black text-[#1e5aa8]">
          Student Registration Form
        </h1>

      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center gap-3 px-4 py-3">

        <img
          src="/logo.png"
          alt="AR INFOTEK"
          className="h-8"
        />

        <span className="font-bold text-[#1e5aa8]">
          Student Registration Form
        </span>

      </div>

    </header>
  );
}