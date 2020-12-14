/*
@param type:Int 需要返回时间的类型 
  0.今日
  1.昨天
  2.最近7天
  3.最近30天
@return ([start,end]) 返回开始时间和结束时间的数组
*
*/
export default function acquire(type) {
	const end = new Date();
	const start = new Date();
	var startTime
	var endTime
	switch (type) {
		case 0:
			startTime = (1000 * (start.getSeconds() + 60 * start.getMinutes() + 3600 * start.getHours()))
			start.setTime(start.getTime() - startTime);
			break;
		case 1:
			startTime = 1000 * ((start.getSeconds() + 60 * start.getMinutes() + 3600 * start.getHours()) + (3600 * 24 * 1))
			endTime = (1000 * (start.getSeconds() + 60 * start.getMinutes() + 3600 * start.getHours()))
			start.setTime(start.getTime() - startTime);
			end.setTime(end.getTime() - endTime)
			break;
		case 2:
			startTime = 1000 * ((start.getSeconds() + 60 * start.getMinutes() + 3600 * start.getHours()) + (3600 * 24 * 7))
			start.setTime(start.getTime() - startTime);
			break;
		case 3:
			startTime = 1000 * ((start.getSeconds() + 60 * start.getMinutes() + 3600 * start.getHours()) + (3600 * 24 * 30))
			start.setTime(start.getTime() - startTime);
			break;
		default:
			break;
	}
	return ([start, end])
}
