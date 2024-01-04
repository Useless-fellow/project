import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import EditorToolbar, { modules, formats } from "./test";
import ReactQuill from 'react-quill';
// import QuillToolbar from './test';
import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ExcelRenderer } from "react-excel-renderer";
import "./Compose.css";
import PreviewModal from "./Modal";
import Context from "../../Context/Context";
import { errorToast } from "../../Services/tostify";
import ExcelExampleModal from "./ExampleModal";
import { useFormik } from "formik";
import { ManualEmailCompose } from "./ManualEmailCompose";
import * as yup from "yup";
import { modules, formats } from "./QuilData";

const Compose = () =>{
  const [value, setValue] = useState("");
  const [recepaintInfo, setRecepaintInfo] = useState([]);
  const [radioValue, setRadioValue] = useState("manual");
  const contextData = useContext(Context);

  const radios = [
    { name: "Manual send", value: "manual" },
    { name: "Bulk email send", value: "file" },
  ];

  const CustomButton = () => <span className="octicon octicon-star" />;
  const CustomToolbar = () => (
    <div id="toolbar">
      <select
        className="ql-header"
        defaultValue={''}
        onChange={(e) => e.persist()}
      >
        <option value="1"></option>
        <option value="2"></option>
        <option selected></option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <select className="ql-color">
        <option value="red"></option>
        <option value="green"></option>
        <option value="blue"></option>
        <option value="orange"></option>
        <option value="violet"></option>
        <option value="#d0d1d2"></option>
        <option selected></option>
      </select>
      <button className="ql-insertStar">
        <CustomButton />
      </button>
    </div>
  );
  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        ExcelRenderer(selectedFile, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            setRecepaintInfo(res.rows);
          }
        });
      } else {
        errorToast("Please select only Excel file types");
      }
    } else {
      console.log("select file");
    }
  };

  // const modules = {
  //   toolbar: {
  //     container: '#toolbar',
  //     handlers: {
  //       // insertStar: insertStar,
  //     },
  //   },
  // };
  //yup validation:
  const userValidationSchema = yup.object().shape({});

  const  modules = {
    toolbar: [
      [{ header:'1' },{header:"2"}, {header:[3,4,5,6]},{font:[]}],
      [{size:[]}],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean'],
      ['code-block']
    ],
  }
  const  formats = [
    'header','font','size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image','video','code-block'
  ]
  const init = {
    emails: "",
    subject: "",
    htmlTemplate: "",
  };

  console.log(value);
  //formik
  const { values, hanldeChange, errors, handleBlur, touched, handleSubmit } =
    useFormik({
      initialValues: init,
      validateSchema: userValidationSchema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
      <div className='border' style={{width:"1000px",height:"600px"}}>
        <h1>compose</h1>
        <hr />
        <Form.Group controlId="formFileLg " className="mb-3">
        <Form.Label className='text-start w-100'>Select Excel File </Form.Label>
        <Form.Control type="file"  />
        </Form.Group>  
        <div className="text-editor">
        {/* <CustomToolbar /> */}
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats}/>   
        {/* <EditorToolbar toolbarId={'t1'} />
        <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder={"Write something awesome..."}
              modules={modules('t1')}
              formats={formats}
            />  */}
        {/* <QuillToolbar /> */}
        </div> 
    <div>
      <div className="d-flex m-4" style={{ width: "95vw" }}>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "outline-success" : "outline-primary"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
    </div>
  

      {radioValue === "manual" ? (
        <ManualEmailCompose />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center m-4 composestyle"
          style={{ height: "80vh" }}
        >
          <PreviewModal recepaintInfo={recepaintInfo} />
          <ExcelExampleModal />
          <div className="" style={{ width: "1000px", height: "600px" }}>
            <h1>compose</h1>
            <hr />
            <Form.Group controlId="formFileLg " className="mb-3">
              <Form.Label className="text-start w-100">Enter Email </Form.Label>
              <Form.Control
                type="file"
                aria-describedby="mailHelpBlock"
                onChange={handleFile}
              />
              <Form.Text
                id="mailHelpBlock"
                muted
                className="text-start d-flex"
                aria-describedby="fileView"
              >
                Select the Excel file which contain only email's in fist column
                one by one{" "}
                <Button
                  className="mx-2 p-0"
                  variant="link"
                  size="sm"
                  onClick={() => contextData.setExampleModalOfExcel(true)}
                >
                  Example
                </Button>
              </Form.Text>
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
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label className="text-start w-100">Subject </Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <div className="text-editor">
              <Form.Label className="text-start w-100">Content </Form.Label>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
              />
              <br />
              <Button>Send</Button>
              <br />
            </div>
            <br />
          </div>
        </div>
      )}
    </div>
    );
   
   }; export default Compose;