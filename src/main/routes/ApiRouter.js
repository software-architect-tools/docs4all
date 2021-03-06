const fs = require('fs');
var path = require('path');
var finder = require('find-package-json');

@Module(name="apiRouter")
function ApiRouter(){
  
  @Autowire(name="server")
  this.server;
  
  @Autowire(name="memoryDatasource")
  this.memoryDatasource;
  
  @Autowire(name="options")
  this.options;
  
  this.init = () => {

    this.memoryDatasource.setDocumentsBaseDir(this.options.documentsLocation);
    this.memoryDatasource.loadDocuments(this.memoryDatasource.getDocumentsBaseDir());
    this.server.getExpressInstance().get('/api/document',this.findDocument);    
    this.server.getExpressInstance().post('/api/document/query/and',this.findDocumentByAndRestrictions);    
  };
  
  this.findDocument = (req, res) => {
    try {
        res.json(this.memoryDatasource.getDocuments())
    } catch (e) {
        console.log(e);
        res.json({"error":e})
    }
  };
  
  this.findDocumentByAndRestrictions = (req, res) => {
    try {
        res.json(this.memoryDatasource.findDocumentByAndRestrictions(req.body))
    } catch (e) {
        console.log(e);
        res.json({"error":e})
    }
  };

  
  
}

module.exports = ApiRouter
