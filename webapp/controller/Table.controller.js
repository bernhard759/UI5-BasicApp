sap.ui.define(["sap/ui/core/mvc/Controller",
  "sap/ui/core/Fragment",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageToast"

], function (Controller, Fragment, Filter, FilterOperator, MessageToast) {
  "use strict";

  return Controller.extend("oth.ui5.tabletest.controller.Table", {

    onInit: function () {
      this.byId("idpage").scrollTo(0);
    },

    _getDialog: function () {
      if (!this._oDialog) {
        this._oDialog = sap.ui.xmlfragment("oth.ui5.tabletest.view.SettingsDialog");
        this.getView().addDependent(this._oDialog);
      }
      return this._oDialog;
    },


    onOpenDialog: function () {
      this._getDialog().open();
    },


    onConfirm: function (oEvent) {
      alert("Diese Funktion ist noch in Konstruktion");
    },

    onSortId: function () {
      alert("Diese Funktion ist noch in Konstruktion");
    },

    onSetSorter: function () {
      alert("Diese Funktion ist noch in Konstruktion");
    },


    onSearch1: function (oEvent) {

      // build filter array
      var aFilter = [];

      var sQuery = this.getView().byId("input").getValue();
      if (sQuery) {
        aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
      }

      // filter binding
      var oList = this.getView().byId("idtable");
      var oBinding = oList.getBinding("items");
      oBinding.filter(aFilter);
    },

    onSearch2: function (oEvent) {

      // build filter array
      var aFilter = [];

      var sQuery = this.getView().byId("input2").getValue();
      if (sQuery) {
        aFilter.push(new Filter("name", FilterOperator.Contains, sQuery));
      }

      // filter binding
      var oList = this.getView().byId("idtable");
      var oBinding = oList.getBinding("items");
      oBinding.filter(aFilter);
    },


    requireInt: function (oEvent) {

      var _oInput = oEvent.getSource();
      var val = _oInput.getValue();
      val = val.replace(/[^\d]/g, '');
      _oInput.setValue(val);
    },

    onSave: function () {

      //input control 1
      var oData = this.getView().getModel("myData").getProperty("/neuerKunde");
      if (!oData[0]["name"] || !oData[0]["alter"] || !oData[0]["city"]) {
        console.log("Daten nicht vollständig ausgefüllt");
        MessageToast.show("Daten nicht vollständig ausgefüllt");
        return;
      } else { };


      //consolelog
      console.log("Neuer Kunde");
      var sText = this.getView().byId('nameInput').getValue();
      console.log("Der Kundenname ist " + sText);

      //connect data
      var oData = this.getView().getModel("myData").getProperty("/neuerKunde");
      var oTable = this.getView().byId("idtable");
      var len1 = oTable.getBinding("items").getLength()
      var len2 = len1++;
      var newData = {};
      newData['ID'] = len2;
      newData['name'] = oData[0]['name'];
      newData['alter'] = oData[0]['alter'];
      newData['city'] = oData[0]['city'];

      //push data to JSON
      this.getView().getModel("myData").getProperty("/Kundendaten").push(newData);

      //update to refresh
      this.getView().getModel("myData").updateBindings(true);

      //clear input 
      var oInput1 = this.getView().byId("nameInput");
      var oInput2 = this.getView().byId("cityInput");
      var oInput3 = this.getView().byId("ageInput");

      oInput1.setValue("");
      oInput2.setValue("");
      oInput3.setValue("");
    },

    onDelete: function (oEvent) {

      // get table
      var oTable = this.getView().byId("idtable");

      // get item
      var oItem = this.getView().byId("idtable").getSelectedItem();

      // messagetoast if no item is selected
      if (oItem == null) {
        sap.m.MessageToast.show('Kein Eintrag ausgewählt.', {
          duration: 2000
        });
      }

      // get json object
      var oEntry = oItem.getBindingContext("myData").getObject();
      console.log(oEntry.ID, oEntry.name);

      // get index
      var itemIndex = oTable.indexOfItem(oTable.getSelectedItem());
      console.log(itemIndex);

      // delete and refresh
      this.getView().getModel("myData").getProperty("/Kundendaten").splice(itemIndex, 1);
      this.getView().getModel("myData").updateBindings(true);

    },

  });
});
