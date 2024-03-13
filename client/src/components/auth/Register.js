import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Header from './Header';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    teamName: '',
    password: '',
    password2: '',
    name1: '',
    name2: '',
    regNo1: '',
    regNo2: '',
    year1: '',
    year2: '',
    branch1: '',
    branch2: '',
  });

  const {
    teamName,
    password,
    password2,
    name1,
    name2,
    regNo1,
    regNo2,
    year1,
    year2,
    branch1,
    branch2,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        teamName,
        password,
        name1,
        name2,
        regNo1,
        regNo2,
        year1,
        year2,
        branch1,
        branch2,
      });
      setAlert('User created', 'success');
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  const fixedInputClass =
    'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm mt-5';
  return (
    <Fragment>
      <section class='h-screen'>
        <div class='container px-6 py-12 h-full'>
          <div class='flex justify-center items-center flex-wrap h-full g-6 text-gray-800'>
            <div class='md:w-8/12 lg:w-6/12 mb-12 md:mb-0'></div>
            <div class='md:w-8/12 lg:w-5/12 lg:ml-20 '>
              <div class='w-5/3 h-92 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-700 dark:border-gray-700'>
                <Header
                  heading='Signup to create an account'
                  paragraph='Already have an account? '
                  linkName='Login'
                  linkUrl='/login'
                />

                <form className='mt-8 space-y-6' onSubmit={(e) => onSubmit(e)}>
                  <div className='-space-y-px '>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='team Name'
                        name='teamName'
                        value={teamName}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='password'
                        placeholder='password'
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
                        placeholder='confirm password'
                        name='password2'
                        value={password2}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='User1'
                        name='name1'
                        value={name1}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='User2'
                        name='name2'
                        value={name2}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='regNo1'
                        name='regNo1'
                        value={regNo1}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='regNo2'
                        name='regNo2'
                        value={regNo2}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='year1'
                        name='year1'
                        value={year1}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='year2'
                        name='year2'
                        value={year2}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='branch1'
                        name='branch1'
                        value={branch1}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                    <div className='my-5 mx-5'>
                      <input
                        type='text'
                        placeholder='branch2'
                        name='branch2'
                        value={branch2}
                        required
                        onChange={(e) => onChange(e)}
                        className={fixedInputClass}
                      />
                    </div>
                  </div>
                  <>
                    {
                      <button
                        type='submit'
                        className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        value='Register'
                      >
                        {' '}
                        SignUp
                      </button>
                    }
                  </>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
