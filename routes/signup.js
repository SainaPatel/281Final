/**
 * http://usejsdoc.org/
 */
var http = require ('http');
var nano=require('nano')('http://281FinalLoadBalancer-1985432583.us-west-2.elb.amazonaws.com:5984/');
var ip=require("ip");
var localip = require( 'quick-local-ip' );
var request=require('request');
//exports.getDB=function(req,res){
////	var networkInterfaces = os.networkInterfaces( );
////	var arr = networkInterfaces['Local Area Connection 3'];
////	var ip = arr.address;
//	var dbname=nano.use(req.param("dbname"));
//	console.log("dbname in getdb"+dbname);
//	//console.log(req.param("hello")+" "+requestip.getClientIp(req));
//	var ipaddress=localip.getLocalIP4();
////	os(function(err,eip){
////		console.log(eip);
////		ipaddress+=eip+"    "+ip.address();
////	});
//	//res=dbname;
//	res.send({"ip":ip.address(),"db":dbname});
//};
exports.signup=function(req,res){
	var username = req.param("username");
	var password = req.param("password");
	var ipadd=nano.db.use("ipaddress");
	var instanceip;
	ipadd.view('getIp','by_name',{key: "ipaddress",'include_docs':true},function(err,body){
		console.log(body);
		instanceip=body.rows[0].value.ipaddress;
		
		var nanoinstance=require('nano')('http://'+instanceip+':5984/');
		
		var signup=nanoinstance.use("signup");
		//console.log("signup1"+signup1);
		//console.log("ip"+signup.config.url);
		signup.insert({'username' : username, 'password' : password},'',function(err,body,header){
			if(err){
				console.log("error in inserting");
			}else
				{
				console.log(body);
				res.send("Successfully entered information at"+instanceip);
				}
		});
	});
	
//	request({
//		url: 'http://localhost:3000/getDB',
//		form : {dbname : "signup"}
//	},function(err,response,body){
//		if(err)
//			{
//			console.log("err"+err);
//			}
//	console.log("response.db"+response.body);
//	
//		signup=(response.body.db);
//		
//	});
	

};



exports.getDocument=function(req,res){
	var username=req.param("username");
	
	var ipadd=nano.db.use("ipaddress");
	var instanceip;
	ipadd.view('getIp','by_name',{key: "ipaddress",'include_docs':true},function(err,body){
		console.log(body);
		instanceip=body.rows[0].value.ipaddress;
		
		var nanoinstance=require('nano')('http://'+instanceip+':5984/');
		
	
	var signup=nanoinstance.use("signup");
	signup.view('getDetails','by_finalexam',{'key':"Hello World #1", 'include_docs':true},function(err, body){
		if(err)
			{
			console.log("error"+err);
			res.send("cannot get details");
			}else
				{
				if(typeof body.rows[0] !== undefined && body.rows[0]!==undefined)
					{
					console.log("in not undefined"+body.rows[0]);
					res.send("Get document"+JSON.stringify(body.rows[0])+" from "+instanceip);
					}else
						{
						res.send("no response at "+instanceip);
						}
				}
	});
	});
};



exports.updateDetails=function(req,res){
	var ipadd=nano.db.use("ipaddress");
	var instanceip;
	ipadd.view('getIp','by_name',{key: "ipaddress",'include_docs':true},function(err,body){
		console.log(body);
		instanceip=body.rows[0].value.ipaddress;
		
		var nanoinstance=require('nano')('http://'+instanceip+':5984/');
		
	
	var signup=nanoinstance.use("signup");
	signup.view('getDetails','by_user_name',{'key':username, 'include_docs':true},function(err, body){
		if(err)
			{
			console.log("error"+err);
			res.send("cannot get details");
			}else
				{
				if(typeof body.rows[0] !== undefined && body.rows[0]!==undefined)
					{
					signup.insert({"username":"sp","password":body.rows[0].password,_rev:body.rows[0]._rev},body.rows[0]._id,function(err,response){
						if(err)
							{
							console.log("error in updating at"+ipaddress);
							res.send("error in updating at"+ipaddress);
							}else{
								res.send("updated successfully at"+ipaddress);
							}
					});
					}else
						{
						
						}
					}
	});
});
};