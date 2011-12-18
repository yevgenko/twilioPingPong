$(function(){
  if (Twilio && PP_TOKEN && PP_TOKEN != "") {
    var log = $("#log");
    var pingBtn = $("#ping");

    Twilio.Device.setup(PP_TOKEN);

    Twilio.Device.ready(function (device) {
      log.text("Ready");
    });

    Twilio.Device.error(function (error) {
      console.log(error);
      log.text("Error: " + error.message);
    });

    Twilio.Device.connect(function (conn) {
      log.text("Successfully established call");
    });

    Twilio.Device.disconnect(function (conn) {
      log.text("Call ended");
    });

    Twilio.Device.incoming(function (conn) {
      log.text("Incoming connection from " + conn.parameters.From);
      // accept the incoming connection and start two-way audio
      conn.accept();
      pingBtn.removeAttr("disabled");
    });

    pingBtn.click(function(e) {
      pingBtn.attr("disabled", "disabled");
      log.text('Sending...');
      $.post("/ping", {"msg": "pong"}, function(data) {
        log.text('Waiting...');
      });
    })
  }
})(jQuery);
