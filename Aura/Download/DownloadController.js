({
	handleClick : function(component, event, helper) {
        var recordId = component.get("v.recordId");
        helper.getBaseString(component, recordId);
	},
    download : function(component, event, helper) {
        var params = event.getParam('arguments');
        if(params.recordId){
        	helper.getBaseString(component, recordId);
        }
    },
    downloadBase : function(component, event, helper) {
        var params = event.getParam('arguments');
        if(params.base && params.name){
            var wrap = {
                "Body":params.base,
                "Name":params.name
            }
            self.toggleSpinner(component);
            helper.getBaseString(wrap);
            self.toggleSpinner(component);
        }
    }
})