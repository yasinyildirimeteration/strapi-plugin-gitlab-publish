import axios from "axios";
const bootstrap = ({ strapi }) => {
};
const destroy = ({ strapi }) => {
};
const register = ({ strapi }) => {
};
const config = {
  default: {},
  validator: ({ project_id, project_pipeline_token, project_branch }) => {
    if (!project_id) {
      throw new Error("project_id is a required");
    }
    if (!project_pipeline_token) {
      throw new Error("project_pipeline_token is a required");
    }
    if (!project_branch) {
      throw new Error("project_branch is a required");
    }
  }
};
const pluginId = "plugin.gitlab-publish";
const controller = ({ strapi }) => ({
  publish: async (ctx) => {
    const { project_id, project_pipeline_token, project_branch } = strapi.config.get(pluginId);
    const headers = {
      "Content-Type": "application/json"
    };
    const url = `https://gitlab.eteration.com/api/v4/projects/${project_id}/ref/${project_branch}/trigger/pipeline?token=${project_pipeline_token}`;
    const { status } = await axios.post(url, {}, { headers });
    const success = status === 201;
    ctx.send({ success });
  }
});
const controllers = {
  controller
};
const routes = [
  {
    method: "GET",
    path: "/publish",
    handler: "controller.publish",
    config: { policies: [] }
  }
];
const index = {
  bootstrap,
  destroy,
  register,
  config,
  controllers,
  routes
};
export {
  index as default
};
