sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.incture.sap.connectiontest.controller.View1", {
        onInit() {
            this.fnCheckConfiguration();
        },
        getAppModulePath: function () {
			var oModulePath = jQuery.sap.getModulePath("com.incture.sap.connectiontest");
			return oModulePath;
		},
        fnCheckConfiguration: function(){
            let localJsonModel = this.getOwnerComponent().getModel("localJsonModel"),
                oEndpoint="/FetchBooks/books",
                baseUri=this.getAppModulePath(),
                newUri=baseUri === "."? "":baseUri,
                uri=newUri+oEndpoint;
                console.log("Requesting URI: " + uri);

                $.ajax({
                    url: uri,
                    method: "GET",
                    contentType: "application/json",
                    dataType: 'json',
                    success: function () {
                        localJsonModel.setData(data);
                        this.getView().setModel(localJsonModel, "oModelTest");
                    }.bind(this),
                    error: function (error) {
                        console.error("Error fetching cat fact:", error);
                    }
                })
        }
    });
});