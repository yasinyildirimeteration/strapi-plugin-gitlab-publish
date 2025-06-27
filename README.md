# Strapi plugin gitlab-publish ft. eteration


## Installation

Install this plugin with npm / yarn / pnpm.

With npm:

```bash
npm install strapi-plugin-gitlab-publish-custom-url
```

With yarn:

```bash
yarn add strapi-plugin-gitlab-publish-custom-url
```

With pnpm:

```bash
pnpm add strapi-plugin-gitlab-publish-custom-url
```

## Configuration

Generate a config file at `config/plugins.js` or `config/development/plugins.js` etc...

```javascript
module.exports = ({ env }) => ({
  "github-publish": {
    enabled: true,
    config: {
      project_id: env("GITLAB_PROJECT_ID"),
      project_branch: env("GITLAB_PROJECT_BRANCH"),
      project_pipeline_token: env("GITLAB_PROJECT_PIPELINE_TOKEN"),
    },
  },
});
```

Make sure you have variable in your .env file

```bash
GITLAB_PROJECT_ID=tobemodified
GITLAB_PROJECT_BRANCH=tobemodified
GITLAB_PROJECT_PIPELINE_TOKEN=tobemodified
```

Forked and configured from: https://www.npmjs.com/package/strapi-plugin-gitlab-publish
