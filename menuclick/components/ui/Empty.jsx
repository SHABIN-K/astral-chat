import Image from "next/image";

export const Empty = ({ label, error, reset }) => {
  return (
    <section>
      <div className="p-20 flex-col flex-center">
        <div className="relative mb-3">
          <Image
            src="/empty.png"
            alt="Something weng wrong"
            width={350}
            height={320}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h1 className="text-muted-foreground text-2xl text-center text-black dark:text-white">
          {label}
        </h1>
        <p className="text-muted-foreground text-sm text-black dark:text-white text-center select-text">
          {error.message}
        </p>

        <button
          type="button"
          className="w-[180px] bg-black dark:bg-white rounded-lg  py-[10px] px-4 
      hover:shadow-lg hover:scale-105 transition duration-500 mt-2"
          onClick={() => reset()}
        >
          <span className="text-white dark:text-black font-semibold text-lg ">
            Try again
          </span>
        </button>
      </div>
    </section>
  );
};
