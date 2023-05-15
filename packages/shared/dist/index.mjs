const DEFAULT_API_SUCCESS_CODE = 200;

function to(promise) {
  return promise.then((data) => [null, data]).catch((err) => {
    return [err, void 0];
  });
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  to: to
});

export { DEFAULT_API_SUCCESS_CODE, index as utils };
