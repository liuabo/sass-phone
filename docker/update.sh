#!/bin/bash
####################################
#Provided for work-weixin-web-saas  test&prod  env deployment
#Usage: update.sh ./update.sh -s {app-name} -e test --build
# {app-name} is service name in this script
#./update.sh -s work-weixin-web-saas-oc -a saas-test-wechat-oc -e test --build
#author liudz@citic.com
####################################
while true 
do
case "$1" in 
-s)
service=$2
shift 2
;;
-a)
appname=$2
shift 2
;;
-e)
deployenv=$2
shift 2
;;
--nobuild)
buildflag=0
break
;;
--build)
buildflag=1
echo "you set build flag to 1"
break
;;
esac
done
echo $service
echo "you input deploy environment is $deployenv"


#define two func to deploy seperately  prod and test
pushresult=""

buildintest()
{
if [[ $buildflag = 0 ]]
then
echo "-------------- do not build docker image --------------"
else
echo "-------------- would build docker image -----------------"
fi
BASEDIR=`pwd $(dirname $0)`
CERT_PATH="/data/important_resource/qiyehao/test/certs"
DATE=`date +%Y%m%d%H%M%S`
tagend="newsnginx"${DATE}
dockerspace="registry.cn-hangzhou.aliyuncs.com/zhongxin-repertory"

buildimage()
{
dname=$(dirname "$PWD")
cp -r ${dname}/dist ./
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://master2g3.cs-cn-beijing.aliyun.com:19332"
export DOCKER_CERT_PATH="${CERT_PATH}"
docker build -t ${dockerspace}/zhongxin-prod:${tagend} -f Dockerfile .
docker push ${dockerspace}/zhongxin-prod:${tagend}
if [[ $? != 0 ]];then
echo "build or push image faiuld"
exit 1
else
pushresult="success"
fi
}
if [[ $buildflag = 1 ]]
then
buildimage
fi
echo "generate yaml file in ${BASEDIR}"
sed  "s/REPLACETAG/${tagend}/" ${BASEDIR}/${service}.yaml.test > ${BASEDIR}/${service}.new.yaml
PROJECT_URL="https://master2g3.cs-cn-beijing.aliyun.com:19332/projects"
#cd ${BASEDIR}/${service}
TEMPLATE=$(cat ${service}.new.yaml| awk '{printf $N"\\r\\n"}' |sed 's/\"/\\\"/g')
echo "{\"description\":\"企业微信SaaS企业头条移动端\",\"name\":\"${appname}\",\"template\":\"${TEMPLATE}\", \"version\": \"${tagend}\"}" > ${BASEDIR}/json.txt
echo ${CERT_PATH}
#echo ${PROJECT_URL}/${service}
curl -s -v -X POST -k --cert ${CERT_PATH}/cert.pem --key ${CERT_PATH}/key.pem ${PROJECT_URL}/${appname}/update -d @json.txt
}

buildinprod()
{
echo "comming soon"

}

if [[ $deployenv = "prod" ]]
then
echo "in build prod branch"
buildinprod
elif [[ $deployenv = "test" ]]
then
echo "in build test branch"
buildintest
else
echo "no env specified"
exit 1
fi
