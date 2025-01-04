export default [
  {
    method: 'GET',
    path: '/publish',
    handler: 'controller.publish',
    config: { policies: [] },
  },
];
