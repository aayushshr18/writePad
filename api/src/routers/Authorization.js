const express = require("express");
const routerV1 = new express.Router();
const userAuth = require("../controllers/Authorization");
const Website = require("../controllers/Website");



//user auth
routerV1.get("/user",userAuth.userDetails);
routerV1.patch("/user",userAuth.updateUser);
routerV1.delete("/user",userAuth.deleteUser);

routerV1.post("/website",Website.addWebsite );
routerV1.get("/website/:id",Website.getWebsite );
routerV1.get("/website", Website.getAllWebsites);
routerV1.patch("/website/:id", Website.updateWebsite);
routerV1.delete("/website/:id", Website.delWebsite);
routerV1.post("/website/page",Website.createPage );
routerV1.get("/website/page/:id",Website.getPage );
routerV1.get("/website/singlepage/:id",Website.getSinglePage );
routerV1.delete("/website/delete/page/:id",Website.deletePage );
module.exports = routerV1;