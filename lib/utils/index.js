function until(ee, event) {
  return new Promise((resolve, reject) => {
    ee.once(event, resolve);
    ee.once('error', reject);
  });
}

module.exports.until = until;
