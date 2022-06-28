const PdfViewer = ({ pdfUrl }: any) => {
  // console.log(pdfUrl);

  return (
    <div>
      <object
        data={pdfUrl}
        type="application/pdf"
        className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[440px] lg:h-[750px]"
      >
        <p className="text-center">
          Alternative text - include a link{" "}
          <a className="text-darkViolet font-bold underline" href={pdfUrl}>
            to the PDF!
          </a>
        </p>
      </object>
      {/* <iframe
        src={pdfUrl}
        className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[440px] lg:h-[750px]"
      ></iframe> */}

      {/* <Embed
              url={pdfUrl}
              className="w-[370px] h-[600px] md:w-[650px] md:h-[800px] lg:w-[550px] lg:h-[700px]"
            /> */}
    </div>
  );
};

export default PdfViewer;
