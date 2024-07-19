import { Base64 } from '@/utils/bundle'
import { makeUUID } from '@/utils/tools';
import { useUserStore } from '@/pinia/user';
import * as stsApi from '@/api/sts'
import CryptoJS from 'crypto-js'
// 我们需要调用hopai-user-profile 和 hopai-user-portrait 上传功能，因此要写两份配置文件
interface Config {
  bucketName: string;
  accessid: string;
  accesskey: string;
  securitytoken: string
  host: string;
}

const config = ref<Config>({
  bucketName: "", // 你的bucketName
  accessid: "", // 你的阿里oss accessid
  accesskey: "", // 你的阿里oss secret
  securitytoken: "",
  host: "", // 上传oss地址 注意地区
})


const computeSignature = (accessKeySecret: string, canonicalString: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(canonicalString, accessKeySecret));
}


// 定义type 0 为头像 1为资料
export const useUpload = (type: number) =>  {

  const getConfig = async () => {
    if(!type) {
      const res = (await stsApi.getUserPortraitUpload()).data
      config.value.accessid = res.credentials.accessKeyId
      config.value.accesskey = res.credentials.accessKeySecret
      config.value.securitytoken = res.credentials.securityToken
      config.value.host = "https://hopai-user-portrait.oss-cn-shanghai.aliyuncs.com"
      config.value.bucketName = "hopai-user-portrait"
    } else {
      const res = (await stsApi.getUserProfile()).data
      config.value.accessid = res.credentials.accessKeyId
      config.value.accesskey = res.credentials.accessKeySecret
      config.value.securitytoken = res.credentials.securityToken
      config.value.host = "https://hopai-user-profile.oss-cn-shanghai.aliyuncs.com"
      config.value.bucketName = "hopai-user-profile"
    }
  }
  const uploadFile = async (path: string, onProgress: (progress: number) => void) => {
    return new Promise((resolve, reject) => {
      const date = new Date(new Date().getTime() + 1000 * 3600); // 上传能力在一小时之内有效
      const expiration = date.toISOString();
      const policyText = {
        expiration, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
        "conditions": [
          ["content-length-range", 0, 1024 * 1024 * 1024] // 设置上传文件的大小限制
        ]
      };
  
      const policy = Base64.encode(JSON.stringify(policyText)); //  将上传协议转为base64
      const accessid = config.value.accessid; // 你的阿里oss accessid
      const accesskey = config.value.accesskey; // 你的阿里oss secret
      const securitytoken = config.value.securitytoken;
      const host = config.value.host; // 上传oss地址
      const signature = computeSignature(accesskey, policy);
  
      // 在阿里云存储路径=>文件地址可根据自己需求修改
      const extension = path.split('.').pop()?.toLocaleLowerCase();
      const { getUserInfo } = useUserStore();
      const userId = getUserInfo?.userId;
      const fileName = userId + "/" + makeUUID() + "." + extension;
  
      const uploadTask = uni.uploadFile({
        url: host,
        filePath: path,
        fileType: 'image',
        name: 'file',
        formData: {
          key: fileName, // 文件名
          policy, // 获取的policy
          OSSAccessKeyId: accessid, // 的AccessKeyId
          success_action_status: '200', // 让服务端返回200,默认返回204
          signature, // 获取的signature
          'x-oss-security-token': securitytoken
        },
        success: (res: any) => {
          const pathUrl = config.value.host + "/" + fileName;
          resolve(pathUrl);
        },
        fail: (res) => {
          reject(res);
        }
      });
  
      // 监听上传进度变化
      uploadTask.onProgressUpdate((res) => {
        onProgress(res.progress);
      });
    });
  };

  return {
    getConfig,
    uploadFile
  }
};
