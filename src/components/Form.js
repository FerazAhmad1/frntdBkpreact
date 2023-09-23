import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { PhoneList } from "./PhoneList";
import "./form.css";
export const Form = (e) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const [state, setState] = useState([]);
  const [alldata, setdata] = useState([]);
  const [id, setId] = useState("");
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      const name = nameRef.current.value;
      const phoneNumber = numberRef.current.value;
      const email = emailRef.current.value;
      nameRef.current.value =
        numberRef.current.value =
        emailRef.current.value =
          "";

      if (id) {
        const response = await axios.patch(
          `http://localhost:4000/api/v1/user/${id}`,
          {
            name,
            phoneNumber,
            email,
          }
        );
        if (response.status === 200) {
          setId("");
          return;
        }
      }
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/add-user",
        {
          name,
          email,
          phoneNumber,
        }
      );
      const data = response.data.data;
      console.log(data);
      setState(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:4000/api/v1/user");
      const data = response.data.data;
      localStorage.setItem("allUser", JSON.stringify(data));
      setdata(data);
    };
    fetchData();
  }, [state, id]);

  const deleteHandler = async (id) => {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/user/${id}`
    );
    console.log("response", response, response.data);
    if (response && response.status === 204) {
      console.log("ggggggggggggggggggggggggggggg");
      setdata((prevData) => {
        const data = prevData.filter((user) => user.id !== id);
        localStorage.setItem("allUser", data);
        return data;
      });
    }
  };
  const editHandler = (id) => {
    const editUser = alldata.filter((use) => use.id === id)[0];
    console.log(alldata, editUser);
    nameRef.current.value = editUser.name;
    emailRef.current.value = editUser.email;
    numberRef.current.value = editUser.phoneNumber;
    setId(id);
  };

  return (
    <>
      <div className="top">
        <form className="form" onSubmit={submitFormHandler}>
          <input
            className="input"
            ref={nameRef}
            placeholder="Name"
            type="text"
          />
          <input
            className="input"
            ref={emailRef}
            placeholder="email"
            type="email"
          />
          <input
            className="input"
            ref={numberRef}
            placeholder="Phone Number"
            type="text"
          />
          <button className="input" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div>
        {alldata.map((user) => (
          <PhoneList
            email={user.email}
            name={user.name}
            phoneNumber={user.phoneNumber}
            editHandler={(e) => {
              e.preventDefault();
              editHandler(user.id);
            }}
            deleteHandler={(e) => {
              e.preventDefault();
              deleteHandler(user.id);
            }}
          />
        ))}
      </div>
    </>
  );
};
