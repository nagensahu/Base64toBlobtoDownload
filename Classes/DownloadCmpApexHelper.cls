public class DownloadCmpApexHelper {
    
    public class BlobWrapper{
        @AuraEnabled
        public String Body;
        
        @AuraEnabled
        public String Name;
        
        @AuraEnabled
        public String Type;
    }
    
	@AuraEnabled
    public static BlobWrapper getBlobInfo(String recordId){
        BlobWrapper response = new BlobWrapper();
        
        Attachment att = [select body, Name, ContentType from Attachment where id = :recordId];
        response.body = EncodingUtil.base64Encode( att.body );
        response.Name = att.Name;
        response.Type = att.ContentType;
        
        return response;
    }
}