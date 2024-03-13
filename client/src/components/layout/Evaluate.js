import React, {  useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Evaluate = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    day: '',
    points: '',
  });

  const { teamName, day, points } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('herew is the fp');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ teamName, day, points });
    setFormData({
      teamName: '',
      day: '',
      points: '',
    });
    alert('Points Updated Successfully');
    try {
      console.log(body);
      const res = await axios.post('https://cod2k24-mnnit.onrender.com/api/admin', body, config);
      // if (res.status === 200) {
      console.log(res);
      // alert('Points updated successfully');
      // }else{
      //   alert("An error occurred");
      // }
    } catch (err) {
      console.log('dfasdfasdfasdfsdf');
      // const errors = err.response.data.errors;
      console.log(err.msg);
    }
  };
  const fixedInputClass =
    'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

  return (
    <div>
      <form className='mt-8 space-y-6' onSubmit={(e) => onSubmit(e)}>
        <div className='-space-y-px'>
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
              type='number'
              placeholder='Day'
              name='day'
              minLength='6'
              value={day}
              required
              className={fixedInputClass}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='my-5 mx-5'>
            <input
              type='number'
              placeholder='Points'
              name='points'
              minLength='6'
              value={points}
              required
              className={fixedInputClass}
              onChange={(e) => onChange(e)}
            />
          </div>
        </div>

        {/* //Button */}
        <>
          {
            <button
              type='submit'
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10'
              value='Evaluate'
            >
              {' '}
              Submit
            </button>
          }
        </>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setAlert })(Evaluate);
