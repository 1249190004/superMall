import originAxios from 'axios'

export default function axios(option) {
  return new Promise((resolve, reject) => {
    const instance = originAxios.create({
      //测试接口
      baseURL: 'http://123.207.32.32:8000/',
      timeout: 5000
    });

    instance.interceptors.request.use(config => {
      document.write('测试接口，数据只显示一部分')
      return config
    }, err => {
      return err
    })

    instance.interceptors.response.use(response => {
      return response.data
    }, err => {
      console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            err.message = '请求错误'
            break
          case 401:
            err.message = '未授权的访问'
            break
        }
      }
      return err
    })

    instance(option).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
