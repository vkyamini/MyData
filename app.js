const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '954041668254-k6ubkg3it732o3n90ofr1me1vfadbm4c.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground/';
const REFRESH_TOKEN ='1//04RC2_Idh-N59CgYIARAAGAQSNwF-L9Irvix7HIpN_c2ID42slFKXeHTOqJBhAIeVIAdT6fm229YqHV6vbHdsUY6Vdj8zxqcpyp8';


const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oauth2client.setCredentials({refresh_token:REFRESH_TOKEN})

const drive = google.drive({
    version:'v3',
    auth:oauth2client
})

const filePath = path.join(__dirname,'pic.png');

async function uploadfile(){
  try{

    const response = await drive.files.create({ 
        requestBody: {
            name:'girl.png',
            mimeType:'image/png'
        },
        media:{
            mimeType:'image/png',
            body:fs.createReadStream(filePath)
        }
    }
       
    )
    console.log(response.data)

  }catch(err){
console.log(err.message)
  }
}

//uploadfile();

async function Delefiles(){
    try{
        const response = await drive.files.delete({
            fileId:'1yleG95VxG1XGAboSaFgKqu89xDjctDvT',
        });
        console.log(response.status , response.data)

    }catch(err){
       console.log(err.message)
    }
}
//Delefiles();

async function geneurl(){
    try{
      const fileId = '1V8iJVYOokuEKM8tjn6DrHhj2EeMg301i'
      await drive.permissions.create({
        fileId:fileId,
        requestBody:{
            role:'reader',
            type:'anyone'
        }
      })
      const res = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink'
      })
      console.log(res.data);
    }catch(err){
        console.log(err.message)
    }
}
//geneurl()