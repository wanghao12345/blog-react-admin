import { message } from 'antd'

/**
 * 上传文章图片前的校验
 */
export const beforeUpload = (file) => {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error('只能上传jpg/png!');
	}
	const isLt2M = file.size / 1024 / 1024 < 5;
	if (!isLt2M) {
		message.error('图片不能超过5M!');
	}
	return isJpgOrPng && isLt2M;
}
