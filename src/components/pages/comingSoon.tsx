const ComingSoon: React.FC = () => {
  return (
    <div className=" dark:bg-gray-800">
      <div className=" flex flex-col justify-center items-center">
        <img
          src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
          alt="Logo"
          className="mb-8 h-40"
        />
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-700 dark:text-white mb-4">
          سایت در حال بروزرسانی هست
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-300 text-lg md:text-xl lg:text-2xl mb-8">
          ما در حال کار بر روی بهبود تجربه کاربری هستیم. منتظر باشید!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
