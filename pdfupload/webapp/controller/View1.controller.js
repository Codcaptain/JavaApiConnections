sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/PDFViewer"
], (Controller,PDFViewer) => {
    "use strict";

    return Controller.extend("com.pdfupload.pdfupload.controller.View1", {
        onInit() {
            this.pdfViewer=new PDFViewer({
                isTrustedSource: true
            })
            this.getView().addDependent(this.pdfViewer);
        },
        onClickFn: function(){
            var validPath=sap.ui.require.toUrl("com/pdfupload/pdfupload/pdfFolder/Duppy_Conqueror_Press_Kit-1.pdf")
            this.pdfViewer.setSource(validPath);
            this.pdfViewer.setTitle("PDF DOCUMENTS");
            this.pdfViewer.open();
        },
        onClickFragment: function(){
            if(!this.openDialog){
                this.openDialog=sap.ui.xmlfragment("com.pdfupload.pdfupload.fragment.openPdf",this);
                this.getView().addDependent(this.openDialog);
            }
            this.openDialog.open();
            
        },
        onClose: function(){
            this.openDialog.close();
        }
    });
});