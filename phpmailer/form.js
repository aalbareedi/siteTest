jQuery(function () {
  function after_form_submitted(response) {
    jQuery("#loading-overlay").hide();
    const data = response.responseJSON || {};

    if (data.result == "success") {
      jQuery("form#message-form").trigger("reset");
      jQuery("#success-message-overlay").show();
      jQuery("#error-message-overlay").hide();
    } else {
      jQuery("#error_message").append("<ul></ul>");

      jQuery.each(response.errors, function (key, val) {
        jQuery("#error_message ul").append("<li>" + key + ":" + val + "</li>");
      });
      jQuery("#success-message-overlay").hide();
      jQuery("#error-message-overlay").show();

      //reverse the response on the button
      // jQuery('button[type="button"]', $form).each(function () {
      //   $btn = jQuery(this);
      //   label = $btn.prop("orig_label");
      //   if (label) {
      //     $btn.prop("type", "submit");
      //     $btn.text(label);
      //     $btn.prop("orig_label", "");
      //   }
      // });
    }

    setTimeout(() => {
      jQuery("#error-message-overlay").hide();
      jQuery("#success-message-overlay").hide();
    }, 3000);
  }

  jQuery("#message-form").submit(function (e) {
    e.preventDefault();

    jQuery("#loading-overlay").show();

    $form = jQuery(this);
    //show some response on the button
    // jQuery('button[type="submit"]', $form).each(function () {
    //   $btn = jQuery(this);
    //   $btn.prop("type", "button");
    //   $btn.prop("orig_label", $btn.text());
    //   $btn.text("Sending ...");
    // });

    jQuery.ajax({
      type: "POST",
      url: "../../phpmailer/handler.php",
      data: $form.serialize(),
      complete: after_form_submitted,

      dataType: "json",
    });
  });
});
