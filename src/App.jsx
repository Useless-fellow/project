import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Compose from"./Components/Compose/Compose";
import Emailverify from "./Components/Emailverify/Emailverify";
import GraphComp from "./Components/Graph/GraphComp";
import Home from "./Components/Home/Home";
import Info from "./Components/Log/Info/Info";
import Log from "./Components/Log/Log";
import Login from "./Components/Login/Login";
import NavComp from "./Components/Navbar/Navbar";
import PasswordRes from "./Components/Password-Reset/PasswordRes";
import ProtectedRoute from "./Components/ProtectedRoute";
import ResetPassComp from "./Components/ResetPassComp/ResetPassComp";
import Settings from "./Components/Settings/Settings";
import Signup from "./Components/Signup/Signup";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("x-Auth-token")) {
      navigate("/")
    }
  }, []);
  return (
    <div className="App">
      <NavComp  />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/compose"        element={<ProtectedRoute><Compose />    </ProtectedRoute>} />
        <Route path="/graph"          element={<ProtectedRoute><GraphComp />      </ProtectedRoute>} />
        <Route path="/log"            element={<ProtectedRoute><Log />        </ProtectedRoute>} />
        <Route path="/settings"       element={<ProtectedRoute><Settings />   </ProtectedRoute>} />
        <Route path="/compose"        element={<ProtectedRoute><Compose /></ProtectedRoute>} />
        <Route path="/graph"          element={<ProtectedRoute><GraphComp /></ProtectedRoute>} />
        <Route path="/log/*"            element={<ProtectedRoute><Log /></ProtectedRoute>} />
        <Route path="/login/info" element={<ProtectedRoute><Info /></ProtectedRoute>} />
        <Route path="/settings"       element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/login"          element={<Login />} />
        <Route path="/password-reset" element={<PasswordRes />} />
        <Route path="/signup"         element={<Signup />} />
        <Route
          path="/pas-reset-completion/:string"
          element={<ResetPassComp />}
        />
        <Route path="/emailverify/:string" element={<Emailverify />} />
      </Routes>
    </div>
  );
}
export default App;
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ExcelRenderer } from "react-excel-renderer";
import ReactQuill from "react-quill";
import Context from "../../Context/Context";
import { sendEmailToRecepiantAxios } from "../../Services/axios";
import { ColorRingLoading } from "../../Services/loading";
import { errorToast, toastSuccess } from "../../Services/tostify";
import "./Compose.css";
import ExcelExampleModal from "./ExampleModal";
import { ManualEmailCompose } from "./ManualEmailCompose";
import PreviewModal from "./Modal";
import { formats, modules } from "./QuilData";
import  { BsFillSendCheckFill } from 'react-icons/bs'
import {  useNavigate } from "react-router-dom";
import {  useLocation, useNavigate } from "react-router-dom";

const Compose = () => {
  const [recepaintInfo, setRecepaintInfo] = useState([]);
  const [radioValue, setRadioValue] = useState("manual");
  const [enterFlag ,setEnterFlag] = useState(false)
  const contextData = useContext(Context); 
  const navigate = useNavigate();
  const da = useLocation();

  const radios = [
    { name: "Manual send", value: "manual" },
    const Compose = () => {
      </div>
      {radioValue === "manual" ? (
        <ManualEmailCompose />
         <ManualEmailCompose  reUse={da.state}/>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center m-4 composestyle"
          style={{ minHeight: "65vh" }}
        >
          <PreviewModal recepaintInfo={dataModal(values.emails)} />
          <ExcelExampleModal />
          <div className="" style={{ width: "1000px", height: "600px" }}>
            <h1>compose</h1>
            <hr />
            <form onSubmit={handleSubmit} >
              <Form.Group controlId="formFileLg " className="mb-3">
                <Form.Label className="text-start w-100">
                  Enter Email{" "}
                </Form.Label>
                <Form.Control
                  type="file"
                  isInvalid={errors.emails && touched.emails}
                  aria-describedby="mailHelpBlock"
                  onChange={handleFile}
                  onBlur={handleBlur}
                  name="emails"
                />
                {errors.emails && touched.emails ? 
                <Form.Text
                  id="mailHelpBlock"
                  className="text-start d-flex text-danger"
                  aria-describedby="fileView"
                >{errors.emails}
                </Form.Text> : 
                
                <Form.Text
                  id="mailHelpBlock"
                  muted
                  className="text-start d-flex"
                  aria-describedby="fileView"
                >
                  Select the Excel file which contain only email's in fist
                  column one by one
                  <Button
                    className="mx-2 p-0"
                    variant="link"
                    size="sm"
                    onClick={() => contextData.setExampleModalOfExcel(true)}
                  >
                    Example
                  </Button>
                </Form.Text>}
              </Form.Group>
              {recepaintInfo.length !== 0 && (
                <Button
                  variant="outline-secondary"
                  id="fileView"
                  className="text-start d-flex"
                  size="sm"
                  onClick={() => contextData.setComposeRecepiantModal(true)}
                >
                  View Recepiant details
                </Button>
              )}
              <br />
 <Form.Group>
import { errorToast, toastSuccess } from "../../Services/tostify";
import { formats, modules } from "./QuilData";
import PreviewEmailsModals from "./ViewEmailsModal";

export function ManualEmailCompose() {
export function ManualEmailCompose({reUse}) {
  const navigate = useNavigate();
}
  const [enterFlag ,setEnterFlag] = useState(false)
  const contextData = useContext(Context);
      }
  const init = {
  
  letinit = {
    emails: "",
    subject: "",
    subject: "sdf",
    htmlTemplate: "",
  }
      }
  if(reUse !== null){
    init = reUse
  }

  const {
    values,
    handleChange,
  };

export function ManualEmailCompose() {
            placeholder="" 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subject}
            name='subject'
            isInvalid={errors.subject && touched.subject}
          />
 export function ManualEmailCompose() {
            theme="snow"
            modules={modules}
            formats={formats}
            value={values.htmlTemplate}
            placeholder="Type your Content to send"
            className={`${errors.htmlTemplate && touched.htmlTemplate ?"border border-danger":""}`}
            onChange={(e,a,b,c)=>{
              if(c.getText().length ===1){
                setFieldValue('htmlTemplate',"")
              }else{
                setFieldValue('htmlTemplate',e)
              }
            }} 
            onBlur={(a,b,c)=>setFieldTouched('htmlTemplate',true)}
          />
          {errors.htmlTemplate && touched.htmlTemplate && (
            <Form.Text
              className="text-start d-flex text-danger"
              aria-describedby="fileView"
            >
              {errors.htmlTemplate}
            </Form.Text>
          )}
          <br />
          <Button type="submit">{enterFlag ? <ColorRingLoading />:<>Send <BsFillSendCheckFill /></>}</Button>
          <br />
        </div>
          </form>
        <br />
      </div>
    </div>
  );
}
  