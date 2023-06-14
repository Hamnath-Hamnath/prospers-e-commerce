function headerSetMiddleware(req, res, next) {
  // TODO use specific types
  res.setHeader(
    'Access-Control-Allow-Headers',
    'accept, authorization, content-type, x-requested-with'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE'
  );
  res.setHeader('Access-Control-Allow-Origin', req.header('origin') || '*');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://www.paypal.com; script-src-elem 'self' https://www.paypal.com 'unsafe-inline'; connect-src 'self' https://www.paypal.com https://www.sandbox.paypal.com; font-src * https://fonts.googleapis.com; img-src 'self' data: img-src 'self' data: https://www.paypalobjects.com; `script-src 'self' https://www.paypal.com/sdk/js?client-id=AUmzfFQkQOP3BaE5VMGYfvfqgHg3HVlZJgFj8TLyeqqEbqUapQkfLq-l3BL_7uj40moP6vc1HrFxEKQ_ 'nonce-${nonce}'`; style-src 'self' 'unsafe-inline'  https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600&display=swap; frame-src 'self' https://www.sandbox.paypal.com/"
  );
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );
  next();
}


function headersSentErrorMiddleware(req, res, next) {
  const _send = res.send;
  const _write = res.write;
  const _end = res.end;
  let headersSent = false;

  res.send = function (data) {
    if (headersSent) {
      throw new Error('Headers already sent');
    }

    _send.call(this, data);
    headersSent = true;
  };

  res.write = function (data) {
    if (headersSent) {
      throw new Error('Headers already sent');
    }

    _write.call(this, data);
  };

  res.end = function (data) {
    if (headersSent) {
      throw new Error('Headers already sent');
    }

    _end.call(this, data);
    headersSent = true;
  };

  next();
}

module.exports = { headerSetMiddleware, headersSentErrorMiddleware };
