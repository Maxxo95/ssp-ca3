const fs = require('fs');
const express =require('express');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const html= fs.readFileSync('./index.html','utf-8'); //HTML File reading
 let employees= JSON.parse(fs.readFileSync('./employees.json','utf-8')) ; // Getting json data to JavaScript obejct
 let emplisthtml=fs.readFileSync('./employ.html','utf-8'); //reading employ html 
 let employeesHTMLarray=employees.map((emp) => {      //putting json  data to html code   
 let output=  emplisthtml.replace('{{%image%}}',emp.image); // replace defaults
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

let addingname= (req.body.NAME);     //adding a new employye profile
let addingimage=(req.body.image_link);
let addingjob= (req.body.Job);
let addingemail=(req.body.email);

if((addingemail!="")&(addingname!="")&(addingjob!="")&(addingimage!="")){    //if all them are not equals empty = create new employee
  {
    "jobTitleName": addingjob,
    "preferredFullName": addingname,
    "image": addingimage,
    "emailAddress":addingemail
  }
 
  let delete_name= (req.body.delete);     // delete employee 
 if(delete_name!==""&&typeof(delete_name!=="undefined")){  
  let deleted_data =JSON.stringify(employees_after_Delete1);
 fs.writeFileSync('./employees.json',deleted_data);
 delete_name="";
  }

  res.redirect('/');
}