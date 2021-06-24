export const Loader = () => {
  return (
    <div className="cursor-pointer flex relative justify-center items-center z-10 min-w-full min-h-full">
      <div className="loader animate-bounce mr-1"></div>
      <div className="loader animate-bounce200 mr-1"></div>
      <div className="loader animate-bounce400"></div>
    </div>
  );
};
