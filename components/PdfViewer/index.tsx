const PdfViewer = ({ pdfUrl }: any) => {
  console.log(pdfUrl);
  return (
    <div className="flex flex-col">
      <div>
        <object
          data={pdfUrl}
          type="application/pdf"
          className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[440px] lg:h-[750px]"
        >
          <p className="text-center">
            Alternative text - include a link{" "}
            <a
              className="text-darkViolet font-bold underline"
              href="{pdfUrl}"
              target="_blank"
              rel="noopener noreferrer"
            >
              to the PDF!
            </a>
          </p>
        </object>
        {/* <iframe
          src={pdfUrl}
          frameBorder="0"
          className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[440px] lg:h-[750px]"
        ></iframe> */}
      </div>
      <div className="flex justify-end items-center">
        <button className="bg-darkViolet text-white rounded-xl w-28 m-6 mr-20">
          <p>
            <a
              href={pdfUrl}
              className="text-md"
              target="_blank"
              rel="noopener noreferrer"
              download={"PDFNAME.pdf"}
            >
              download
            </a>
          </p>
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
