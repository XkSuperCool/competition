export const formatPageParams = (ctx): { current: number, pageSize: number } => {
  let current = 0,
    pageSize = 10;
  if (ctx.query.pageSize) {
    pageSize = parseInt(ctx.query.pageSize, 10);
  }
  if (ctx.query.current) {
    current = (parseInt(ctx.query.current, 10) - 1) * pageSize;
  }
  return {
    current,
    pageSize,
  };
};
