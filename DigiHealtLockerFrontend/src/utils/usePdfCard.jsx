import React from 'react';
import { Document, Page } from 'react-pdf';
import { toast } from "react-toastify"
import "../components/pages/doctor/term.css"

const UsePdfCard = ({ url, filename }) => {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1); // Start at the first page
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const downloadPdf = async () => {
    try {

      const response = await fetch(url);

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      console.log("The blob url is:", blobUrl);
      link.href = blobUrl;
      link.download = filename;
      link.className = "donloadThePdf";
      document.body.appendChild(link);
      link.click();
      toast.success("Download initiated. Check browser notifications", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };


  return (
    <div className="pdf-card-container">
      <div className="pdf-document">
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess} >
          <Page pageNumber={pageNumber} width={450} />
        </Document>
      </div>
      <div className='featuresForPdf'>
        <div className="pdf-navigation">
          <button onClick={prevPage} disabled={pageNumber <= 1 && pageNumber == numPages}>
            <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"></path>
            </svg>
          </button>
          <span>
            {pageNumber} / {numPages}
          </span>
          <button onClick={nextPage} disabled={pageNumber >= numPages && pageNumber == numPages}>
            <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"></path>
            </svg>
          </button>


        </div>
        <div className="pdf-download">
          <button onClick={downloadPdf}><svg class="h-6 w-6 text-neutral-700" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="12" y1="11" x2="12" y2="17" />  <polyline points="9 14 12 17 15 14" /></svg></button>
        </div>
      </div>
    </div>

  );
};
export default UsePdfCard;

