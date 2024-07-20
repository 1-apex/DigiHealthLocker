import React, { useRef, useState } from 'react';
import DoctorHeader from './DoctorHeader';
import { toast } from 'react-toastify';

function DoctorUpload() {
  // const [aadharNo, setAadharNo] = useState('');
  // const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const aadharcardnumber = useRef("");
  const file = useRef("");
  // const fileName = useRef("");

  const uploadFile = async (e) => {
    try {
      e.preventDefault();
      // console.log(file.current.files[0]);
      // console.log(aadharcardnumber.current.value);

      let formData = new FormData();

      if (file.current && file.current.files && file.current.files.length > 0) {
        formData.append('file', file.current.files[0]);
        formData.append('aadharcardnumber', aadharcardnumber.current.value);
      } else {
        console.error("No file selected or file input element not found.");
      }
      // formData.append('aadharcardnumber', aadharcardnumber.current.value);
      // let formData = {
      //   file: file.current.files[0],
      //   // aadharcardnumber: aadharcardnumber.current.value
      // }

      console.log("the data ", formData);

      let respose = await fetch('/api/duploadPdf', {
        method: "POST",
        mode: "cors",
        body: formData
      });
      let outData = await respose.json();

      if (respose.status == 200) {
        toast.success(outData.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(outData.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      console.log(outData);
    } catch (e) {
      console.log(e);
      toast.error("Frontend Error", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

  return (
    <>
      <DoctorHeader />
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-semibold text-center mb-8 text-teal-600">Upload Patient Documents</h1>
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="aadharNo" className="block text-gray-700">Patient Aadhar No</label>
            <input
              type="text"
              name='aadharcardnumber'
              id="aadharNo"
              ref={aadharcardnumber}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="document" className="block text-gray-700">Upload Document</label>
            <form >
              <input
                type="file"
                name="file"
                accept='application/pdf'
                ref={file}
                id="document"

                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
                required
              />
            </form>
          </div>
          <div className="mb-4">
            <button
              onClick={uploadFile}
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded focus:outline-none focus:bg-teal-600"
            >
              Upload
            </button>
          </div>
          {uploadSuccess && (
            <div className="bg-green-100 border border-green-400 px-4 py-2 rounded mb-4">
              Document uploaded successfully.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DoctorUpload;
