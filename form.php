unction enqueue_calculator_script() {
    // Make sure jQuery and Bootstrap are loaded
    wp_enqueue_script('jquery');
    wp_enqueue_style('bootstrap-css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
    wp_enqueue_script('bootstrap-js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js', [], null, true);

    // Enqueue your custom script
    wp_enqueue_script('bisdaks-calculator', get_stylesheet_directory_uri() . '/js/bisdaks.js', ['jquery'], null, true);
}
add_action('wp_enqueue_scripts', 'enqueue_calculator_script');


// FORM Function

add_action('admin_post_send_sample_request', 'handle_sample_request');
add_action('admin_post_nopriv_send_sample_request', 'handle_sample_request');

function handle_sample_request() {
    $name = sanitize_text_field($_POST['name']);
    $phone = sanitize_text_field($_POST['phone']);
    $email = sanitize_email($_POST['email']);
    $address = sanitize_textarea_field($_POST['address']);

  // Must match the hidden input names exactly
  $rado = sanitize_text_field($_POST['rado_rail']);
  $panel = sanitize_text_field($_POST['panel_mode']);
  $sqm = sanitize_text_field($_POST['sqm']);
  $price = sanitize_text_field($_POST['price']);

    $to = get_option('admin_email'); // Or change this to your target email
    $subject = 'New Sample Request';
    $message = "You received a new sample request:\n\n";
    $message .= "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Address: $address\n\n";
    $message .= "Rado Rail: $rado\n";
    $message .= "Panel Mode: $panel\n";
    $message .= "SQM: $sqm\n";
    $message .= "Price: €$price\n";

	$headers[] = 'Cc: William Ralloa <william.ralloma@gmail.com>';

    wp_mail($to, $subject, $message);

    // Redirect after success
    wp_redirect(home_url('/wedding')); // You can change this
    exit;
}
