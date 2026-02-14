const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-8 py-4 shadow-sm">
        <div className="flex items-center justify-between w-[95vw]">
          <h1 className="text-white font-bold text-xl ">HRMS Lite</h1>
        </div>
      </nav>

      <main className="w-[100vw] mx-auto px-8 py-8">{children}</main>
    </div>
  );
};

export default Layout;
