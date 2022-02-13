import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { getData } from '../../Utils/API';
import NoData from '../../Components/Images/NoData.png';
import MainLoader from '../../Components/Spinners/MainLoader';
import ProcessSpinner from '../../Components/Spinners/ProcessSpinner';
import { toast } from 'react-toastify';
import { exception_handler } from '../../Utils/Exception';


const Patient = () => {
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState([]);
  const [processLoader, setProcessLoader] = useState({
    index: 0,
    loader: false
  });


  const get_patients = async () => {
    setLoader(true);
    try {
      let result = await getData('/users/get_user_role?role=patient', 'GET', null);
      let { Items } = result.data.message;
      if (Items) setData(Items);
      setLoader(false);
    } catch (err) {
      toast.error(exception_handler(err));
    }
  };
  useEffect(() => get_patients(), []);


  const delete_patient = async (id, index) => {
    try {
      setProcessLoader({ loader: true, index });
      let result = await getData(`/users/delete_user?id=${id}`, 'DELETE');
      if (result) {
        toast.success('Deleted Successfully!');
        setProcessLoader({ loader: false, index: 0 });
        get_patients();
      }
    } catch (err) {
      setProcessLoader({ loader: false, index: 0 });
      toast.error(exception_handler(err));
    };
  };


  if (loader) return <MainLoader />
  return <div className='doctors text-center'>
    <article>
      <h4>Patient</h4>
    </article>
    {
      !data.length > 0
        ? <article className='no--data'><img src={NoData} alt="" /> No Patient Found! </article>
        : <main className='table-responsive'>
          <table className="table table-striped table-hover mt-5">
            <thead>
              <tr className='table--head'>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Date of Birth(DOB)</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className='table--body'>
              {
                data && data.map((items, i) => {
                  let { name, dob, emailid, phone } = items;
                  return <tr key={i}>
                    <td><b>{i + 1}</b></td>
                    <td>{name}</td>
                    <td>{emailid}</td>
                    <td>{phone}</td>
                    <td>{dob}</td>
                    <td><button onClick={() => delete_patient(emailid, i)} className='btn btn-danger'>
                      {(processLoader.loader && i === processLoader.index)
                        ? <ProcessSpinner size={22} border={'3px'} />
                        : <BsFillTrashFill />
                      }
                    </button></td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </main>
    }
  </div>;
};

export default Patient;
