export default {
  default: {},
  validator: ({ project_id, project_pipeline_token, project_branch }) => {
    if (!project_id) {
      throw new Error('project_id is a required');
    }
    if (!project_pipeline_token) {
      throw new Error('project_pipeline_token is a required');
    }
    if (!project_branch) {
      throw new Error('project_branch is a required');
    }
  },
};
