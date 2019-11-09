/**
 * Created by wanghao on 2019/11/9
 */
export const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}
