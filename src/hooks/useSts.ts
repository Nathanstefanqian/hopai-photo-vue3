
import OSS from 'ali-oss'
import * as stsApi from '@/api/sts'

export const useSts = (id?:string) => {
  const client = ref<any>(null)
  const getStsToken = async () => {
    let res: any = (await stsApi.getUserProfile()).data
    client.value = new OSS({
      region: 'oss-cn-shanghai',
      accessKeyId: res.credentials.accessKeyId,
      accessKeySecret: res.credentials.accessKeySecret,
      stsToken: res.credentials.securityToken,
      bucket: 'hopai-user-profile',
      refreshSTSToken: async () => {
        res = await stsApi.getUserProfile()
        return {
          accessKeyId: res.credentials.accessKeyId,
          accessKeySecret: res.credentials.accessKeySecret,
          stsToken: res.credentials.securityToken
        }
      }
    })
  }
  
  const put = async (ObjName: any, fileUrl: any) => {
    try {
      return await client.value?.put(ObjName, fileUrl)

    } catch (e) {
      console.log(e)
    }
  }


  // 获取上传后的真实地址（用来返回给数据库）
  const signatrueUrl = async (ObjName: any) => {
    try {
      return await client.value?.signatureUrl(`${ObjName}`)
    } catch (e) {
      console.log(e)
    }
  }
  return {
    getStsToken,
    put,
    signatrueUrl
  }
}