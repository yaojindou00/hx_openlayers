module.exports = {
    publicPath: './',
    outputDir: 'hx-openlayers',
    chainWebpack: config => {
      
    },
    devServer: {
      // mode: 'hash',
      open: 'localhost:8086',
      host: '0.0.0.0',
      port: 8085,
      proxy: {
        '/postgisapi': {   
          target: 'http://10.61.5.63:8081',   
          changeOrigin: true,
          pathRewrite: {
            '^/postgisapi': ''
          }
        },
        
        '/vectapi': {   
          target: 'http://localhost:8081',   
          changeOrigin: true,
          pathRewrite: {
            '^/vectapi': ''
          }
        }
      }
    }
  }
  