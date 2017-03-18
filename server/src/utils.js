export const JsonResponse = (res, object) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(object));
};
