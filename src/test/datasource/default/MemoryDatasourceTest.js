var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
const MemoryDatasource = require("datasource/default/MemoryDatasource.js");
const SetupTest = require("SetupTest.js");

describe('/datasource/default/MemoryDatasource.js', function() {
  it('loadDocuments', function() {
    var memoryDatasource = new MemoryDatasource();
    memoryDatasource.setDocumentsBaseDir("/home/rleon/Documents/incubadora/doc4all/src/test/docs_for_test");
    assert(memoryDatasource);
    memoryDatasource.loadDocuments(memoryDatasource.getDocumentsBaseDir());
    var loadedResources = memoryDatasource.getDocuments();
    // console.log(JSON.stringify(loadedResources, null, 4));
    //29 resources
    expect(loadedResources.data.length).to.equal(29);
    
    //must exist /about resource    
    var aboutResource = memoryDatasource.getDocuments().find({'path': "/about"});    
    
    // /about/contributing.md is child of /about
    
    // get /about parent
    var parent = aboutResource[0];
    expect(parent.path).to.equal("/about");
    expect(parent.type).to.equal("node");
        
    // get /about/contributing.md child
    var aboutContributingResource = memoryDatasource.getDocuments().find({'path': "/about/contributing.md"});    
    var child1 = aboutContributingResource[0];
    expect(child1.path).to.equal("/about/contributing.md");
    expect(child1.type).to.equal("child");
    //must be child of about
    expect(child1.parent).to.equal(parent.id);
    
    //another third level child asseert
    var install = memoryDatasource.getDocuments().find({'path': "/install"});
    expect(install.length).to.equal(1);    
    var installRaneto = memoryDatasource.getDocuments().find({'path': "/install/raneto"});  
    expect(installRaneto.length).to.equal(1);   
    var installRanetoInstallingRaneto = memoryDatasource.getDocuments().find({'path': "/install/raneto/installing-raneto.md"});    
    expect(installRanetoInstallingRaneto.length).to.equal(1); 
    
    expect(installRaneto[0].parent, "/install/raneto must be child of /install").to.equal(install[0].id);
    expect(installRanetoInstallingRaneto[0].parent, "/install/raneto/installing-raneto.md must be child of /install/raneto").to.equal(installRaneto[0].id);

  });

  it('getTreeMenuByAudienceTargetType', function() {
    var memoryDatasource = new MemoryDatasource();
    memoryDatasource.setDocumentsBaseDir("/home/rleon/Documents/incubadora/doc4all/src/test/docs_for_test");
    assert(memoryDatasource);
    memoryDatasource.loadDocuments(memoryDatasource.getDocumentsBaseDir());
    // console.log(JSON.stringify(memoryDatasource.getDocuments().data, null, 4));
    var treeMenu = memoryDatasource.getTreeMenuByAudienceTargetType("user")
    // console.log(JSON.stringify(treeMenu, null, 4));
    //assert parent nodes
    assert(treeMenu["/about"]);
    assert(treeMenu["/install"]);
    assert(treeMenu["/tutorials"]);
    
    //assert about children
    var aboutChildren = treeMenu["/about"].children;
    expect(Object.keys(aboutChildren).length).to.equal(4);
    expect(aboutChildren["/about/contributing.md"].parent).to.equal(treeMenu["/about"].id);

    //assert install children
    var installChildren = treeMenu["/install"].children;
    expect(Object.keys(installChildren).length).to.equal(3);
    expect(installChildren["/install/production-notes.md"].parent).to.equal(treeMenu["/install"].id);
    expect(installChildren["/install/raneto"].parent).to.equal(treeMenu["/install"].id);
    //third level children
    var thirdLevelChild = installChildren["/install/raneto"].children
    expect(Object.keys(thirdLevelChild).length).to.equal(1);
    expect(thirdLevelChild["/install/raneto/installing-raneto.md"].parent).to.equal(installChildren["/install/raneto"].id);
    
    //assert tutorials children
    var tutorialsChildren = treeMenu["/tutorials"].children;
    expect(Object.keys(tutorialsChildren).length).to.equal(3);
    
  });
  
  it('searchByContent', function() {
    var memoryDatasource = new MemoryDatasource();
    memoryDatasource.setDocumentsBaseDir("/home/rleon/Documents/incubadora/doc4all/src/test/docs_for_test");
    assert(memoryDatasource);
    memoryDatasource.loadDocuments(memoryDatasource.getDocumentsBaseDir());

    var oneResult = memoryDatasource.searchByContent("user", "google")
    expect(oneResult.length).to.equal(1);
    expect(oneResult[0].path).to.equal("/tutorials/google-oauth-setup.md");
    expect(oneResult[0].name).to.equal("google-oauth-setup.md");
    
    var severalResults = memoryDatasource.searchByContent("user", "install")
    expect(severalResults.length).to.equal(6);
    // console.log(JSON.stringify(severalResults, null, 4));
  });
});
