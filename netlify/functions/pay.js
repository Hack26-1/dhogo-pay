exports.handler = async (event) => {

  try{

    const body =
      JSON.parse(event.body);

    const phone =
      body.phone;

    /* Build Basic Auth */

    const auth = Buffer.from(

      process.env.CONTIPAY_KEY +

      ":" +

      process.env.CONTIPAY_SECRET

    ).toString("base64");

    /* Send Payment Request */

    const response = await fetch(

      "https://api.contipay.net/acquire/payment",

      {

        method:"PUT",

        headers:{

          "Content-Type":"application/json",

          "Authorization":
            "Basic " + auth
        },

        body:JSON.stringify({

          amount:1,

          merchantId:
            process.env.MERCHANT_ID,

          currencyCode:"USD",

          description:
            "Dhogo Pay EcoCash Payment",

          reference:
            "PAY_" + Date.now(),

          customer:{

            firstName:"Takunda",

            surname:"User",

            email:"customer@test.com",

            cell:phone,

            countryCode:"ZW"
          },

          successUrl:
            "https://your-site.netlify.app/success",

          cancelUrl:
            "https://your-site.netlify.app/cancel",

          webhookUrl:
            "https://your-site.netlify.app/.netlify/functions/webhook"
        })
      }
    );

    const data =
      await response.json();

    return{

      statusCode:200,

      body:JSON.stringify(data)
    };

  }catch(err){

    return{

      statusCode:500,

      body:JSON.stringify({

        error:err.message
      })
    };
  }
};