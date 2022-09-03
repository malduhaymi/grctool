
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
      // read serverip and save it

        //call a function to handle a first install
fetch('info.txt').then(r => r.text()).then(result => {
      chrome.storage.local.set({key: result}, function() {
  console.log('Server info ' + result);
});

});

    }else if(details.reason == "update"){
        //call a function to handle an update
fetch('info.txt').then(r => r.text()).then(result => {
      chrome.storage.local.set({key: result}, function() {
  console.log('Sever info ' + result);
});

});



    }
});





chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

try{

var serveripfromfile;
chrome.storage.local.get(['key'], function(result) {
  console.log('Server info' + result.key);
  serveripfromfile=result.key;
//start if 
    if(changeInfo.url!="undefined"){
var encodedValue = encodeURIComponent(changeInfo.url);

    fetch("http://"+serveripfromfile+"/grc/checkurl.php?url="+encodedValue).then(rx => rx.text()).then(resultx => {
            if(resultx!=""){
     if(isValidHttpUrl(resultx)){
          //  if(changeInfo.status=="complete"){
        chrome.windows.create({url: resultx, type: "popup"});
    }
       // }
      }
});


    }
//end if , open else     
    else if(tab.url!="undefined"){
var encodedValue = encodeURIComponent(tab.url);
    fetch("http://"+serveripfromfile+"/grc/checkurl.php?url="+encodedValue).then(rx => rx.text()).then(resultx => {
      if(resultx!=""){
      //      if(tab.status=="complete"){
             if(isValidHttpUrl(resultx)){

        chrome.windows.create({url: resultx, type: "popup"});
        //}
    }
      }
})


    }

});

// end try 
  }
  catch(err){
    console.log(err);
  }




}); 
//end function 




chrome.tabs.onActivated.addListener(function(activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  chrome.tabs.get(activeInfo.tabId, function(tab){
     console.log("old tab "+tab.url);


try{
var serveripfromfile;
chrome.storage.local.get(['key'], function(result) {
  console.log('Server info' + result.key);
  serveripfromfile=result.key;
//start if 
   
 if(tab.url!="undefined"){
var encodedValue = encodeURIComponent(tab.url);
console.log(encodedValue);
    fetch("http://"+serveripfromfile+"/grc/checkurl.php?url="+encodedValue).then(rx => rx.text()).then(resultx => {
      console.log("result from onActivated"+resultx);
      if(resultx!=""){
      //      if(tab.status=="complete"){
        console.log("is it url "+isValidHttpUrl(resultx));
             if(isValidHttpUrl(resultx)){

        chrome.windows.create({url: resultx, type: "popup"});
        //}
    }
      }
})

    }

});

// end try 
  }
  catch(err){
    console.log(err);
  }






  });
}); 




function isValidHttpUrl(string) {
  let url;
  
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}