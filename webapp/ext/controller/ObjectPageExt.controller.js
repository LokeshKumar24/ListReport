

sap.ui.controller("project4.ext.controller.ObjectPageExt", {
    SelectSuppliersSUPPLIERSet : function(oEvent) { 
        alert('SelectSuppliersSUPPLIERSet');
    },
   
    tab:null,
    onFilterSelect:function(oEvent){
     var selectedKey = oEvent.mParameters.selectedKey;
     debugger;
     
     var oFilter=[];
     var filter=null;
     if(selectedKey === "LP01"){
         this.tab=true;
        var oBinding = this.byId("supTab").getBinding("items");
         filter= new sap.ui.model.Filter("Productid" , sap.ui.model.FilterOperator.Contains , selectedKey);
        }
        else{
            this.tab=false;
            var oBinding = this.byId("supTab2").getBinding("items");
            filter= new sap.ui.model.Filter("Productid", sap.ui.model.FilterOperator.Contains,selectedKey);   
        }
        
        oFilter.push(filter)
        oEvent.preventDefault();
     oBinding.filter(oFilter);
    },

    onEdit:function(){
        if(this.tab){

            var oTable1 = this.byId("supTab");
        }
          else{
            var oTable1 = this.byId("supTab2"); 
          }
        var aItems = oTable1.getSelectedItems();
        for(var i = 0; i < aItems.length; i++){
  var edit = aItems[i].getAggregation("cells")[0].getProperty("editable");
   if(aItems[i].getAggregation("cells")[0].getProperty("editable")==edit){
       aItems[i].getAggregation("cells")[0].setEditable(true);
     // aItems[i].getAggregation("cells")[1].setEditable(true);;
     aItems[i].getAggregation("cells")[2].setEditable(true);
     aItems[i].getAggregation("cells")[3].setEditable(true);
    aItems[i].getAggregation("cells")[4].setEditable(true);
   

   }

   this.byId("saveid").setVisible(true);

   }
    },
        // On Save Edit details
        onEditSave:function(){
            debugger;
            if(this.tab){

                var oTable1 = this.byId("supTab");
            }
              else{
                var oTable1 = this.byId("supTab2"); 
              }
               
       
                 var aArray = [];
               
               
                var aItems = oTable1.getSelectedItems();
                 for(var i = 0; i < aItems.length; i++){
           var edit = aItems[i].getAggregation("cells")[0].getProperty("editable");
            if(aItems[i].getAggregation("cells")[0].getProperty("editable")==edit){
               var sid = aItems[i].getAggregation("cells")[0].getProperty("value");
               var supid =aItems[i].getAggregation("cells")[1].getProperty("value");
                var name = aItems[i].getAggregation("cells")[2].getProperty("value");
              var quantity = aItems[i].getAggregation("cells")[3].getProperty("value");
            var desc =  aItems[i].getAggregation("cells")[4].getProperty("value");
            
           


              var Payload = {};
       
       Payload.Productid = sid;
       Payload.Supplierid = supid;
       Payload.Suppliername = name;
       Payload.Quantity = quantity;
       Payload.Description = desc; 
    


       var oModel10 = this.getOwnerComponent().getModel();
       oModel10.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
       oModel10.setUseBatch(true);

                   
       oModel10.setDeferredGroups(["myGroupId1"]); 
       var group =  oModel10.getDeferredGroups();
                   
       oModel10.setDeferredGroups(oModel10.getDeferredGroups().concat(["myGroupId1"]));
                       
       var mParameters = {groupId:"myGroupId1",
       success:function(odata, resp){
                           console.log(resp);
                           

       for(var x = 0; x < aItems.length; x++){
           var edit = aItems[x].getAggregation("cells")[0].getProperty("editable");
            if(aItems[x].getAggregation("cells")[0].getProperty("editable")==edit){
                aItems[x].getAggregation("cells")[0].setEditable(false);
               aItems[x].getAggregation("cells")[1].setEditable(false);
               aItems[x].getAggregation("cells")[2].setEditable(false);
               aItems[x].getAggregation("cells")[3].setEditable(false);
               aItems[x].getAggregation("cells")[4].setEditable(false);
               
            }
           }
       },
        error: function(odata, resp) {

                              console.log(resp);
               }};

       oModel10.update("/SUPPLIERSet('" + supid + "')", Payload, mParameters);

            }

            }

            oModel10.submitChanges(mParameters);
            sap.m.MessageToast.show("Updated Succesfully");
            this.byId("saveid").setVisible(false);
            this.byId("supTab").removeSelections(true) 
            this.byId("supTab2").removeSelections(true) 

        },

    onDelete:function(){
        if(this.tab){

            var oTable1 = this.byId("supTab");
        }
          else{
            var oTable1 = this.byId("supTab2"); 
          }
       var that=this;

        
       
      
        var aItems = oTable1.getSelectedItems();
         for(var i = 0; i < aItems.length; i++){
   var edit = aItems[i].getAggregation("cells")[0].getProperty("editable");
    if(aItems[i].getAggregation("cells")[0].getProperty("editable")==edit){
       var sid = aItems[i].getAggregation("cells")[1].getProperty("value");
  
var oModel10 = this.getOwnerComponent().getModel();
oModel10.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
oModel10.setUseBatch(true);

           
oModel10.setDeferredGroups(["myGroupId1"]); 
var group =  oModel10.getDeferredGroups();
           
oModel10.setDeferredGroups(oModel10.getDeferredGroups().concat(["myGroupId1"]));
               
var mParameters = {groupId:"myGroupId1",
success:function(odata, resp){
  
     console.log(resp);
     that.byId("supTab").removeSelections(true) 
     that.byId("supTab").getBinding("items").refresh();
     that.byId("supTab2").removeSelections(true) 
     that.byId("supTab2").getBinding("items").refresh();

},
error: function(error) {

                      console.log(error);
       }};

oModel10.remove("/SUPPLIERSet('" + sid + "')",  mParameters);

   }

    

    }

    oModel10.submitChanges(mParameters);
   sap.m.MessageToast.show("Deleted Succesfully");
     this.getView().byId("saveid").setVisible(false);

    },
    createPop:null,
    createFragment:function(oEvent){
      	// create dialog lazily
			if (!this.createPop) {
            	//var oid = this.createId("fragId");
			this.createPop= sap.ui.xmlfragment("project4.ext.fragment.SupplierList2",this);
            this.getView().addDependent(this.createPop)
        }
        this.createPop.open();

	
    },
    onClose:function(){
        this.createPop.close();
    },
    onSave:function(){
      debugger;
     // var oid = this.createId("fragId");
      var that = this;
     // var oTable1 =  sap.ui.core.Fragment.byId("nfgId", "createTable")
     var oTable1 = this.createPop.getContent()[0];
        var aItems = oTable1.getSelectedItems();

         for(var i = 0; i < aItems.length; i++){

   var edit = aItems[i].getAggregation("cells")[0].getProperty("editable");
    if(aItems[i].getAggregation("cells")[0].getProperty("editable")==edit){

       var sid = aItems[i].getAggregation("cells")[0].getProperty("value");
       var supid =aItems[i].getAggregation("cells")[1].getProperty("value");
        var name = aItems[i].getAggregation("cells")[2].getProperty("value");
      var quantity = aItems[i].getAggregation("cells")[3].getProperty("value");
    var desc =  aItems[i].getAggregation("cells")[4].getProperty("value");
    
      var Payload = {};

Payload.Productid = sid;
Payload.Supplierid = supid;
Payload.Suppliername = name;
Payload.Quantity = quantity;
Payload.Description = desc; 


var oModel10 = this.getOwnerComponent().getModel();
oModel10.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
oModel10.setUseBatch(true);
    
oModel10.create("/SUPPLIERSet",Payload,{
    method:"POST",
    success:function(odata,resp){
        console.log(odata)
        that.byId("supTab").getBinding("items").refresh();
        that.byId("supTab2").getBinding("items").refresh();
    },
    error:function(error){
        console.log(error)
    }

});

}

}
oModel10.submitChanges({
    success:function(data){
        console.log(data)
    },
    error:function(error){
        console.log(error)  
    }
});

    sap.m.MessageToast.show("Created Succesfully");
    oTable1.getBinding("items").refresh();
  oTable1.removeSelections(true)
    this.onClose(); 
    },
    onInit:function(){
        //  debugger;
         var oJSONModel = new sap.ui.model.json.JSONModel();
         this.getOwnerComponent().setModel(oJSONModel, "myModel");

         var sUrl = "/sap/opu/odata/SAP/ZLKLISTREPORT_SRV/";
         var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
            oModel.read("/SUPPLIERSet", {
            success: function (data) {
           oJSONModel.setData({
            SUPPLIERSet: data.results
           });
        // alert("Success");
          }
  
        })

     }
  
    
});
