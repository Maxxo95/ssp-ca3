const fs = require('fs');
const express =require('express');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 const html= fs.readFileSync('./index.html','utf-8'); //HTML File reading
 let employees= JSON.parse(fs.readFileSync('./employees.json','utf-8')) ; // Getting json data to JavaScript obejct
 let emplisthtml=fs.readFileSync('./employees.html','utf-8'); //reading employ html 
 let employeesHTMLarray=employees.map((emp) => {      //putting json data to html code 
 let output=  emplisthtml.replace('{{%image%}}',emp.image);
 output= output.replace('{{%preferredFullName%}}',emp.preferredFullName);
 output= output.replace('{{%preferredFullName1%}}',emp.preferredFullName);
 output=  output.replace('{{%jobTitleName%}}',emp.jobTitleName);
 output=  output.replace('{{%emailAddress%}}',emp.emailAddress);
  return output; })
  
 

app.listen(port, function () {
  console.log("Server is started at port " + port);
  
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  let productResponseHtml = html.replace('{{%CONTENT%}}', employeesHTMLarray.join(','));     //sending json html code to inside our index.html {{%CONTENT%}} 
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.end(productResponseHtml);
  
});
 
app.post("/", function(req,res){             

 
let searchingusername = String(req.body.Search);          //searching user search request and printing to console.
if(searchingusername!==""){
  let employs= JSON.parse(fs.readFileSync('./employees.json','utf-8')) ;
  for(i=0;i<employs.length;i++){
     if(employs[i].preferredFullName==searchingusername){
       let temp =  employs[0];
       employs[0]=employs[i];
       employs[i]=temp;
       searchresult= JSON.stringify(employs);
       fs.writeFileSync('./employees.json',searchresult);
     }
  }
 
}

let addingname= (req.body.NAME);
let addingimage=(req.body.image_link);
let addingjob= (req.body.Job);
let addingemail=(req.body.email);

if((addingemail!=="")&&(addingname!=="")&&(addingjob!=="")&&(addingimage!=="")){
let mergedadding={
  "jobTitleName": addingjob,
  "preferredFullName": addingname,
  "image": addingimage,
  "emailAddress":addingemail
}
let try2 = toString("try");
if(typeof mergedadding.jobTitleName == typeof(try2)){
let beforeaddingemp= JSON.parse(fs.readFileSync('./employees.json','utf-8')) ;
beforeaddingemp.push(mergedadding);
let stringdata =JSON.stringify(beforeaddingemp);
 fs.writeFileSync('./employees.json',stringdata);
}}

addingemail="";
addingimage="";
addingjob="";
addingname="";
 


 let delete_name= (req.body.delete);        //deleting employee from employees.json  by user post request.
 if(delete_name!==""&&typeof(delete_name!=="undefined")){          
 let employees_before_Delete= JSON.parse(fs.readFileSync('./employees.json','utf-8')) ;
 let  employees_after_Delete= employees_before_Delete.filter(user => user.preferredFullName !== delete_name);
 let  employees_after_Delete1= employees_after_Delete.filter(user => user.preferredFullName !== "undefined");
 let deleted_data =JSON.stringify(employees_after_Delete1);
 fs.writeFileSync('./employees.json',deleted_data);
 delete_name="";
  }

  res.redirect('/');
})




 