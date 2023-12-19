/**
 * @description 格式化分页及查询参数
 * @returns param 查询参数
 * @returns pageInfo 分页参数
 */

export default function (body: any) {
  const pageNo = Number(body.pageNo);
  const pageSize = Number(body.pageSize);

  delete body.pageNo;
  delete body.pageSize;

  const pageInfo = {
    skip: (pageNo - 1) * pageSize,
    take: pageSize
  };

  const param = {};

  for (const key in body) {
    param[key] = {
      contains: body[key]
    };
  }
  return {
    param,
    pageInfo
  };
}
