import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { Navigate } from 'react-router-dom';
import { faqs, deletefaqs, editfaqs } from "../actions/auth";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Profile = () => {
  const formFaq = useRef();
  const [faq, setFaq] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const dispatch = useDispatch();
  const onChangeFaq = (e) => {
    const faq = e.target.value;
    setFaq(faq);
  };
  const onChangeQuestion = (e) => {
    const question = e.target.value;
    setQuestion(question);
  };
  const onChangeAnswer = (e) => {
    const answer = e.target.value;
    setAnswer(answer);
  };
  const handleFaq = (e) => {
    e.preventDefault();
    setSuccessful(false);
    if (editMode) {
      const object = {};
      if(answer){
        object.answer = answer;
      }
      if(question){
        object.question = question;
      }
      if(faq){
        object.faq = faq;
      }
      dispatch(editfaqs(editId, object))
        .then(() => {
          setEditMode(false);
        })
        .catch(() => {
          setEditMode(false);
        });
    }
    else{
      dispatch(faqs(faq, question, answer))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
    }
  };
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    fetch("http://localhost:3001/faq")
    .then((responce) =>{
      if(responce.ok){
        return responce.json();
      }
      return responce;
    })
    .then(data => setData(data))
    .catch(err => console.log('fetch error', err));
  })

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const handleDelete = (id) => {
    // e.preventDefault();
    setSuccessful(false);
      dispatch(deletefaqs(id))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
  };

  const handleEdit = (id) => {
    setAnswer('');
    setQuestion('');
    setFaq('');
    setEditId(id);
    setEditMode(true);
  };

  return (
    <>
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.user}</strong> Profile
        </h3>
      </header>
      <Form onSubmit={handleFaq} ref={formFaq}>
            <div>
                <label>Faq</label>
                <Input
                  type="text"
                  className="form-control"
                  name="faq"
                  value={faq}
                  onChange={onChangeFaq}
                  validations={[required]}
                />
                <label htmlFor="question">Question</label>
                <Input
                  type="text"
                  className="form-control"
                  name="question"
                  value={question}
                  onChange={onChangeQuestion}
                  validations={[required]}
                />      
                <label htmlFor="answer">Answer</label>
                <Input
                  type="text"
                  className="form-control"
                  name="answer"
                  value={answer}
                  onChange={onChangeAnswer}
                  validations={[required]}
                />
              <div>
                <button>{!editMode ? "Add" : "Edit"}</button>
              </div>
            </div>
        </Form>
        {editMode && "Enter Details you want to update and click edit button"}
        <tbody>
          <tr>
            <td>FAQ ID</td>
            <td>FAQ</td>
            <td>Question</td>
            <td>Answer</td>
          </tr>
          {data.map(item => 
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.faq}</td>
            <td>{item.question}</td>
            <td>{item.answer}</td>
            <td>
              <button type="button" onClick={() => handleEdit(item._id)}>
                Edit
              </button>
            </td>
            <td>
              <button type="button" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </td>
          </tr>
          )}
        </tbody>
    </>
  );
};
export default Profile;