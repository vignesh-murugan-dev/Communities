const NavBar = () => {
    return (
      <nav
        className="w-full flex-1 bg-[#fafafa] text-black py-4 px-4 md:px-8 lg:px-16 flex justify-between items-center"
      >
        <a href="#" className="text-2xl font-bold">tamilnadu.dev</a>
        <div className="space-x-4">
          <button className="px-4 py-2 border-2 border-black rounded-md">
            Join Us
          </button>
          <button className="px-4 py-2 border bg-black text-white rounded-md">
            Contribute
          </button>
        </div>
      </nav>
    );
  };
  
  export default NavBar;
  