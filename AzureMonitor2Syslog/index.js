// Forward Azure Monitor Logs to Syslog (via Event Hub)
// Developed as a sample for testing purpuses
// https://github.com/miguelangelopereira/azuremonitor2syslog
// miguelp@microsoft.com

module.exports = function (context, myEventHubMessage) {
    // initializing syslog
    var syslog = require("syslog-client");

    // getting environment variables
    var SYSLOG_SERVER = GetEnvironmentVariable("SYSLOG_SERVER");
    var SYSLOG_PROTOCOL;
    if (GetEnvironmentVariable("SYSLOG_PROTOCOL")=="TCP") {
        SYSLOG_PROTOCOL = syslog.Transport.Tcp;
    } else {
        SYSLOG_PROTOCOL = syslog.Transport.Udp;
    }

    var SYSLOG_HOSTNAME;
    if (GetEnvironmentVariable("SYSLOG_HOSTNAME")=="") {
        SYSLOG_HOSTNAME = "azurefunction"
    } else {
        SYSLOG_HOSTNAME = GetEnvironmentVariable("SYSLOG_HOSTNAME");
    }

    var SYSLOG_PORT = GetEnvironmentVariable("SYSLOG_PORT");

    // options for syslog connection
    var options = {
        syslogHostname: SYSLOG_HOSTNAME,
        transport: SYSLOG_PROTOCOL,    
        port: SYSLOG_PORT
    };

    // log connection variables
    context.log('SYSLOG Server: ', SYSLOG_SERVER);
    context.log('SYSLOG Port: ', SYSLOG_PORT);
    context.log('SYSLOG Protocol: ', SYSLOG_PROTOCOL);
    context.log('SYSLOG Hostname: ', SYSLOG_HOSTNAME);

    // log received message from event hub
    context.log('Event Hubs trigger function processed message: ', myEventHubMessage);
    context.log('EnqueuedTimeUtc =', context.bindingData.enqueuedTimeUtc);
    context.log('SequenceNumber =', context.bindingData.sequenceNumber);
    context.log('Offset =', context.bindingData.offset);
    
    // create syslog client
    var client = syslog.createClient(SYSLOG_SERVER, options);

    // cycle through eventhub messages and send syslog
    myEventHubMessage.forEach((message, index)=>{
        if(typeof message === 'object'){

            var msg = JSON.parse(JSON.stringify(message));

            
        }
    });
    

      context.log("completed sending all messages");

    context.done();
};

function GetEnvironmentVariable(name)
{
    return process.env[name];
}
