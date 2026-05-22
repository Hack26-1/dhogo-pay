async function payNow(){

  const phone =
    document.getElementById("phone").value;

  const status =
    document.getElementById("status");

  /* Validation */

  if(phone.trim() === ""){

    status.innerText =
      "Please enter EcoCash number";

    return;
  }

  status.innerText =
    "Sending payment request...";

  try{

    const response = await fetch(
      "/.netlify/functions/pay",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          phone:phone
        })
      }
    );

    const data =
      await response.json();

    if(data.error){

      status.innerText =
        "Payment failed";

    }else{

      status.innerText =
        "Payment request sent!";
    }

  }catch(err){

    status.innerText =
      "Connection error";
  }
}