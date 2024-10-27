export default function Home() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:75px_75px]" />
      <div className="absolute top-0 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl " />

      <div className="relative z-10 text-center pr-">
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight mb-8">
          <span className="text-white hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-gray-100 hover:via-gray-300 hover:to-gray-100 transition-all duration-700">
            Feegle
          </span>
        </h1>
      </div>
      <div className=" bg-black flex items-center">
        <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight">
              A new way <br />
              <span className="block">to collect feedback</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-2xl">
            Connect with your customers like never before - smart, simple, and surprisingly fun.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                           text-white px-6 py-3 rounded-lg
                           border border-white/10 hover:border-white/20 
                           transition-all duration-300 
                           flex items-center gap-2"
              >
                <span className="font-medium">★ Join Waitlist</span>
              </button>

              <button
                className="bg-black/30 hover:bg-black/40 backdrop-blur-sm 
                           text-white px-6 py-3 rounded-lg
                           border border-white/10 hover:border-white/20 
                           transition-all duration-300 
                           flex items-center gap-2"
              >
                Watch demo <span className="ml-1">↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
