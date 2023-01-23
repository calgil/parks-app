export const filterById = (array, userId) => {
  return array.filter((item) => +item.userId === userId);
};
