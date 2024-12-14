const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/service", 
    createProxyMiddleware({
      target: "https://api.naas.go.kr", 
      changeOrigin: true, 
      secure: true, 
      pathRewrite: { "^/service": "" }, 
    })
  );
};
