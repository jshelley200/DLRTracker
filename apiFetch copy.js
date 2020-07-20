const https = require('https');
const http = require('http');



function getTime (req, res){
    let dataStream = '';
    let dataParse = '';
    let nextTrain;

    if (req.url === "/"){

        res.writeHead(200, {
            'Content-Type': 'text/plain'
          })

        const tflApi = https.get('https://api.tfl.gov.uk/Mode/dlr/Arrivals?count=-1', response => {
            response.on('data', data => {
                dataStream += data;
            })

            response.on('end', data => {
                try{
                    dataParse = JSON.parse(dataStream);

                    for (let entry in dataParse){
                        if (dataParse[entry].stationName === "Stratford DLR Station" && dataParse[entry].destinationName === "Stratford International DLR Station"){
                            nextTrain = dataParse[entry].expectedArrival 
                            break;
                            //console.log(nextTrain);
                        } 
                    }

                    let d1 = nextTrain
                    let d2 = new Date;

                    let diff = d2 - d2;

                    
                    console.log(d1)
                    console.log(d2)
                    console.log(diff)

                } catch (error){
                    console.log(error);

                }
                res.write(nextTrain);
                res.end(); 
            })
            
        });
    }  else{

        res.writeHead(404, {

            'Content-Type': 'text/plain'
          })

        res.write("This page doesn't exist");
        res.end(); 
    } 
}


module.exports.times = getTime;