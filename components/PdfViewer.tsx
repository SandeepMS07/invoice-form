
const PdfViewer = ({ pdfUrl }: any) => {
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
            <a className="text-darkViolet font-bold underline" href={pdfUrl || ""} >
              to the PDF!
            </a>
          </p>
        </object>
      </div>
      <div>
        <button className="bg-darkViolet text-white rounded-xl w-28 m-6 mr-20" >
          <a href="https://staticserve.blob.core.windows.net/nl-files-uploads/invoices%2F875685INV2206SN1704.pdf" className="text-md" download>download</a>
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
