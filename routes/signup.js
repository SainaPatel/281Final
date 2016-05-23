/**
 * http://usejsdoc.org/
 */
var http = require ('http');
var nano=require('nano')('http://281FinalLoadBalancer-1985432583.us-west-2.elb.amazonaws.com:5984/');

exports.signup=function(req,res){
	var username = req.param("username");
	var password = req.param("password");
	var signup=nano.use("signup");
	signup.insert({'username' : username, 'password' : password},'',function(err,body,header){
		if(err){
			console.log("error in inserting");
		}else
			{
			console.log(body);
			res.send("Successfully entered information at");
			}
	});

};



exports.getSignUpDetails=function(req,res){
	var username=req.param("username");
	var signup=nano.use("signup");
	signup.view('getDetails','by_user_name',{'key':username, 'include_docs':true},function(err, body){
		if(err)
			{
			console.log("error"+err);
			res.send("cannot get details");
			}else
				{
				if(typeof body.rows[0] !== undefined && body.rows[0]!==undefined)
					{
					console.log("in not undefined"+body.rows[0]);
					res.send(body.rows[0]);
					}else
						{
						res.send("no response at ");
						}
				}
	});
};