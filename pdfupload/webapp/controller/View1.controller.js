sap.ui.define([
    'com/pdfupload/pdfupload/formatter/Formatter',
    "sap/ui/core/mvc/Controller",
    "sap/m/PDFViewer",
    "sap/ui/model/json/JSONModel",
    "sap/m/library"
], (Formatter,Controller,PDFViewer,JSONModel,mobileLibrary) => {
    "use strict";
    var PopinLayout = mobileLibrary.PopinLayout;
    
    return Controller.extend("com.pdfupload.pdfupload.controller.View1", {
        formatter: Formatter,
        onInit() {
            this.pdfViewer=new PDFViewer({
                isTrustedSource: true
            })
            this.getView().addDependent(this.pdfViewer);
            this._sValidPath=sap.ui.require.toUrl("com/pdfupload/pdfupload/pdfFolder/Duppy_Conqueror_Press_Kit-1.pdf")
            // this._oModel=new JSONModel({
            //     Source:this._sValidPath,
            //     Title:"PDF Document",
            //     Height:"600px"
            // })
            // this.getView().setModel(this._oModel);
            let pdfPathDetails = {
                Source:this._sValidPath,
                Title:"PDF Document",
                Height:"600px"
            };
            var oModel =new JSONModel(sap.ui.require.toUrl("com/pdfupload/pdfupload/model/products.json"));
			this.getView().setModel(oModel);
            let dataTable = {
				Source: this.oModel,
				Title: "My Title 1",
				Height: "600px"
			};
            var localModel=this.getOwnerComponent().getModel("localModel");
            localModel.setProperty("/isTable",false);
            localModel.setProperty("/pdfData",pdfPathDetails);
            localModel.setProperty("/tableData",dataTable);

        },
        onClickFn: function(){
            var localModel=this.getOwnerComponent().getModel("localModel");
            localModel.setProperty("/isTable",false);
            var validPath=sap.ui.require.toUrl("com/pdfupload/pdfupload/pdfFolder/Duppy_Conqueror_Press_Kit-1.pdf")
            this.pdfViewer.setSource(validPath);
            this.pdfViewer.setTitle("PDF DOCUMENTS");
            this.pdfViewer.open();
        },
        onClickFragment: function(){
            var localModel=this.getOwnerComponent().getModel("localModel");
            localModel.setProperty("/isTable",false);
            if(!this.openDialog){
                this.openDialog=sap.ui.xmlfragment("com.pdfupload.pdfupload.fragment.openPdf",this);
                this.getView().addDependent(this.openDialog);
            }
            this.openDialog.open();
            
        },
        onClose: function(){
            this.openDialog.close();
        },
        
        openPdfviewer: function(){
            var localModel=this.getOwnerComponent().getModel("localModel");
            localModel.setProperty("/isTable",false);
            if(!this.openPdfFile){
                this.openPdfFile=sap.ui.xmlfragment("com.pdfupload.pdfupload.fragment.pdfViewer",this);
                this.getView().addDependent(this.openPdfFile);
            }
            this.openPdfFile.open();
        },
        onClosing: function(){
            this.openPdfFile.close();
        },
        openTableContent: function(){
            if(!this.openTable){
                this.openTable=sap.ui.xmlfragment("com.pdfupload.pdfupload.fragment.table",this);
                this.getView().addDependent(this.openTable);
            }
            this.openTable.open();
            var localModel=this.getOwnerComponent().getModel("localModel");
            localModel.setProperty("/isTable",true);
        },
        onCloseTable: function(){
            this.openTable.close();
        },
        onPopinLayoutChanged: function() {
			var oTable = this.byId("idProductsTable");
			var oComboBox = this.byId("idPopinLayout");
			var sPopinLayout = oComboBox.getSelectedKey();
			switch (sPopinLayout) {
				case "Block":
					oTable.setPopinLayout(PopinLayout.Block);
					break;
				case "GridLarge":
					oTable.setPopinLayout(PopinLayout.GridLarge);
					break;
				case "GridSmall":
					oTable.setPopinLayout(PopinLayout.GridSmall);
					break;
				default:
					oTable.setPopinLayout(PopinLayout.Block);
					break;
			}
		},

		onSelect: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"),
				sText = oEvent.getSource().getText(),
				oTable = this.byId("idProductsTable"),
				aSticky = oTable.getSticky() || [];

			if (bSelected) {
				aSticky.push(sText);
			} else if (aSticky.length) {
				var iElementIndex = aSticky.indexOf(sText);
				aSticky.splice(iElementIndex, 1);
			}

			oTable.setSticky(aSticky);
		},

		onToggleInfoToolbar: function(oEvent) {
			var oTable = this.byId("idProductsTable");
			oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
		}
    });
});