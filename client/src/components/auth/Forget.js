import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { forget } from '../../actions/auth';
import Header from './Header';
const Forget = ({ setAlert, forget, isAuthenticated }) => {
  useEffect(() => {
    document.title = 'Forget Password';
  }, []);
  const [formData, setFormData] = useState({
    teamName: '',
    password: '',
    password2: '',
  });

  const { teamName, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Email should be of @mnnit.ac.in
  const [validEmail, setvalidEmail] = useState(true);
  const handleChange = (event) => {
    const { value } = event.target;
    setvalidEmail(value.endsWith('@mnnit.ac.in'));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      forget({
        teamName,
        password,
      });
      setAlert('Password Updated Successfully', 'success');
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  const fixedInputClass =
    'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mt-5';
  return (
    <Fragment>
      <section className='min-h-screen flex justify-center items-center bg-gradient-to-b from-black to-gray-800 py-24'>
        <div className='text-white w-4/5 md:w-4/12 p-2 bg-gray-700 rounded-lg shadow-md shadow-white'>
          <Header heading='Create New Password' />

          <form className=' space-y-6' onSubmit={(e) => onSubmit(e)}>
            <div className='-space-y-px '>
              <div className='my-5 mx-5'>
                <input
                  type='text'
                  placeholder='Team Name'
                  name='teamName'
                  value={teamName}
                  required
                  onChange={(e) => onChange(e)}
                  className={fixedInputClass}
                />
              </div>
              <div className='my-5 mx-5'>
                <input
                  type='email'
                  placeholder='College Email'
                  name='email'
                  // value={teamName}
                  required
                  onChange={(e) => handleChange(e)}
                  style={{ borderColor: validEmail ? 'initial' : 'red' }}
                  className={fixedInputClass}
                />
                {!validEmail && (
                  <p className='text-red-400 text-xs'>
                    &nbsp; Email must end with @mnnit.ac.in
                  </p>
                )}
              </div>
              <div className='my-5 mx-5'>
                <input
                  type='password'
                  placeholder='New Password'
                  name='password'
                  value={password}
                  required
                  onChange={(e) => onChange(e)}
                  className={fixedInputClass}
                />
              </div>
              <div className='my-5 mx-5'>
                <input
                  type='password'
                  placeholder='Confirm New Password'
                  name='password2'
                  value={password2}
                  required
                  onChange={(e) => onChange(e)}
                  className={fixedInputClass}
                />
              </div>
            </div>
            <>
              {validEmail ? (
                <button
                  type='submit'
                  className='group relative w-1/2 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  value='Change'
                >
                  Submit
                </button>
              ) : (
                <button
                  type='button'
                  disabled
                  className='group relative w-1/2 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-400 bg-gray-200 cursor-not-allowed'
                  value='Change'
                >
                  Submit
                </button>
              )}
            </>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Forget.propTypes = {
  setAlert: PropTypes.func.isRequired,
  forget: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, forget })(Forget);
