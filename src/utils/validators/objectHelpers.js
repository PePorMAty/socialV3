export const updateObjectInArray = (
  [items],
  itemId,
  objPropName,
  newObjProps
) => {
  let newItems = { ...items };
  console.log(newItems);
  newItems.map((u) => {
    if (u[objPropName] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};
