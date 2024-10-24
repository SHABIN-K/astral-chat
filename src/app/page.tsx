export default function Home() {
  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:75px_75px]" />
      
      <div className="absolute top-0 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center">
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tight mb-8">
          <span className="text-white hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-gray-100 hover:via-gray-300 hover:to-gray-100 transition-all duration-700">
            Feegle
          </span>
        </h1>
        
        <div className="overflow-hidden">
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100 
                        text-lg md:text-xl font-light tracking-wider max-w-2xl mx-auto px-4
                        transform hover:scale-105 transition-transform duration-500">
            The next generation feedback tool for the modern web
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-75 animate-pulse" />
    </main>
  );
}