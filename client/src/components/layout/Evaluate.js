import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

const Evaluate = () => {
  useEffect(() => {
    document.title = "Evaluate";
  }, []);

  const [teams, setTeams] = useState([]);
  // const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(
          'https://cod2k24-mnnit.onrender.com/api/admin'
        );
        setTeams(res.data);
      } catch (error) {
        console.log(error.msg);
      }
    };
    fetchTeams();
    console.log(teams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const [formData, setFormData] = useState([]);

  // const { teamName, day, points, id } = formData;

  const handleChange = (id, column, value) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    setTeams((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [column]: value } : row))
    );
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const rowData = teams.find((row) => row.id === id);
    let teamName = rowData.teamName;
    let day = rowData.day;
    let points = rowData.points;
    console.log("here is the fp");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ teamName, day, points });
    // setFormData({
    //   teamName: '',
    //   day: '',
    //   points: '',
    // });
    alert("Points Updated Successfully");
    try {
      console.log(body);
      const res = await axios.post(
        "https://cod2k24-mnnit.onrender.com/api/admin",
        body,
        config
      );
      console.log(res);
    } catch (err) {
      console.log("Unknown error ocurred. Please try again later!");
      console.log(err.msg);
    }
  };

  return (
    <div className="pt-24 w-full flex justify-center">
      <table className="mb-10 text-center table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="text-center px-4 py-2 bg-gray-100 border border-gray-200">
              S.No.
            </th>
            <th className="px-4 py-2 bg-gray-100 border border-gray-200">
              Team Name
            </th>
            <th className="px-4 py-2 bg-gray-100 border border-gray-200">
              Day
            </th>
            <th className="px-4 py-2 bg-gray-100 border border-gray-200">
              Points
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {teams.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {(row.id = index)}
              <td className="px-4 py-2 border border-gray-200">
                {console.log("point " + row.teamName)}
                {row.teamName}
              </td>
              <td>
                <input
                  className="mx-4 py-1 w-16 text-center bg-gray-200 rounded-sm border border-gray-300"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="day"
                  value={row.day}
                  onChange={(e) => handleChange(row.id, "day", e.target.value)}
                />
              </td>
              <td>
                <input
                  className="mx-4 py-1 w-16 text-center bg-gray-200 rounded-sm border border-gray-300"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  name="points"
                  value={row.points}
                  onChange={(e) =>
                    handleChange(row.id, "points", e.target.value)
                  }
                />
              </td>
              <td className="">
                <button
                  className="mx-4 p-1 text-sm font-semibold rounded-md border border-gray-300 hover:bg-blue-400"
                  onClick={(e, row) => handleSubmit(e, index)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setAlert })(Evaluate);
