({
	getBaseString : function(component, rId) {
        var self = this;
        var action = component.get("c.getBlobInfo");
        
        action.setParams({
            recordId : rId
        });   
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //console.log('Response: ' + JSON.stringify(response.getReturnValue()));
                var opwrap = response.getReturnValue();
                console.log('Type- '+opwrap.Type);
                console.log('Name- '+opwrap.Name);
                
                self.basetoBlobDownload(opwrap);
                self.toggleSpinner(component);
            }
            else if (state === "ERROR") {
                console.log('Error getting attachment.');
            }
        });
        $A.enqueueAction(action);
        this.toggleSpinner(component);
    },
    basetoBlobDownload : function(wrap){

        var byteCharacters = atob(wrap.Body);
                
        const buf = new Array(byteCharacters.length);
        for (var i = 0; i != byteCharacters.length; ++i) buf[i] = byteCharacters.charCodeAt(i);// & 0xFF;
        
        const view = new Uint8Array(buf);
        
        const blob = new Blob([view], {
            type: 'application/octet-stream'
        });
        
        // Automatically download the file by appending an a element,
        // 'clicking' it, and removing the element
        const a = window.document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = wrap.Name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
    toggleSpinner: function(component){
        var spinner = component.find("spinner");
        $A.util.toggleClass(spinner, "slds-hide");
    }
})