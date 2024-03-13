import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Points = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://cod2k24-mnnit.onrender.com/api/points');
        if (res) {
          setData(res.data);
          console.log('responsse' + res);
        } else {
          setData([]);
          console.log('Error receiving data');
        }
      } catch (error) {
        console.log(error.msg);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>Team Points</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto border-collapse border border-gray-200'>
          <thead>
            <tr>
              <th className='px-4 py-2 bg-gray-100 border border-gray-200'>
                Day
              </th>
              <th className='px-4 py-2 bg-gray-100 border border-gray-200'>
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((point, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className='px-4 py-2 border border-gray-200'>
                  {point.day}
                </td>
                <td className='px-4 py-2 border border-gray-200'>
                  {point.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Points;
