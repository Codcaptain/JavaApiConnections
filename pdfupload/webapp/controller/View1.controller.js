sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/PDFViewer",
    "sap/ui/model/json/JSONModel"
], (Controller,PDFViewer,JSONModel) => {
    "use strict";

    return Controller.extend("com.pdfupload.pdfupload.controller.View1", {
        onInit() {
            this.pdfViewer=new PDFViewer({
                isTrustedSource: true
            })
            this.getView().addDependent(this.pdfViewer);
            this._sValidPath=sap.ui.require.toUrl("com/pdfupload/pdfupload/pdfFolder/Duppy_Conqueror_Press_Kit-1.pdf")
            this._oModel=new JSONModel({
                Source:this._sValidPath,
                Title:"PDF Document",
                Height:"600px"
            })
            this.getView().setModel(this._oModel);
            
            
        },
        onClickFn: function(){
            var validPath=sap.ui.require.toUrl("com/pdfupload/pdfupload/pdfFolder/Duppy_Conqueror_Press_Kit-1.pdf")
            this.pdfViewer.setSource(validPath);
            this.pdfViewer.setTitle("PDF DOCUMENTS");
            this.pdfViewer.open();
            this._oModel.setProperty("/Source",this._sValidPath);
           

        },
        onClickFragment: function(){
            if(!this.openDialog){
                this.openDialog=sap.ui.xmlfragment("com.pdfupload.pdfupload.fragment.openPdf",this);
                this.getView().addDependent(this.openDialog);
            }
            this.openDialog.open();
            
        },
        openPdfviewer: function(){
            if(!this.openPdfFile){
                this.openPdfFile=sap.ui.xmlfragment("com.pdfupload.pdfupload.fragment.pdfViewer",this);
                this.getView().addDependent(this.openPdfFile);
            }
            this.openPdfFile.open();
        },
        onClose: function(){
            this.openDialog.close();
        }
    });
});