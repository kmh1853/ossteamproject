const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/service',
    createProxyMiddleware({
      target: 'https://api.naas.go.kr', // 실제 API 서버
      changeOrigin: true,
      pathRewrite: {
        '^/service': '', // '/service' 경로를 제거
      },
    })
  );
};
