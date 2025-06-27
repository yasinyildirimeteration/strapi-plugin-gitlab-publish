import axios from 'axios';

const pluginId = 'plugin.gitlab-publish';

const controller = ({ strapi }) => ({
  publish: async (ctx) => {
    const { project_id, project_pipeline_token, project_branch } = strapi.config.get(pluginId);

    const headers = {
      'Content-Type': 'application/json',
    };

    const url = `https://gitlab.eteration.com/api/v4/projects/${project_id}/ref/${project_branch}/trigger/pipeline?token=${project_pipeline_token}`;

    const { status } = await axios.post(url, {}, { headers });
    const success = status === 201;

    ctx.send({ success });
  },
});

export default controller;
