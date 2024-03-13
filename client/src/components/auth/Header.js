import { Link } from 'react-router-dom';

const Header = ({ heading, paragraph, linkName, linkUrl = '#' }) => {
  return (
    <div className='mb-10'>
      <h2 className='mt-6 text-center text-3xl font-extrabold text-blue'>
        {heading}
      </h2>
      <p className='mt-2 text-center text-sm text-blue mt-5'>
        {paragraph}{' '}
        <Link
          to={linkUrl}
          className='font-medium text-blue-800 hover:text-black-500'
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};
export default Header;
