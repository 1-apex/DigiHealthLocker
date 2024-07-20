import React, { useEffect, useState } from 'react'
import PatientHeader from './PatientHeader'
import { useAuth } from '../../../Store/AuthClient';
import { Document, Page, pdfjs } from 'react-pdf';
import UsePdfCard from "../../../utils/UsePdfCard";
import "../../pages/doctor/term.css"
import JSZip from 'jszip';
import { ShimmerPdfCard } from '../../../utils/Shimmer';


const PatientDashboard = () => {
    let { user } = useAuth();
    const [noFile, setFileHaveNo] = useState(false);
    const [pdfUrls, setPdfUrls] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const getThePdf = async () => {
        if (user) {

            console.log("Addharcard of the login user is:", user.aadharcardnumber);
            const dataInput = {
                aadharcardnumber: user.aadharcardnumber
            }
            console.log("The data to send:", dataInput);
            const resposen = await fetch('/api/userPdfAll', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataInput),

            });

            if (resposen.status == 404) {
                setFileHaveNo(true);
                return;
            }

            const blob = await resposen.blob();

            const data = await JSZip.loadAsync(blob);
            console.log("The data will get when we decompress the data:", data);

            const urls = [];
            await Promise.all(
                Object.keys(data.files).map(async (filename) => {
                    const file = data.files[filename];
                    console.log("The files we get in struture:", file);
                    console.log("The url we cretaing is:", await file.async('blob'));
                    if (filename.endsWith('.pdf')) {
                        const url = URL.createObjectURL(await file.async('blob'));
                        urls.push({ url, filename });
                    }
                })
            );

            setFileHaveNo(false);
            setPdfUrls(urls);
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setPdfUrls([]);
                await getThePdf();
                setLoading(false);
            }
        };

        fetchData();


        // return () => setLoading(false);
    }, [user]);

    return (
        <>
            <PatientHeader />
            {
                isLoading ? (<ShimmerPdfCard/>) : (noFile ? (<h1>There is no files to show</h1 >) : (<div>
                    {pdfUrls.length > 0 && (
                        <div className="pdf-document">
                            {/* {pdfUrls.map((url, index) => (
                                <div key={`pdf_${index}`}>
                                    <Document
                                        file={url}
                                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                    >
                                        {Array.from(new Array(numPages), (el, index) => (
                                            <Page key={`page_${index + 1}`} pageNumber={1} />
                                        ))}
                                    </Document>

                                </div>
                            ))} */}

                            {pdfUrls.map((pdf, index) => (
                                <UsePdfCard key={`pdf_${index}`}
                                    url={pdf.url} filename={pdf.filename}
                                />
                            ))}
                        </div>
                    )}
                </div>))
            }
        </>
    )
}

export default PatientDashboard;

