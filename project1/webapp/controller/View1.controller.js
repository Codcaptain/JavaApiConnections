sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.incture.project1.controller.View1", {
        onInit() {
            this.fnCheckConfiguration();
        },
        getAppModulePath: function () {
			var oModulePath = jQuery.sap.getModulePath("com.incture.project1");
			return oModulePath;
		},
        fnCheckConfiguration: function(){
            let localJsonModel = this.getOwnerComponent().getModel("localJsonModel"),
                oEndpoint="/books",
                // baseUri=this.getAppModulePath(),
                // newUri=baseUri === "."? "":baseUri,
                uri=oEndpoint;
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