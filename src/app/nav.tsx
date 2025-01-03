import GitHubButton from '../components/GitHubButton';

const NavBar = () => {
  return (
    <nav className='flex w-full flex-1 items-center justify-between bg-[#fafafa] px-4 py-4 text-black md:px-8 lg:px-16'>
      <a href='#' className='text-xl font-semibold'>
        tamilnadu.tech
      </a>
      <div className='space-x-4'>
        <GitHubButton />
      </div>
    </nav>
  );
};

export default NavBar;
